using System.Text;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
var conn = builder.Configuration.GetConnectionString("PropertyDB") ?? "Data Source=property.db";
builder.Services.AddDbContext<PropertyDb>(opt => opt.UseSqlite(conn));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddAntiforgery();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "PropertyAPI";
    config.Title = "PropertyAPI v1";
    config.Version = "v1";
});

var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<PropertyDb>();
    db.Database.EnsureCreated();
}
app.UseAntiforgery();

app.UseCors(); 

if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi(config =>
    {
        config.DocumentTitle = "PropertyAPI";
        config.Path = "/swagger";
        config.DocumentPath = "/swagger/{documentName}/swagger.json";
        config.DocExpansion = "list";
    });
}

app.MapGet("/propertyitems", async (PropertyDb db) =>
    await db.Properties.ToListAsync());


app.MapDelete("/propertyitems/{id}", async (int id, PropertyDb db) =>
{
    if (await db.Properties.FindAsync(id) is Property property)
    {
        db.Properties.Remove(property);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }
    return Results.NotFound();
}
);

app.MapPost("/propertyitems/upload", async (IFormFile file, PropertyDb db) =>
{
    if (file == null || file.Length == 0)
        return Results.BadRequest("No file uploaded");

    if (!file.FileName.EndsWith(".DAT", StringComparison.OrdinalIgnoreCase))
        return Results.BadRequest("Only .DAT files are supported");


    var normalizedFileName = file.FileName.Trim().ToLowerInvariant();
    // Check if file has already been uploaded
    var existingUpload = await db.FileUploadHistory
        .FirstOrDefaultAsync(f => f.FileName == normalizedFileName);
    if (existingUpload != null)
        {
            return Results.BadRequest(new
            {
                Error = "File already processed",
                Details = $"This file was previously uploaded on {existingUpload.UploadDate}",
                ProcessedRecords = existingUpload.RecordsProcessed,
                SuccessfulRecords = existingUpload.SuccessfulRecords
            });
        }
    var response = new DatFileUploadDto();
    var properties = new List<Property>();
    
    using (var reader = new StreamReader(file.OpenReadStream(), Encoding.ASCII))
    {
        string? line;
        int lineNumber = 0;

        while ((line = await reader.ReadLineAsync()) != null)
        {
            lineNumber++;
            try
            {
                var fields = line.Split(';');
                if (fields.Length > 0 && fields[0] == "B")
                {
                    response.ProcessedRecords++;
                    var property = PropertyRecordParser.ParseBRecord(fields);
                    properties.Add(property);
                    response.SuccessfulRecords++;
                }
            }
            catch (Exception ex)
            {
                response.Errors.Add($"{ex.Message}");
            }
        }
    }

     try
    {
        // Begin transaction
        using var transaction = await db.Database.BeginTransactionAsync();
        try
        {
            // 1 Add properties
            if (properties.Any())
            {
                await db.Properties.AddRangeAsync(properties);
            }
            // 2 Record file upload history
            var uploadHistory = new FileUploadHistory
            {
                FileName = normalizedFileName,
                UploadDate = DateTime.Now,
                RecordsProcessed = response.ProcessedRecords,
                SuccessfulRecords = response.SuccessfulRecords,
                ProcessingErrors = response.Errors.Any() 
                    ? string.Join("\n", response.Errors)
                    : null
            };
            db.FileUploadHistory.Add(uploadHistory);
            //3 Save changes
            await db.SaveChangesAsync();
            //4 Commit transaction
            await transaction.CommitAsync();
            return Results.Ok(new
            {
                FileName = file.FileName,
                response.ProcessedRecords,
                response.SuccessfulRecords,
                FailedRecords = response.ProcessedRecords - response.SuccessfulRecords,
                UploadDate = uploadHistory.UploadDate,
                Errors = response.Errors
            });
        }
        catch
        {
            // Rollback transaction if an error occurs
            await transaction.RollbackAsync();
            throw;
        }
    }
    catch (Exception ex)
    {
        return Results.BadRequest(new
        {
            Error = "Database error occurred while saving records",
            Details = ex.Message,
            ProcessedRecords = response.ProcessedRecords,
            Errors = response.Errors
        });
    }
}).DisableAntiforgery(); // Disable antiforgery for this endpoint

app.MapGet("/propertyitems/uploads", async (PropertyDb db) =>
    await db.FileUploadHistory
        .OrderByDescending(f => f.UploadDate)
        .Select(f => new FileUploadHistoryDto {
            FileName = f.FileName,
            UploadDate = f.UploadDate,
            RecordsProcessed = f.RecordsProcessed,
            SuccessfulRecords = f.SuccessfulRecords,
            ProcessingErrors = f.ProcessingErrors
        }
       )
        .ToListAsync());


app.Run();
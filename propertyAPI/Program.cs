using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var conn = builder.Configuration.GetConnectionString("PropertyDB") ?? "Data Source=property.db";
builder.Services.AddDbContext<PropertyDb>(opt => opt.UseSqlite(conn));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "PropertyAPI";
    config.Title = "PropertyAPI v1";
    config.Version = "v1";
});
var app = builder.Build();
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

app.MapGet("/propertyitems/complete", async (PropertyDb db) =>
    await db.Properties.Where(t => t.IsComplete).ToListAsync());

app.MapGet("/propertyitems/{id}", async (int id, PropertyDb db) =>
    await db.Properties.FindAsync(id)
        is Property property
            ? Results.Ok(property)
            : Results.NotFound());

app.MapPost("/propertyitems", async (Property property, PropertyDb db) =>
{
    db.Properties.Add(property);
    await db.SaveChangesAsync();

    return Results.Created($"/propertyitems/{property.Id}", property);
});

app.MapPut("/propertyitems/{id}", async (int id, Property inputProperty, PropertyDb db) =>
{
    var property = await db.Properties.FindAsync(id);

    if (property is null) return Results.NotFound();

    property.Name = inputProperty.Name;
    property.IsComplete = inputProperty.IsComplete;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapDelete("/propertyitems/{id}", async (int id, PropertyDb db) =>
{
    if (await db.Properties.FindAsync(id) is Property property)
    {
        db.Properties.Remove(property);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    return Results.NotFound();
});

app.Run();
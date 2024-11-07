using Microsoft.EntityFrameworkCore;

class PropertyDb : DbContext
{
    public PropertyDb(DbContextOptions<PropertyDb> options)
        : base(options) { }

    public DbSet<Property> Properties{ get; set; } = null!;
    public DbSet<FileUploadHistory> FileUploadHistory { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Property>()
            .Property(p => p.PropertyId)
            .IsRequired();

        // modelBuilder.Entity<Property>()
        //     .HasIndex(p => p.PropertyId);

        // Create unique index on FileName
        modelBuilder.Entity<FileUploadHistory>()
            .HasIndex(f => f.FileName)
            .IsUnique();
    }
}
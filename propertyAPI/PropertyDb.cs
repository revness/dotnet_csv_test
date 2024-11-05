using Microsoft.EntityFrameworkCore;

class PropertyDb : DbContext
{
    public PropertyDb(DbContextOptions<PropertyDb> options)
        : base(options) { }

    public DbSet<Property> Properties => Set<Property>();
}
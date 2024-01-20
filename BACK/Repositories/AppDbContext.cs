using KanbanSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace KanbanSystem.Repositories
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<CardModel> Cards { get; set; }
    }
}

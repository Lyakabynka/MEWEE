using IdentityService.Application.Features.Interfaces;
using IdentityService.Domain.Entities;
using IdentityService.Persistence.EntityTypeConfigurations;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Persistence
{
    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        public DbSet<User> Users { get; set; }
        
        public DbSet<RefreshSession> RefreshSessions { get; set; }
        
        public DbSet<ConfirmationCode> ConfirmationCodes { get; set; }
        
        public DbSet<ForgotPasswordCode> ForgotPasswordCodes { get; set; }
        
        public DbSet<Follower> Followers { get; set; }
        public DbSet<Photo> Photos { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new RefreshSessionConfiguration());
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new FollowConfiguration());
            base.OnModelCreating(modelBuilder);
        }
    }
}

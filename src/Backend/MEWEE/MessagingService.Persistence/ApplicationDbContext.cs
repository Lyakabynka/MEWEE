using MessagingService.Application.Features.Interfaces;
using MessagingService.Domain.Entities;
using MessagingService.Domain.Entities.Likes;
using MessagingService.Persistence.EntityTypeConfigurations;
using Microsoft.EntityFrameworkCore;

namespace MessagingService.Persistence
{
    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        public DbSet<Post> Posts { get; set; }
        public DbSet<PostLike> PostLikes { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<CommentLike> CommentLikes { get; set; }
        public DbSet<Share> Shares { get; set; }
        
        public DbSet<Chat> Chats { get; set; }
        public DbSet<ChatUser> ChatParticipants { get; set; }
        public DbSet<Message> Messages { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new CommentConfiguration());
            modelBuilder.ApplyConfiguration(new ShareConfiguration());
            modelBuilder.ApplyConfiguration(new CommentLikeConfiguration());
            modelBuilder.ApplyConfiguration(new PostLikeConfiguration());
            base.OnModelCreating(modelBuilder);
        }
    }
}

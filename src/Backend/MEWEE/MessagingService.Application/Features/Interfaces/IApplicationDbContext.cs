using System.Threading;
using System.Threading.Tasks;
using MessagingService.Domain.Entities;
using MessagingService.Domain.Entities.Likes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace MessagingService.Application.Features.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Post> Posts { get; set; }
    DbSet<PostLike> PostLikes { get; set; }
    
    DbSet<Comment> Comments { get; set; }
    DbSet<CommentLike> CommentLikes { get; set; }
    
    DbSet<Share> Shares { get; set; }
    
    DbSet<Chat> Chats { get; set; }
    DbSet<ChatUser> ChatParticipants { get; set; }
    DbSet<Message> Messages { get; set; }
    
    DatabaseFacade Database { get; }
    
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}

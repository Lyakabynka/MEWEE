using MessagingService.Domain.Entities.Base;
using MessagingService.Domain.Entities.Likes;

namespace MessagingService.Domain.Entities;

public class Post : BaseEntity
{
    public string Title { get; set; }
    public string Content { get; set; }
    public string? Attachment { get; set; }
    public string? Location { get; set; }
    public string Category { get; set; }
    
    public List<Share> Shares { get; set; }
    public List<PostLike> Likes { get; set; }
    public List<Comment> Comments { get; set; }
    
    public Guid UserId { get; set; }
}
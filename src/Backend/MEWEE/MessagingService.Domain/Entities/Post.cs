using MessagingService.Domain.Entities.Base;
using MessagingService.Domain.Entities.Likes;
using MessagingService.Domain.Enums;

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
    public List<Save> Saves { get; set; }
    
    
    public PostType Type { get; set; }
    public Guid AuthorId { get; set; }
    
    // not null when Type == Event
    public DateTime? HappeningAtUtc { get; set; }
}
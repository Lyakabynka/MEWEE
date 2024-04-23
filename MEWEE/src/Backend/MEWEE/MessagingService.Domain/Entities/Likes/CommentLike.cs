using MessagingService.Domain.Entities.Base;

namespace MessagingService.Domain.Entities.Likes;

public class CommentLike : BaseEntity
{
    public Guid CommentId { get; set; }
    public Comment Comment { get; set; }
    
    public Guid UserId { get; set; }
}
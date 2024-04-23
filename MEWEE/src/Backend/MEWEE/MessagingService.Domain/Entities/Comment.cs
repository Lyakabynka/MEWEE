using MessagingService.Domain.Entities.Base;
using MessagingService.Domain.Entities.Likes;

namespace MessagingService.Domain.Entities;

public class Comment : BaseEntity
{
    public Guid PostId { get; set; }
    public Post Post { get; set; }
    
    public Guid? ReplyCommentId { get; set; }
    
    public List<CommentLike> Likes { get; set; }
    public string Content { get; set; }
    
    public Guid UserId { get; set; }
}
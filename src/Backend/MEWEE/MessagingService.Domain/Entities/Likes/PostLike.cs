using MessagingService.Domain.Entities.Base;

namespace MessagingService.Domain.Entities.Likes;

public class PostLike : BaseEntity
{
    public Guid PostId { get; set; }
    public Post Post { get; set; }
    
    public Guid UserId { get; set; }
}
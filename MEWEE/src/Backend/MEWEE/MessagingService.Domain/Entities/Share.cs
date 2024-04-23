using MessagingService.Domain.Entities.Base;

namespace MessagingService.Domain.Entities;

public class Share : BaseEntity
{
    public Guid PostId { get; set; }
    public Post Post { get; set; }
    
    public Guid FromUserId { get; set; }
    public Guid ToUserId { get; set; }
}
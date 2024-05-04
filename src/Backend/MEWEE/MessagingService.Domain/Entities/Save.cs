using MessagingService.Domain.Entities.Base;

namespace MessagingService.Domain.Entities;

public class Save : BaseEntity
{
    public Guid UserId { get; set; }
    
    public Guid PostId { get; set; }
    public Post Post { get; set; }
}
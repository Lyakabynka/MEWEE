using MessagingService.Domain.Entities.Base;

namespace MessagingService.Domain.Entities;

public class MessageUser : BaseEntity
{
    public Guid MessageId { get; set; }
    public Message Message { get; set; }    
    
    public Guid UserId { get; set; }
}
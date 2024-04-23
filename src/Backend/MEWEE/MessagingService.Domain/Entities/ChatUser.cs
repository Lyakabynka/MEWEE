using MessagingService.Domain.Entities.Base;

namespace MessagingService.Domain.Entities;

public class ChatUser : BaseEntity
{
    public Guid UserId { get; set; }
    
    public Guid ChatId { get; set; }
    public Chat Chat { get; set; }
}
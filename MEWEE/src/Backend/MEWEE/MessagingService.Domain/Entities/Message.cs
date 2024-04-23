using MessagingService.Domain.Entities.Base;

namespace MessagingService.Domain.Entities;

public class Message : BaseEntity
{
    public string Content { get; set; }

    public Guid UserId { get; set; }
    
    public Guid ChatId { get; set; }
    public Chat Chat { get; set; }
    
    public List<MessageUser> ReadByUsers { get; set; }
}
using MessagingService.Domain.Entities.Base;

namespace MessagingService.Domain.Entities;

public class Chat : BaseEntity
{
    public bool IsHidden { get; set; }
    
    public List<ChatUser> ChatUsers { get; set; }
    public List<Message> Messages { get; set; }
}
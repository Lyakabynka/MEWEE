namespace IdentityService.Domain.Entities;

public class Photo : BaseEntity
{
    public string Content { get; set; }
    
    public Guid UserId { get; set; }
    public User User { get; set; }
}
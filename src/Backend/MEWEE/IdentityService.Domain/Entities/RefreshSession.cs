namespace IdentityService.Domain.Entities;

public class RefreshSession : BaseEntity
{
    public Guid UserId { get; set; }
    public Guid RefreshToken { get; set; }
    
    public string UserAgent { get; set; }
    
    public User? User { get; set; }
}
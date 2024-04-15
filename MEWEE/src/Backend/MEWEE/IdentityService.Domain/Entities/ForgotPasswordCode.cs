namespace IdentityService.Domain.Entities;

public class ForgotPasswordCode : BaseEntity
{
    public string Code { get; set; }
    public DateTime ExpirationDateUtc { get; set; }
    
    public Guid UserId { get; set; }
    public User User { get; set; }
}
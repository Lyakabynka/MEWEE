using IdentityService.Domain.Enums;

namespace IdentityService.Domain.Entities;

public class User : BaseEntity
{
    public string Username { get; set; }
    public string PasswordHash { get; set; }

    public string Email { get; set; }

    public UserRole Role { get; set; } = UserRole.User;

    public string? ProfileAvatar { get; set; }
    
    public bool IsEmailConfirmed { get; set; } = false;

    public List<RefreshSession> RefreshSessions { get; set; }
    
    public List<Follower> Followers { get; set; }
    public List<Follower> Followings { get; set; }
    
    
    public string? Workplace { get; set; }
    public string? Website { get; set; }
    public string? Status { get; set; }
    
    public string? Location { get; set; }
    
    public ConfirmationCode? ConfirmationCode { get; set; }
    public ForgotPasswordCode? ForgotPasswordCode { get; set; }
}





using IdentityService.Domain.Enums;

namespace IdentityService.Application.Mediatr.Results.Shared;

public class UserVm
{
    public Guid Id { get; set; }
    
    public string FirstName { get; set; }
    public string? SecondName { get; set; }
    public string Username { get; set; }
    
    public string Email { get; set; }
    
    public UserRole Role { get; set; }
    
    public string? ProfileAvatar { get; set; }
    
    public bool IsEmailConfirmed { get; set; }
    
    public string? Workplace { get; set; }
    public string? Website { get; set; }
    public string? Status { get; set; }
    
    public string? Location { get; set; }
    
    public int FollowersCount { get; set; }
    public int FollowingsCount { get; set; }
    
    public int PhotoCount { get; set; }
    
    public string UserAgent { get; set; }
}
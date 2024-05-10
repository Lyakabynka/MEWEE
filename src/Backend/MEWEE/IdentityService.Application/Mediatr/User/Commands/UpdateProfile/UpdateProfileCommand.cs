using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;

namespace IdentityService.Application.Mediatr.User.Commands.UpdateProfile;

public class UpdateProfileCommand : IValidatableRequest<Result>
{
    public Guid UserId { get; set; }
    
    public string? ProfileAvatar { get; set; }
    
    public string? Username { get; set; }
    public string? Workplace { get; set; }
    public string? Website { get; set; }
    public string? Status { get; set; }
    
    public string? Location { get; set; }
}
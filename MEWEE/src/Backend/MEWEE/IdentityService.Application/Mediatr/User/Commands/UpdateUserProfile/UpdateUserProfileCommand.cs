using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;

namespace IdentityService.Application.Mediatr.User.Commands.UpdateUserProfile;

public class UpdateUserProfileCommand : IValidatableRequest<Result>
{
    public Guid UserId { get; set; }
    public string ProfileAvatar { get; set; }
}
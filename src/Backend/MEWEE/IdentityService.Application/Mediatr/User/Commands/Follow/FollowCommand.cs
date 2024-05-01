using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;

namespace IdentityService.Application.Mediatr.User.Commands.Follow;

public class FollowCommand : IValidatableRequest<Result>
{
    public Guid UserId { get; set; }
    
    public Guid FollowingUserId { get; set; }
}
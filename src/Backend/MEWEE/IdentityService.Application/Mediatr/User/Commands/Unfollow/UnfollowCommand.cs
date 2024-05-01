using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;

namespace IdentityService.Application.Mediatr.User.Commands.Unfollow;

public class UnfollowCommand : IValidatableRequest<Result>
{
    public Guid UserId { get; set; }
    
    public Guid FollowingUserId { get; set; }
}
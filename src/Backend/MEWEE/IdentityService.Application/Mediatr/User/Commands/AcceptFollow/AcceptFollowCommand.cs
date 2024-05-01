using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;

namespace IdentityService.Application.Mediatr.User.Commands.AcceptFollow;

public class AcceptFollowCommand : IValidatableRequest<Result>
{
    public Guid UserId { get; set; }
    
    public Guid FollowerUserId { get; set; }
}
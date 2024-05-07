using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;

namespace IdentityService.Application.Mediatr.Group.Commands.JoinGroup;

public class JoinGroupCommand : IValidatableRequest<Result>
{
    public Guid UserId { get; set; }
    public Guid GroupId { get; set; }
}
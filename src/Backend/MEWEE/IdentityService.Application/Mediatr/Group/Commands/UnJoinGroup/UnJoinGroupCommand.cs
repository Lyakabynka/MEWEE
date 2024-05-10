using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;

namespace IdentityService.Application.Mediatr.Group.Commands.UnJoinGroup;

public class UnJoinGroupCommand : IValidatableRequest<Result>
{
    public Guid UserId { get; set; }
    public Guid GroupId { get; set; }
}
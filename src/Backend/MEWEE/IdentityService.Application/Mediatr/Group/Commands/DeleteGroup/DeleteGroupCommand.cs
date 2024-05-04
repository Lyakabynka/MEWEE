using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;

namespace IdentityService.Application.Mediatr.Group.Commands.DeleteGroup;

public class DeleteGroupCommand : IValidatableRequest<Result>
{
    public Guid GroupId { get; set; }
    public Guid UserId { get; set; }
}
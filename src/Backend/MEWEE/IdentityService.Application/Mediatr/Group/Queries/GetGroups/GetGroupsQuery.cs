using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;

namespace IdentityService.Application.Mediatr.Group.Queries.GetGroups;

public class GetGroupsQuery : IValidatableRequest<Result>
{
    public string? Category { get; set; }
    public Guid UserId { get; set; }
}

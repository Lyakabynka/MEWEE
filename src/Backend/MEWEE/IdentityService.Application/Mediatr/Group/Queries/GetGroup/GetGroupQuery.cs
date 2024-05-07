using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;

namespace IdentityService.Application.Mediatr.Group.Queries.GetGroup;

public class GetGroupQuery : IValidatableRequest<Result>
{
    public string GroupCredentials { get; set; }
}
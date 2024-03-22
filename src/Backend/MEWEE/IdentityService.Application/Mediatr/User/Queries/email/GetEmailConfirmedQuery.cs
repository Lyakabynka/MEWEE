using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;

namespace IdentityService.Application.Mediatr.User.Queries;

public class GetUserProfileQuery : IValidatableRequest<Result>
{
    public Guid UserId { get; set; }
}
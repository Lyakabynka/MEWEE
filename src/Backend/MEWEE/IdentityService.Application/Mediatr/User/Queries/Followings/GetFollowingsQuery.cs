using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Mediatr.Results.Shared.Pagination;
using IdentityService.Application.Response;

namespace IdentityService.Application.Mediatr.User.Queries.Followings;

public class GetFollowingsQuery : IValidatableRequest<Result>
{
    public Guid UserId { get; set; }
    
    public Pagination Pagination { get; set; }
}
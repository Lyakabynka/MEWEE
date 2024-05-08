using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Mediatr.Results.Shared.Pagination;
using IdentityService.Application.Response;

namespace IdentityService.Application.Mediatr.User.Queries.FindGroupAndUsers;

public class FindGroupAndUsersQuery : IValidatableRequest<Result>
{
    public string SearchQuery { get; set; }
    
    public Pagination Pagination { get; set; }
}
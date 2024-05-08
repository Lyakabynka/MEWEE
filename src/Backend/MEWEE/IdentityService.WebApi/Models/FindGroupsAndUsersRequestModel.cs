using IdentityService.Application.Mediatr.Results.Shared.Pagination;

namespace IdentityService.WebApi.Models;

public class FindGroupsAndUsersRequestModel
{
    public string SearchQuery { get; set; }
    public Pagination Pagination { get; set; }
}
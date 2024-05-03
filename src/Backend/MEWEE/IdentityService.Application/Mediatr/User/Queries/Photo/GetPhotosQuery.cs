using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Mediatr.Results.Shared.Pagination;
using IdentityService.Application.Response;

namespace IdentityService.Application.Mediatr.User.Queries.Photo;

public class GetPhotosQuery : IValidatableRequest<Result>
{
    public Guid UserId { get; set; }
    
    public Pagination Pagination { get; set; }
}
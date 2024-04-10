using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Mediatr.Shared;
using MessagingService.Application.Mediatr.Shared.Pagination;
using MessagingService.Application.Response;

namespace MessagingService.Application.Mediatr.Post.Queries.FindPosts;

public class FindPostsQuery : IValidatableRequest<Result>
{
    public string SearchQuery { get; set; }
    
    public Pagination Pagination { get; set; }
}
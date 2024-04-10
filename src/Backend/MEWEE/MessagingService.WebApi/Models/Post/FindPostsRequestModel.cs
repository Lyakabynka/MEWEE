using MessagingService.Application.Mediatr.Shared.Pagination;

namespace MessagingService.WebApi.Models.Post;

public class FindPostsRequestModel
{
    public string SearchQuery { get; set; }
    
    public Pagination Pagination { get; set; }
}
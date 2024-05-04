using MessagingService.Domain.Enums;

namespace MessagingService.WebApi.Models.Post;

public class GetPostsRequestModel
{
    public PostType Type { get; set; }
    public Guid AuthorId { get; set; }
}
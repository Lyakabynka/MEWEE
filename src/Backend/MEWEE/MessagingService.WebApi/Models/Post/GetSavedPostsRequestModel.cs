namespace MessagingService.WebApi.Models.Post;

public class GetSavedPostsRequestModel
{
    public Guid? PostId { get; set; }
    public Guid UserId { get; set; }
}
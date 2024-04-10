namespace MessagingService.WebApi.Models.Post;

public class CreatePostRequestModel
{
    public string Title { get; set; }
    public string Content { get; set; }
    public string? Attachment { get; set; }
}
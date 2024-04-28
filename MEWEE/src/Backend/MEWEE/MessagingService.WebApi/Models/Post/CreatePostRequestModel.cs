namespace MessagingService.WebApi.Models.Post;

public class CreatePostRequestModel
{
    public string Title { get; set; }
    public string Content { get; set; }
    public string? Attachment { get; set; }
    public string? Location { get; set; }
    public string Category { get; set; }
}
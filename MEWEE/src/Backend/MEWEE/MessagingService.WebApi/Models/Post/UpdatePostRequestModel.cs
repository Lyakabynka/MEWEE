namespace MessagingService.WebApi.Models.Post;

public class UpdatePostRequestModel
{
    public Guid Id { get; set; }
    
    public string Title { get; set; }
    public string Content { get; set; }
    public string? Attachment { get; set; }
}
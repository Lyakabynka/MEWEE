using MessagingService.Domain.Enums;

namespace MessagingService.WebApi.Models.Post;

public class CreatePostRequestModel
{
    public string Title { get; set; }
    public string Content { get; set; }
    public string? Attachment { get; set; }
    
    public string Category { get; set; }
    public string? Location { get; set; }
    
    public PostType Type { get; set; }
    public Guid AuthorId { get; set; }
    
    //not null if Type == Event
    public DateTime? HappeningAtUtc { get; set; }
}
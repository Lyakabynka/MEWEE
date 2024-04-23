namespace MessagingService.Application.Mediatr.Shared;

public class PostVm
{
    public string Title { get; set; }
    public string Content { get; set; }
    public string? Attachment { get; set; }
    
    public int LikesCount { get; set; }
}
namespace MessagingService.WebApi.Models.Comment;

public class CreateCommentRequestModel
{
    public Guid PostId { get; set; }
    public Guid? ReplyCommentId { get; set; }
    
    public string Content { get; set; }
}
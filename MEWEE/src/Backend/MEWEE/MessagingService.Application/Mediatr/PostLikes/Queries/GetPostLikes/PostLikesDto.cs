using System;

namespace MessagingService.Application.Mediatr.Comments.Queries.GetComments;

public class PostLikesDto
{
    public Guid Id { get; set; }
    public Guid PostId { get; set; }
    
    public Guid? ReplyCommentId { get; set; }
    
    public int Likes { get; set; }
    public string Content { get; set; }
    
    public Guid UserId { get; set; }
}
using System;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Response;

namespace MessagingService.Application.Mediatr.Comments.Commands.CreateComment;

public class CreateCommentCommand : IValidatableRequest<Result>
{
    public Guid PostId { get; set; }
    public Guid? ReplyCommentId { get; set; }
    
    public string Content { get; set; }
    public Guid UserId { get; set; }
}
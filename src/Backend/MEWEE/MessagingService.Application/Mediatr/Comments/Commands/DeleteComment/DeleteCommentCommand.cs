using System;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Response;

namespace MessagingService.Application.Mediatr.Comments.Commands.DeleteComment;

public class DeleteCommentCommand : IValidatableRequest<Result>
{
    public Guid CommentId { get; set; }
    public Guid UserId { get; set; }   
}
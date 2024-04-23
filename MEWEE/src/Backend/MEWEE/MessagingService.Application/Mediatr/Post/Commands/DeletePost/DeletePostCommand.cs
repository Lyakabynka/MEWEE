using System;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Response;

namespace MessagingService.Application.Mediatr.Post.Commands.DeletePost;

public class DeletePostCommand : IValidatableRequest<Result>
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }
}
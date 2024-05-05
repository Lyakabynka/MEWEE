using System;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Response;

namespace MessagingService.Application.Mediatr.Post.Commands.UnsavePost;

public class UnsavePostCommand : IValidatableRequest<Result>
{
    public Guid PostId { get; set; }
    public Guid UserId { get; set; }
}
using System;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Response;

namespace MessagingService.Application.Mediatr.PostLikes.Commands.DeletePostLike;

public class DeletePostLikeCommand : IValidatableRequest<Result>
{
    public Guid PostId { get; set; }
    public Guid UserId { get; set; }
}
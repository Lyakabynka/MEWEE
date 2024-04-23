using System;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Response;

namespace MessagingService.Application.Mediatr.PostLikes.Commands.CreatePostLike;

public class CreatePostLikeCommand : IValidatableRequest<Result>
{
    public Guid PostId { get; set; }
    public Guid UserId { get; set; }
}
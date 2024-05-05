using System;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Response;
using MessagingService.Domain.Enums;

namespace MessagingService.Application.Mediatr.Post.Commands.SavePost;

public class SavePostCommand : IValidatableRequest<Result>
{
    public Guid PostId { get; set; }
    public Guid UserId { get; set; }
}
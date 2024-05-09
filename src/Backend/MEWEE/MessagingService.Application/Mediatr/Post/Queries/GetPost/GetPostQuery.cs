using System;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Response;
using MessagingService.Domain.Enums;

namespace MessagingService.Application.Mediatr.Post.Queries.GetPost;

public class GetPostQuery : IValidatableRequest<Result>
{
    public Guid PostId { get; set; }
}
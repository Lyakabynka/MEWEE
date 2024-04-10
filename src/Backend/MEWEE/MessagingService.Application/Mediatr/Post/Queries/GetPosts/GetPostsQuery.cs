using System;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Response;

namespace MessagingService.Application.Mediatr.Post.Queries.GetPosts;

public class GetPostsQuery : IValidatableRequest<Result>
{
    public Guid UserId { get; set; }
}
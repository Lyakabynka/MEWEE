using System;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Response;
using MessagingService.Domain.Enums;

namespace MessagingService.Application.Mediatr.Post.Queries.GetPosts;

public class GetPostsQuery : IValidatableRequest<Result>
{
    public PostType Type { get; set; }
    public Guid AuthorId { get; set; }
}
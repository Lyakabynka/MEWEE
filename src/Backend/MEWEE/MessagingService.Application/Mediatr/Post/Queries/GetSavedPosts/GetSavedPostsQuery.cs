using System;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Response;
using MessagingService.Domain.Enums;

namespace MessagingService.Application.Mediatr.Post.Queries.GetSavedPosts;

public class GetSavedPostsQuery : IValidatableRequest<Result>
{
    public Guid? SavedPostId { get; set; }
    public Guid UserId { get; set; }
}
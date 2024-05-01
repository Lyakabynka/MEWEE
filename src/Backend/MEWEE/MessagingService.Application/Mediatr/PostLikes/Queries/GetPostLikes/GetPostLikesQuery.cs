using System;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Mediatr.Shared.Pagination;
using MessagingService.Application.Response;

namespace MessagingService.Application.Mediatr.PostLikes.Queries.GetPostLikes;

public class GetPostLikesQuery : IValidatableRequest<Result>
{
    public Guid PostId { get; set; }
    public Guid UserId { get; set; }
    
    public Pagination Pagination { get; set; }
}
using System;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Mediatr.Shared.Pagination;
using MessagingService.Application.Response;

namespace MessagingService.Application.Mediatr.Comments.Queries.GetComments;

public class GetPostLikesQuery : IValidatableRequest<Result>
{
    public Guid PostId { get; set; }
    
    public Pagination Pagination { get; set; }
}
using System;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Mediatr.Shared.Pagination;
using MessagingService.Application.Response;

namespace MessagingService.Application.Mediatr.PostLikes.Queries.GetPostSave;

public class GetPostSaveQuery : IValidatableRequest<Result>
{
    public Guid PostId { get; set; }
    public Guid UserId { get; set; }
}
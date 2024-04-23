using System;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Response;

namespace MessagingService.Application.Mediatr.Chats.Queries.GetChats;

public class GetChatsCommand : IValidatableRequest<Result>
{
    public Guid UserId { get; set; }
}
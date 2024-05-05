using System;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Response;

namespace MessagingService.Application.Mediatr.Chats.Queries.GetConversation;

public class GetConversationCommand : IValidatableRequest<Result>
{
    public Guid ChatId { get; set; }
}
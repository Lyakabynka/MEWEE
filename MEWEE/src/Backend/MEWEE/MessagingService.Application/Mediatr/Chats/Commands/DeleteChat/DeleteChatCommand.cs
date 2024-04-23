using System;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Response;

namespace MessagingService.Application.Mediatr.Chats.Commands.DeleteChat;

public class DeleteChatCommand : IValidatableRequest<Result>
{
    public Guid ChatId { get; set; }
    public Guid UserId { get; set; }
}
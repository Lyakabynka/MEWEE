using System;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Response;

namespace MessagingService.Application.Mediatr.Chats.Commands.CreateChat;

public class CreateChatCommand : IValidatableRequest<Result>
{
    public Guid InviteeUserId { get; set; }
    public Guid UserId { get; set; }
}
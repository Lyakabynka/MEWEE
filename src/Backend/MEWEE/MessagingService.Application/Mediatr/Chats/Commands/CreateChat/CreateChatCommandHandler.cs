using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Hubs;
using MessagingService.Application.Response;
using MessagingService.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace MessagingService.Application.Mediatr.Chats.Commands.CreateChat;

public class CreateChatCommandHandler : IRequestHandler<CreateChatCommand, Result>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly IHubContext<MessageHub> _hub;

    public CreateChatCommandHandler(IApplicationDbContext dbContext, IHubContext<MessageHub> hub)
    {
        _dbContext = dbContext;
        _hub = hub;
    }

    public async Task<Result> Handle(CreateChatCommand request, CancellationToken cancellationToken)
    {
        var chatExists = _dbContext.Chats
            .Include(c => c.ChatUsers)
            .Any(c => c.ChatUsers.Any(x => x.UserId == request.InviteeUserId) &&
                        c.ChatUsers.Any(x => x.UserId == request.UserId));

        if (chatExists)
            return Result.Create(new { });
        
        var chat = new Chat()
        {
            Id = Guid.NewGuid(),
            IsHidden = false,
            ChatUsers =
            [
                new ChatUser()
                {
                    UserId = request.UserId,
                },
                new ChatUser()
                {
                    UserId = request.InviteeUserId,
                }
            ]
        };

        _dbContext.Chats.Add(chat);

        await _dbContext.SaveChangesAsync(cancellationToken);

        await _hub.Groups.AddToGroupAsync(request.UserId.ToString(), chat.Id.ToString(), cancellationToken);
        await _hub.Groups.AddToGroupAsync(request.InviteeUserId.ToString(), chat.Id.ToString(), cancellationToken);

        return Result.Create(chat);
    }
}
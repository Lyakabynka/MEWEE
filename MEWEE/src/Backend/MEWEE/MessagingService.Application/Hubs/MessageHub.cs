using System;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Hubs.Models;
using MessagingService.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace MessagingService.Application.Hubs;

[Authorize]
public class MessageHub : Hub
{
    private Guid _userId = Guid.Empty;
    private Guid UserId => _userId != Guid.Empty ? _userId 
        : _userId = Context?.User?.Identity?.IsAuthenticated is true
            ? Guid.Parse(Context.User.FindFirstValue("userId")!)
            : Guid.Empty;

    private readonly IApplicationDbContext _dbContext;

    public MessageHub(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task InitializeSession(CancellationToken ct)
    {
        var initSession = await _dbContext.Chats
            .Include(c => c.ChatUsers)

            .Include(c => c.Messages)
            .ThenInclude(m => m.ReadByUsers)
            
            // selecting any chat, where user is a 'participant'
            .Where(c => c.ChatUsers.Any(cp => cp.UserId == UserId))
            .Select(c =>
                new
                {
                    Id = c.Id,
                    UnreadMessagesCount =
                        c.Messages.Count(u => u.ReadByUsers.All(rcp => rcp.UserId != UserId)),
                    LastMessage = c.Messages.OrderByDescending(m => m.CreatedAt).FirstOrDefault(),
                })
            .ToListAsync(ct);

        await Clients.Caller.SendAsync("initializeSession", initSession, ct);
    }

    public async Task SendMessage(Guid chatId, SendMessageRequest request, CancellationToken ct)
    {
        if (UserId == Guid.Empty)
        {
            return;
        }

        //process with a queue ( later )
        var chat = await _dbContext.Chats
            .AsTracking()
            .Where(c => c.Id == chatId)
            .Include(c => c.ChatUsers)
            .FirstOrDefaultAsync(ct);

        if (chat is null)
        {
            return;
        }

        if (chat.ChatUsers.All(cp => cp.UserId != UserId))
        {
            return;
        }

        var message = new Message()
        {
            Content = request.Content,
            CreatedAt = request.CreatedAt,
            UpdatedAt = request.CreatedAt,
            ChatId = chatId,
            UserId = UserId,
        };

        chat.Messages.Add(message);

        await Clients.Group(chatId.ToString()).SendAsync("receiveMessage", message, ct);
    }
}
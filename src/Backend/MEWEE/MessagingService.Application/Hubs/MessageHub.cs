using System;
using System.Collections.Generic;
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
    private readonly Dictionary<string, HashSet<string>> chatGroups = new Dictionary<string, HashSet<string>>();

    private Guid UserId => _userId != Guid.Empty ? _userId 
        : _userId = Context?.User?.Identity?.IsAuthenticated is true
            ? Guid.Parse(Context.User.FindFirstValue("userId")!)
            : Guid.Empty;

    private readonly IApplicationDbContext _dbContext;

    public MessageHub(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task InitializeSession()
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
            .ToListAsync();

        await Clients.Caller.SendAsync("initializeSession", initSession);
        await Clients.Others.SendAsync("userOnline", UserId);
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        await Clients.Others.SendAsync("userOffline", UserId);
        
        await base.OnDisconnectedAsync(exception);
    }

    public async Task JoinChat(Guid chatId)
    {
        var chat = await _dbContext.Chats
            .AsTracking()
            .Where(c => c.Id == chatId)
            .Include(c => c.Messages)
            .FirstOrDefaultAsync();

        if (chat is null)
            return;

        string cId = chatId.ToString();
        if (!chatGroups.ContainsKey(chatId.ToString()))
        {
            chatGroups[cId] = new HashSet<string>();
        }

        if (!chatGroups[cId].Contains(Context.ConnectionId))
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, cId);
            chatGroups[cId].Add(Context.ConnectionId); 
        }
        var result = chat.Messages.ToArray().Select(x => new {  Content = x.Content, CreatedAt = x.CreatedAt, UserId = x.UserId });
        //var result2 = chat.ChatUsers.ToArray().Select(x => new {  Content = x.Content, CreatedAt = x.CreatedAt, UserId = x.UserId });
        
        await Clients.Group(chatId.ToString()).SendAsync("onJoined", arg1:result);
    }

    public async Task SendMessageToUser(Guid userId, string content, string createdAt)
    {
        if (UserId == Guid.Empty || userId == Guid.Empty)
        {
            return;
        }

        // Process with a queue (later)
        var chat = await _dbContext.Chats
            .AsTracking()
            .Where(c => c.ChatUsers.Any(x => x.UserId == userId))
            .FirstOrDefaultAsync();

        if (chat is null)
            return;

        await SendMessage(chat.Id, content, createdAt);
    }

    public async Task SendMessage(Guid chatId, string content, string createdAt)
    {
        SendMessageRequest request = new SendMessageRequest() { Content = content, CreatedAt = DateTime.Parse(createdAt) }; 

        if (UserId == Guid.Empty)
        {
            return;
        }

        // Process with a queue (later)
        var chat = await _dbContext.Chats
            .AsTracking()
            .Where(c => c.Id == chatId)
            .Include(c => c.ChatUsers)
            .Include(c => c.Messages)
            .FirstOrDefaultAsync();

        if (chat is null || string.IsNullOrWhiteSpace(content))
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

        _dbContext.Messages.Add(message);
        await _dbContext.SaveChangesAsync(default);
        // Save changes to the database

        // Join the user to the chat room
        await Groups.AddToGroupAsync(Context.ConnectionId, chatId.ToString());

        // Send the message to all clients in the chat room
        //var result = chat.Messages.ToArray().Select(x => );
        await Clients.Group(chatId.ToString()).SendAsync("receiveMessage", arg1:new { Content = message.Content, CreatedAt = message.CreatedAt, UserId = message.UserId });
    }
}
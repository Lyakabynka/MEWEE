using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Hubs;
using MessagingService.Application.Response;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace MessagingService.Application.Mediatr.Chats.Commands.DeleteChat;

public class DeleteChatCommandHandler : IRequestHandler<DeleteChatCommand, Result>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly IHubContext<MessageHub> _hub;

    public DeleteChatCommandHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(DeleteChatCommand request, CancellationToken cancellationToken)
    {
        var chat = await _dbContext.Chats
            .Include(c => c.ChatUsers)
            .Where(c => c.Id == request.ChatId)
            .FirstAsync(cancellationToken);

        if (chat.ChatUsers.All(cp => cp.UserId != request.UserId))
        {
            return Result.FormForbidden();
        }

        _dbContext.Chats.Remove(chat);

        await _dbContext.SaveChangesAsync(cancellationToken);

        foreach (var chatParticipant in chat.ChatUsers)
        {
            await _hub.Groups.RemoveFromGroupAsync(chatParticipant.UserId.ToString(), chat.Id.ToString(), cancellationToken);
        }

        return Result.Create(new { });
    }
}
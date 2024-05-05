using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Response;
using Microsoft.EntityFrameworkCore;

namespace MessagingService.Application.Mediatr.Chats.Queries.GetConversation;

public class GetConversationCommandHandler : IRequestHandler<GetConversationCommand, Result>
{
    private readonly IApplicationDbContext _dbContext;

    public GetConversationCommandHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(GetConversationCommand request, CancellationToken cancellationToken)
    {
        var chats = await _dbContext.Chats
            .Where(c=>c.Id == request.ChatId)
            .Include(c=>c.Messages)
            .ToListAsync(cancellationToken);
        
        return Result.Create(chats);
    }
}
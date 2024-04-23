using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Response;
using Microsoft.EntityFrameworkCore;

namespace MessagingService.Application.Mediatr.Chats.Queries.GetChats;

public class GetChatsCommandHandler : IRequestHandler<GetChatsCommand, Result>
{
    private readonly IApplicationDbContext _dbContext;

    public GetChatsCommandHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(GetChatsCommand request, CancellationToken cancellationToken)
    {
        var chats = await _dbContext.Chats
            .Include(c=>c.ChatUsers)
            .Where(c => c.ChatUsers.Any(cu => cu.UserId == request.UserId))
            .ToListAsync(cancellationToken);
        
        return Result.Create(chats);
    }
}
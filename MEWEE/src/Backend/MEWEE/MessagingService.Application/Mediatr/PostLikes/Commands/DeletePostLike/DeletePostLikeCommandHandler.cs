using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Response;
using Microsoft.EntityFrameworkCore;

namespace MessagingService.Application.Mediatr.PostLikes.Commands.DeletePostLike;

public class DeletePostLikeCommandHandler : IRequestHandler<DeletePostLikeCommand, Result>
{
    private readonly IApplicationDbContext _dbContext;

    public DeletePostLikeCommandHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(DeletePostLikeCommand request, CancellationToken cancellationToken)
    {
        await _dbContext.PostLikes
            .Where(pl => pl.PostId == request.PostId && pl.UserId == request.UserId)
            .ExecuteDeleteAsync(cancellationToken);

        return Result.Create(new { });
    }
}
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Mediatr.Post.Commands.SavePost;
using MessagingService.Application.Response;
using MessagingService.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace MessagingService.Application.Mediatr.Post.Commands.UnsavePost;

public class UnsavePostCommandHandler : IRequestHandler<SavePostCommand, Result>
{
    private readonly IApplicationDbContext _dbContext;

    public UnsavePostCommandHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public async Task<Result> Handle(SavePostCommand request, CancellationToken cancellationToken)
    {
        await _dbContext.Saves
            .Where(s => s.UserId == request.UserId && s.PostId == request.PostId)
            .ExecuteDeleteAsync(cancellationToken);

        return Result.Create(new { });
    }
}
using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Mediatr.User.Commands.Follow;
using IdentityService.Application.Response;
using IdentityService.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.User.Commands.AcceptFollow;

public class AcceptFollowCommandHandler : IRequestHandler<AcceptFollowCommand, Result>
{
    private readonly IApplicationDbContext _dbContext;

    public AcceptFollowCommandHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(AcceptFollowCommand request, CancellationToken cancellationToken)
    {
        var follower = await _dbContext.Followers
            .Where(f => f.FollowingUserId == request.UserId && f.UserId == request.FollowerUserId)
            .AsTracking()
            .FirstAsync(cancellationToken);

        follower.IsPending = false;

        await _dbContext.SaveChangesAsync(cancellationToken);

        return Result.Create(new { });
    }
}
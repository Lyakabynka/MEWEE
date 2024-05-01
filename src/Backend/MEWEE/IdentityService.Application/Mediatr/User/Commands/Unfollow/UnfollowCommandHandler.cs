using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.User.Commands.Unfollow;

public class UnfollowCommandHandler : IRequestHandler<UnfollowCommand, Result>
{
    private readonly IApplicationDbContext _dbContext;

    public UnfollowCommandHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(UnfollowCommand request, CancellationToken cancellationToken)
    {
        await _dbContext.Followers
            .Where(f => f.UserId == request.UserId && f.FollowingUserId == request.FollowingUserId)
            .ExecuteDeleteAsync(cancellationToken);

        return Result.Create(new { });
    }
}
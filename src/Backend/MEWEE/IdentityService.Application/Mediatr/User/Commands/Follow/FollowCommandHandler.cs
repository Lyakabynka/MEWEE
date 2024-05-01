using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;
using IdentityService.Domain.Entities;
using MediatR;

namespace IdentityService.Application.Mediatr.User.Commands.Follow;

public class FollowCommandHandler : IRequestHandler<FollowCommand, Result>
{
    private readonly IApplicationDbContext _dbContext;

    public FollowCommandHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(FollowCommand request, CancellationToken cancellationToken)
    {
        _dbContext.Followers.Add(new Follower()
        {
            Id = Guid.NewGuid(),
            UserId = request.UserId,
            FollowingUserId = request.FollowingUserId
        });

        await _dbContext.SaveChangesAsync(cancellationToken);

        return Result.Create(new { });
    }
}
using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Mediatr.Results.Shared;
using IdentityService.Application.Response;
using IdentityService.Application.Mediatr.User.Queries.Followers;
using IdentityService.Application.Mediatr.User.Queries.Followings;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.User.Queries.Friends;

public class GetFriendsQueryHandler : IRequestHandler<GetFriendsQuery, Result>
{
    private readonly IApplicationDbContext _dbContext;

    public GetFriendsQueryHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(GetFriendsQuery request, CancellationToken cancellationToken)
    {
        var userId = request.UserId;

        var followers = await _dbContext.Followers
            .Where(f => f.UserId == userId)
            .Select(f => f.FollowingUserId) 
            .ToListAsync(cancellationToken);

        var followings = await _dbContext.Followers
            .Where(f => f.FollowingUserId == userId)
            .Select(f => f.UserId)
            .ToListAsync(cancellationToken);

        // Find mutual connections
        var mutualFriendsIds = followers.Intersect(followings).ToList();

        // Fetch details of mutual connections
        var mutualFriends = await _dbContext.Users
            .Where(u => mutualFriendsIds.Contains(u.Id))
            .Select(u => new UserVm
            {
                Id = u.Id,
                FirstName = u.FirstName,
                SecondName = u.SecondName,
                Username = u.Username,
                Email = u.Email,
                Role = u.Role,
                Avatar = u.Avatar,
                IsEmailConfirmed = u.IsEmailConfirmed,
                Workplace = u.Workplace,
                Website = u.Website,
                Status = u.Status,
                Location = u.Location,
                FollowersCount = u.Followers.Count,
                FollowingsCount = u.Followings.Count,
                PhotoCount = u.Photos.Count,
            })
            .ToListAsync(cancellationToken);

        return Result.Create(mutualFriends);
    }
}
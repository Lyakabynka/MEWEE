using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Mediatr.Results.Shared;
using IdentityService.Application.Mediatr.User.Queries.Followers;
using IdentityService.Application.Response;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.User.Queries.Followings;

public class GetFollowingsQueryHandler : IRequestHandler<GetFollowingsQuery, Result>
{
    private readonly IApplicationDbContext _dbContext;

    public GetFollowingsQueryHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(GetFollowingsQuery request, CancellationToken cancellationToken)
    {
       // var page = request.Pagination.Page;
       // var pageSize = request.Pagination.PageSize;
        
        var followers = await _dbContext.Followers
            .Where(f => f.UserId == request.UserId)
            //.Include(f => f.IsPending)
            .Include(f=>f.FollowingUser)
            //.Skip(page * pageSize)
            //.Take(pageSize)
            .Select(f => new
            {
                Id = f.FollowingUser.Id,
                FirstName = f.FollowingUser.FirstName,
                SecondName = f.FollowingUser.SecondName,
                Username = f.FollowingUser.Username,
                Email = f.FollowingUser.Email,
                Role = f.FollowingUser.Role,
                ProfileAvatar = f.FollowingUser.Avatar,
                IsEmailConfirmed = f.FollowingUser.IsEmailConfirmed,
                Workplace = f.FollowingUser.Workplace,
                Website = f.FollowingUser.Website,
                Status = f.FollowingUser.Status,
                IsPending = f.IsPending,
                Location = f.FollowingUser.Location,
                FollowersCount = f.FollowingUser.Followers.Count,
                FollowingsCount = f.FollowingUser.Followings.Count,
                PhotoCount = f.FollowingUser.Photos.Count,
            })
            .ToListAsync(cancellationToken);

        return Result.Create(followers);
    }
}
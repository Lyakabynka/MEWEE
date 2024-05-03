﻿using IdentityService.Application.Features.Interfaces;
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
        var page = request.Pagination.Page;
        var pageSize = request.Pagination.PageSize;
        
        var followers = await _dbContext.Followers
            .Where(f => f.UserId == request.UserId)
            .Include(f=>f.User)
            .Skip(page * pageSize)
            .Take(pageSize)
            .Select(f => new UserVm
            {
                Id = f.User.Id,
                FirstName = f.User.FirstName,
                SecondName = f.User.SecondName,
                Username = f.User.Username,
                Email = f.User.Email,
                Role = f.User.Role,
                ProfileAvatar = f.User.ProfileAvatar,
                IsEmailConfirmed = f.User.IsEmailConfirmed,
                Workplace = f.User.Workplace,
                Website = f.User.Website,
                Status = f.User.Status,
                Location = f.User.Location,
                FollowersCount = f.User.Followers.Count,
                FollowingsCount = f.User.Followings.Count,
                PhotoCount = f.User.Photos.Count,
            })
            .ToListAsync(cancellationToken);

        return Result.Create(followers);
    }
}
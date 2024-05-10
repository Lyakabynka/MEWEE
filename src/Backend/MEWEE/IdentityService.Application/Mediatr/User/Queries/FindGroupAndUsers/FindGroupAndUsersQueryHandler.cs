
using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Mediatr.Results.Shared;
using IdentityService.Application.Response;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.User.Queries.FindGroupAndUsers;

public class FindGroupAndUsersQueryHandler : IRequestHandler<FindGroupAndUsersQuery, Result>
{
    private readonly IApplicationDbContext _dbContext;

    public FindGroupAndUsersQueryHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(FindGroupAndUsersQuery request, CancellationToken cancellationToken)
    {
        var searchQuery = request.SearchQuery.Trim().ToLower();
        // var page = request.Pagination.Page;
        // var pageSize = request.Pagination.PageSize;

        var users = await _dbContext.Users
            .Where(u => EF.Functions.Like(u.Username.ToLower(), $"%{searchQuery}%"))
            .Select(u => new UserVm()
            {
                Id = u.Id,
                FirstName = u.FirstName,
                SecondName = u.SecondName,
                Username = u.Username,
                Avatar = u.Avatar,
            })
            .ToListAsync(cancellationToken);

        var groups = await _dbContext.Groups
            .Where(g => EF.Functions.Like(g.Title.ToLower(), $"%{searchQuery}%"))
            .Select(g => new
            {
                g.Id,
                g.Nickname,
                g.Title,
                g.Category,
                g.Avatar
            })
            .ToListAsync(cancellationToken);

        return Result.Create(new
        {
            Users = users,
            Groups = groups,
        });
    }
}
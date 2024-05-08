using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;
using IdentityService.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.Group.Queries.GetGroups;

public class GetGroupsQueryHandler : IRequestHandler<GetGroupsQuery, Result>
{
    private readonly IApplicationDbContext _dbContext;

    public GetGroupsQueryHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(GetGroupsQuery request, CancellationToken cancellationToken)
    {
        var all = request.Category == "all";

        // Queryable for GroupUser entities
        IQueryable<GroupUser> groupQuery = _dbContext.GroupUsers.Include(gu => gu.Group);

        // If all groups are requested, include all groups in the result
        if (all)
        {
            var groups = await _dbContext.Groups
                .Include(g => g.Users)
                .Select(g => new { Group = g, Members = g.Users })
                .ToListAsync(cancellationToken);

            return Result.Create(groups);
        }

        // Filter groups by user if not all groups are requested
        var fgroups = await _dbContext.GroupUsers
            .Where(gu => gu.UserId == request.UserId)
            .Include(gu=>gu.Group)
            .Select(gu => new { Group = gu.Group, Members = gu.Group.Users})
            .ToListAsync(cancellationToken);

        return Result.Create(fgroups);
    }
}
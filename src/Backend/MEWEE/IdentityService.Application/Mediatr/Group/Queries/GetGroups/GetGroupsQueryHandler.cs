using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;
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
        var groups = await _dbContext.GroupUsers
            .Where(gu => gu.UserId == request.UserId)
            .Include(gu=>gu.Group)
            .Select(gu => gu.Group)
            .ToListAsync(cancellationToken);

        return Result.Create(groups);
    }
}
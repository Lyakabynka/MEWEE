using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Mediatr.Results.Shared;
using IdentityService.Application.Response;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.Group.Queries.GetGroup;

public class GetGroupQueryHandler : IRequestHandler<GetGroupQuery,Result>
{
    private readonly IApplicationDbContext _dbContext;

    public GetGroupQueryHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(GetGroupQuery request, CancellationToken cancellationToken)
    {
        bool isGuid = Guid.TryParse(request.GroupCredentials, out Guid groupGuid);
    
        var query = _dbContext.Groups.AsQueryable();

        if (isGuid)
        {
            query = query.Where(group => group.Id == groupGuid);
        }
        else
        {
            query = query.Where(group => group.Nickname == request.GroupCredentials);
        }

        var group = await query.FirstOrDefaultAsync(cancellationToken);

        if (group == null)
        {
            return Result.FormNotFound("Group not found");
        }

        var memberIds = await _dbContext.GroupUsers
            .Where(gm => gm.GroupId == group.Id)
            .Select(gm => gm.UserId)
            .ToListAsync(cancellationToken);

        var users = await _dbContext.Users
            .Where(u => memberIds.Contains(u.Id))
            .Select(u => new UserVm
            {
                Id = u.Id,
                FirstName = u.FirstName,
                SecondName = u.SecondName,
                Username = u.Username,
                Avatar = u.Avatar,
            })
            .ToListAsync(cancellationToken);

        return Result.Create(new { Group = group, Members = users });
    }
}
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

        var group = await query
            .Select(group=>group)
            .FirstOrDefaultAsync(cancellationToken);

        return Result.Create(group);
    }
}
using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;
using IdentityService.Domain.Entities;
using IdentityService.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.Group.Commands.UnJoinGroup;

public class UnJoinGroupCommandHandler : IRequestHandler<UnJoinGroupCommand, Result>
{
    private readonly IApplicationDbContext _dbContext;

    public UnJoinGroupCommandHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(UnJoinGroupCommand request, CancellationToken cancellationToken)
    {
        
        await _dbContext.GroupUsers.Where(g => g.UserId == request.UserId && g.GroupId == request.GroupId).ExecuteDeleteAsync(cancellationToken);
        
        return Result.Create(new {Joined = false});
    }
}
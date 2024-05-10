using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;
using IdentityService.Domain.Entities;
using IdentityService.Domain.Enums;
using MediatR;

namespace IdentityService.Application.Mediatr.Group.Commands.JoinGroup;

public class JoinGroupCommandHandler : IRequestHandler<JoinGroupCommand, Result>
{
    private readonly IApplicationDbContext _dbContext;

    public JoinGroupCommandHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(JoinGroupCommand request, CancellationToken cancellationToken)
    {
        
        _dbContext.GroupUsers.Add(new GroupUser()
        {
            UserId = request.UserId,
            GroupId = request.GroupId,
            Role = GroupUserRole.User,

        });
        await _dbContext.SaveChangesAsync(cancellationToken);
        
        return Result.Create(new { Joined = true});
    }
}
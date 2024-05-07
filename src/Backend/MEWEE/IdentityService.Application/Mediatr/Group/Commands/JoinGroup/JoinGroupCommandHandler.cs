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
        await _dbContext.GroupUsers.AddAsync(new GroupUser()
        {
            UserId = request.UserId,
            GroupId = request.GroupId,
            Role = GroupUserRole.User,

        });
        
        return Result.Create(new {});
    }
}
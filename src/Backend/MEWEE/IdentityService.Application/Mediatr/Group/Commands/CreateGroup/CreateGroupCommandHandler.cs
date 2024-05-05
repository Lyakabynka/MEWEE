using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;
using IdentityService.Domain.Entities;
using MediatR;

namespace IdentityService.Application.Mediatr.Group.Commands.CreateGroup;

public class CreateGroupCommandHandler : IRequestHandler<CreateGroupCommand, Result>
{
    private readonly IApplicationDbContext _dbContext;

    public CreateGroupCommandHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(CreateGroupCommand request, CancellationToken cancellationToken)
    {
        var group = new Domain.Entities.Group()
        {
            Title = request.Title,
            Avatar = request.Avatar,
        };

        _dbContext.Groups.Add(group);

        var groupUser = new GroupUser()
        {
            UserId = request.UserId,
            Group = group
        };

        _dbContext.GroupUsers.Add(groupUser);

        await _dbContext.SaveChangesAsync(cancellationToken);
        
        return Result.Create(new {});
    }
}
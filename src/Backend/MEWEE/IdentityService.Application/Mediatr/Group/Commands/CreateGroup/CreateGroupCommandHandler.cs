using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;
using IdentityService.Domain.Entities;
using IdentityService.Domain.Enums;
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
        string suffix = GenerateRandomSuffix();
        var group = new Domain.Entities.Group()
        {
            Nickname = $"group{suffix}",
            Title = request.Title,
            Avatar = request.Avatar == "" ? @"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":request.Avatar,
            Category = request.Category
        };

        _dbContext.Groups.Add(group);

        var groupUser = new GroupUser()
        {
            UserId = request.UserId,
            Group = group,
            Role = GroupUserRole.Owner
        };

        _dbContext.GroupUsers.Add(groupUser);

        await _dbContext.SaveChangesAsync(cancellationToken);
        
        return Result.Create(group);
    }
    private string GenerateRandomSuffix()
    {
        const int suffixLength = 5;
        Random random = new Random();
        string characters = "0123456789"; 
        char[] suffix = new char[suffixLength];

        for (int i = 0; i < suffixLength; i++)
        {
            suffix[i] = characters[random.Next(characters.Length)];
        }

        return new string(suffix);
    }
}
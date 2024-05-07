using FluentValidation;
using IdentityService.Application.Features.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace IdentityService.Application.Mediatr.Group.Queries.GetGroup;

public class GetGroupQueryValidator : AbstractValidator<GetGroupQuery>
{
    private readonly IApplicationDbContext _dbContext;

    public GetGroupQueryValidator(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
        
        
        RuleFor(query => query.GroupCredentials)
            .NotEmpty().WithMessage("group_not_exists")
            .MustAsync(async (userId, cancellationToken) =>
            {
                var isGuid = Guid.TryParse(userId, out Guid userGuid);

                return isGuid
                    ? await _dbContext.Groups.AnyAsync(user => user.Id == userGuid, cancellationToken)
                    : await _dbContext.Groups.AnyAsync(user => user.Nickname == userId, cancellationToken);
            })
            .WithMessage("group_not_exists");
    }
}
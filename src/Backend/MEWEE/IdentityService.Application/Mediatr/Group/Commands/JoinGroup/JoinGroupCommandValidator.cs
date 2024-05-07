using FluentValidation;
using IdentityService.Application.Features.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.Group.Commands.JoinGroup;

public class JoinGroupCommandValidator : AbstractValidator<JoinGroupCommand>
{
    public JoinGroupCommandValidator(IApplicationDbContext dbContext)
    {
        RuleFor(c => c.UserId)
            .NotEqual(Guid.Empty);

        // RuleFor(c => c.UserId)
        //     .MustAsync(async (t,ct) =>
        //     {
        //         return await dbContext.Users
        //             .Where(g => g.Id == t)
        //             .AnyAsync(ct);
        //     })
        //     .WithMessage("group_already_exists");
    }
}
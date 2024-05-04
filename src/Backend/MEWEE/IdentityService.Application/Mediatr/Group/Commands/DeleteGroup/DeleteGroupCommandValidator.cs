using FluentValidation;
using IdentityService.Application.Features.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.Group.Commands.DeleteGroup;

public class DeleteGroupCommandValidator : AbstractValidator<DeleteGroupCommand>
{
    public DeleteGroupCommandValidator(IApplicationDbContext dbContext)
    {
        RuleFor(c => c.UserId)
            .NotEqual(Guid.Empty);

        RuleFor(c => c.GroupId)
            .NotEqual(Guid.Empty)
            .DependentRules(() =>
            {
                RuleFor(c => c.GroupId)
                    .MustAsync(async (groupId,ct) =>
                    {
                        return await dbContext.Groups
                            .Where(g => g.Id == groupId)
                            .AnyAsync(ct);
                    })
                    .WithMessage("group_does_not_exist");
            });
    }
}
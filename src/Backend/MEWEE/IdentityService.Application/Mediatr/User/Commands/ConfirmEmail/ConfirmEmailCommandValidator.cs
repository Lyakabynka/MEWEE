using FluentValidation;
using IdentityService.Application.Features.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.User.Commands.ConfirmEmail;

public class ConfirmEmailCommandValidator : AbstractValidator<ConfirmEmailCommand>
{
    public ConfirmEmailCommandValidator(IApplicationDbContext dbContext)
    {
        RuleFor(x => x.UserId)
            .NotEqual(Guid.Empty)
            .WithMessage("invalid_user_id")
            .MustAsync(async (userId, cancellationToken) =>
                await dbContext.Users.Where(user => user.Id == userId).AnyAsync(cancellationToken))
            .WithMessage("error_user_does_not_exist");

        RuleFor(x => x.ConfirmationCode)
            .NotEmpty()
            .Length(8);
    }
}
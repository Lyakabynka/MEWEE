using FluentValidation;
using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Mediatr.User.Commands.ConfirmEmail;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.User.Commands.ChangePassword;

public class ChangePasswordCommandValidator : AbstractValidator<ChangePasswordCommand>
{
    public ChangePasswordCommandValidator(IApplicationDbContext dbContext)
    {
        RuleFor(x => x.UserId)
            .NotEqual(Guid.Empty)
            .WithMessage("invalid_user_id")
            .MustAsync(async (userId, cancellationToken) =>
                await dbContext.Users.Where(user => user.Id == userId).AnyAsync(cancellationToken))
            .WithMessage("error_user_does_not_exist");

        RuleFor(x => x.OldPassword)
            .Length(8, 40);
        
        RuleFor(x => x.NewPassword)
            .Length(8, 40);
    }
}
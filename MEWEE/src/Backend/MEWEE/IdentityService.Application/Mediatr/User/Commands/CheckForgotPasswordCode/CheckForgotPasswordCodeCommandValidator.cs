using System.Net.Mail;
using FluentValidation;
using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Mediatr.User.Commands.RestorePassword;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.User.Commands.CheckForgotPasswordCode;

public class CheckForgotPasswordCodeCommandValidator : AbstractValidator<CheckForgotPasswordCodeCommand>
{
    public CheckForgotPasswordCodeCommandValidator(IApplicationDbContext dbContext)
    {
        RuleFor(c => c.Email)
            .Length(8, 80)
            .Must((email) =>
            {
                try
                {
                    var mailAddress = new MailAddress(email);
                    return true;
                }
                catch
                {
                    return false;
                }
            })
            .WithMessage("error_invalid_email")
            .MustAsync(async (email, cancellationToken) =>
                await dbContext.Users.Where(u => u.Email == email).AnyAsync(cancellationToken))
            .WithMessage("user_not_found");

        RuleFor(c => c.Code)
            .NotEmpty()
            .Length(8);
    }
}
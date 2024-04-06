using System.Net.Mail;
using FluentValidation;
using IdentityService.Application.Features.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.User.Commands.ForgotPassword;

public class ForgotPasswordCommandValidator : AbstractValidator<ForgotPasswordCommand>
{
    public ForgotPasswordCommandValidator(IApplicationDbContext dbContext)
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
    }
}
using System.Net.Mail;
using FluentValidation;
using IdentityService.Application.Features.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.User.Commands.ConfirmEmail;

public class ConfirmEmailCommandValidator : AbstractValidator<ConfirmEmailCommand>
{
    public ConfirmEmailCommandValidator(IApplicationDbContext dbContext)
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
            .WithMessage("error_invalid_email");

        RuleFor(x => x.ConfirmationCode)
            .NotEmpty()
            .Length(8);
    }
}
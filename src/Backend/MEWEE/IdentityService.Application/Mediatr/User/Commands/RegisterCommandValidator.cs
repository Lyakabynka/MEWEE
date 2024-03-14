using System.Net.Mail;
using FluentValidation;
using IdentityService.Application.Features.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.User.Commands;

public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
{
    public RegisterCommandValidator(IApplicationDbContext dbContext)
    {
        RuleFor(c => c.Username)
            .Length(4, 20);

        RuleFor(c => c.Password)
            .Length(8, 40);

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

        RuleFor(c => c.Username)
            .MustAsync(async (username, cancellationToken) =>
            {
                return !await dbContext.Users
                    .Where(user => user.Username == username)
                    .AnyAsync(cancellationToken);
            })
            .WithMessage("error_username_exists");
        
        RuleFor(c => c.Email)
            .MustAsync(async (email, cancellationToken) =>
            {
                return !await dbContext.Users
                    .Where(user => user.Email == email)
                    .AnyAsync(cancellationToken);
            })
            .WithMessage("error_email_exists");
    }
}
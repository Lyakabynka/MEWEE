using BCrypt.Net;
using FluentValidation;
using IdentityService.Application.Features.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.Auth.Commands.Login;

public class LoginCommandValidator : AbstractValidator<LoginCommand>
{
    public LoginCommandValidator(IApplicationDbContext dbContext)
    {
        RuleFor(c => c.Email)
            .Length(4, 99)
            .DependentRules(() =>
            {
                RuleFor(c => c.Password)
                    .Length(8, 40)
                    .DependentRules(() =>
                    {
                        RuleFor(c => c)
                            .MustAsync(async (c, cancellationToken) =>
                            {
                                var userCredentials = await dbContext.Users
                                    .Where(user => user.Email == c.Email)
                                    .Select(user => new
                                    {
                                        user.Email,
                                        user.PasswordHash
                                    })
                                    .FirstOrDefaultAsync(cancellationToken);
                                return userCredentials is not null &&
                                       BCrypt.Net.BCrypt.EnhancedVerify(c.Password, userCredentials.PasswordHash, HashType.SHA512);
                            })
                            .WithMessage("error_invalid_login_or_password")
                            .WithName("Authorization");
                    });
            });
    }
}

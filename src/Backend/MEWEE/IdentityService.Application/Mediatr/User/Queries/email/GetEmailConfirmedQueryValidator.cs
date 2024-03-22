using FluentValidation;
using IdentityService.Application.Features.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.User.Queries;

public class GetEmailConfirmedQueryValidator : AbstractValidator<GetEmailConfirmedQuery>
{
    public GetEmailConfirmedQueryValidator(IApplicationDbContext dbContext)
    {
        RuleFor(query => query.Email)
            .NotEqual(string.Empty)
            .MustAsync(async (email, cancellationToken) => 
                await dbContext.Users.Where(user=>user.Email == email).AnyAsync(cancellationToken))
            .WithMessage("error_email_not_exists");
    }
}
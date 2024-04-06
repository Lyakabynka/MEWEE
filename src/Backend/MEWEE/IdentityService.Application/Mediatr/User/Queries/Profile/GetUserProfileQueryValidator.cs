using FluentValidation;
using IdentityService.Application.Features.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.User.Queries.Profile;

public class GetUserProfileQueryValidator : AbstractValidator<GetUserProfileQuery>
{
    public GetUserProfileQueryValidator(IApplicationDbContext dbContext)
    {
        RuleFor(query => query.UserId)
            .NotEqual(Guid.Empty)
            .WithMessage("invalid_user_id")
            .MustAsync(async (userId, cancellationToken) =>
                await dbContext.Users.Where(user => user.Id == userId).AnyAsync(cancellationToken))
            .WithMessage("error_user_does_not_exist");
    }
}
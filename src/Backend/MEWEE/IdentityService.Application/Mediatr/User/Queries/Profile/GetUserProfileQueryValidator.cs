using FluentValidation;
using IdentityService.Application.Features.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace IdentityService.Application.Mediatr.User.Queries.Profile
{
    public class GetUserProfileQueryValidator : AbstractValidator<GetUserProfileQuery>
    {
        private readonly IApplicationDbContext _dbContext;

        public GetUserProfileQueryValidator(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;

            RuleFor(query => query.UserId)
                .NotEmpty().WithMessage("user_not_exists")
                .MustAsync(async (userId, cancellationToken) =>
                {
                    var isGuid = Guid.TryParse(userId, out Guid userGuid);
                
                    return isGuid
                        ? await _dbContext.Users.AnyAsync(user => user.Id == userGuid, cancellationToken)
                        : await _dbContext.Users.AnyAsync(user => user.Username == userId, cancellationToken);
                })
                .WithMessage("user_not_exists");
        }
    }
}
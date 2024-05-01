using System.Data;
using FluentValidation;
using IdentityService.Application.Mediatr.Results.Shared.Pagination;

namespace IdentityService.Application.Mediatr.User.Queries.Followers;

public class GetFollowersQueryValidator : AbstractValidator<GetFollowersQuery>
{
    public GetFollowersQueryValidator()
    {
        RuleFor(q => q.UserId)
            .NotEqual(Guid.Empty);
        
        RuleFor(x => x.Pagination)
            .NotNull()
            .SetValidator(new PaginationValidator());
    }
}
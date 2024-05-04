using FluentValidation;
using IdentityService.Application.Mediatr.Results.Shared.Pagination;
using IdentityService.Application.Mediatr.User.Queries.Followers;

namespace IdentityService.Application.Mediatr.User.Queries.Followings;

public class GetFollowingsQueryValidator : AbstractValidator<GetFollowingsQuery>
{
    public GetFollowingsQueryValidator()
    {
        RuleFor(q => q.UserId)
            .NotEqual(Guid.Empty);
        
        // RuleFor(x => x.Pagination)
        //     .NotNull()
        //     .SetValidator(new PaginationValidator());
    }
}
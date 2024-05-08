using FluentValidation;
using IdentityService.Application.Mediatr.Results.Shared.Pagination;

namespace IdentityService.Application.Mediatr.User.Queries.FindGroupAndUsers;

public class FindGroupAndUsersQueryValidator : AbstractValidator<FindGroupAndUsersQuery>
{
    public FindGroupAndUsersQueryValidator()
    {
        RuleFor(x => x.SearchQuery)
            .NotEmpty();

        RuleFor(x => x.Pagination)
            .NotNull()
            .SetValidator(new PaginationValidator());
    }
}
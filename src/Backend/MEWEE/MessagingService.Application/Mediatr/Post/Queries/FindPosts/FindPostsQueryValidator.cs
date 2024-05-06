using FluentValidation;
using MessagingService.Application.Mediatr.Shared.Pagination;

namespace MessagingService.Application.Mediatr.Post.Queries.FindPosts;

public class FindPostsQueryValidator : AbstractValidator<FindPostsQuery>
{
    public FindPostsQueryValidator()
    {
        RuleFor(x => x.SearchQuery)
            .NotNull();

        RuleFor(x => x.Pagination)
            .NotNull()
            .SetValidator(new PaginationValidator());
    }
}
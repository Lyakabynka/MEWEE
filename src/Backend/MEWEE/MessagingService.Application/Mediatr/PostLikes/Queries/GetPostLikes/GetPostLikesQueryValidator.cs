using System;
using FluentValidation;
using MessagingService.Application.Mediatr.Shared.Pagination;

namespace MessagingService.Application.Mediatr.PostLikes.Queries.GetPostLikes;

public class CreatePostLikesCommandValidator : AbstractValidator<GetPostLikesQuery>
{
    public CreatePostLikesCommandValidator()
    {
        RuleFor(c => c.PostId)
            .NotEqual(Guid.Empty);

        RuleFor(x => x.Pagination)
            .NotNull()
            .SetValidator(new PaginationValidator());
    }
}
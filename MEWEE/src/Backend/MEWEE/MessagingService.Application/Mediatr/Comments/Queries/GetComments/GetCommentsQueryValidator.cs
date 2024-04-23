using System;
using FluentValidation;
using MessagingService.Application.Mediatr.Shared.Pagination;

namespace MessagingService.Application.Mediatr.Comments.Queries.GetComments;

public class CreateCommentCommandValidator : AbstractValidator<GetCommentsQuery>
{
    public CreateCommentCommandValidator()
    {
        RuleFor(c => c.PostId)
            .NotEqual(Guid.Empty);

        RuleFor(x => x.Pagination)
            .NotNull()
            .SetValidator(new PaginationValidator());
    }
}
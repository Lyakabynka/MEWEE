using System;
using FluentValidation;
using MessagingService.Application.Mediatr.Shared.Pagination;

namespace MessagingService.Application.Mediatr.PostLikes.Queries.GetPostSave;

public class GetPostSaveCommandValidator : AbstractValidator<GetPostSaveQuery>
{
    public GetPostSaveCommandValidator()
    {
        RuleFor(c => c.PostId)
            .NotEqual(Guid.Empty);
    }
}
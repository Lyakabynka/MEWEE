using System;
using FluentValidation;

namespace MessagingService.Application.Mediatr.Post.Queries.GetPost;

public class GetPostQueryValidator : AbstractValidator<GetPostQuery>
{
    public GetPostQueryValidator()
    {
        RuleFor(c => c.PostId)
            .NotEqual(Guid.Empty);
    }
}
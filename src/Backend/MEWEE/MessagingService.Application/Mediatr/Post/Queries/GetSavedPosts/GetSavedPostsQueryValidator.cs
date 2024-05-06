using System;
using FluentValidation;
using MessagingService.Application.Mediatr.Post.Queries.GetPosts;

namespace MessagingService.Application.Mediatr.Post.Queries.GetSavedPosts;

public class GetSavedPostsQueryValidator : AbstractValidator<GetSavedPostsQuery>
{
    public GetSavedPostsQueryValidator()
    {
        RuleFor(c => c.UserId)
            .NotEqual(Guid.Empty);
    }
}
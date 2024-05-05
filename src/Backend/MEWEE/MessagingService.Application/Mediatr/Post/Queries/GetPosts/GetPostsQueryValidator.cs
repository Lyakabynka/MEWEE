using System;
using FluentValidation;

namespace MessagingService.Application.Mediatr.Post.Queries.GetPosts;

public class GetPostsQueryValidator : AbstractValidator<GetPostsQuery>
{
    public GetPostsQueryValidator()
    {
        RuleFor(c => c.AuthorId)
            .NotEqual(Guid.Empty);
    }
}
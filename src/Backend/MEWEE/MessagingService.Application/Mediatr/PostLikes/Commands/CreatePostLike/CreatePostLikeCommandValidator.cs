using System;
using System.Linq;
using FluentValidation;
using MessagingService.Application.Features.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MessagingService.Application.Mediatr.PostLikes.Commands.CreatePostLike;

public class CreatePostLikeCommandValidator : AbstractValidator<CreatePostLikeCommand>
{
    public CreatePostLikeCommandValidator(IApplicationDbContext dbContext)
    {
        RuleFor(c => c.UserId)
            .NotEqual(Guid.Empty);

        RuleFor(c => c.PostId)
            .NotEqual(Guid.Empty);
        
        
        RuleFor(c => c.PostId)
            .NotEqual(Guid.Empty)
            .MustAsync(async (id, cancellationToken) =>
            {
                var post = await dbContext.Posts.Where(p => p.Id == id).FirstOrDefaultAsync(cancellationToken);

                return post is not null;
            })
            .WithMessage("post_does_not_exist");
    }
}
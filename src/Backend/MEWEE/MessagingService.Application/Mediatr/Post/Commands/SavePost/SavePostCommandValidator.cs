using System;
using System.Linq;
using FluentValidation;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Mediatr.Post.Commands.CreatePost;
using MessagingService.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace MessagingService.Application.Mediatr.Post.Commands.SavePost;

public class SavePostCommandValidator : AbstractValidator<SavePostCommand>
{
    public SavePostCommandValidator(IApplicationDbContext dbContext)
    {
        RuleFor(c => c.UserId)
            .NotEqual(Guid.Empty);

        RuleFor(c => c.PostId)
            .NotEqual(Guid.Empty)
            .DependentRules(() =>
            {
                RuleFor(c => c.PostId)
                    .MustAsync(async (postId, ct) =>
                    {
                        return !await dbContext.Posts.Where(c => c.Id == postId).AnyAsync(ct);
                    });
            });
    }
}
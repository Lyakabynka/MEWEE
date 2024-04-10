using System;
using System.Linq;
using FluentValidation;
using MessagingService.Application.Features.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MessagingService.Application.Mediatr.Post.Commands.DeletePost;

public class DeletePostCommandValidator : AbstractValidator<DeletePostCommand>
{
    public DeletePostCommandValidator(IApplicationDbContext dbContext)
    {
        RuleFor(c => c.Id)
            .NotEqual(Guid.Empty)
            .MustAsync(async (id, cancellationToken) =>
            {
                var post = await dbContext.Posts.Where(p => p.Id == id).FirstOrDefaultAsync(cancellationToken);

                return post is not null;
            })
            .WithMessage("post_does_not_exist");

        RuleFor(c => c.Id)
            .NotEqual(Guid.Empty);
    } 
}
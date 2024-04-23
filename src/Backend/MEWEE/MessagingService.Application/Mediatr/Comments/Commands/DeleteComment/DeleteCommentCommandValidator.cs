using System;
using System.Linq;
using FluentValidation;
using MessagingService.Application.Features.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MessagingService.Application.Mediatr.Comments.Commands.DeleteComment;

public class DeleteCommentCommandValidator : AbstractValidator<DeleteCommentCommand>
{
    public DeleteCommentCommandValidator(IApplicationDbContext dbContext)
    {
        RuleFor(c => c.CommentId)
            .NotEqual(Guid.Empty)
            .MustAsync(async (id, cancellationToken) =>
            {
                var post = await dbContext.Comments.Where(p => p.Id == id).FirstOrDefaultAsync(cancellationToken);

                return post is not null;
            })
            .WithMessage("comment_does_not_exist");

        RuleFor(c => c.UserId)
            .NotEqual(Guid.Empty);
    }
}
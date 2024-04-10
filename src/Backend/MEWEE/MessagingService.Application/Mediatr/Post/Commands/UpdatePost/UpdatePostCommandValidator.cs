using System;
using System.Linq;
using FluentValidation;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Mediatr.Post.Commands.CreatePost;
using Microsoft.EntityFrameworkCore;

namespace MessagingService.Application.Mediatr.Post.Commands.UpdatePost;

public class UpdatePostCommandValidator : AbstractValidator<UpdatePostCommand>
{
    public UpdatePostCommandValidator(IApplicationDbContext dbContext)
    {
        RuleFor(c => c.Id)
            .NotEqual(Guid.Empty)
            .MustAsync(async (id, cancellationToken) =>
            {
                var post = await dbContext.Posts.Where(p => p.Id == id).FirstOrDefaultAsync(cancellationToken);

                return post is not null;
            })
            .WithMessage("post_does_not_exist");

        RuleFor(c => c.Title)
            .Length(4, 128);

        RuleFor(c => c.Content)
            .NotEmpty()
            .MaximumLength(4096);

        RuleFor(c => c.UserId)
            .NotEqual(Guid.Empty);

        RuleFor(c => c.Attachment)
            .Must(a =>
            {
                if (a is null) return true;

                var buf = new Span<byte>(new byte[a.Length]);
                return Convert.TryFromBase64String(a, buf, out int bytesParsed);
            })
            .WithMessage("invalid_attachment");
    }
}
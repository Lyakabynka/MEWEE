using System;
using FluentValidation;

namespace MessagingService.Application.Mediatr.Comments.Commands.CreateComment;

public class CreateCommentCommandValidator : AbstractValidator<CreateCommentCommand>
{
    public CreateCommentCommandValidator()
    {
        RuleFor(c => c.PostId)
            .NotEqual(Guid.Empty);

        RuleFor(c => c.Content)
            .NotEmpty();

        RuleFor(c => c.UserId)
            .NotEqual(Guid.Empty);
    }
}
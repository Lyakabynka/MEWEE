using FluentValidation;

namespace MessagingService.Application.Mediatr.Post.Commands.CreatePost;

public class CreatePostCommandValidator : AbstractValidator<CreatePostCommand>
{
    public CreatePostCommandValidator()
    {
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
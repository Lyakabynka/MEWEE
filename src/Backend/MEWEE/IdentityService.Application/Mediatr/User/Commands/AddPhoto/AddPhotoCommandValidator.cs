using FluentValidation;
using IdentityService.Application.Mediatr.User.Commands.Follow;

namespace IdentityService.Application.Mediatr.User.Commands.AddPhoto;

public class AddPhotoCommandValidator : AbstractValidator<AddPhotoCommand>
{
    public AddPhotoCommandValidator()
    {
        RuleFor(c => c.UserId)
            .NotEqual(Guid.Empty);
        
        RuleFor(c => c.Photo)
            .Must(a =>
            {
                if (a is null) return true;

                var buf = new Span<byte>(new byte[a.Length]);
                return Convert.TryFromBase64String(a, buf, out int bytesParsed);
            })
            .WithMessage("invalid_photo");
    }
}
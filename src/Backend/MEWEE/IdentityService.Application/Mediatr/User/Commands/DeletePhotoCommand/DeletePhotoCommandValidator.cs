using FluentValidation;
using IdentityService.Application.Mediatr.User.Commands.AddPhoto;

namespace IdentityService.Application.Mediatr.User.Commands.DeletePhotoCommand;

public class DeletePhotoCommandValidator : AbstractValidator<DeletePhotoCommand>
{
    public DeletePhotoCommandValidator()
    {
        RuleFor(c => c.UserId)
            .NotEqual(Guid.Empty);
        
        RuleFor(c => c.PhotoId)
            .NotEqual(Guid.Empty);
    }
}
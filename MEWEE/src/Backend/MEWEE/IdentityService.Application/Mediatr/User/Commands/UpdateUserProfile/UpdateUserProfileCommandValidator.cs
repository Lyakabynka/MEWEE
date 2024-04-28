using System.Net.Mail;
using FluentValidation;
using IdentityService.Application.Features.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.User.Commands.UpdateUserProfile;

public class UpdateUserProfileValidator : AbstractValidator<UpdateUserProfileCommand>
{
    public UpdateUserProfileValidator(IApplicationDbContext dbContext)
    {
        RuleFor(c => c.UserId)
            .NotEqual(Guid.Empty)
            .MustAsync(async (id, cancellationToken) =>
            {
                var user = await dbContext.Users.Where(p => p.Id == id).FirstOrDefaultAsync(cancellationToken);

                return user is not null;
            })
            .WithMessage("user_not_found");

        RuleFor(c => c.ProfileAvatar)
            .Must(a =>
            {
                if (a is null) return true;

                var buf = new Span<byte>(new byte[a.Length]);
                return Convert.TryFromBase64String(a, buf, out int bytesParsed);
            })
            .WithMessage("invalid_attachment");
    }
}
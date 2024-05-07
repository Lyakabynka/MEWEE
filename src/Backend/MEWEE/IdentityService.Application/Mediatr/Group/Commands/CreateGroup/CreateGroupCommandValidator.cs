using FluentValidation;
using IdentityService.Application.Features.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.Group.Commands.CreateGroup;

public class CreateGroupCommandValidator : AbstractValidator<CreateGroupCommand>
{
    public CreateGroupCommandValidator(IApplicationDbContext dbContext)
    {
        RuleFor(c => c.UserId)
            .NotEqual(Guid.Empty);
        
        RuleFor(c => c.Category)
            .NotEqual(string.Empty);

        // RuleFor(c => c.Avatar)
        //     .Must(a =>
        //     {
        //         if (a is null) return true;
        //
        //         var buf = new Span<byte>(new byte[a.Length]);
        //         return Convert.TryFromBase64String(a, buf, out int bytesParsed);
        //     })
        //     .WithMessage("invalid_avatar");

        // RuleFor(c => c.Title)
        //     .MustAsync(async (t,ct) =>
        //     {
        //         return !await dbContext.Groups
        //             .Where(g => g.Title.Equals(t, StringComparison.OrdinalIgnoreCase))
        //             .AnyAsync(ct);
        //     })
        //     .WithMessage("group_already_exists");
    }
}
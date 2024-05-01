using FluentValidation;
using IdentityService.Application.Mediatr.User.Commands.Follow;

namespace IdentityService.Application.Mediatr.User.Commands.AcceptFollow;

public class AcceptFollowCommandValidator : AbstractValidator<FollowCommand>
{
    public AcceptFollowCommandValidator()
    {
        RuleFor(c => c.UserId)
            .NotEqual(Guid.Empty);

        RuleFor(c => c.FollowingUserId)
            .NotEqual(Guid.Empty);
    }
}
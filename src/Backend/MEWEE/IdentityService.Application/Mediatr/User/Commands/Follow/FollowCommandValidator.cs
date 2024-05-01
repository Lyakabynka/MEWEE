using FluentValidation;

namespace IdentityService.Application.Mediatr.User.Commands.Follow;

public class FollowCommandValidator : AbstractValidator<FollowCommand>
{
    public FollowCommandValidator()
    {
        RuleFor(c => c.UserId)
            .NotEqual(Guid.Empty);

        RuleFor(c => c.FollowingUserId)
            .NotEqual(Guid.Empty);
    }
}
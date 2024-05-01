using FluentValidation;

namespace IdentityService.Application.Mediatr.User.Commands.Unfollow;

public class UnfollowCommandValidator : AbstractValidator<UnfollowCommand>
{
    public UnfollowCommandValidator()
    {
        RuleFor(c => c.UserId)
            .NotEqual(Guid.Empty);

        RuleFor(c => c.FollowingUserId)
            .NotEqual(Guid.Empty);
    }
}
using FluentValidation;

namespace IdentityService.Application.Mediatr.Group.Queries.GetGroups;

public class GetGroupsQueryValidator : AbstractValidator<GetGroupsQuery>
{
    public GetGroupsQueryValidator()
    {
        RuleFor(c => c.UserId)
            .NotEqual(Guid.Empty);
    }
}
using FluentValidation;
using IdentityService.Application.Mediatr.Results.Shared.Pagination;

namespace IdentityService.Application.Mediatr.User.Queries.Photo;

public class GetPhotosQueryValidator : AbstractValidator<GetPhotosQuery>
{
    public GetPhotosQueryValidator()
    {
        RuleFor(c => c.UserId).NotEqual(Guid.Empty);

        // RuleFor(c => c.Pagination)
        //     .SetValidator(new PaginationValidator());
    }
}
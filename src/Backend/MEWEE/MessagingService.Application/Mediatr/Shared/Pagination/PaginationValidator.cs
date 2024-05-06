using FluentValidation;

namespace MessagingService.Application.Mediatr.Shared.Pagination;

public class PaginationValidator : AbstractValidator<Pagination>
{
    public PaginationValidator()
    {
        RuleFor(x => x.Page)
            .GreaterThanOrEqualTo(0);

        RuleFor(x => x.PageSize)
            .InclusiveBetween(0, 100);
    }
}
using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Mediatr.Results.Shared;
using IdentityService.Application.Response;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.User.Queries;

public class GetEmailConfirmedQueryHandler : IRequestHandler<GetEmailConfirmedQuery,Result>
{
    private readonly IApplicationDbContext _dbContext;

    public GetEmailConfirmedQueryHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(GetEmailConfirmedQuery request, CancellationToken cancellationToken)
    {
        var emailConfirmed = await _dbContext.Users
            .Where(user => user.Email == request.Email)
            .Select(user => new UserVm
            {
                IsEmailConfirmed = user.IsEmailConfirmed
            })
            .FirstAsync(cancellationToken);

        return Result.Create(emailConfirmed);
    }
}
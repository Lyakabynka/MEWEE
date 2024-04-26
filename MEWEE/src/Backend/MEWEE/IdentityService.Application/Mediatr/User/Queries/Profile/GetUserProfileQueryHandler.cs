using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Mediatr.Results.Shared;
using IdentityService.Application.Response;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.User.Queries.Profile;

public class GetUserProfileQueryHandler : IRequestHandler<GetUserProfileQuery,Result>
{
    private readonly IApplicationDbContext _dbContext;

    public GetUserProfileQueryHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(GetUserProfileQuery request, CancellationToken cancellationToken)
    {
        var userProfileVm = await _dbContext.Users
            .Where(user => user.Id == request.UserId)
            .Select(user => new UserVm
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                Role = user.Role,
                IsEmailConfirmed = user.IsEmailConfirmed
            })
            .FirstAsync(cancellationToken);

        return Result.Create(userProfileVm);
    }
}
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
        bool isGuid = Guid.TryParse(request.UserId, out Guid userGuid);
    
        var query = _dbContext.Users.AsQueryable();

        if (isGuid)
        {
            query = query.Where(user => user.Id == userGuid);
        }
        else
        {
            query = query.Where(user => user.Username == request.UserId);
        }

        var userProfileVm = await query
            .Select(user => new UserVm
            {
                Id = user.Id,
                FirstName = user.FirstName,
                SecondName = user.SecondName,
                Username = user.Username,
                Email = user.Email,
                Role = user.Role,
                ProfileAvatar = user.ProfileAvatar,
                IsEmailConfirmed = user.IsEmailConfirmed,
                Workplace = user.Workplace,
                Website = user.Website,
                Status = user.Status,
                Location = user.Location,
                FollowersCount = user.Followers.Count,
                FollowingsCount = user.Followings.Count,
                PhotoCount = user.Photos.Count,
            })
            .FirstOrDefaultAsync(cancellationToken);

        return Result.Create(userProfileVm);
    }
}
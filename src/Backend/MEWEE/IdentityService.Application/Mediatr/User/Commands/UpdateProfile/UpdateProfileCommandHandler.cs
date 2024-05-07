using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.User.Commands.UpdateProfile;

public class UpdateProfileCommandHandler : IRequestHandler<UpdateProfileCommand, Result>
{
    private readonly IApplicationDbContext _dbContext;

    public UpdateProfileCommandHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(UpdateProfileCommand request, CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users
            .AsTracking()
            .FirstAsync(u => u.Id == request.UserId, cancellationToken);

        if (request.ProfileAvatar != null)
        {
            user.Avatar = request.ProfileAvatar;
        }

        if (request.Workplace != null)
        {
            user.Workplace = request.Workplace;
        }

        if (request.Website != null)
        {
            user.Website = request.Website;
        }

        if (request.Status != null)
        {
            user.Status = request.Status;
        }

        if (request.Location != null)
        {
            user.Location = request.Location;
        }

        await _dbContext.SaveChangesAsync(cancellationToken);

        return Result.Create(new {});
    }
}
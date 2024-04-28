using System.Security.Cryptography;
using BCrypt.Net;
using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Mediatr.Results.Shared;
using IdentityService.Application.Response;
using IdentityService.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.User.Commands.UpdateUserProfile;

public class UpdateUserProfileCommandHandler : IRequestHandler<UpdateUserProfileCommand, Result>
{
    private readonly IApplicationDbContext _dbContext;
    
    public UpdateUserProfileCommandHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(UpdateUserProfileCommand request, CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users.Where(p => p.Id == request.UserId).FirstAsync(cancellationToken);

        if (user.Id != request.UserId)
        {
            return Result.FormForbidden();
        }

        if (!string.IsNullOrEmpty(request.ProfileAvatar))
        {
            user.ProfileAvatar = request.ProfileAvatar;
        }

        _dbContext.Users.Update(user);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return Result.Create(new { });
    }
}
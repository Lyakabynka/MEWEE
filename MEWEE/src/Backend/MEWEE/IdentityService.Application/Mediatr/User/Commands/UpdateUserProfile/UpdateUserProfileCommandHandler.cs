using System.Security.Cryptography;
using BCrypt.Net;
using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Mediatr.Results.Shared;
using IdentityService.Application.Response;
using IdentityService.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.User.Commands.UpdateUserProfile;

public class UploadProfileAvatarCommandHandler : IRequestHandler<UpdateUserProfileCommand, Result>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly IEmailService _emailService;
    
    public UploadProfileAvatarCommandHandler(IApplicationDbContext dbContext, IEmailService emailService)
    {
        _dbContext = dbContext;
        _emailService = emailService;
    }

    public async Task<Result> Handle(UpdateUserProfileCommand request, CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users.Where(p => p.Id == request.UserId).FirstAsync(cancellationToken);

        if (user.Id != request.UserId)
        {
            return Result.FormForbidden();
        }

        //Update
        if (!string.IsNullOrEmpty(request.Attachment))
        {
            user.ProfileAvatar = request.Attachment;
        }

        await _dbContext.SaveChangesAsync(cancellationToken);

        return Result.Create(new { });
    }
}
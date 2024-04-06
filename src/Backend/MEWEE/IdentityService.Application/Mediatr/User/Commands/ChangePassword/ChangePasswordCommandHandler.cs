using BCrypt.Net;
using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.User.Commands.ChangePassword;

public class ChangePasswordCommandHandler : IRequestHandler<ChangePasswordCommand, Result>
{
    private readonly IApplicationDbContext _dbContext;

    public ChangePasswordCommandHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(ChangePasswordCommand request, CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users
            .AsTracking()
            .FirstAsync(u => u.Id == request.UserId, cancellationToken);

        if (!BCrypt.Net.BCrypt.EnhancedVerify(request.OldPassword, user.PasswordHash, HashType.SHA512))
        {
            return Result.FormBadRequest(
                "Incorrect old password",
                new ValidationError(nameof(request.OldPassword), "oldPassword_is_incorrect"));
        }
        
        user.PasswordHash = BCrypt.Net.BCrypt.EnhancedHashPassword(request.NewPassword, HashType.SHA512);
        
        await _dbContext.SaveChangesAsync(cancellationToken);

        return Result.Create(new { });
    }
}
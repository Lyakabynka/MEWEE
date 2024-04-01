using BCrypt.Net;
using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Mediatr.User.Commands.ForgotPassword;
using IdentityService.Application.Response;
using IdentityService.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.User.Commands.RestorePassword;

public class RestorePasswordCommandHandler : IRequestHandler<RestorePasswordCommand, Result>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly IEmailService _emailService;


    public RestorePasswordCommandHandler(IApplicationDbContext dbContext, IEmailService emailService)
    {
        _dbContext = dbContext;
        _emailService = emailService;
    }

    public async Task<Result> Handle(RestorePasswordCommand request, CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users
            .AsTracking()
            .FirstAsync(u => u.Email == request.Email, cancellationToken);

        if (user.ForgotPasswordCode is null)
        {
            return Result.FormBadRequest(
                "ForgotPassword code does not exist",
                new ValidationError(nameof(user.ConfirmationCode), "forgotPasswordCode_does_not_exist"));
        }
        
        if (user.ForgotPasswordCode?.Code != request.Code)
        {
            return Result.FormBadRequest(
                "ForgotPassword code is invalid",
                new ValidationError(nameof(user.ConfirmationCode), "forgotPasswordCode_invalid"));
        }
        
        if (user.ForgotPasswordCode?.ExpirationDateUtc < DateTime.UtcNow)
        {
            return Result.FormBadRequest(
                "ForgotPassword code has expired",
                new ValidationError(nameof(user.ConfirmationCode), "forgotPasswordCode_expired"));
        }

        user.PasswordHash = BCrypt.Net.BCrypt.EnhancedHashPassword(request.NewPassword, HashType.SHA512);
        
        user.ForgotPasswordCode = null;

        await _dbContext.SaveChangesAsync(cancellationToken);

        return Result.Create(new { });
    }
}
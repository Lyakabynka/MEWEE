using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;
using IdentityService.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.User.Commands.CheckForgotPasswordCode;

public class CheckForgotPasswordCodeCommandHandler : IRequestHandler<CheckForgotPasswordCodeCommand, Result>
{
    private readonly IApplicationDbContext _dbContext;
    
    public CheckForgotPasswordCodeCommandHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public async Task<Result> Handle(CheckForgotPasswordCodeCommand request, CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users
            .Include(u => u.ForgotPasswordCode)
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

        return Result.Create(new { });
    }
}
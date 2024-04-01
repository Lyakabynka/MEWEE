using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.User.Commands.ConfirmEmail;

public class ConfirmEmailCommandHandler : IRequestHandler<ConfirmEmailCommand, Result>
{
    private readonly IApplicationDbContext _dbContext;

    public ConfirmEmailCommandHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(ConfirmEmailCommand request, CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users
            .AsTracking()
            .Include(u => u.ConfirmationCode)
            .FirstAsync(u => u.Email == request.Email, cancellationToken);
        
        if (user.ConfirmationCode is null)
        {
            return Result.FormBadRequest(
                "Confirmation code does not exist",
                new ValidationError(nameof(user.ConfirmationCode), "confirmationCode_does_not_exist"));
        }
        
        if (user.ConfirmationCode?.Code != request.ConfirmationCode)
        {
            return Result.FormBadRequest(
                "Confirmation code is invalid",
                new ValidationError(nameof(user.ConfirmationCode), "confirmationCode_invalid"));
        }
        
        if (user.ConfirmationCode?.ExpirationDateUtc < DateTime.UtcNow)
        {
            return Result.FormBadRequest(
                "Confirmation code has expired",
                new ValidationError(nameof(user.ConfirmationCode), "confirmationCode_expired"));
        }

        user.IsEmailConfirmed = true;

        user.ConfirmationCode = null;
        
        await _dbContext.SaveChangesAsync(cancellationToken);

        return Result.Create(new { });
    }
}
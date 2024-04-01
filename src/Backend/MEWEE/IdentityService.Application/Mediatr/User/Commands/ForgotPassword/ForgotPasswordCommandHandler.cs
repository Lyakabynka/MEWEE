using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;
using IdentityService.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.User.Commands.ForgotPassword;

public class ForgotPasswordCommandHandler : IRequestHandler<ForgotPasswordCommand, Result>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly IEmailService _emailService;


    public ForgotPasswordCommandHandler(IApplicationDbContext dbContext, IEmailService emailService)
    {
        _dbContext = dbContext;
        _emailService = emailService;
    }

    public async Task<Result> Handle(ForgotPasswordCommand request, CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users
            .AsTracking()
            .FirstAsync(u => u.Email == request.Email, cancellationToken);

        var code = await _emailService.SendForgotPasswordEmailAsync(user.Email);

        user.ForgotPasswordCode = new ForgotPasswordCode()
        {
            Id = Guid.NewGuid(),
            Code = code,
            ExpirationDateUtc = DateTime.UtcNow.AddMinutes(30)
        };

        await _dbContext.SaveChangesAsync(cancellationToken);
        
        return Result.Create(new { });
    }
}
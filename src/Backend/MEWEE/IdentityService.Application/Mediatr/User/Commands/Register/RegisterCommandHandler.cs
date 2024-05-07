using System.Security.Cryptography;
using BCrypt.Net;
using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Mediatr.Results.Shared;
using IdentityService.Application.Response;
using IdentityService.Domain.Entities;
using MediatR;

namespace IdentityService.Application.Mediatr.User.Commands.Register;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, Result>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly IEmailService _emailService;
    
    public RegisterCommandHandler(IApplicationDbContext dbContext, IEmailService emailService)
    {
        _dbContext = dbContext;
        _emailService = emailService;
    }

    public async Task<Result> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        
        string suffix = GenerateRandomSuffix();
        
        var user = new Domain.Entities.User()
        {
            Id = Guid.NewGuid(),
            FirstName = request.FirstName,
            SecondName = request.SecondName,
            Username = $"user{suffix}",
            Avatar = @"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",
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.EnhancedHashPassword(request.Password, HashType.SHA512),
        };

        var code = await _emailService.SendVerifyEmailAsync(user.Email);
        user.ConfirmationCode = new ConfirmationCode()
        {
            Code = code,
            ExpirationDateUtc = DateTime.UtcNow.AddMinutes(30),
        };
        
        _dbContext.Users.Add(user);
        
        await _dbContext.SaveChangesAsync(cancellationToken);
        
        return Result.Create(user);
        //return Result.Create(new { });
    }
    
    private string GenerateRandomSuffix()
    {
        const int suffixLength = 5;
        Random random = new Random();
        string characters = "0123456789"; 
        char[] suffix = new char[suffixLength];

        for (int i = 0; i < suffixLength; i++)
        {
            suffix[i] = characters[random.Next(characters.Length)];
        }

        return new string(suffix);
    }
}
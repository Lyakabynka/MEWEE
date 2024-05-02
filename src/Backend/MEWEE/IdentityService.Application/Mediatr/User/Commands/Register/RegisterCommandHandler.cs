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
        // You can adjust the length of the suffix as needed
        const int suffixLength = 5;
        Random random = new Random();
        string characters = "0123456789"; // You can include more characters if needed
        char[] suffix = new char[suffixLength];

        for (int i = 0; i < suffixLength; i++)
        {
            suffix[i] = characters[random.Next(characters.Length)];
        }

        return new string(suffix);
    }
}
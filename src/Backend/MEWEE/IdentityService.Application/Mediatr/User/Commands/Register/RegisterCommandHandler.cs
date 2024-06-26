﻿using System.Security.Cryptography;
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
        var user = new Domain.Entities.User()
        {
            Id = Guid.NewGuid(),
            Username = request.Username,
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
}
﻿using BCrypt.Net;
using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;
using MediatR;

namespace IdentityService.Application.Mediatr.User.Commands;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, Result>
{
    private readonly IApplicationDbContext _dbContext;

    public RegisterCommandHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var user = new Domain.Entities.User()
        {
            Username = request.Username,
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.EnhancedHashPassword(request.Password, HashType.SHA512),
        };

        _dbContext.Users.Add(user);

        await _dbContext.SaveChangesAsync(cancellationToken);

        return Result.Create(new { });
    }
}
using System.Security.Cryptography;
using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Mediatr.Results.Shared;
using IdentityService.Application.Response;
using IdentityService.Application.Services;
using IdentityService.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.Auth.Commands.Login;

public class LoginCommandHandler : IRequestHandler<LoginCommand, Result>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly JwtProvider _jwtProvider;
    private readonly HttpContext _context;
    private readonly CookieProvider _cookieProvider;

    private readonly IEmailService _emailService;

    public LoginCommandHandler(
        IApplicationDbContext dbContext,
        JwtProvider jwtProvider,
        IHttpContextAccessor accessor,
        CookieProvider cookieProvider, IEmailService emailService)
    {
        _dbContext = dbContext;
        _jwtProvider = jwtProvider;
        _context = accessor.HttpContext!;
        _cookieProvider = cookieProvider;
        _emailService = emailService;
    }

    public async Task<Result> Handle(LoginCommand request,
        CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users
            .AsTracking()
            .Include(u => u.ConfirmationCode)
            .FirstAsync(user => user.Email == request.Email, cancellationToken);

        if (!user.IsEmailConfirmed)
        {
            var code = await _emailService.SendVerifyEmailAsync(user.Email);

            user.ConfirmationCode = new ConfirmationCode()
            {
                Code = code,
                ExpirationDateUtc = DateTime.Now.AddMinutes(30),
            };

            await _dbContext.SaveChangesAsync(cancellationToken);

            return Result.FormBadRequest(
                "Email is not confirmed",
                new ValidationError(nameof(user.Email), "email_not_confirmed"));
        }

        //determining user's platform
        var userAgent = _context
            .Request
            .Headers
            .UserAgent.ToString().ToLower();

        var session = new RefreshSession()
        {
            //TODO: add expiration time and delete expired sessions
            UserId = user.Id,
            RefreshToken = Guid.NewGuid(),
            UserAgent = userAgent
        };

        _dbContext.RefreshSessions.Add(session);

        await _dbContext.SaveChangesAsync(cancellationToken);

        var jwtToken = _jwtProvider.CreateToken(user);

        _cookieProvider.AddJwtCookieToResponse(_context.Response, jwtToken);
        _cookieProvider.AddRefreshCookieToResponse(_context.Response, session.RefreshToken.ToString());

        return Result.Create(new UserVm()
        {
            Id = user.Id,
            FirstName = user.FirstName,
            SecondName = user.SecondName,
            Username = user.Username,
            Email = user.Email,
            Role = user.Role,
            Avatar = user.Avatar,
            IsEmailConfirmed = user.IsEmailConfirmed,
            //user's current agent
            UserAgent = session.UserAgent
        });
    }
}
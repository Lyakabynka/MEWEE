using System.Net;
using System.Net.Mail;
using IdentityService.Application.Configurations;
using IdentityService.Application.Features.Interfaces;

namespace IdentityService.Application.Services;

public class EmailService : IEmailService
{
    private readonly IApplicationDbContext _dbContext;
    private readonly SmtpClient _smtpClient;
    private readonly SmtpConfiguration _configuration;
    public EmailService(IApplicationDbContext dbContext, SmtpConfiguration configuration)
    {
        _configuration = configuration;
        _dbContext = dbContext;

        _smtpClient = new SmtpClient(configuration.Server, configuration.Port)
        {
            EnableSsl = true,
            Credentials = new NetworkCredential(configuration.Email, configuration.Password),
        };
    }
    
    public async Task SendVerifyEmail(string toEmail, string verificationCode)
    {
        await _smtpClient.SendMailAsync(
            new MailMessage(from: _configuration.Email,
                            to: toEmail,
                            subject: "Verify your account",
                            body: $"Your verification code is: {verificationCode}"));
    }
}
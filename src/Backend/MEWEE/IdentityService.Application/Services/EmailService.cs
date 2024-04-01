using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using IdentityService.Application.Configurations;
using IdentityService.Application.Features.Interfaces;

namespace IdentityService.Application.Services;

public class EmailService : IEmailService
{
    private readonly SmtpClient _smtpClient;
    private readonly SmtpConfiguration _configuration;

    public EmailService(SmtpConfiguration configuration)
    {
        _configuration = configuration;

        _smtpClient = new SmtpClient(configuration.Server, configuration.Port)
        {
            EnableSsl = true,
            Credentials = new NetworkCredential(configuration.Email, configuration.Password),
        };
    }

    public async Task<string> SendVerifyEmailAsync(string toEmail)
    {
        var code = RandomNumberGenerator.GetHexString(8);

        await _smtpClient.SendMailAsync(
            new MailMessage(
                from: _configuration.Email,
                to: toEmail,
                subject: "Verify your account",
                body: $"Your verification code is: {code}"));

        return code;
    }

    public async Task<string> SendForgotPasswordEmailAsync(string toEmail)
    {
        var code = RandomNumberGenerator.GetHexString(8);

        await _smtpClient.SendMailAsync(
            new MailMessage(
                from: _configuration.Email,
                to: toEmail,
                subject: "Verify your account",
                body: $"Your restore password code is: {code}"));

        return code;
    }
}
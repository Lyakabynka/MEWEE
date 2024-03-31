namespace IdentityService.Application.Features.Interfaces;

public interface IEmailService
{
    public Task SendVerifyEmail(string toEmail, string verificationCode);
}
namespace IdentityService.Application.Features.Interfaces;

public interface IEmailService
{
    public Task<string> SendVerifyEmailAsync(string toEmail);
    
    public Task<string> SendForgotPasswordEmailAsync(string toEmail);
}
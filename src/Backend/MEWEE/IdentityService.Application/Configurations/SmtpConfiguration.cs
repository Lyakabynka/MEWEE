namespace IdentityService.Application.Configurations;

public class SmtpConfiguration
{
    public static readonly string SmtpConfigurationSection = "Smtp";
    
    public string Email { get; set; }
    public string Password { get; set; }
    public string Server { get; set; }
    public int Port { get; set; }
}
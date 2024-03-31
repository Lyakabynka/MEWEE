namespace IdentityService.WebApi.Models;

public class RestorePasswordRequestModel
{
    public string Email { get; set; }
    public string Code { get; set; }
    public string NewPassword { get; set; }
}
namespace IdentityService.WebApi.Models;

public class ConfirmEmailRequestModel
{
    public string Email { get; set; }
    public string Code { get; set; }
}
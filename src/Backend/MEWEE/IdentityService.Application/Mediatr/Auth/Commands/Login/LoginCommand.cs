using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;

namespace IdentityService.Application.Mediatr.Auth.Commands.Login;

public class LoginCommand : IValidatableRequest<Result>
{
    public string Username { get; set; }
    public string Password { get; set; }
}
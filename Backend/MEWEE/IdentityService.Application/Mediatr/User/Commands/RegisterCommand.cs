using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;

namespace IdentityService.Application.Mediatr.User.Commands;

public class RegisterCommand : IValidatableRequest<Result>
{
    public string Username { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
}
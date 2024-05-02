using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;

namespace IdentityService.Application.Mediatr.User.Commands.Register;

public class RegisterCommand : IValidatableRequest<Result>
{
    public string FirstName { get; set; }
    public string? SecondName { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
}
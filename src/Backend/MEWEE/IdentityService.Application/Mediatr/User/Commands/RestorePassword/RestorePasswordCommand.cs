using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;

namespace IdentityService.Application.Mediatr.User.Commands.RestorePassword;

public class RestorePasswordCommand : IValidatableRequest<Result>
{
    public string Email { get; set; }
    public string Code { get; set; }
    public string NewPassword { get; set; }
}
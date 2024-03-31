using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;

namespace IdentityService.Application.Mediatr.User.Commands.ForgotPassword;

public class ForgotPasswordCommand : IValidatableRequest<Result>
{
    public string Email { get; set; }
}
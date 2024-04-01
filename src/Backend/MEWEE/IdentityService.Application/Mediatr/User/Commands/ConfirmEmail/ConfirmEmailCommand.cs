using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;

namespace IdentityService.Application.Mediatr.User.Commands.ConfirmEmail;

public class ConfirmEmailCommand : IValidatableRequest<Result>
{
    public string Email { get; set; }
    public string ConfirmationCode { get; set; }
}
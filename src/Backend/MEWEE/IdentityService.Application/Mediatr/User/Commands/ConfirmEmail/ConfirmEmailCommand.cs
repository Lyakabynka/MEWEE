using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;

namespace IdentityService.Application.Mediatr.User.Commands.ConfirmEmail;

public class ConfirmEmailCommand : IValidatableRequest<Result>
{
    public Guid UserId { get; set; }
    public string ConfirmationCode { get; set; }
}
using IdentityService.Application.Response;
using MediatR;

namespace IdentityService.Application.Mediatr.User.Commands.CheckForgotPasswordCode;

public class CheckForgotPasswordCodeCommand : IRequest<Result>
{
    public string Email { get; set; }
    public string Code { get; set; }
}
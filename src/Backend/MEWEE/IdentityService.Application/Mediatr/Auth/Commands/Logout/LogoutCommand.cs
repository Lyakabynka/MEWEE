using IdentityService.Application.Response;
using MediatR;

namespace IdentityService.Application.Mediatr.Auth.Commands.Logout;

public class LogoutCommand : IRequest<Result>
{
}
using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace IdentityService.WebApi.Controllers;

[ApiController]
public abstract class ApiControllerBase : ControllerBase
{
    private IMediator? _mediator;

    protected IMediator Mediator =>
        _mediator ??= HttpContext.RequestServices.GetRequiredService<IMediator>();
    
    protected Guid UserId => User.Identity?.IsAuthenticated is true
        ? Guid.Parse(User.FindFirstValue("userId")!)
        : Guid.Empty;

    protected string Email => (User.FindFirstValue("isEmailConfirmed")!);
}
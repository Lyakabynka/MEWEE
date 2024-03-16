using MediatR;

namespace IdentityService.Application.Features.Interfaces;

public interface IValidatableRequest<out TResponse> : IRequest<TResponse>
{
}
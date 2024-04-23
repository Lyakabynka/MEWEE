using MediatR;

namespace MessagingService.Application.Features.Interfaces;

public interface IValidatableRequest<out TResponse> : IRequest<TResponse>
{
}
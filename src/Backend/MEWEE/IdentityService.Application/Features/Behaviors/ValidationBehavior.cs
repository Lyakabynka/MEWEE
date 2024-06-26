﻿using FluentValidation;
using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;
using MediatR;

namespace IdentityService.Application.Features.Behaviors;

public class ValidationBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, Result>
    where TRequest : IValidatableRequest<Result>
{
    private readonly IValidator<TRequest> _validator;

    public ValidationBehavior(IValidator<TRequest> validator)
    {
        _validator = validator;
    }

    public async Task<Result> Handle(TRequest request, RequestHandlerDelegate<Result> next, CancellationToken cancellationToken)
    {
        var validationResult = 
            await _validator.ValidateAsync(request, cancellationToken);
        
        if (!validationResult.IsValid)
        {
            return Result.FormBadRequest(validationResult);
        }

        var response = await next();
        
        return response;
    }
}
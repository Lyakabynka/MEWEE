using FluentValidation;
using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;
using MediatR;

namespace IdentityService.Application.Features.Behaviors;

public class TransactionBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, Result>
    where TRequest : IRequest<Result>
{
    private readonly IApplicationDbContext _dbContext;

    public TransactionBehavior(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(TRequest request, RequestHandlerDelegate<Result> next, CancellationToken cancellationToken)
    {
        await using var transaction = await _dbContext.Database.BeginTransactionAsync(cancellationToken);
        
        try
        {
            var response = await next();
                
            await transaction.CommitAsync(cancellationToken);

            return response;
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync(cancellationToken);
            return Result.FormInternalServerError("Failed committing the transaction");
        }
    }
}
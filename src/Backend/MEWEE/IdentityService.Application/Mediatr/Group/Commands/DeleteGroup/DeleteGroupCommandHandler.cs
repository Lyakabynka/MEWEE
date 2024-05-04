using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;
using IdentityService.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.Group.Commands.DeleteGroup;

public class DeleteGroupCommandHandler : IRequestHandler<DeleteGroupCommand, Result>
{
    private readonly IApplicationDbContext _dbContext;

    public DeleteGroupCommandHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(DeleteGroupCommand request, CancellationToken cancellationToken)
    {
        await _dbContext.Groups.Where(g => g.Id == request.GroupId).ExecuteDeleteAsync(cancellationToken);
        
        return Result.Create(new {});
    }
}
using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Mediatr.User.Commands.AddPhoto;
using IdentityService.Application.Response;
using IdentityService.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.User.Commands.DeletePhotoCommand;

public class DeletePhotoCommandHandler : IRequestHandler<DeletePhotoCommand, Result>
{
    private readonly IApplicationDbContext _dbContext;

    public DeletePhotoCommandHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(DeletePhotoCommand request, CancellationToken cancellationToken)
    {
        await _dbContext.Photos.Where(p => p.Id == request.PhotoId).ExecuteDeleteAsync(cancellationToken);

        return Result.Create(new { });
    }
}
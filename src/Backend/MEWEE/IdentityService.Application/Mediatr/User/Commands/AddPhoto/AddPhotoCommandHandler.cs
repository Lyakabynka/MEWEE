using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Mediatr.User.Commands.AcceptFollow;
using IdentityService.Application.Response;
using IdentityService.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.User.Commands.AddPhoto;

public class AddPhotoCommandHandler : IRequestHandler<AddPhotoCommand, Result>
{
    private readonly IApplicationDbContext _dbContext;

    public AddPhotoCommandHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(AddPhotoCommand request, CancellationToken cancellationToken)
    {
        var photo = new Photo()
        {
            UserId = request.UserId,
            Content = request.Photo,
        };

        _dbContext.Photos.Add(photo);

        await _dbContext.SaveChangesAsync(cancellationToken);

        return Result.Create(new { });
    }
}
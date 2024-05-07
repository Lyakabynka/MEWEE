using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Mediatr.Comments.Queries.GetComments;
using MessagingService.Application.Response;
using MessagingService.Domain.Entities;
using MessagingService.Domain.Entities.Likes;
using Microsoft.EntityFrameworkCore;

namespace MessagingService.Application.Mediatr.PostLikes.Queries.GetPostSave;

public class GetPostSaveQueryHandler : IRequestHandler<GetPostSaveQuery, Result>
{
    private readonly IApplicationDbContext _dbContext;

    public GetPostSaveQueryHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(GetPostSaveQuery request, CancellationToken cancellationToken)
    {
        var exists = _dbContext.Saves
            .Any(p => p.UserId == request.UserId && p.PostId == request.PostId);

        return Result.Create(exists);
    }
}
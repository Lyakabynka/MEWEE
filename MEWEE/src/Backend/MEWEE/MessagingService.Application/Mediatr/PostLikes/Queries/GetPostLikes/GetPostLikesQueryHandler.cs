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

namespace MessagingService.Application.Mediatr.PostLikes.Queries.GetPostLikes;

public class GetPostLikesQueryHandler : IRequestHandler<GetPostLikesQuery, Result>
{
    private readonly IApplicationDbContext _dbContext;

    public GetPostLikesQueryHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(GetPostLikesQuery request, CancellationToken cancellationToken)
    {
        var posts = await _dbContext.PostLikes
            .Where(p => p.UserId == request.UserId && p.PostId == request.PostId)
            .Select(p =>
                new PostLike()
                {
                    Id = p.Id,
                    UserId = request.UserId,
                    PostId = request.PostId
                })
            .ToListAsync(cancellationToken);

        return Result.Create(posts);
    }
}
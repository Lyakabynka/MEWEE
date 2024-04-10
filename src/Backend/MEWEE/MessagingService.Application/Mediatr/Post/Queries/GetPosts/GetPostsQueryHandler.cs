using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Response;
using Microsoft.EntityFrameworkCore;

namespace MessagingService.Application.Mediatr.Post.Queries.GetPosts;

public class GetPostsQueryHandler : IRequestHandler<GetPostsQuery, Result>
{
    private readonly IApplicationDbContext _dbContext;

    public GetPostsQueryHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(GetPostsQuery request, CancellationToken cancellationToken)
    {
        var posts = await _dbContext.Posts
            .Where(p => p.UserId == request.UserId)
            .ToListAsync(cancellationToken);

        return Result.Create(posts);
    }
}
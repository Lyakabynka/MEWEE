using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FuzzySharp;
using FuzzySharp.SimilarityRatio.Scorer.StrategySensitive;
using MediatR;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Response;
using Microsoft.EntityFrameworkCore;

namespace MessagingService.Application.Mediatr.Post.Queries.FindPosts;

public class FindPostsQueryHandler : IRequestHandler<FindPostsQuery, Result>
{
    private readonly IApplicationDbContext _dbContext;

    public FindPostsQueryHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(FindPostsQuery request, CancellationToken cancellationToken)
    {
        var searchQuery = request.SearchQuery.Trim().ToLowerInvariant();
        var page = request.Pagination.Page;
        var pageSize = request.Pagination.PageSize;

        var posts = await _dbContext.Posts
            .Where(p => EF.Functions.FuzzyStringMatchLevenshtein(p.Title.ToLowerInvariant(), searchQuery) <= 3)
            .Skip(page * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);

        return Result.Create(posts);
    }
}
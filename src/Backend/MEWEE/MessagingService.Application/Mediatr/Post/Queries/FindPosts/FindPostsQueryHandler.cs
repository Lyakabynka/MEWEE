using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FuzzySharp;
using FuzzySharp.SimilarityRatio.Scorer.StrategySensitive;
using MediatR;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Mediatr.Shared;
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
        var searchQuery = request.SearchQuery.Trim().ToLower();
        var page = request.Pagination.Page;
        var pageSize = request.Pagination.PageSize;

        var posts = await _dbContext.Posts
            .Include(p => p.Likes)
            .Where(p => EF.Functions.FuzzyStringMatchLevenshtein(p.Title.ToLower(), searchQuery) <= 3)
            .Skip(page * pageSize)
            .Take(pageSize)
            .Select(p =>
                new PostVm()
                {
                    Id = p.Id,
                    Title = p.Title,
                    Content = p.Content,
                    Attachment = p.Attachment,
                    LikesCount = p.Likes.Count,
                    UserId = p.UserId,
                    Location = p.Location,
                    Category = p.Category,
                    CreatedAt = p.CreatedAt,
                })
            .ToListAsync(cancellationToken);

        return Result.Create(posts);
    }
}
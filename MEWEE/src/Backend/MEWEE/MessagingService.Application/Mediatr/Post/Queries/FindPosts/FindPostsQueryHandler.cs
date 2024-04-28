using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Mediatr.Shared;
using MessagingService.Application.Response;
using Microsoft.EntityFrameworkCore;

namespace MessagingService.Application.Mediatr.Post.Queries.FindPosts
{
    public class FindPostsQueryHandler : IRequestHandler<FindPostsQuery, Result>
    {
        private readonly IApplicationDbContext _dbContext;

        public FindPostsQueryHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Result> Handle(FindPostsQuery request, CancellationToken cancellationToken)
        {
            var searchQueryLower = request.SearchQuery.Trim().ToLowerInvariant();
            var page = request.Pagination.Page;
            var pageSize = request.Pagination.PageSize;

            // Fetch all posts from the database
            var allPosts = await _dbContext.Posts
                .Include(p => p.Likes)
                .ToListAsync(cancellationToken);

            // Filter posts based on fuzzy string matching
            var similarPosts = allPosts
                .Where(p => FuzzyStringMatch(p.Title.ToLowerInvariant(), searchQueryLower) <= 3)
                //.Skip(page * pageSize)
                //.Take(pageSize)
                .Select(p =>
                    new PostVm()
                    {
                        Title = p.Title,
                        Content = p.Content,
                        Attachment = p.Attachment,
                        Location = p.Location,
                        Category = p.Category,
                        LikesCount = p.Likes.Count,
                    })
                .ToList();

            return Result.Create(similarPosts);
        }

        private int FuzzyStringMatch(string source, string target)
        {
            // Calculate Levenshtein distance between source and target strings
            var distance = new int[source.Length + 1, target.Length + 1];
            for (var i = 0; i <= source.Length; i++)
                distance[i, 0] = i;
            for (var j = 0; j <= target.Length; j++)
                distance[0, j] = j;
            for (var i = 1; i <= source.Length; i++)
            {
                for (var j = 1; j <= target.Length; j++)
                {
                    var cost = source[i - 1] == target[j - 1] ? 0 : 1;
                    distance[i, j] = Math.Min(Math.Min(
                        distance[i - 1, j] + 1,
                        distance[i, j - 1] + 1),
                        distance[i - 1, j - 1] + cost);
                }
            }
            return distance[source.Length, target.Length];
        }
    }
}

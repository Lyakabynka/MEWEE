using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Mediatr.Post.Queries.GetPosts;
using MessagingService.Application.Mediatr.Shared;
using MessagingService.Application.Response;
using Microsoft.EntityFrameworkCore;

namespace MessagingService.Application.Mediatr.Post.Queries.GetSavedPosts;

public class GetSavedPostsQueryHandler : IRequestHandler<GetSavedPostsQuery, Result>
{
    private readonly IApplicationDbContext _dbContext;

    public GetSavedPostsQueryHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(GetSavedPostsQuery request, CancellationToken cancellationToken)
    {
        if (request.SavedPostId is null)
        {
            var post = await _dbContext.Posts
                .Include(p => p.Likes)
                .Where(p => p.Id == request.SavedPostId)
                .Select(p =>
                    new PostVm()
                    {
                        Id = p.Id,
                        Title = p.Title,
                        Content = p.Content,
                        Attachment = p.Attachment,
                        LikesCount = p.Likes.Count,
                        Location = p.Location,
                        Category = p.Category,
                        CreatedAt = p.CreatedAt,
                    
                        Type = p.Type,
                        HappeningAtUtc = p.HappeningAtUtc
                    })
                .FirstOrDefaultAsync(cancellationToken);

            return Result.Create(post);
        }
        
        var posts = await _dbContext.Posts
            .Include(p => p.Likes)
            .Where(p => p.AuthorId == request.UserId)
            .Select(p =>
                new PostVm()
                {
                    Id = p.Id,
                    Title = p.Title,
                    Content = p.Content,
                    Attachment = p.Attachment,
                    LikesCount = p.Likes.Count,
                    Location = p.Location,
                    Category = p.Category,
                    CreatedAt = p.CreatedAt,
                    
                    Type = p.Type,
                    AuthorId = request.UserId,
                    HappeningAtUtc = p.HappeningAtUtc
                })
            .ToListAsync(cancellationToken);

        return Result.Create(posts);
    }
}
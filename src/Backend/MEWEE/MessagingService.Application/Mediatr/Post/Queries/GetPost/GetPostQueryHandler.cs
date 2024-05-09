using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation.Results;
using MediatR;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Mediatr.Shared;
using MessagingService.Application.Response;
using Microsoft.EntityFrameworkCore;

namespace MessagingService.Application.Mediatr.Post.Queries.GetPost;

public class GetPostQueryHandler : IRequestHandler<GetPostQuery, Result>
{
    private readonly IApplicationDbContext _dbContext;

    public GetPostQueryHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(GetPostQuery request, CancellationToken cancellationToken)
    {
        var post = await _dbContext.Posts
            .Include(p => p.Likes)
            .Where(p => p.Id == request.PostId)
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
                    AuthorId = p.AuthorId,
                    HappeningAtUtc = p.HappeningAtUtc
                })
            .FirstOrDefaultAsync(cancellationToken);
        
        if(post is null)
            return Result.FormBadRequest("Invalid id", new ValidationError("post", "not found"));
        
        return Result.Create(post);
    }
}
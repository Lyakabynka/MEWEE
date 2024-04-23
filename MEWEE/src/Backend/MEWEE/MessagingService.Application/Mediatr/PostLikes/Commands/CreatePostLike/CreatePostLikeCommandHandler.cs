using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Response;
using MessagingService.Domain.Entities.Likes;
using Microsoft.EntityFrameworkCore;

namespace MessagingService.Application.Mediatr.PostLikes.Commands.CreatePostLike;

public class CreatePostLikeCommandHandler : IRequestHandler<CreatePostLikeCommand, Result>
{
    private readonly IApplicationDbContext _dbContext;

    public CreatePostLikeCommandHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(CreatePostLikeCommand request, CancellationToken cancellationToken)
    {
        var postLike = new PostLike()
        {
            PostId = request.PostId,
            UserId = request.UserId,
        };

        _dbContext.PostLikes.Add(postLike);

        await _dbContext.SaveChangesAsync(cancellationToken);

        return Result.Create(new { });
    }
}
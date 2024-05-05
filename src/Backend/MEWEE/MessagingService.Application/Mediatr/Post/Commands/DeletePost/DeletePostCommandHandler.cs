using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Response;
using Microsoft.EntityFrameworkCore;

namespace MessagingService.Application.Mediatr.Post.Commands.DeletePost;

public class DeletePostCommandHandler : IRequestHandler<DeletePostCommand, Result>
{
    private readonly IApplicationDbContext _dbContext;

    public DeletePostCommandHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(DeletePostCommand request, CancellationToken cancellationToken)
    {
        var post = await _dbContext.Posts
            .Where(p => p.Id == request.Id)
            .FirstAsync(cancellationToken);

        if (post.AuthorId != request.AuthorId)
        {
            return Result.FormForbidden();
        }

        _dbContext.Posts.Remove(post);

        await _dbContext.SaveChangesAsync(cancellationToken);

        return Result.Create(new { });
    }
}
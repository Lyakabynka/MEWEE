using System.Threading;
using System.Threading.Tasks;
using MediatR;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Response;
using Microsoft.EntityFrameworkCore;

namespace MessagingService.Application.Mediatr.Comments.Commands.DeleteComment;

public class DeleteCommentCommandHandler : IRequestHandler<DeleteCommentCommand, Result>
{
    private readonly IApplicationDbContext _dbContext;

    public DeleteCommentCommandHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(DeleteCommentCommand request, CancellationToken cancellationToken)
    {
        var comment = await _dbContext.Comments
            .FirstAsync(c => c.Id == request.CommentId, cancellationToken);

        if (comment.UserId != request.UserId)
        {
            return Result.FormForbidden();
        }

        _dbContext.Comments.Remove(comment);

        await _dbContext.SaveChangesAsync(cancellationToken);

        return Result.Create(new { });
    }
}
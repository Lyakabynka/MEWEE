using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Mediatr.Comments.Commands.CreateComment;
using MessagingService.Application.Response;
using MessagingService.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace MessagingService.Application.Mediatr.Comments.Queries.GetComments;

public class GetCommentsQueryHandler : IRequestHandler<GetCommentsQuery, Result>
{
    private readonly IApplicationDbContext _dbContext;

    public GetCommentsQueryHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(GetCommentsQuery request, CancellationToken cancellationToken)
    {
        var page = request.Pagination.Page;
        var pageSize = request.Pagination.PageSize;
        
        var comments = await _dbContext.Comments
            .Where(c => c.PostId == request.PostId)
            .Select(c => new CommentDto()
            {
                Id = c.Id,
                PostId = c.PostId,
                ReplyCommentId = c.ReplyCommentId,
                
                Content = c.Content,
                
                Likes = c.Likes.Count,

                UserId = c.UserId,
            })
            //.Skip(page*pageSize)
            //.Take(pageSize)
            .ToListAsync(cancellationToken);

        return Result.Create(comments);
    }
}
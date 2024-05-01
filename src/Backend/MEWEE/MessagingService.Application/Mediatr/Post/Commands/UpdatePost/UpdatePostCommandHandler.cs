using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Mediatr.Post.Commands.CreatePost;
using MessagingService.Application.Response;
using Microsoft.EntityFrameworkCore;

namespace MessagingService.Application.Mediatr.Post.Commands.UpdatePost;

public class UpdatePostCommandHandler : IRequestHandler<UpdatePostCommand, Result>
{
    private readonly IApplicationDbContext _dbContext;

    public UpdatePostCommandHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(UpdatePostCommand request, CancellationToken cancellationToken)
    {
        var post = await _dbContext.Posts.Where(p => p.Id == request.Id).FirstAsync(cancellationToken);

        if (post.UserId != request.UserId)
        {
            return Result.FormForbidden();
        }

        //Update
        if (!string.IsNullOrEmpty(request.Title))
        {
            post.Title = request.Title;
        }

        if (!string.IsNullOrEmpty(request.Content))
        {
            post.Content = request.Content;
        }

        if (!string.IsNullOrEmpty(request.Attachment))
        {
            post.Attachment = request.Attachment;
        }
        
        if (!string.IsNullOrEmpty(request.Location))
        {
            post.Location = request.Location;
        }
        
        if (!string.IsNullOrEmpty(request.Category))
        {
            post.Category = request.Category;
        }

        await _dbContext.SaveChangesAsync(cancellationToken);

        return Result.Create(new { });
    }
}
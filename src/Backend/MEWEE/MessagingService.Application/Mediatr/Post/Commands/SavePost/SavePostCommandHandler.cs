using System.Threading;
using System.Threading.Tasks;
using MediatR;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Mediatr.Post.Commands.CreatePost;
using MessagingService.Application.Response;
using MessagingService.Domain.Entities;

namespace MessagingService.Application.Mediatr.Post.Commands.SavePost;

public class SavePostCommandHandler : IRequestHandler<SavePostCommand, Result>
{
    private readonly IApplicationDbContext _dbContext;

    public SavePostCommandHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public async Task<Result> Handle(SavePostCommand request, CancellationToken cancellationToken)
    {
        var save = new Save()
        {
            UserId = request.UserId,
            PostId = request.PostId,
        };
        
        _dbContext.Saves.Add(save);
        
        await _dbContext.SaveChangesAsync(cancellationToken);

        return Result.Create(new { });
    }
}
using MediatR;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Response;
using MessagingService.Domain.Entities;

namespace MessagingService.Application.Mediatr.Post.Commands.CreatePost;

public class CreatePostCommandHandler : IRequestHandler<CreatePostCommand, Result>
{
    private readonly IApplicationDbContext _dbContext;

    public CreatePostCommandHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public async Task<Result> Handle(CreatePostCommand request, CancellationToken cancellationToken)
    {
        var post = new Domain.Entities.Post()
        {
            Title = request.Title,
            Content = request.Content,
            Attachment = request.Attachment,
            UserId = request.UserId
        };
        
        _dbContext.Posts.Add(post);
        
        await _dbContext.SaveChangesAsync(cancellationToken);

        return Result.Create(new { });
    }
}
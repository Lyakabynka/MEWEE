using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Response;
using MessagingService.Domain.Entities;

namespace MessagingService.Application.Mediatr.Comments.Commands.CreateComment;

public class CreateCommentCommandHandler : IRequestHandler<CreateCommentCommand, Result>
{
    private readonly IApplicationDbContext _dbContext;

    public CreateCommentCommandHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result> Handle(CreateCommentCommand request, CancellationToken cancellationToken)
    {
        var comment = new Comment()
        {
            Id = Guid.NewGuid(),
            PostId = request.PostId,
            ReplyCommentId = request.ReplyCommentId,
            Content = request.Content.Trim(),
            UserId = request.UserId
        };

        _dbContext.Comments.Add(comment);

        await _dbContext.SaveChangesAsync(cancellationToken);

        return Result.Create(comment);
    }
}
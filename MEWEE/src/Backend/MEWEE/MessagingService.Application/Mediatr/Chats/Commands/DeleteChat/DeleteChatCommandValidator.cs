using System;
using System.Linq;
using FluentValidation;
using MessagingService.Application.Features.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MessagingService.Application.Mediatr.Chats.Commands.DeleteChat;

public class DeleteChatCommandValidator : AbstractValidator<DeleteChatCommand>
{
    public DeleteChatCommandValidator(IApplicationDbContext dbContext)
    {
        RuleFor(c => c.ChatId)
            .NotEqual(Guid.Empty)
            .MustAsync(async (id, cancellationToken) =>
            {
                var post = await dbContext.Chats.Where(p => p.Id == id).FirstOrDefaultAsync(cancellationToken);

                return post is not null;
            })
            .WithMessage("chat_does_not_exist");

        RuleFor(c => c.UserId)
            .NotEqual(Guid.Empty);
    }
}
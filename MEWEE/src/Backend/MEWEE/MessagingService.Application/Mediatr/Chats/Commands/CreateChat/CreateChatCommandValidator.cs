using System;
using FluentValidation;

namespace MessagingService.Application.Mediatr.Chats.Commands.CreateChat;

public class CreateChatCommandValidator : AbstractValidator<CreateChatCommand>
{
    public CreateChatCommandValidator()
    {
        RuleFor(c => c.UserId)
            .NotEqual(Guid.Empty);

        RuleFor(c => c.InviteeUserId)
            .NotEqual(Guid.Empty);
        
        
        RuleFor(c=>c)
            // UserId blocked by InveteeUser or not
            .MustAsync(async (c, ct) =>
            {
                return true;
            });
    }
}
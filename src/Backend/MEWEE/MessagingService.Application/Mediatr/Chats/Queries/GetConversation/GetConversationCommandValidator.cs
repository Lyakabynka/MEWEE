using System;
using FluentValidation;

namespace MessagingService.Application.Mediatr.Chats.Queries.GetConversation;

public class GetConversationCommandValidator : AbstractValidator<GetConversationCommand>
{
    public GetConversationCommandValidator()
    {
        RuleFor(c => c.ChatId)
            .NotEqual(Guid.Empty);
    }
}
using System;
using FluentValidation;

namespace MessagingService.Application.Mediatr.Chats.Queries.GetChats;

public class GetChatsCommandValidator : AbstractValidator<GetChatsCommand>
{
    public GetChatsCommandValidator()
    {
        RuleFor(c => c.UserId)
            .NotEqual(Guid.Empty);
    }
}
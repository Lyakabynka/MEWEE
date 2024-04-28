using System;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Response;

namespace MessagingService.Application.Mediatr.Post.Commands.UpdatePost;

public class UpdatePostCommand : IValidatableRequest<Result>
{
    public Guid Id { get; set; }
    
    public string? Title { get; set; }
    public string? Content { get; set; }
    public string? Location { get; set; }
    public string? Attachment { get; set; }
    public string Category { get; set; }
    
    public Guid UserId { get; set; }
}
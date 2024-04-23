using System;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Response;

namespace MessagingService.Application.Mediatr.Post.Commands.CreatePost;

public class CreatePostCommand : IValidatableRequest<Result>
{
    public string Title { get; set; }
    public string Content { get; set; }
    public string? Attachment { get; set; }
    
    public Guid UserId { get; set; }
}
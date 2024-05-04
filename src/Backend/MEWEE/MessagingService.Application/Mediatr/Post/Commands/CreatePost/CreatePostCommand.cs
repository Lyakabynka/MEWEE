using System;
using MessagingService.Application.Features.Interfaces;
using MessagingService.Application.Response;
using MessagingService.Domain.Enums;

namespace MessagingService.Application.Mediatr.Post.Commands.CreatePost;

public class CreatePostCommand : IValidatableRequest<Result>
{
    public string Title { get; set; }
    public string Content { get; set; }
    
    public string Category { get; set; }
    
    public string? Attachment { get; set; }
    
    public string? Location { get; set; }
    
    
    public PostType Type { get; set; }
    public Guid AuthorId { get; set; }
    
    //not null if Type == Event
    public DateTime? HappeningAtUtc { get; set; }
}
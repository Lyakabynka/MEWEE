using System;
using MessagingService.Domain.Enums;

namespace MessagingService.Application.Mediatr.Shared;

public class PostVm
{
    public Guid Id { get; set; }
    public string Content { get; set; }
    public string Title { get; set; }
    public string? Attachment { get; set; }
    public string? Location { get; set; }
    public string Category { get; set; }
    public int LikesCount { get; set; }
    public DateTime CreatedAt { get; set; }
    
    public Guid AuthorId { get; set; }
    public PostType Type { get; set; }
    public DateTime? HappeningAtUtc { get; set; }
}
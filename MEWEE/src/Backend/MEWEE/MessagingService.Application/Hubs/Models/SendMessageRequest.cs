using System;

namespace MessagingService.Application.Hubs.Models;

public class SendMessageRequest
{
    public string Content { get; set; }
    
    public DateTime CreatedAt { get; set; }
}
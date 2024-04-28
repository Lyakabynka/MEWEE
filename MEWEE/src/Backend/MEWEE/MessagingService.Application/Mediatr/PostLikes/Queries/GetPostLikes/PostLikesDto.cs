using System;

namespace MessagingService.Application.Mediatr.PostLikes.Queries.GetPostLikes;

public class PostLikesDto
{
    public Guid Id { get; set; }
    public Guid PostId { get; set; }
    
    public int Likes { get; set; }
    
    public Guid UserId { get; set; }
}
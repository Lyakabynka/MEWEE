namespace IdentityService.Domain.Entities;

public class Follower : BaseEntity
{
    public Guid UserId { get; set; }
    public Guid FollowingUserId { get; set; }
    
    public User User { get; set; } // The user who is following
    public User FollowingUser { get; set; } // The user who is being followed
}
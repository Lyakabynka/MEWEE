using IdentityService.Domain.Enums;

namespace IdentityService.Domain.Entities;

public class GroupUser : BaseEntity
{
    public Guid UserId { get; set; }
    public User User { get; set; }
    
    public Guid GroupId { get; set; }
    public Group Group { get; set; }
    
    public GroupUserRole Role { get; set; }
}
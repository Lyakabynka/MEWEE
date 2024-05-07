namespace IdentityService.Domain.Entities;

public class Group : BaseEntity
{
    public string Title { get; set; }
    public string Avatar { get; set; }
    public string Nickname { get; set; }
    public string Category { get; set; }
    
    
    public List<GroupUser> Users { get; set; }
}
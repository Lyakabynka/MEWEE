namespace IdentityService.WebApi.Models.Group;

public class JoinGroupRequestModel
{
    public Guid GroupId { get; set; }
    
    public string Title { get; set; }
    public string Category { get; set; }
    public string Avatar { get; set; }
}
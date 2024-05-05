namespace IdentityService.WebApi.Models.Group;

public class CreateGroupRequestModel
{
    public Guid GroupId { get; set; }
    
    public string Title { get; set; }
    public string Avatar { get; set; }
}
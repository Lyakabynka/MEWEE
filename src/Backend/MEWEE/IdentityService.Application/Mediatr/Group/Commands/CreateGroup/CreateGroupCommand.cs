using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;

namespace IdentityService.Application.Mediatr.Group.Commands.CreateGroup;

public class CreateGroupCommand : IValidatableRequest<Result>
{
    public Guid UserId { get; set; }
    public string Title { get; set; }
    public string Category { get; set; }
    
    public string Avatar { get; set; }
}
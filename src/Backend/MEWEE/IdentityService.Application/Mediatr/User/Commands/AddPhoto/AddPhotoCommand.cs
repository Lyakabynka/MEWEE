using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;

namespace IdentityService.Application.Mediatr.User.Commands.AddPhoto;

public class AddPhotoCommand : IValidatableRequest<Result>
{
    public Guid UserId { get; set; }
    
    public string Photo { get; set; }
}
using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;

namespace IdentityService.Application.Mediatr.User.Commands.DeletePhotoCommand;

public class DeletePhotoCommand : IValidatableRequest<Result>
{
    public Guid UserId { get; set; }
    
    public Guid PhotoId { get; set; }
}
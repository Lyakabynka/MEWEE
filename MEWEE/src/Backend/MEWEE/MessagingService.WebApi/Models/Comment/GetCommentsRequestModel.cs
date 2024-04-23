using MessagingService.Application.Mediatr.Shared.Pagination;

namespace MessagingService.WebApi.Models.Comment;

public class GetCommentsRequestModel
{
    public Guid PostId { get; set; }
    
    public Pagination Pagination { get; set; }
}
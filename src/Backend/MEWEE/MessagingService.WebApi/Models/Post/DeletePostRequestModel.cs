namespace MessagingService.WebApi.Models.Post;

public class DeletePostRequestModel
{
    public Guid Id { get; set; }   
    
    public Guid AuthorId { get; set; }
}
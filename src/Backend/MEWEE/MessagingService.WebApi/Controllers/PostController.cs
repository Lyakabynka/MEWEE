using MessagingService.Application.Mediatr.Post.Commands.CreatePost;
using MessagingService.WebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace MessagingService.WebApi.Controllers;

[Route("post")]
public class PostController : ApiControllerBase
{
    /// <summary>
    /// Creates a Post
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// POST /post/
    /// </remarks>
    /// <param name="requestModel">CreatePostRequestModel with necessary fields</param>
    /// <response code="200">Success</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="400">Invalid parameters</response>
    /// <response code="406">Invalid parameters</response>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status406NotAcceptable)]
    public async Task<IActionResult> CreatePost([FromBody] CreatePostRequestModel requestModel)
    {
        var request = new CreatePostCommand()
        {
            Title = requestModel.Title,
            Content = requestModel.Content,
            Attachment = requestModel.Attachment,
            UserId = UserId,
        };
        
        return await Mediator.Send(request);
    }
}
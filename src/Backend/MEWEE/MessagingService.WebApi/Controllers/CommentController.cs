using MessagingService.Application.Mediatr.Comments.Commands.CreateComment;
using MessagingService.Application.Mediatr.Comments.Queries.GetComments;
using MessagingService.Application.Mediatr.Post.Queries.FindPosts;
using MessagingService.WebApi.Models;
using MessagingService.WebApi.Models.Comment;
using Microsoft.AspNetCore.Mvc;

namespace MessagingService.WebApi.Controllers;

public class CommentController : ApiControllerBase
{
    /// <summary>
    /// Get comments of specific post
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// GET /comments
    /// </remarks>
    /// <param name="requestModel">GetCommentsRequestModel with necessary fields</param>
    /// <response code="200">Success</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="400">Invalid parameters</response>
    /// <response code="406">Invalid parameters</response>
    [HttpPost("comments")]
    [ProducesResponseType<List<CommentDto>>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status406NotAcceptable)]
    public async Task<IActionResult> FindPosts([FromBody] GetCommentsRequestModel requestModel)
    {
        var request = new GetCommentsQuery()
        {
            PostId = requestModel.PostId,
            Pagination = requestModel.Pagination
        };
        
        return await Mediator.Send(request);
    }
    
    /// <summary>
    /// Create comment
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// POST /comment
    /// </remarks>
    /// <param name="requestModel">CreateCommentRequestModel with necessary fields</param>
    /// <response code="200">Success</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="400">Invalid parameters</response>
    /// <response code="406">Invalid parameters</response>
    [HttpPost("comment")]
    [ProducesResponseType<List<CommentDto>>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status406NotAcceptable)]
    public async Task<IActionResult> FindPosts([FromBody] CreateCommentRequestModel requestModel)
    {
        var request = new CreateCommentCommand()
        {
            PostId = requestModel.PostId,
            ReplyCommentId = requestModel.ReplyCommentId,
            Content = requestModel.Content,
            UserId = UserId,
        };
        
        return await Mediator.Send(request);
    }
}
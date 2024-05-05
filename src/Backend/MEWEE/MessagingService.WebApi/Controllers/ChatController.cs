using MessagingService.Application.Mediatr.Chats.Commands.CreateChat;
using MessagingService.Application.Mediatr.Chats.Queries.GetChats;
using MessagingService.Application.Mediatr.Chats.Queries.GetConversation;
using MessagingService.Application.Mediatr.Post.Commands.CreatePost;
using MessagingService.WebApi.Models.Chat;
using MessagingService.WebApi.Models.Post;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MessagingService.WebApi.Controllers;

public class ChatController : ApiControllerBase
{
    /// <summary>
    /// Creates a Post
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// POST /post
    /// </remarks>
    /// <param name="requestModel">CreateChatRequestModel with necessary fields</param>
    /// <response code="200">Success</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="400">Invalid parameters</response>
    /// <response code="406">Invalid parameters</response>
    [HttpPost("chat")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status406NotAcceptable)]
    public async Task<IActionResult> CreateChat([FromBody] CreateChatRequestModel requestModel)
    {
        var request = new CreateChatCommand()
        {
            InviteeUserId = requestModel.InviteeUserId,
            UserId = UserId,
        };
        
        return await Mediator.Send(request);
    }
    /// <summary>
    /// Get a conversation
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// POST /get-conversation
    /// </remarks>
    /// <param name="requestModel">CreateChatRequestModel with necessary fields</param>
    /// <response code="200">Success</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="400">Invalid parameters</response>
    /// <response code="406">Invalid parameters</response>
    [HttpPost("get-conversation")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status406NotAcceptable)]
    public async Task<IActionResult> GetChats([FromBody] Guid chatId)
    {
        var request = new GetConversationCommand()
        {
            ChatId = chatId
        };
        
        return await Mediator.Send(request);
    }
    /// <summary>
    /// Get a Post
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// POST /get-chats
    /// </remarks>
    /// <param name="requestModel">CreateChatRequestModel with necessary fields</param>
    /// <response code="200">Success</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="400">Invalid parameters</response>
    /// <response code="406">Invalid parameters</response>
    [HttpGet("get-chats")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status406NotAcceptable)]
    public async Task<IActionResult> GetChats()
    {
        var request = new GetChatsCommand()
        {
            UserId = UserId
        };
        
        return await Mediator.Send(request);
    }
}
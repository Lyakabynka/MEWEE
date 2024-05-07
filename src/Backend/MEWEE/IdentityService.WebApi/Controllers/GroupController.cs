using IdentityService.Application.Mediatr.Group.Commands;
using IdentityService.Application.Mediatr.Group.Commands.CreateGroup;
using IdentityService.Application.Mediatr.Group.Commands.DeleteGroup;
using IdentityService.Application.Mediatr.Group.Commands.JoinGroup;
using IdentityService.Application.Mediatr.Group.Queries.GetGroup;
using IdentityService.Application.Mediatr.Group.Queries.GetGroups;
using IdentityService.WebApi.Models.Group;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IdentityService.WebApi.Controllers;

public class GroupController : ApiControllerBase
{
    /// <summary>
    /// Creates a Group
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// POST /group
    /// </remarks>
    /// <param name="requestModel">CreateGroupRequestModel with necessary fields</param>
    /// <response code="200">Success</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="400">Invalid parameters</response>
    /// <response code="406">Invalid parameters</response>
    [HttpPost("create-group")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status406NotAcceptable)]
    public async Task<IActionResult> CreateGroup([FromBody] CreateGroupRequestModel requestModel)
    {
        var request = new CreateGroupCommand()
        {
            Title = requestModel.Title,
            Avatar = requestModel.Avatar,
            UserId = UserId,
            Category = requestModel.Category
        };
        
        return await Mediator.Send(request);
    }
    
    /// <summary>
    /// Creates a Group
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// DELETE /group
    /// </remarks>
    /// <param name="requestModel">DeleteGroupRequestModel with necessary fields</param>
    /// <response code="200">Success</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="400">Invalid parameters</response>
    /// <response code="406">Invalid parameters</response>
    [HttpPost("delete-group")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status406NotAcceptable)]
    public async Task<IActionResult> DeleteGroup([FromBody] DeleteGroupRequestModel requestModel)
    {
        var request = new DeleteGroupCommand()
        {
            GroupId = requestModel.GroupId,
            UserId = UserId,
        };
        
        return await Mediator.Send(request);
    }
    
    /// <summary>
    /// Creates a Group
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// GET /groups
    /// </remarks>
    /// <response code="200">Success</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="400">Invalid parameters</response>
    /// <response code="406">Invalid parameters</response>
    [HttpGet("groups")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status406NotAcceptable)]
    public async Task<IActionResult> GetGroups()
    {
        var request = new GetGroupsQuery()
        {
            UserId = UserId,
        };
        
        return await Mediator.Send(request);
    }
    
    /// <summary>
    /// Gets the Group profile
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// GET /get-group
    /// </remarks>
    /// <response code="200">Success</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="400">Invalid parameters</response>
    [HttpGet("get-group/{userId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetGroup([FromRoute] string userId)
    {
        var request = new GetGroupQuery()
        {
            GroupCredentials = userId
        };

        return await Mediator.Send(request);
    }

    
    /// <summary>
    /// Creates a Group
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// GET /groups
    /// </remarks>
    /// <response code="200">Success</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="400">Invalid parameters</response>
    /// <response code="406">Invalid parameters</response>
    [HttpPost("join-group")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status406NotAcceptable)]
    public async Task<IActionResult> JoinGroup([FromBody] JoinGroupRequestModel requestModel)
    {
        var request = new JoinGroupCommand()
        {
            UserId = UserId,
            GroupId = requestModel.GroupId
        };
        
        return await Mediator.Send(request);
    }
}
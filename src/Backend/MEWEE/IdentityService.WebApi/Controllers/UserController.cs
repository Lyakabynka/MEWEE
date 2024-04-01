using IdentityService.Application.Mediatr.User.Commands.ChangePassword;
using IdentityService.Application.Mediatr.User.Commands.ConfirmEmail;
using IdentityService.Application.Mediatr.User.Commands.ForgotPassword;
using IdentityService.Application.Mediatr.User.Commands.Register;
using IdentityService.Application.Mediatr.User.Commands.RestorePassword;
using IdentityService.Application.Mediatr.User.Queries.Profile;
using IdentityService.WebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IdentityService.WebApi.Controllers;

[Route("user")]
public class UserController : ApiControllerBase
{
    /// <summary>
    /// Register a User
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// POST /user/register
    /// </remarks>
    /// <param name="requestModel">RegisterRequestModel with necessary fields</param>
    /// <response code="200">Success</response>
    /// <response code="409">User with provided credentials already exists</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="400">Invalid parameters</response>
    [HttpPost("register")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Register([FromBody] RegisterRequestModel requestModel)
    {
        var request = new RegisterCommand()
        {
            Username = requestModel.Username,
            Password = requestModel.Password,
            Email = requestModel.Email.ToLower(),
        };
        
        return await Mediator.Send(request);
    }

    /// <summary>
    /// Get the User profile
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// POST /user/profile
    /// </remarks>
    /// <response code="200">Success</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="400">Invalid parameters</response>
    [Authorize]
    [HttpGet("profile")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetUsersProfile()
    {
        var request = new GetUserProfileQuery()
        {
            UserId = UserId
        };

        return await Mediator.Send(request);
    }
    
    /// <summary>
    /// Confirms user's email
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// POST /user/confirm-email
    /// </remarks>
    /// <response code="200">Success</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="400">Invalid parameters</response>
    [HttpPost("confirm-email")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> ConfirmEmail([FromBody] ConfirmEmailRequestModel requestModel)
    {
        var request = new ConfirmEmailCommand()
        {
            Email = requestModel.Email.ToLower(),
            ConfirmationCode = requestModel.Code,
        };

        return await Mediator.Send(request);
    }
    
    /// <summary>
    /// changes user's password
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// POST /user/change-password
    /// </remarks>
    /// <response code="200">Success</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="400">Invalid parameters</response>
    /// <response code="406">Invalid parameters</response>
    [Authorize]
    [HttpPost("change-password")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequestModel requestModel)
    {
        var request = new ChangePasswordCommand()
        {
            UserId = UserId,
            OldPassword = requestModel.OldPassword,
            NewPassword = requestModel.NewPassword
        };

        return await Mediator.Send(request);
    }
    
    /// <summary>
    /// sends forgot password email to user
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// POST /user/forgot-password
    /// </remarks>
    /// <response code="200">Success</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="400">Invalid parameters</response>
    /// <response code="406">Invalid parameters</response>
    [HttpPost("forgot-password")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequestModel requestModel)
    {
        var request = new ForgotPasswordCommand()
        {
            Email = requestModel.Email
        };

        return await Mediator.Send(request);
    }
    
    /// <summary>
    /// Restore user's password
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// POST /user/restore-code
    /// </remarks>
    /// <response code="200">Success</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="400">Invalid parameters</response>
    /// <response code="406">Invalid parameters</response>
    [HttpPost("restore-password")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> RestorePassword([FromBody] RestorePasswordRequestModel requestModel)
    {
        var request = new RestorePasswordCommand()
        {
            Email = requestModel.Email,
            Code = requestModel.Code,
            NewPassword = requestModel.NewPassword,
        };

        return await Mediator.Send(request);
    }
}
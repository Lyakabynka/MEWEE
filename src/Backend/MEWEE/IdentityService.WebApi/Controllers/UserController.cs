using IdentityService.Application.Mediatr.User.Commands.AcceptFollow;
using IdentityService.Application.Mediatr.User.Commands.ChangePassword;
using IdentityService.Application.Mediatr.User.Commands.CheckForgotPasswordCode;
using IdentityService.Application.Mediatr.User.Commands.ConfirmEmail;
using IdentityService.Application.Mediatr.User.Commands.Follow;
using IdentityService.Application.Mediatr.User.Commands.ForgotPassword;
using IdentityService.Application.Mediatr.User.Commands.Register;
using IdentityService.Application.Mediatr.User.Commands.RestorePassword;
using IdentityService.Application.Mediatr.User.Commands.Unfollow;
using IdentityService.Application.Mediatr.User.Commands.UpdateProfile;
using IdentityService.Application.Mediatr.User.Queries.Followers;
using IdentityService.Application.Mediatr.User.Queries.Followings;
using IdentityService.Application.Mediatr.User.Queries.Profile;
using IdentityService.WebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IdentityService.WebApi.Controllers;

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
    [HttpPost("user/register")]
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
    /// GET /user/profile
    /// </remarks>
    /// <response code="200">Success</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="400">Invalid parameters</response>
    [HttpGet("user/profile/{userId:guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetUsersProfile([FromRoute] Guid userId)
    {
        var request = new GetUserProfileQuery()
        {
            UserId = userId
        };

        return await Mediator.Send(request);
    }
    
    /// <summary>
    /// Updates users profile
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// PUT /user/profile
    /// </remarks>
    /// <param name="requestModel">UpdateUserProfileRequestModel with necessary fields</param>
    /// <response code="200">Success</response>
    /// <response code="409">User with provided credentials already exists</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="400">Invalid parameters</response>
    [Authorize]
    [HttpPut("user/profile")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateUserProfile([FromBody] UpdateUserProfileRequestModel requestModel)
    {
        var request = new UpdateProfileCommand()
        {
            UserId = UserId,
            
            ProfileAvatar = requestModel.ProfileAvatar,
            
            Workplace = requestModel.Workplace,
            Website = requestModel.Website,
            Location = requestModel.Location,
        };
        
        return await Mediator.Send(request);
    }
    
    /// <summary>
    /// Follows some user
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// POST /follow-user
    /// </remarks>
    /// <param name="requestModel">FollowUserRequestModel with necessary fields</param>
    /// <response code="200">Success</response>
    /// <response code="409">User with provided credentials already exists</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="400">Invalid parameters</response>
    [Authorize]
    [HttpPost("follow-user")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> FollowUser([FromBody] FollowUserRequestModel requestModel)
    {
        var request = new FollowCommand()
        {
            UserId = UserId,
            FollowingUserId = requestModel.FollowingUserId,
        };
        
        return await Mediator.Send(request);
    }
    
    /// <summary>
    /// Unfollows some user
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// DELETE /unfollow-user
    /// </remarks>
    /// <param name="requestModel">FollowUserRequestModel with necessary fields</param>
    /// <response code="200">Success</response>
    /// <response code="409">User with provided credentials already exists</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="400">Invalid parameters</response>
    [Authorize]
    [HttpDelete("unfollow-user")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UnfollowUser([FromBody] FollowUserRequestModel requestModel)
    {
        var request = new UnfollowCommand()
        {
            UserId = UserId,
            FollowingUserId = requestModel.FollowingUserId,
        };
        
        return await Mediator.Send(request);
    }
    
    /// <summary>
    /// Get followers some user
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// GET /followers
    /// </remarks>
    /// <response code="200">Success</response>
    /// <response code="409">User with provided credentials already exists</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="400">Invalid parameters</response>
    [Authorize]
    [HttpGet("followers")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetFollowers()
    {
        var request = new GetFollowersQuery()
        {
            UserId = UserId,
        };
        
        return await Mediator.Send(request);
    }
    
    /// <summary>
    /// Get followers some user
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// GET /followings
    /// </remarks>
    /// <response code="200">Success</response>
    /// <response code="409">User with provided credentials already exists</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="400">Invalid parameters</response>
    [Authorize]
    [HttpGet("followings")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetFollowings()
    {
        var request = new GetFollowingsQuery()
        {
            UserId = UserId,
        };
        
        return await Mediator.Send(request);
    }
    
    /// <summary>
    /// Get followers some user
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// POST /accept-follower
    /// </remarks>
    /// <response code="200">Success</response>
    /// <response code="409">User with provided credentials already exists</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="400">Invalid parameters</response>
    [Authorize]
    [HttpPost("accept-follower")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetFollowings([FromBody] AcceptFollowRequestModel requestModel)
    {
        var request = new AcceptFollowCommand()
        {
            UserId = UserId,
            FollowerUserId = requestModel.FollowerUserId,
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
    [HttpPost("user/confirm-email")]
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
    [HttpPost("user/change-password")]
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
    [HttpPost("user/forgot-password")]
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
    /// Checks validity of user's forgot password code
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// POST /user/check-forgot-password
    /// </remarks>
    /// <response code="200">Success</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="400">Invalid parameters</response>
    /// <response code="406">Invalid parameters</response>
    [HttpPost("user/check-forgot-password")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CheckForgotPasswordCode([FromBody] CheckForgotPasswordCodeRequestModel requestModel)
    {
        var request = new CheckForgotPasswordCodeCommand()
        {
            Email = requestModel.Email,
            Code = requestModel.Code,
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
    [HttpPost("user/restore-password")]
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
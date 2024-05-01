﻿using MessagingService.Application.Mediatr.Post.Commands.CreatePost;
using MessagingService.Application.Mediatr.Post.Commands.DeletePost;
using MessagingService.Application.Mediatr.Post.Commands.UpdatePost;
using MessagingService.Application.Mediatr.Post.Queries.FindPosts;
using MessagingService.Application.Mediatr.Post.Queries.GetPosts;
using MessagingService.Application.Mediatr.PostLikes.Commands.CreatePostLike;
using MessagingService.Application.Mediatr.PostLikes.Queries.GetPostLikes;
using MessagingService.WebApi.Models;
using MessagingService.WebApi.Models.Post;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MessagingService.WebApi.Controllers;

public class PostController : ApiControllerBase
{
    /// <summary>
    /// Creates a Post
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// POST /post
    /// </remarks>
    /// <param name="requestModel">CreatePostRequestModel with necessary fields</param>
    /// <response code="200">Success</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="400">Invalid parameters</response>
    /// <response code="406">Invalid parameters</response>
    [HttpPost("post")]
    [Authorize]
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
    
    /// <summary>
    /// Updated a Post
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// PUT /post
    /// </remarks>
    /// <param name="requestModel">UpdatePostRequestModel with necessary fields</param>
    /// <response code="200">Success</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="400">Invalid parameters</response>
    /// <response code="406">Invalid parameters</response>
    [HttpPut("post")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status406NotAcceptable)]
    public async Task<IActionResult> UpdatePost([FromBody] UpdatePostRequestModel requestModel)
    {
        var request = new UpdatePostCommand()
        {
            Id = requestModel.Id,
            Title = requestModel.Title,
            Content = requestModel.Content,
            Attachment = requestModel.Attachment,
            UserId = UserId,
        };
        
        return await Mediator.Send(request);
    }
    
    /// <summary>
    /// Gets posts of specific user
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// GET /posts
    /// </remarks>
    /// <param name="requestModel">GetPostsRequestModel with necessary fields</param>
    /// <response code="200">Success</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="400">Invalid parameters</response>
    /// <response code="406">Invalid parameters</response>
    [HttpPost("posts")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status406NotAcceptable)]
    public async Task<IActionResult> GetPosts([FromBody] GetPostsRequestModel requestModel)
    {
        var request = new GetPostsQuery()
        {
            UserId = requestModel.UserId
        };
        
        return await Mediator.Send(request);
    }
    
    
    /// <summary>
    /// Deletes specific post
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// DELETE /post
    /// </remarks>
    /// <param name="requestModel">DeletePostRequestModel with necessary fields</param>
    /// <response code="200">Success</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="400">Invalid parameters</response>
    /// <response code="406">Invalid parameters</response>
    [HttpDelete("post")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status406NotAcceptable)]
    public async Task<IActionResult> DeletePost([FromBody] DeletePostRequestModel requestModel)
    {
        var request = new DeletePostCommand()
        {
            Id = requestModel.Id,
            UserId = UserId
        };
        
        return await Mediator.Send(request);
    }
    
    /// <summary>
    /// Find posts
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// GET /posts/search
    /// </remarks>
    /// <param name="requestModel">FindPostsRequestModel with necessary fields</param>
    /// <response code="200">Success</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="400">Invalid parameters</response>
    /// <response code="406">Invalid parameters</response>
    [HttpPost("posts/find")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status406NotAcceptable)]
    public async Task<IActionResult> FindPosts([FromBody] FindPostsRequestModel requestModel)
    {
        var request = new FindPostsQuery()
        {
            SearchQuery = requestModel.SearchQuery,
            Pagination = requestModel.Pagination
        };
        
        return await Mediator.Send(request);
    }
    
    /// <summary>
    /// Gets likes of specific post
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// GET /posts-likes
    /// </remarks>
    /// <param name="requestModel">GetPostsRequestModel with necessary fields</param>
    /// <response code="200">Success</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="400">Invalid parameters</response>
    /// <response code="406">Invalid parameters</response>
    [HttpPost("post-likes")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status406NotAcceptable)]
    public async Task<IActionResult> GetPostLikes([FromBody] GetPostLikesRequestModel requestModel)
    {
        var request = new GetPostLikesQuery()
        {
            UserId = UserId,
            PostId = requestModel.PostId
        };
        
        return await Mediator.Send(request);
    }
    
    /// <summary>
    /// Likes a post
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// POST /like-post
    /// </remarks>
    /// <param name="requestModel">CreatePostLikeRequestModel with necessary fields</param>
    /// <response code="200">Success</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="400">Invalid parameters</response>
    /// <response code="406">Invalid parameters</response>
    [HttpPost("like-post")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status406NotAcceptable)]
    public async Task<IActionResult> CreatePostLike([FromBody] CreatePostLikeRequestModel requestModel)
    {
        var request = new CreatePostLikeCommand()
        {
            PostId = requestModel.PostId,
            UserId = UserId,
        };
        
        return await Mediator.Send(request);
    }
    
    /// <summary>
    /// Unlikes a post
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// POST /unlike-post
    /// </remarks>
    /// <param name="requestModel">DeletePostLikeRequestModel with necessary fields</param>
    /// <response code="200">Success</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="400">Invalid parameters</response>
    /// <response code="406">Invalid parameters</response>
    [HttpPost("unlike-post")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status406NotAcceptable)]
    public async Task<IActionResult> DeletePostLike([FromBody] DeletePostLikeRequestModel requestModel)
    {
        var request = new CreatePostLikeCommand()
        {
            PostId = requestModel.PostId,
            UserId = UserId,
        };
        
        return await Mediator.Send(request);
    }
}
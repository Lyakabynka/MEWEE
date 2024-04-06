﻿using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;

namespace IdentityService.Application.Mediatr.User.Queries;

public class GetEmailConfirmedQuery : IValidatableRequest<Result>
{
    public string Email { get; set; }
}
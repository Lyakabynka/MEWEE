﻿namespace IdentityService.WebApi.Models;

public class CheckForgotPasswordCodeRequestModel
{
    public string Email { get; set; } 
    public string Code { get; set; }
}
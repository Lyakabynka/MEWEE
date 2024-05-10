﻿namespace IdentityService.WebApi.Models;

public class UpdateUserProfileRequestModel
{
    public string? Workplace { get; set; }
    public string? Username { get; set; }
    public string? Website { get; set; }
    public string? Status { get; set; }
    public string? ProfileAvatar { get; set; }
    public string? Location { get; set; }
}
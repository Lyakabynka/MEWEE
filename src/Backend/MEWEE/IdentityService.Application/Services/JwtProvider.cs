﻿using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using IdentityService.Application.Configurations;
using IdentityService.Domain.Entities;
using Microsoft.IdentityModel.Tokens;

namespace IdentityService.Application.Services;

public class JwtProvider
{
    private readonly JwtConfiguration _configuration;
    public JwtProvider(JwtConfiguration configuration) =>
        _configuration = configuration;

    public string CreateToken(User user)
    {
        var claims = new List<Claim>()
        {
            new Claim("userId", user.Id.ToString()),
            new Claim("role", user.Role.ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.Key));

        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var token = new JwtSecurityToken(
            _configuration.Issuer,
            _configuration.Audience,
            claims,
            null,
            DateTime.Now.AddMinutes(_configuration.MinutesToExpiration),
            credentials
        );

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        return jwt;
    }
}
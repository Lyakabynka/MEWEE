using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer().AddSwaggerGen();


var app = builder.Build();

app.UseSwagger().UseSwaggerUI();

app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/", (ClaimsPrincipal user) =>
{
    app.Logger.LogInformation(user.Identity?.Name);
}).RequireAuthorization();

app.Run();
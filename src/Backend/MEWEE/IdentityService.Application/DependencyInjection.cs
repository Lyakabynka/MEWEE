using System.Reflection;
using FluentValidation;
using IdentityService.Application.Features.Behaviors;
using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace IdentityService.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<JwtProvider>();
        services.AddScoped<CookieProvider>();
        services.AddScoped<IEmailService, EmailService>();

        services.AddMediatR(config =>
        {
            config.RegisterServicesFromAssemblies(Assembly.GetExecutingAssembly());

            config.AddOpenBehavior(typeof(ValidationBehavior<,>));
        });
        
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
        
        //TODO: services.AddSignalR();

        return services;
    }
}
using IdentityService.Application.Configurations;
using Microsoft.Extensions.Options;

namespace IdentityService.WebApi;

public static class ConfigureOptionsDependencyInjection
{
    public static IServiceCollection AddCustomConfigurations(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<DatabaseConfiguration>(
            configuration.GetRequiredSection(DatabaseConfiguration.DatabaseSection));
        services.AddSingleton(resolver =>
            resolver.GetRequiredService<IOptions<DatabaseConfiguration>>().Value);
        //
        services.Configure<JwtConfiguration>(
            configuration.GetRequiredSection(JwtConfiguration.JwtSection));
        services.AddSingleton(resolver =>
            resolver.GetRequiredService<IOptions<JwtConfiguration>>().Value);
        
        services.ConfigureOptions<ConfigureJwtBearerOptions>();
        //
        services.Configure<RefreshSessionConfiguration>(
            configuration.GetRequiredSection(RefreshSessionConfiguration.RefreshSessionSection));
        services.AddSingleton(resolver =>
            resolver.GetRequiredService<IOptions<RefreshSessionConfiguration>>().Value);
        return services;
    }
}
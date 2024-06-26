using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;
using IdentityService.Application;
using IdentityService.Persistence;
using IdentityService.WebApi;
using IdentityService.WebApi.Middleware;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;

// Allow DateTime for postgres
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddEnvironmentVariables();

builder.Services.AddHttpContextAccessor();

builder.Services.AddCustomConfigurations(builder.Configuration);

builder.Services.AddAuthentication(config =>
    {
        config.DefaultAuthenticateScheme = 
            JwtBearerDefaults.AuthenticationScheme;
        config.DefaultChallengeScheme = 
            JwtBearerDefaults.AuthenticationScheme;
    }) 
    .AddJwtBearer()
    .AddCookie();

builder.Services.AddApplication();
builder.Services.AddPersistence();

builder.Services.AddCors(options =>
{
    // All clients (temporary)
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
        policy.AllowAnyOrigin();
    });
});

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.DictionaryKeyPolicy = JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

//swagger
builder.Services.AddSwaggerGen(config =>
{
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    config.IncludeXmlComments(xmlPath);

    config.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Cookie,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var serviceProvider = scope.ServiceProvider;
    try
    {
        var context = serviceProvider.GetRequiredService<ApplicationDbContext>();
        DatabaseInitializer.Initialize(context);
    }
    catch(Exception ex)
    {
        //TODO: refactor this
        Console.WriteLine(ex.Message);
    }
}

app.UseCustomExceptionHandler();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors("AllowAll");

app.UseSwagger();
app.UseSwaggerUI(config =>
{
    // show swagger page using root Uri
    config.RoutePrefix = string.Empty;

    config.SwaggerEndpoint("swagger/v1/swagger.json", "MEWEE IdentityService RestAPI");
});

app.MapControllers();

app.MapGet("/", () => Results.Ok("Works!"));

app.Run();
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;
using MessagingService.Application;
using MessagingService.Application.Hubs;
using MessagingService.Persistence;
using MessagingService.WebApi;
using MessagingService.WebApi.Middleware;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.SignalR;
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
    config.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    config.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}) 
.AddJwtBearer()
.AddCookie();

builder.Services.AddApplication();
builder.Services.AddPersistence();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        x =>
            x.WithOrigins("http://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials());

    options.AddPolicy("SignalRCors", policy =>
    {
        policy.AllowCredentials();
        policy.WithOrigins("http://localhost:5000", "https://localhost:5002","https://localhost:3000"); // Add your localhost origins here
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
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

// Swagger
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
        // TODO: refactor this
        Console.WriteLine(ex.Message);
    }
}

app.UseCustomExceptionHandler();

app.UseAuthentication();


app.UseCors("AllowAll"); // Apply CORS policy globally

app.UseSwagger();
app.UseSwaggerUI(config =>
{
    // Show swagger page using root Uri
    config.RoutePrefix = string.Empty;

    config.SwaggerEndpoint("swagger/v1/swagger.json", "MEWEE MessagingService RestAPI");
});

app.MapControllers();

app.MapGet("/", () => Results.Ok("Works!"));

app.UseRouting();
app.UseAuthorization();
app.UseCors("SignalRCors"); // Apply CORS policy for SignalR


// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.MapHub<MessageHub>("/hubs/message", options =>
{
    options.Transports = HttpTransportType.WebSockets | HttpTransportType.LongPolling;
});


app.Run();

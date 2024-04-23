FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["MessagingService.WebApi/MessagingService.WebApi.csproj", "MessagingService.WebApi/"]
COPY ["MessagingService.Application/MessagingService.Application.csproj", "MessagingService.Application/"]
COPY ["MessagingService.Domain/MessagingService.Domain.csproj", "MessagingService.Domain/"]
COPY ["MessagingService.Persistence/MessagingService.Persistence.csproj", "MessagingService.Persistence/"]
RUN dotnet restore "MessagingService.WebApi/MessagingService.WebApi.csproj"
COPY . .
WORKDIR "/src/MessagingService.WebApi"
RUN dotnet build "MessagingService.WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MessagingService.WebApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MessagingService.WebApi.dll"]

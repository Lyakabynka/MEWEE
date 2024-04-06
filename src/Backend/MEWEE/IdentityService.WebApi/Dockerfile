FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["IdentityService.WebApi/IdentityService.WebApi.csproj", "IdentityService.WebApi/"]
COPY ["IdentityService.Application/IdentityService.Application.csproj", "IdentityService.Application/"]
COPY ["IdentityService.Domain/IdentityService.Domain.csproj", "IdentityService.Domain/"]
COPY ["IdentityService.Persistence/IdentityService.Persistence.csproj", "IdentityService.Persistence/"]
RUN dotnet restore "IdentityService.WebApi/IdentityService.WebApi.csproj"
COPY . .
WORKDIR "/src/IdentityService.WebApi"
RUN dotnet build "IdentityService.WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "IdentityService.WebApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "IdentityService.WebApi.dll"]

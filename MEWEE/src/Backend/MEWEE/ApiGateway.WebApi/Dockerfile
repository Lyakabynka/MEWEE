FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["ApiGateway.WebApi/ApiGateway.WebApi.csproj", "ApiGateway.WebApi/"]
RUN dotnet restore "ApiGateway.WebApi/ApiGateway.WebApi.csproj"

COPY . .
WORKDIR "/src/ApiGateway.WebApi"
RUN dotnet build "ApiGateway.WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ApiGateway.WebApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ApiGateway.WebApi.dll"]

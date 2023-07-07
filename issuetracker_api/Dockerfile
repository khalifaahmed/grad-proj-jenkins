FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 5255

ENV ASPNETCORE_URLS=http://+:5255

# Creates a non-root user with an explicit UID and adds permission to access the /app folder
# For more info, please refer to https://aka.ms/vscode-docker-dotnet-configure-containers
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

COPY ./issuetracker.Api/issuetracker.Api.csproj ./issuetracker.Api/
COPY ./issuetracker.Entities/issuetracker.Entities.csproj ./issuetracker.Entities/
COPY ./issuetracker.Email/issuetracker.Email.csproj ./issuetracker.Email/
COPY ./issuetracker.Aws/issuetracker.Aws.csproj ./issuetracker.Aws/
COPY ./issuetracker.Dtos/issuetracker.Dtos.csproj ./issuetracker.Dtos/
COPY ./issuetracker.ViewModels/issuetracker.ViewModels.csproj ./issuetracker.ViewModels/
COPY ./issuetracker.Database/issuetracker.Database.csproj ./issuetracker.Database/
COPY ./issuetracker.Services/issuetracker.Services.csproj ./issuetracker.Services/
COPY ./issuetracker.notification/issuetracker.notification.csproj ./issuetracker.notification/
COPY ./issuetracker.Hubs/issuetracker.Hubs.csproj ./issuetracker.Hubs/


RUN dotnet restore ./issuetracker.Api/issuetracker.Api.csproj


COPY ./issuetracker.Api ./issuetracker.Api
COPY ./issuetracker.Entities ./issuetracker.Entities
COPY ./issuetracker.Email ./issuetracker.Email
COPY ./issuetracker.Aws ./issuetracker.Aws
COPY ./issuetracker.Dtos ./issuetracker.Dtos
COPY ./issuetracker.Database ./issuetracker.Database
COPY ./issuetracker.ViewModels ./issuetracker.ViewModels
COPY ./issuetracker.Services ./issuetracker.Services
COPY ./issuetracker.notification ./issuetracker.notification
COPY ./issuetracker.Hubs ./issuetracker.Hubs


WORKDIR "/src/issuetracker.Api"
RUN dotnet build "issuetracker.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "issuetracker.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "issuetracker.Api.dll"]

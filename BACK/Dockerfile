#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Defina as variáveis de ambiente
ENV Jwt__Key="21021986210219862102198621021986210219862102198621021986"
ENV Jwt__Issuer="KanbanSystem"
ENV Jwt__Audience="KanbanSystem"
ENV Jwt__ExpireMin=5
ENV Credentials__Username="letscode"
ENV Credentials__Password="lets@123"

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["KanbanSystem.csproj", "."]
RUN dotnet restore "./KanbanSystem.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "KanbanSystem.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "KanbanSystem.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "KanbanSystem.dll"]
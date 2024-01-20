using KanbanSystem.DependencyInjection;
using KanbanSystem.Repositories;
using KanbanSystem.Utils;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
{
    builder.AllowAnyHeader()
           .AllowAnyMethod()
           .SetIsOriginAllowed((host) => true)
           .AllowCredentials();
}));
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Carregando as informa��es do arquivo de configura��es para classes que poderam ser utilizadas na API.
builder.Services.Configure<Credentials>(builder.Configuration.GetSection("Credentials"));
builder.Services.Configure<JwtToken>(builder.Configuration.GetSection("Jwt"));

// Adiciona a configura��o do banco em mem�ria
builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseInMemoryDatabase(databaseName: "KanbanSystemDB"));

// Adicionando a inje��o de depend�ncia da camada de servi�o.
builder.Services.KanbanSystemService();

// Adiciona o JWT
builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

var app = builder.Build();

// configurar o CORS
app.UseCors("MyPolicy");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
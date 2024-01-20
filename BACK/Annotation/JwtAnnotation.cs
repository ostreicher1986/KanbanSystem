using KanbanSystem.Utils;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace KanbanSystem.Annotation
{
    public class JwtAnnotation : Attribute, IAsyncActionFilter
    {

        private readonly JwtToken _token;

        public JwtAnnotation(IOptions<JwtToken> token)
        {
            _token = token.Value;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            // Verifica se o token está presente no cabeçalho da requisição
            if (!context.HttpContext.Request.Headers.ContainsKey("Authorization"))
            {
                context.HttpContext.Response.StatusCode = 401;
                return;
            }

            var token = context.HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(_token.Key);

                // Configuração de validação do token
                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = _token.Issuer,
                    ValidAudience = _token.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(key)
                };

                // Tenta validar e decodificar o token
                var principal = tokenHandler.ValidateToken(token, validationParameters, out _);

                // Verifica se o token não está expirado
                if (principal.Identity.IsAuthenticated)
                {   
                    await next();
                }
                else
                {
                    context.HttpContext.Response.StatusCode = 401;
                }
            }
            catch (Exception)
            {
                // Em caso de falha na validação, retorna status 401
                context.HttpContext.Response.StatusCode = 401;
            }
        }
    }
}

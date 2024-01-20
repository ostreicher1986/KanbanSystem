using KanbanSystem.Models;
using KanbanSystem.Utils;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace KanbanSystem.Services.Login
{
    public class LoginService: ILoginService
    {

        private readonly JwtToken _token;

        private readonly Credentials _credentials;

        public LoginService(IOptions<JwtToken> token, IOptions<Credentials> credentials)
        {
            _token = token.Value;
            _credentials = credentials.Value;
        }

        public bool IsValidUser(UserModel credentials)
        {            
            return credentials.Login == _credentials.Username && credentials.Password == _credentials.Password;
        }

        public string GenerateJwtToken()
        {
            try
            {
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_token.Key));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    _token.Issuer,
                    _token.Audience,
                    expires: DateTime.Now.AddMinutes(_token.ExpireMin),
                    signingCredentials: creds
                );

                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            catch (Exception)
            {
                throw;
            }
            
        }

    }
}

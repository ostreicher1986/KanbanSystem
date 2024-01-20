using KanbanSystem.Models;
using KanbanSystem.Services.Login;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace KanbanSystem.Controllers
{
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _loginService;

        public LoginController(ILoginService loginService) 
        {
            _loginService = loginService;
        }

        [HttpPost("Login")]
        public IActionResult Login([FromBody] UserModel credentials)
        {
            IActionResult result = null;

            try
            {
                if (ModelState.IsValid)
                {
                    if (_loginService.IsValidUser(credentials))
                    {
                        var token = _loginService.GenerateJwtToken();
                        result = Ok( new { Token = token, Success = true, Message = "Bem-vindo ao Kanban System" });
                    }
                    else
                    {
                        result = Unauthorized(new { Token = "", Success = false, Message = "Login inválido" });
                    }
                    
                }
                else
                {
                    result = BadRequest(new { Token = "", Success = false, Message = "Login inválido" });
                }
                
                
            }
            catch (Exception)
            {
                throw;
            }

            return result;
            
        }

    }
}

using KanbanSystem.Models;

namespace KanbanSystem.Services.Login
{
    public interface ILoginService
    {
        bool IsValidUser(UserModel credentials);

        string GenerateJwtToken();

    }
}

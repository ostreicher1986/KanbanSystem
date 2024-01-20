using KanbanSystem.Services.Card;
using KanbanSystem.Services.Login;

namespace KanbanSystem.DependencyInjection
{
    public static class DIExtensions
    {
        public static IServiceCollection KanbanSystemService(this IServiceCollection services)
        {
            services.AddScoped<ILoginService, LoginService>();
            services.AddScoped<ICardService, CardService>();

            return services;
        }

    }
}

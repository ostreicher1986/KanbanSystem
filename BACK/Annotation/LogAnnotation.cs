using Microsoft.AspNetCore.Mvc.Filters;

namespace KanbanSystem.Annotation
{
    public class LogAnnotation : Attribute, IAsyncActionFilter
    {   

        public LogAnnotation()
        {
            
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            try
            {
                // Verifica se a ação é um PUT ou DELETE
                if (context.HttpContext.Request.Method == "PUT" || context.HttpContext.Request.Method == "DELETE")
                {
                    // Formata o horário como solicitado
                    var timestamp = DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss");

                    // Obtém informações sobre o card (id e título) se disponíveis
                    var cardId = context.RouteData.Values["id"];

                    // Obtém o tipo de ação (Remover ou Alterar)
                    var action = context.HttpContext.Request.Method == "PUT" ? "Alterar" : "Remover";

                    // Escreve a linha de log no console
                    Console.WriteLine($"{timestamp} - Card {cardId} - {action}");
                }

                await next();

            }
            catch (Exception)
            {
                throw;
            }

        }
    }
}

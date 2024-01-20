using KanbanSystem.Annotation;
using KanbanSystem.Models;
using KanbanSystem.Services.Card;
using Microsoft.AspNetCore.Mvc;

namespace KanbanSystem.Controllers
{
    [ApiController]
    public class CardController : ControllerBase
    {
        private readonly ICardService _cardService;

        public CardController(ICardService cardService) 
        {
            _cardService = cardService;
        }


        [HttpGet("Cards")]
        [TypeFilter(typeof(JwtAnnotation))]
        public IActionResult GetCards()
        {
            IActionResult? result = null;

            IEnumerable<CardModel>? cards = new List<CardModel>();

            try
            {

                if (ModelState.IsValid)
                {
                    cards = _cardService.GetAll();

                    result = Ok(new { Result = cards, Success = true, Message = "Lista de cards carregadas com sucesso." });
                }
                else
                {

                    result = BadRequest(new { Result = cards, Success = false, Message = "Lista de cards não encontrada." });
                }

            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                cards = null;
            }

            return result;

        }

        [HttpPost("Cards")]
        [TypeFilter(typeof(JwtAnnotation))]
        public IActionResult AddCard([FromBody] CardModel card)
        {
            IActionResult? result = null;

            string message = null;

            try
            {

                if (ModelState.IsValid)
                {
                    if (card.Id != Guid.Empty)
                    {
                        result = BadRequest(new { Result = card, Success = false, Message = "ID inválido." });

                        return result;
                    }

                    if (CardIsInvalid(card))
                    {

                        result = BadRequest(new { Result = card, Success = false, Message = "Dados de card inválidos." });

                        return result;
                    }

                    card = _cardService.Save(card);

                    if (card == null)
                    {
                        result = BadRequest(new { Result = card, Success = false, Message = "Falha ao salvar o card." });
                    }
                    else
                    {
                        message = string.Format("Card {0} salvo com sucesso.", card.Title);

                        result = Ok(new { Result = card, Success = true, Message = message });
                    }

                }
                else
                {
                    result = BadRequest(new { Result = card, Success = false, Message = "Dados de card inválidos." });
                }

            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                message = null;
            }

            return result;

        }

        [HttpPut("Cards/{id}")]
        [TypeFilter(typeof(JwtAnnotation))]
        [TypeFilter(typeof(LogAnnotation))]
        public IActionResult UpdateCard(Guid id, [FromBody] CardModel card)
        {
            IActionResult? result = null;

            string message = null;

            try
            {

                if (ModelState.IsValid)
                {
                    if (id == Guid.Empty)
                    {
                        result = BadRequest(new { Result = card, Success = false, Message = "ID inválido." });

                        return result;
                    }

                    var doesNotExist = !_cardService.Exists(id);

                    if (doesNotExist)
                    {
                        result = BadRequest(new { Result = card, Success = false, Message = "ID inválido." });

                        return result;
                    }

                    card.Id = id;

                    if (CardIsInvalid(card))
                    {
                        result = BadRequest(new { Result = card, Success = false, Message = "Dados de card inválidos." });

                        return result;
                    }

                    card = _cardService.Edit(card);

                    if (card == null)
                    {

                        result = BadRequest(new { Result = card, Success = false, Message = "Falha ao salvar o card." });

                    }
                    else
                    {
                        message = string.Format("Card {0} atualizado com sucesso.", card.Title);

                        result = Ok(new { Result = card, Success = true, Message = message });
                        
                    }

                }
                else
                {
                    result = BadRequest(new { Result = card, Success = false, Message = "Dados de card inválidos." });
                }

            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                message = null;
            }

            return result;

        }

        [HttpDelete("Cards/{id}")]
        [TypeFilter(typeof(JwtAnnotation))]
        [TypeFilter(typeof(LogAnnotation))]
        public IActionResult DeleteCard(Guid id)
        {
            IActionResult? result = null;

            IEnumerable<CardModel>? cards = new List<CardModel>();

            string message = null;

            try
            {

                if (ModelState.IsValid)
                {
                    if (id == Guid.Empty)
                    {
                        result = BadRequest(new { Result = cards, Success = false, Message = "ID inválido." });

                        return result;

                    }

                    var checkCard = _cardService.Get(id);

                    if (checkCard == null)
                    {
                        result = BadRequest(new { Result = cards, Success = false, Message = "ID inválido." });

                        return result;
                    }

                    var resultServ = _cardService.Delete(id);

                    if (resultServ == null)
                    {

                        result = BadRequest(new { Result = cards, Success = false, Message = "Falha ao remover o card." });
                    }
                    else
                    {
                        cards = _cardService.GetAll();

                        message = string.Format("Card {0} removido com sucesso.", checkCard.Title);

                        result = Ok(new { Result = cards, Success = true, Message = message });
                        
                    }

                }
                else
                {
                    result = BadRequest(new { Result = cards, Success = false, Message = "Falha ao remover o card." });
                }                

            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                cards = null;
                message = null;
            }

            return result;

        }

        private bool CardIsInvalid(CardModel card)
        {
            if (card == null)
                return true;

            if (string.IsNullOrEmpty(card.Title) || string.IsNullOrEmpty(card.Content) || string.IsNullOrEmpty(card.List))
                return true;

            return false;   

        }

    }
}

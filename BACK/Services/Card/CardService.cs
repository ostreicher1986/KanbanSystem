using KanbanSystem.Models;
using KanbanSystem.Repositories;

namespace KanbanSystem.Services.Card
{
    public class CardService: ICardService
    {

        private readonly AppDbContext _context;

        public CardService(AppDbContext context)
        {
            _context = context;
        }

        public CardModel Save(CardModel card)
        {
            CardModel? result = null;

            try
            {
                var newCard = new CardModel
                {
                    Title = card.Title,
                    Content = card.Content,
                    List = card.List
                };

                _context.Cards.Add(newCard);
                _context.SaveChanges();

                result = newCard;

            }
            catch (Exception)
            {
                throw;
            }

            return result;
        }

        public CardModel? Edit(CardModel card)
        {
            CardModel? result = null;

            try
            {
                var existingCard = _context.Cards.Find(card.Id);

                if (existingCard != null) 
                {
                    existingCard.Title = card.Title;
                    existingCard.Content = card.Content;
                    existingCard.List = card.List;

                    _context.SaveChanges();

                    result = existingCard;
                }

            }
            catch (Exception)
            {
                throw;
            }

            return result;
        }

        public CardModel? Delete(Guid id)
        {
            var existingCard = _context.Cards.Find(id);

            if (existingCard == null)
                return null;

            _context.Cards.Remove(existingCard);
            _context.SaveChanges();

            return existingCard;
        }

        public bool Exists(Guid id)
        {
            return _context.Cards.Any(e => e.Id == id);
        }

        public CardModel Get(Guid id)
        {
            return _context.Cards.Find(id); ;
        }

        public IEnumerable<CardModel> GetAll()
        {
            return _context.Cards.ToList();
        }

    }
}

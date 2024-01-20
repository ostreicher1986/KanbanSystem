using KanbanSystem.Models;

namespace KanbanSystem.Services.Card
{
    public interface ICardService
    {

        CardModel? Save(CardModel card);

        CardModel? Edit(CardModel card);

        CardModel? Delete(Guid id);

        bool Exists(Guid id);

        CardModel Get(Guid id);

        IEnumerable<CardModel?> GetAll();

    }
}

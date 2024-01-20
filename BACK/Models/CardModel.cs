namespace KanbanSystem.Models
{
    public class CardModel
    {
        public Guid Id { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
        public string? List { get; set; }
    }
}

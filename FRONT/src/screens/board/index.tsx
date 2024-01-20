import React, { useEffect, useState } from 'react';
import RenderCard from '../../layout/components/renderCard';
import NewCard from '../../layout/components/newCard';
import { getall, update, remove } from '../../services/kanbansystemapi/card.service';

interface CardData {
    id: string;
    title: string;
    content: string;
    list: string;
  }
  
const Index: React.FC = () => { const [cards, setCards] = useState<CardData[]>([]);
  
  const [cardLoaded, setCardLoaded] = useState(false);

  useEffect(() => {

    if (!cardLoaded) {
      
      fetchData();

      setCardLoaded(true);
    
    }

  }, [cards, cardLoaded]);

  // Carrega todos os card do kanban
  const fetchData = async () => {
      
    try {
        
        const res = await getall();
        if (res.success) {

            const cards_ = res.result ?? [];

            setCards([...cards_]);
        }

    } catch (error) {

        console.error('Erro ao obter os cards:', error);

    }

  };

  const handleCreate = async () => {

    setCardLoaded(false);

  };

  const handleEdit = async (id : string) => {    

    setCardLoaded(false);

    console.log('Editar card:', id)

  };

  const handleMoveCard = async (card: CardData, direction: string) => {
    
    try {

        if (direction === 'forward' || direction === 'backward') {

            let dir = 'ToDo';

            if ( direction === 'forward') {
              dir = (card.list === 'ToDo') ? 'Doing' : 'Done';
            } else {
              dir = (card.list === 'Done') ? 'Doing' : 'ToDo';
            }

            const values = {
                id: card.id,
                title: card.title,
                content: card.content,
                list: dir // sinaliza para qual lista o card está se movendo
            }

            const res = await update(card.id, values);
            if (res.success) {

                // Atualize o estado com os cards atualizados
                const updatedCards = cards.map((card) =>
                    card.id === card.id ? { ...card, list: res.result.list } : card
                );
                setCards(updatedCards);

                setCardLoaded(false);

            }

        }
      
    } catch (error) {

      console.error('Erro ao mover o card:', error);

    }

  };

  const handleDeleteCard = async (cardId: string) => {
    
    try {
    
        const res = await remove(cardId);
        if (res.success) {

            // Atualize o estado com os cards atualizados
            const updatedCards = cards.map((card) =>
                card.id === cardId ? { ...card, list: res.result.list } : card
            );
            setCards(updatedCards);

            setCardLoaded(false);

        }

    } catch (error) {

      console.error('Erro ao excluir o card:', error);

    }

  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div style={{ flex: 1, backgroundColor: '#00BFFF', padding: '10px', borderRadius: '5px', margin: '10px' }}>
        <NewCard onSubmit={handleCreate} />
      </div>
      <div style={{ flex: 1, backgroundColor: '#FFD700', padding: '10px', borderRadius: '5px', margin: '10px' }}>
        <h2 style={{ color: '#fff' }}>To Do</h2>
        {cards.filter(item => item.list === 'ToDo').length > 0 ? (
            cards
            .filter((card) => card.list === 'ToDo')
            .map((card) => (
              <RenderCard
                key={card.id}
                card={card}
                onDelete={handleDeleteCard}
                onEdit={() => handleEdit(card.id)}
                onMoveBackward={() => handleMoveCard(card, 'backward')}
                onMoveForward={() => handleMoveCard(card, 'forward')}
              />
            ))
          ) : (
            <h2 style={{ color: '#000' }}><p>Nenhum card encontrado.</p></h2>
          )
        }
      </div>
      <div style={{ flex: 1, backgroundColor: '#EE8262', padding: '10px', borderRadius: '5px', margin: '10px' }}>
        <h2 style={{ color: '#fff' }}>Doing</h2>
        {cards.filter(item => item.list === 'Doing').length > 0 ? (
            cards
            .filter((card) => card.list === 'Doing')
            .map((card) => (
              <RenderCard
                key={card.id}
                card={card}
                onDelete={handleDeleteCard}
                onEdit={() => handleEdit(card.id)}
                onMoveBackward={() => handleMoveCard(card, 'backward')}
                onMoveForward={() => handleMoveCard(card, 'forward')}
              />
            ))
          ) : (
            <h2 style={{ color: '#000' }}><p>Nenhum card encontrado.</p></h2>
          )
        }
      </div>
      <div style={{ flex: 1, backgroundColor: '#00CD66', padding: '10px', borderRadius: '5px', margin: '10px' }}>
        <h2 style={{ color: '#fff' }}>Done</h2>
        {cards.filter(item => item.list === 'Done').length > 0 ? (
            cards
            .filter((card) => card.list === 'Done')
            .map((card) => (
              <RenderCard
                key={card.id}
                card={card}
                onDelete={handleDeleteCard}
                onEdit={() => handleEdit(card.id)}
                onMoveBackward={() => handleMoveCard(card, 'backward')}
                onMoveForward={() => handleMoveCard(card, 'forward')}
              />
            ))
          ) : (
            <h2 style={{ color: '#000' }}><p>Nenhum card encontrado.</p></h2>
          )
        }
      </div>
    </div>
  );
};
  
export default Index;
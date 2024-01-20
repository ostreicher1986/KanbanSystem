import React, { useState } from 'react';
import InputText from '../../../layout/components/inputs/inputText';
import InputTextArea from '../../../layout/components/inputs/inputTextarea';
import { Button } from 'primereact/button';
import { save } from '../../../services/kanbansystemapi/card.service';

interface NewCardProps {
  onSubmit: () => void;
}

const NewCard: React.FC<NewCardProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreate = async () => {
    
    try {

      const values = {
        title: title,
        content: content,
        list: 'ToDo'
      }

      const res = await save(values);
      if (res.success) {
        
        // Limpar os campos do formulário após a criação do card
        await handleClean();

        onSubmit();

      }

    } catch (error) {

      console.error('Erro ao criar o card:', error);

    }

  };

  const handleClean = async  () => {
    
    try {

        // Limpar os campos do formulário após a criação do card
        setTitle('');
        setContent('');

    } catch (error) {

      console.error('Erro ao limpar o card:', error);

    }

  };

  return (
    <div>
      <h2 style={{ color: '#fff' }}>Novo</h2>
      <div className="p-col-12 p-md-6">
          <InputText
              name="title"
              value={title}
              label="Título"
              onChange={(e) => setTitle(e.target.value)}
          />
      </div>
      <div className="p-col-12 p-md-6">
          <InputTextArea
              name="content"
              value={content}
              label="Conteúdo"
              onChange={(e) => setContent(e.target.value)}
          />
      </div>
      <div className="p-grid p-fluid p-justify-center" style={{ marginTop: "5px" }}>
        <div className="p-col-12 p-md-3">
          <Button
              onClick={handleCreate} 
              className="p-button-secondary"
              icon="pi pi-save" 
              disabled={!title || !content}
            />
        </div>
        <div className="p-col-12 p-md-3">
          <Button 
              onClick={handleClean} 
              className="p-button-secondary" 
              icon="pi pi-trash"
              disabled={!title || !content}
            />
        </div>        
      </div>
    </div>
  );
};

export default NewCard;
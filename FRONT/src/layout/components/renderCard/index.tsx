import React, { useState } from 'react';
//import DOMPurify from 'dompurify';
//import marked from 'marked';
import InputText from '../../../layout/components/inputs/inputText';
import InputTextArea from '../../../layout/components/inputs/inputTextarea';
import { update } from '../../../services/kanbansystemapi/card.service';
import { Value } from '../../../layout/styles/viewData';
import Label from '../../../layout/components/labelattribute';
import { Button } from 'primereact/button';

//const marked = require('marked');

interface RenderCardProps {
  card: {
    id: string;
    title: string;
    content: string;
    list: string;
  };
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onMoveBackward: (id: string) => void;
  onMoveForward: (id: string) => void;
}

const RenderCard: React.FC<RenderCardProps> = ({ card, onDelete, onEdit, onMoveBackward, onMoveForward }) => {
  const [isEditing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(card.title);
  const [newContent, setNewContent] = useState(card.content);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    
    setEditing(false);

    // Informar os campos com os valores originais
    setNewTitle(card.title);
    setNewContent(card.content);

  };

  const handleSave = async () => {
    
    try {
        
        const values = {
            id: card.id,
            title: newTitle,
            content: newContent,
            list: card.list,    
        }

        const res = await update(card.id, values);
        if (res.success) {
            // Finalizar o modo de edição
            setEditing(false);

            onEdit(card.id);
        }

    } catch (error) {

      console.error('Erro ao salvar o card:', error);

    }

  };

  const renderMarkdown = (content: string) => {
    //const sanitizedHTML = DOMPurify.sanitize(marked(content));
    const sanitizedHTML = content;
    return { __html: sanitizedHTML };
  };

  const titleStyle = {
    borderBottom: '2px solid #fff', // Cor e estilo da linha de separação
    marginBottom: '10px', // Ajuste de margem para espaçamento
  };

  return (
    <div>
      <div>
        <div style={{ flex: 1, padding: '10px', borderRadius: '5px', margin: '10px' }}>
          <div className="p-grid p-fluid p-justify-end" style={{ marginTop: "5px" }}>
            <div className="p-col-12 p-md-6" style={titleStyle}>
                <h3>
                  <Label name='title'>Título</Label>
                  <Value>{card.title}</Value>
                </h3>
            </div>
            <div className="p-col-12 p-md-6">
              <Button 
                  onClick={handleEdit}
                  icon="pi pi-pencil"
                />
            </div>
          </div>
          <div className="p-col-12 p-md-6">            
              <Label name='content'>Conteúdo</Label>
              <Value>
                <div dangerouslySetInnerHTML={renderMarkdown(card.content)} />
              </Value>
          </div>        
          <div className="p-grid p-fluid p-justify-left" style={{ marginTop: "5px" }}>
            <div className="p-col-12 p-md-3">
              <Button 
                  onClick={() => onMoveBackward(card.id)}
                  className="p-button-secondary" 
                  icon="pi pi-backward"
                />
            </div>
            <div className="p-col-12 p-md-3">
              <Button
                  onClick={() => onDelete(card.id)}
                  className="p-button-secondary"
                  icon="pi pi-trash"
                />
            </div>
            <div className="p-col-12 p-md-3">
              <Button 
                  onClick={() => onMoveForward(card.id)}
                  className="p-button-secondary" 
                  icon="pi pi-forward"
                />
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div>
            <div className="p-col-12 p-md-6">
                <InputText
                    name="title"
                    value={newTitle}
                    label="Novo Título"
                    onChange={(e) => setNewTitle(e.target.value)}
                />
            </div>
            <div className="p-col-12 p-md-6">
                <InputTextArea
                    name="content"
                    value={newContent}
                    label="Novo Conteúdo"
                    onChange={(e) => setNewContent(e.target.value)}
                />
            </div>
            <div className="p-grid p-fluid p-justify-end" style={{ marginTop: "5px" }}>
              <div className="p-col-12 p-md-6">
                <Button 
                    onClick={handleCancelEdit}
                    className="p-button-secondary" 
                    label="Cancelar" 
                  />
              </div>
              <div className="p-col-12 p-md-6">
                <Button 
                    onClick={handleSave}
                    className="p-button-secondary" 
                    label="Salvar" 
                  />
              </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default RenderCard;

// EditarPropostaModal.tsx
import React, { useState, useEffect } from 'react';
import styles from './EditarPropostaModal.module.css';

interface EditarPropostaModalProps {
  isOpen: boolean;
  propostaAtual: string;
  onClose: () => void;
  onSave: (proposta: string) => void;
}

const EditarPropostaModal: React.FC<EditarPropostaModalProps> = ({ isOpen, propostaAtual, onClose, onSave }) => {
  const [novaProposta, setNovaProposta] = useState<string>(propostaAtual);

  useEffect(() => {
    setNovaProposta(propostaAtual);
  }, [propostaAtual]);

  const handleSave = () => {
    onSave(novaProposta);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Editar Proposta</h2>
            <textarea
              className={styles.modalInput}
              value={novaProposta}
              onChange={(e) => setNovaProposta(e.target.value)}
              rows={4}
              placeholder="Digite a proposta aqui..."
            />
            <div className={styles.modalButtons}>
              <button onClick={handleSave} className={styles.modalButtonSave}>Salvar</button>
              <button onClick={onClose} className={styles.modalButtonCancel}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditarPropostaModal;

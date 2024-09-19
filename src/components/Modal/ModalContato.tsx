import React, { useState, useEffect } from 'react';
import Modal from './Modal'; // Seu componente Modal
import styles from './ModalContato.module.css'; // Estilos específicos do modal de contato

const ContatoModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (email: string, mensagem: string) => void;
}> = ({ isOpen, onClose, onConfirm }) => {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  // Limpa os campos quando o modal for fechado
  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setMensagem('');
    }
  }, [isOpen]);

  const handleConfirm = () => {
    if (email && mensagem) {
      onConfirm(email, mensagem); // Passa os dados para a função onConfirm
    }
  };

  return (
    <Modal
      title="Entre em contato"
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      confirmLabel="Enviar Mensagem"
      confirmDisabled={!email || !mensagem} // Desabilita o botão se os campos estiverem vazios
    >
      <div className={styles.formGroup}>
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.inputField}
        />
        <textarea
          placeholder="Sua mensagem"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          className={styles.textareaField}
        />
      </div>
    </Modal>
  );
};

export default ContatoModal;

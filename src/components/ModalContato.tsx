import React, { useState } from 'react';
import Modal from './Modal'; // Seu componente Modal
import styles from './ModalContato.module.css'; // Estilos específicos do modal de contato

const ContatoModal: React.FC<{ isOpen: boolean; onClose: () => void; onConfirm: () => void }> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  return (
    <Modal
      title="Entre em contato"
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      confirmLabel="Enviar Mensagem"
      confirmDisabled={!email || !mensagem} // Desabilitar o botão se os campos estiverem vazios
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

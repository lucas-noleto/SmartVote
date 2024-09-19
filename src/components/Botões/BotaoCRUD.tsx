import React from 'react';
import styles from './BotaoCRUD.module.css';

interface BotaoProps {
  onClick: () => void;
  texto: string;
  tipo?: 'editar' | 'excluir' | 'criar' | 'visualizar';
}

const Botao: React.FC<BotaoProps> = ({ onClick, texto, tipo = 'criar' }) => {
  const getButtonClass = () => {
    switch (tipo) {
      case 'editar':
        return `${styles.buttonBase} ${styles.btnWarning}`;
      case 'excluir':
        return `${styles.buttonBase} ${styles.btnDanger}`;
      case 'visualizar':
        return `${styles.buttonBase} ${styles.btnPrimary}`; // Classe correta para "Primary"
      case 'criar':
      default:
        return `${styles.buttonBase} ${styles.btnSuccess}`;
    }
  };

  return (
    <button className={getButtonClass()} onClick={onClick}>
      {texto}
    </button>
  );
};

export default Botao;

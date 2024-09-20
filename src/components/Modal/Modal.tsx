import React from 'react';
import styles from './Modal.module.css'; 

type ModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  confirmLabel: string;
  children: React.ReactNode;
  errorMessage?: string | null; 
  confirmDisabled?: boolean; 
};

const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  onConfirm,
  confirmLabel,
  children,
  errorMessage,
  confirmDisabled = false
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>{title}</h2>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        {children}
        <div className={styles.modalActions}>
          <button onClick={onConfirm} className={styles.confirmarBtn} disabled={confirmDisabled}>
            {confirmLabel}
          </button>
          <button onClick={onClose} className={styles.cancelarBtn}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;



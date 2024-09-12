// src/components/FormularioCandidato/CustomButton.tsx
import React from 'react';
import styles from './FormularioCandidato.module.css';

interface CustomButtonProps {
  texto: string;
  onClick: () => void;
  estilo?: string;
  tipo?: 'button' | 'submit' | 'reset';
}

const CustomButton: React.FC<CustomButtonProps> = ({ texto, onClick, estilo = '', tipo = 'button' }) => {
  return (
    <button type={tipo} onClick={onClick} className={`btn ${estilo}`}>
      {texto}
    </button>
  );
};

export default CustomButton;

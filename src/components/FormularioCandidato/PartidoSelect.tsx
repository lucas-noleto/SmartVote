import React from 'react';
import styles from './FormularioCandidato.module.css';

interface PartidoSelectProps {
  partido: string;
  partidos: { sigla: string; nome: string }[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

const PartidoSelect: React.FC<PartidoSelectProps> = ({ partido, partidos, onChange, error }) => {
  return (
    <div className="mb-3">
      <label htmlFor="partido" className="form-label">Partido</label>
      <select className="form-select" id="partido" value={partido} onChange={onChange}>
        <option value="">Selecione um partido</option>
        {partidos.map(partido => (
          <option key={partido.sigla} value={partido.sigla}>{partido.sigla}</option>
        ))}
      </select>
      {error && <div className={styles.error_message}>{error}</div>}
    </div>
  );
};

export default PartidoSelect;

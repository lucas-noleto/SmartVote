import React from 'react';
import styles from './FormularioCandidato.module.css';

interface CargoSelectProps {
  cargo: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

const CargoSelect: React.FC<CargoSelectProps> = ({ cargo, onChange, error }) => {
  return (
    <div className="mb-3">
      <label htmlFor="cargo" className="form-label">Cargo</label>
      <select className="form-select" id="cargo" value={cargo} onChange={onChange}>
        <option value="Prefeito">Prefeito</option>
        <option value="Vereador">Vereador</option>
        <option value="Senador">Senador</option>
        <option value="Presidente">Presidente</option>
        <option value="Governador">Governador</option>
      </select>
      {error && <div className={styles.error_message}>{error}</div>}
    </div>
  );
};

export default CargoSelect;

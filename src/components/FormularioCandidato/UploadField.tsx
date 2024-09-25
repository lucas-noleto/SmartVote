import React from 'react';
import styles from './FormularioCandidato.module.css';

interface UploadFieldProps {
  foto: string | ArrayBuffer | null;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const UploadField: React.FC<UploadFieldProps> = ({ foto, onUpload, error }) => {
  return (
    <div className="mb-3">
      <label htmlFor="foto" className="form-label">Foto</label>
      <input type="file" className="form-control" id="foto" accept="image/*" onChange={onUpload} />
      {error && <div className={styles.error_message}>{error}</div>}
      {foto && <img src={foto as string} alt="Foto do Candidato" className="mt-3" />}
    </div>
  );
};

export default UploadField;

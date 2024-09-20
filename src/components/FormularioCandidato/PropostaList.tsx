
import React from 'react';

interface PropostaListProps {
  propostas: string[];
  novaProposta: string;
  onAddProposta: () => void;
  onRemoveProposta: (index: number) => void;
  onChangeNovaProposta: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PropostaList: React.FC<PropostaListProps> = ({ propostas, novaProposta, onAddProposta, onRemoveProposta, onChangeNovaProposta }) => {
  return (
    <div className="mb-3">
      {propostas.map((proposta, index) => (
        <div key={index} className="alert alert-info d-flex justify-content-between align-items-center">
          {proposta}
          <button type="button" className="btn btn-danger btn-sm" onClick={() => onRemoveProposta(index)}>Remover</button>
        </div>
      ))}
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Nova Proposta" value={novaProposta} onChange={onChangeNovaProposta} />
        <button type="button" className="btn btn-primary" onClick={onAddProposta}>Adicionar Proposta</button>
      </div>
    </div>
  );
};

export default PropostaList;

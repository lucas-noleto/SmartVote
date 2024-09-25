import React from 'react';

interface PropostaListProps {
  propostas: { texto: string; id: number }[] | string[];  // Aceita ambos os formatos
  novaProposta: string;
  onAddProposta: () => void;
  onRemoveProposta: (index: number) => void;
  onChangeNovaProposta: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditProposta?: (proposta: { texto: string; id: number }) => void; // Opcional para edição
}

const PropostaList: React.FC<PropostaListProps> = ({
  propostas,
  novaProposta,
  onAddProposta,
  onRemoveProposta,
  onChangeNovaProposta,
  onEditProposta
}) => {
  return (
    <div className="mb-3">
      <h4>Propostas</h4>
      {propostas.map((proposta, index) => (
        <div key={index} className="alert alert-info d-flex justify-content-between align-items-center">
          {/* Verifica se é string ou objeto e renderiza corretamente */}
          {typeof proposta === 'string' ? proposta : proposta.texto}
          
          <div>
            {onEditProposta && typeof proposta !== 'string' && (
              <button
                type="button"
                className="btn btn-warning btn-sm me-2"
                onClick={() => onEditProposta(proposta)}
              >
                Editar
              </button>
            )}
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => onRemoveProposta(index)}
            >
              Remover
            </button>
          </div>
        </div>
      ))}
      
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nova Proposta"
          value={novaProposta}
          onChange={onChangeNovaProposta}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={onAddProposta}
        >
          Adicionar Proposta
        </button>
      </div>
    </div>
  );
};

export default PropostaList;

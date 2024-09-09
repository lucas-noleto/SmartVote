import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const VisualizarCandidato: React.FC = () => {
  const [candidato, setCandidato] = useState<any>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/candidatos/${id}`)
      .then(response => setCandidato(response.data))
      .catch(error => console.error('Erro ao buscar candidato:', error));
  }, [id]);

  if (!candidato) return <div>Carregando...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Visualizar Candidato</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome</label>
          <input type="text" className="form-control" id="nome" value={candidato.nome} readOnly />
        </div>
        <div className="mb-3">
          <label htmlFor="foto" className="form-label">URL da Foto</label>
          <input type="text" className="form-control" id="foto" value={candidato.foto} readOnly />
        </div>
        <div className="mb-3">
          <label htmlFor="partido" className="form-label">Partido</label>
          <input type="text" className="form-control" id="partido" value={candidato.partido.sigla} readOnly />
        </div>
        <div className="mb-3">
          <label htmlFor="cargo" className="form-label">Cargo</label>
          <input type="text" className="form-control" id="cargo" value={candidato.cargo} readOnly />
        </div>
        <div className="mb-3">
          <label htmlFor="propostas" className="form-label">Propostas</label>
          <textarea className="form-control" id="propostas" rows={3} value={candidato.propostas.join(', ')} readOnly />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email de Contato</label>
          <input type="email" className="form-control" id="email" value={candidato.email} readOnly />
        </div>
        <div className="mb-3">
          <label htmlFor="numero" className="form-label">Número do Candidato</label>
          <input type="text" className="form-control" id="numero" value={candidato.numero} readOnly />
        </div>
        <button type="button" className="btn btn-secondary" onClick={() => navigate(`/master/edit/${id}`)}>Editar</button>
      </form>
    </div>
  );
};

export default VisualizarCandidato;

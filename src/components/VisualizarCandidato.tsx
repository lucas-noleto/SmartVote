import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaEnvelope } from 'react-icons/fa';

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
        {/* Nome */}
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome</label>
          <input type="text" className="form-control" id="nome" value={candidato.nome} readOnly />
        </div>

        {/* Foto */}
        <div className="mb-3">
          <label htmlFor="foto" className="form-label">Foto</label>
          {candidato.foto && <img src={candidato.foto} alt="Candidato" style={{ marginTop: '10px', maxWidth: '100px', maxHeight: '100px' }} />}
        </div>

        {/* Partido */}
        <div className="mb-3">
          <label htmlFor="partido" className="form-label">Partido</label>
          <input type="text" className="form-control" id="partido" value={candidato.partido.sigla || candidato.partido} readOnly />
        </div>

        {/* Cargo */}
        <div className="mb-3">
          <label htmlFor="cargo" className="form-label">Cargo</label>
          <input type="text" className="form-control" id="cargo" value={candidato.cargo} readOnly />
        </div>

        {/* Propostas */}
        <div className="mb-3">
          <label htmlFor="propostas" className="form-label">Propostas</label>
          <textarea className="form-control" id="propostas" rows={3} value={candidato.propostas.join(', ')} readOnly />
        </div>

        {/* Email de Contato */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email de Contato</label>
          <input type="email" className="form-control" id="email" value={candidato.email} readOnly />
        </div>

        {/* Número do Candidato */}
        <div className="mb-3">
          <label htmlFor="numero" className="form-label">Número do Candidato</label>
          <input type="text" className="form-control" id="numero" value={candidato.numero} readOnly />
        </div>

        {/* Redes Sociais */}
        <div className="mb-3">
          <h4>Redes Sociais</h4>
          <p><FaFacebook /> Facebook: {candidato.redes_sociais?.facebook || 'Não informado'}</p>
          <p><FaInstagram /> Instagram: {candidato.redes_sociais?.instagram || 'Não informado'}</p>
          <p><FaLinkedin /> LinkedIn: {candidato.redes_sociais?.linkedin || 'Não informado'}</p>
          <p><FaYoutube /> YouTube: {candidato.redes_sociais?.youtube || 'Não informado'}</p>
          <p><FaEnvelope /> Email: {candidato.email}</p>
        </div>

        <button type="button" className="btn btn-secondary" onClick={() => navigate(`/master/edit/${id}`)}>Editar</button>
      </form>
    </div>
  );
};

export default VisualizarCandidato;

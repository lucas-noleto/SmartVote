import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditarCandidato: React.FC = () => {
  const [candidato, setCandidato] = useState<any>(null);
  const [nome, setNome] = useState('');
  const [foto, setFoto] = useState('');
  const [partido, setPartido] = useState('');
  const [cargo, setCargo] = useState('prefeito');
  const [propostas, setPropostas] = useState<string[]>([]);
  const [novaProposta, setNovaProposta] = useState('');
  const [email, setEmail] = useState('');
  const [numero, setNumero] = useState('');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/candidatos/${id}`)
      .then(response => {
        const candidatoData = response.data;
        setCandidato(candidatoData);
        setNome(candidatoData.nome);
        setFoto(candidatoData.foto);
        setPartido(candidatoData.partido.sigla);
        setCargo(candidatoData.cargo);
        setPropostas(candidatoData.propostas);
        setEmail(candidatoData.email);
        setNumero(candidatoData.numero);
      })
      .catch(error => console.error('Erro ao buscar candidato:', error));
  }, [id]);

  const handleAddProposta = () => {
    setPropostas([...propostas, novaProposta]);
    setNovaProposta('');
  };

  const handleSubmit = () => {
    const candidatoAtualizado = { nome, foto, partido, cargo, propostas, email, numero };
    
    axios.put(`http://localhost:5000/candidatos/${id}`, candidatoAtualizado)
      .then(() => navigate('/master'))
      .catch(error => console.error('Erro ao atualizar candidato:', error));
  };

  if (!candidato) return <div>Carregando...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Editar Candidato</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome</label>
          <input type="text" className="form-control" id="nome" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="foto" className="form-label">URL da Foto</label>
          <input type="text" className="form-control" id="foto" placeholder="URL da Foto" value={foto} onChange={e => setFoto(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="partido" className="form-label">Partido</label>
          <input type="text" className="form-control" id="partido" placeholder="Partido" value={partido} onChange={e => setPartido(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="cargo" className="form-label">Cargo</label>
          <select className="form-select" id="cargo" value={cargo} onChange={e => setCargo(e.target.value)}>
            <option value="prefeito">Prefeito</option>
            <option value="vereador">Vereador</option>
            <option value="senador">Senador</option>
            <option value="presidente">Presidente</option>
          </select>
        </div>
        <div className="mb-3">
          {propostas.map((proposta, index) => (
            <div key={index} className="alert alert-info">{proposta}</div>
          ))}
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Nova Proposta" value={novaProposta} onChange={e => setNovaProposta(e.target.value)} />
            <button type="button" className="btn btn-primary" onClick={handleAddProposta}>Adicionar Proposta</button>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email de Contato</label>
          <input type="email" className="form-control" id="email" placeholder="Email de Contato" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="numero" className="form-label">Número do Candidato</label>
          <input type="text" className="form-control" id="numero" placeholder="Número do Candidato" value={numero} onChange={e => setNumero(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-success">Salvar</button>
      </form>
    </div>
  );
};

export default EditarCandidato;

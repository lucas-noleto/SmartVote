import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormularioCandidato: React.FC = () => {
  const [nome, setNome] = useState('');
  const [foto, setFoto] = useState('');
  const [partido, setPartido] = useState('');
  const [cargo, setCargo] = useState('prefeito');
  const [propostas, setPropostas] = useState<string[]>([]);
  const [novaProposta, setNovaProposta] = useState('');
  const [email, setEmail] = useState('');
  const [numero, setNumero] = useState('');
  const navigate = useNavigate();

  const handleAddProposta = () => {
    setPropostas([...propostas, novaProposta]);
    setNovaProposta('');
  };

  const handleSubmit = () => {
    const novoCandidato = { nome, foto, partido, cargo, propostas, email, numero };
    axios.post('http://localhost:3000/candidatos', novoCandidato)
      .then(() => {
        navigate('/master'); // Redireciona para a página de candidatos após criação
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Cadastrar Novo Candidato</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
        <input type="text" placeholder="URL da Foto" value={foto} onChange={e => setFoto(e.target.value)} />
        <input type="text" placeholder="Partido" value={partido} onChange={e => setPartido(e.target.value)} />
        <select value={cargo} onChange={e => setCargo(e.target.value)}>
          <option value="prefeito">Prefeito</option>
          <option value="vereador">Vereador</option>
          <option value="senador">Senador</option>
          <option value="presidente">Presidente</option>
        </select>
        
        {/* Propostas */}
        {propostas.map((proposta, index) => (
          <div key={index}>{proposta}</div>
        ))}
        <input type="text" placeholder="Nova Proposta" value={novaProposta} onChange={e => setNovaProposta(e.target.value)} />
        <button type="button" onClick={handleAddProposta}>Adicionar Proposta</button>
        
        {/* Redes sociais e contato */}
        <input type="email" placeholder="Email de Contato" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="text" placeholder="Número do Candidato" value={numero} onChange={e => setNumero(e.target.value)} />
        
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default FormularioCandidato;

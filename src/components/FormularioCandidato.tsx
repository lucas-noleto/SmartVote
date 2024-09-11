import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaEnvelope } from 'react-icons/fa';

const FormularioCandidato: React.FC = () => {
  const [nome, setNome] = useState('');
  const [foto, setFoto] = useState<string | ArrayBuffer | null>(''); // Alterado para suportar a imagem em Base64
  const [partido, setPartido] = useState('');
  const [cargo, setCargo] = useState('prefeito');
  const [propostas, setPropostas] = useState<string[]>([]);
  const [novaProposta, setNovaProposta] = useState('');
  const [numero, setNumero] = useState('');
  const [partidos, setPartidos] = useState<{ sigla: string; nome: string }[]>([]);
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [youtube, setYoutube] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/partidos')
      .then(response => setPartidos(response.data))
      .catch(error => console.error('Erro ao buscar partidos:', error));
  }, []);

  const handleAddProposta = () => {
    setPropostas([...propostas, novaProposta]);
    setNovaProposta('');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const novoCandidato = {
      nome,
      foto,
      partido,
      cargo,
      propostas,
      redes_sociais: { facebook, instagram, linkedin, youtube },
      email,
      numero
    };

    axios.post('http://localhost:5000/candidatos', novoCandidato)
      .then(() => navigate('/master'))
      .catch(error => console.error(error));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Cadastrar Novo Candidato</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        {/* Nome */}
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome</label>
          <input type="text" className="form-control" id="nome" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
        </div>

        {/* Upload da Foto */}
        <div className="mb-3">
          <label htmlFor="foto" className="form-label">Foto</label>
          <input type="file" className="form-control" id="foto" accept="image/*" onChange={handleImageUpload} />
          {foto && <img src={foto as string} alt="Foto do Candidato" className="mt-3" style={{ maxWidth: '200px' }} />}
        </div>

        {/* Partido */}
        <div className="mb-3">
          <label htmlFor="partido" className="form-label">Partido</label>
          <select className="form-select" id="partido" value={partido} onChange={e => setPartido(e.target.value)}>
            <option value="">Selecione um partido</option>
            {partidos.map(partido => (
              <option key={partido.sigla} value={partido.sigla}>{partido.sigla}</option>
            ))}
          </select>
        </div>

        {/* Cargo */}
        <div className="mb-3">
          <label htmlFor="cargo" className="form-label">Cargo</label>
          <select className="form-select" id="cargo" value={cargo} onChange={e => setCargo(e.target.value)}>
            <option value="prefeito">Prefeito</option>
            <option value="vereador">Vereador</option>
            <option value="senador">Senador</option>
            <option value="presidente">Presidente</option>
          </select>
        </div>

        {/* Propostas */}
        <div className="mb-3">
          {propostas.map((proposta, index) => (
            <div key={index} className="alert alert-info">{proposta}</div>
          ))}
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Nova Proposta" value={novaProposta} onChange={e => setNovaProposta(e.target.value)} />
            <button type="button" className="btn btn-primary" onClick={handleAddProposta}>Adicionar Proposta</button>
          </div>
        </div>

        {/* Email de Contato */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email de Contato</label>
          <input type="email" className="form-control" id="email" placeholder="Email de Contato" value={email} onChange={e => setEmail(e.target.value)} />
        </div>

        {/* Número do Candidato */}
        <div className="mb-3">
          <label htmlFor="numero" className="form-label">Número do Candidato</label>
          <input type="text" className="form-control" id="numero" placeholder="Número do Candidato" value={numero} onChange={e => setNumero(e.target.value)} />
        </div>

        {/* Redes Sociais */}
        <div className="mb-3">
          <h4>Redes Sociais</h4>
          <div className="input-group mb-2">
            <span className="input-group-text"><FaFacebook /></span>
            <input type="text" className="form-control" placeholder="Facebook" value={facebook} onChange={e => setFacebook(e.target.value)} />
          </div>
          <div className="input-group mb-2">
            <span className="input-group-text"><FaInstagram /></span>
            <input type="text" className="form-control" placeholder="Instagram" value={instagram} onChange={e => setInstagram(e.target.value)} />
          </div>
          <div className="input-group mb-2">
            <span className="input-group-text"><FaLinkedin /></span>
            <input type="text" className="form-control" placeholder="LinkedIn" value={linkedin} onChange={e => setLinkedin(e.target.value)} />
          </div>
          <div className="input-group mb-2">
            <span className="input-group-text"><FaYoutube /></span>
            <input type="text" className="form-control" placeholder="YouTube" value={youtube} onChange={e => setYoutube(e.target.value)} />
          </div>
          <div className="input-group mb-2">
            <span className="input-group-text"><FaEnvelope /></span>
            <input type="email" className="form-control" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
        </div>

        <button type="submit" className="btn btn-success">Cadastrar</button>
      </form>
    </div>
  );
};

export default FormularioCandidato;

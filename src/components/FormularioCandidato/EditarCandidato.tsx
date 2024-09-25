import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import EditarPropostaModal from './EditarPropostaModal'; 
import apiUrl from '../../../axios/config';  
import PartidoSelect from './PartidoSelect';
import CargoSelect from './CargoSelect';
import SocialMediaField from './SocialMediaField';
import UploadField from './UploadField';
import FormField from './FormField';
import styles from './FormularioCandidato.module.css'
import PropostaList from './PropostaList';

const EditarCandidato: React.FC = () => {
  const [candidato, setCandidato] = useState<any>(null);
  const [nome, setNome] = useState('');
  const [foto, setFoto] = useState<string | ArrayBuffer | null>('');
  const [partido, setPartido] = useState('');
  const [cargo, setCargo] = useState('prefeito');
  const [propostas, setPropostas] = useState<{ texto: string; id: number }[]>([]);
  const [novaProposta, setNovaProposta] = useState<string>("");

  const [email, setEmail] = useState('');
  const [numero, setNumero] = useState('');
  const [partidos, setPartidos] = useState<{ sigla: string; nome: string }[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [propostaParaEditar, setPropostaParaEditar] = useState<{ texto: string; id: number } | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [youtube, setYoutube] = useState('');


  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    apiUrl.get('/partidos')
      .then(response => setPartidos(response.data))
      .catch(error => console.error('Erro ao buscar partidos:', error));

    apiUrl.get(`/candidatos/${id}`)
      .then(response => {
        const candidatoData = response.data;
        setCandidato(candidatoData);
        setNome(candidatoData.nome);
        setFoto(candidatoData.foto);
        setPartido(candidatoData.partido.sigla || candidatoData.partido);
        setCargo(candidatoData.cargo);
        setPropostas(candidatoData.propostas.map((proposta: string, index: number) => ({ texto: proposta, id: index })));
        setEmail(candidatoData.email);
        setNumero(candidatoData.numero);
        setFacebook(candidatoData.redes_sociais?.facebook || '');
        setInstagram(candidatoData.redes_sociais?.instagram || '');
        setLinkedin(candidatoData.redes_sociais?.linkedin || '');
        setYoutube(candidatoData.redes_sociais?.youtube || '');
      })
      .catch(error => console.error('Erro ao buscar candidato:', error));
  }, [id]);

  const handleAddProposta = () => {
    if (novaProposta.trim() !== '') {
      setPropostas([...propostas, { texto: novaProposta, id: Date.now() }]);
      setNovaProposta('');
    }
  };

  const handleEditProposta = (proposta: { texto: string; id: number }) => {
    setPropostaParaEditar(proposta);
    setModalAberto(true);
  };

  const handleRemoveProposta = (id: number) => {
    setPropostas(propostas.filter(p => p.id !== id));
  };

  const handleSaveProposta = (novaProposta: string) => {
    if (propostaParaEditar) {
      setPropostas(propostas.map(p => p.id === propostaParaEditar.id ? { ...p, texto: novaProposta } : p));
    }
  };

  const handleSubmit = () => {
    const candidatoAtualizado = {
      nome,
      foto,
      partido,
      cargo,
      propostas: propostas.map(p => p.texto),
      redes_sociais: { facebook, instagram, linkedin, youtube },
      email,
      numero
    };

    apiUrl.put(`/candidatos/${id}`, candidatoAtualizado)
      .then(() => navigate('/master'))
      .catch(error => console.error('Erro ao atualizar candidato:', error));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSocialMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'facebook': setFacebook(value); break;
      case 'instagram': setInstagram(value); break;
      case 'linkedin': setLinkedin(value); break;
      case 'youtube': setYoutube(value); break;
      case 'email': setEmail(value); break;
      default: break;
    }
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

  const handleNovaPropostaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNovaProposta(e.target.value);
  };

  if (!candidato) return <div>Carregando...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 p-5">Editar Candidato</h2>
      <form className="mb-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        {/* Nome */}
        
        <FormField
            id="nome"
            label="Nome"
            type="text"
            value={nome}
            placeholder="Nome do candidato"
            onChange={(e) => setNome(e.target.value)}
          />
          {errors.nome && <div className={styles.error_message}>{errors.nome}</div>}

        {/* Foto */}
        <UploadField foto={foto} onUpload={handleImageUpload} error={errors.foto} />

        {/* Partido */}
        <PartidoSelect partido={partido} partidos={partidos} onChange={e => setPartido(e.target.value)} error={errors.partido} />

        {/* Cargo */}
        <CargoSelect cargo={cargo} onChange={e => setCargo(e.target.value)} error={errors.cargo} />

        {/* Propostas */}
        <PropostaList
          propostas={propostas}  // Aqui é { texto: string, id: number }[]
          novaProposta={novaProposta}
          onAddProposta={handleAddProposta}
          onRemoveProposta={handleRemoveProposta}
          onChangeNovaProposta={handleNovaPropostaChange}
          onEditProposta={handleEditProposta}  // Passa a função de edição
        />



        {/* Número do Candidato */}
        <FormField
            id="numero"
            label="Número"
            type="text"
            value={numero}
            placeholder="Número do candidato"
            onChange={(e) => setNumero(e.target.value)}
          />
          {errors.numero && <div className={styles.error_message}>{errors.numero}</div>}
        {/* Redes Sociais */}
        <SocialMediaField facebook={facebook} instagram={instagram} linkedin={linkedin} youtube={youtube} email={email} onChange={handleSocialMediaChange} />

        <button type="submit" className="btn btn-success">Salvar</button>
      </form>

      {/* Modal para Editar Proposta */}
      <EditarPropostaModal
        isOpen={modalAberto}
        propostaAtual={propostaParaEditar?.texto || ''}
        onClose={() => setModalAberto(false)}
        onSave={handleSaveProposta}
      />
    </div>
  );
};

export default EditarCandidato;

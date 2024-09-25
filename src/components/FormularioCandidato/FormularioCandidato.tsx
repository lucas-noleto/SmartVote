import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SocialMediaField from './SocialMediaField';
import PropostaList from './PropostaList';
import FormField from './FormField';
import CustomButton from './CustomButton';
import PartidoSelect from './PartidoSelect';
import CargoSelect from './CargoSelect';
import UploadField from './UploadField';
import styles from './FormularioCandidato.module.css';
import apiUrl from '../../../axios/config';

const FormularioCandidato: React.FC = () => {
  const [nome, setNome] = useState('');
  const [foto, setFoto] = useState<string | ArrayBuffer | null>('');
  const [partido, setPartido] = useState('');
  const [cargo, setCargo] = useState('prefeito');
  const [propostas, setPropostas] = useState<string[]>([]);
  const [novaProposta, setNovaProposta] = useState<string>('');
  const [numero, setNumero] = useState('');
  const [partidos, setPartidos] = useState<{ sigla: string; nome: string }[]>([]);
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [youtube, setYoutube] = useState('');
  const [email, setEmail] = useState('');


  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();

  useEffect(() => {
    apiUrl.get('/partidos')
      .then(response => setPartidos(response.data))
      .catch(error => console.error('Erro ao buscar partidos:', error));
  }, []);

  const validateForm = () => {
    let formErrors: { [key: string]: string } = {};

    if (!nome.trim()) formErrors.nome = 'Nome não pode ficar em branco';
    if (!partido) formErrors.partido = 'Selecione um partido';
    if (!cargo) formErrors.cargo = 'Cargo não pode ficar em branco';
    if (!numero.trim()) formErrors.numero = 'Número do candidato é obrigatório';
    if (!email.trim()) formErrors.email = 'Email de contato é obrigatório';
    if (!foto) formErrors.foto = 'Uma foto do candidato é necessária';

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
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

  const handleAddProposta = () => {
    if (novaProposta.trim() !== '') {
      setPropostas([...propostas, novaProposta]);
      setNovaProposta('');
    }
  };

  const handleRemoveProposta = (index: number) => {
    setPropostas(propostas.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

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

    try {
      await apiUrl.post('/candidatos', novoCandidato);
      navigate('/master');
    } catch (error) {
      console.error('Erro ao cadastrar candidato:', error);
    } finally {
      setIsSubmitting(false);
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

  return (
    <div className={`container ${styles.container_form}`}>
      <div className={styles.form_wrapper}>
        <h2 className={styles.form_title}>Cadastrar Novo Candidato</h2>
        <form className='mb-5' onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <FormField
            id="nome"
            label="Nome"
            type="text"
            value={nome}
            placeholder="Nome"
            onChange={(e) => setNome(e.target.value)}
          />
          {errors.nome && <div className={styles.error_message}>{errors.nome}</div>}

          <UploadField foto={foto} onUpload={handleImageUpload} error={errors.foto} />

          <PartidoSelect partido={partido} partidos={partidos} onChange={e => setPartido(e.target.value)} error={errors.partido} />

          <CargoSelect cargo={cargo} onChange={e => setCargo(e.target.value)} error={errors.cargo} />

          <FormField
            id="numero"
            label="Número"
            type="text"
            value={numero}
            placeholder="Número do candidato"
            onChange={(e) => setNumero(e.target.value)}
          />
          {errors.numero && <div className={styles.error_message}>{errors.numero}</div>}

          <SocialMediaField facebook={facebook} instagram={instagram} linkedin={linkedin} youtube={youtube} email={email} onChange={handleSocialMediaChange} />

          <PropostaList 
            propostas={propostas} 
            novaProposta={novaProposta} 
            onAddProposta={handleAddProposta} 
            onRemoveProposta={handleRemoveProposta} 
            onChangeNovaProposta={(e) => setNovaProposta(e.target.value)} 
          />

          <CustomButton tipo="submit" texto="Cadastrar Candidato" onClick={handleSubmit} estilo='btn-success'/>
        </form>
      </div>
    </div>
  );
};

export default FormularioCandidato;

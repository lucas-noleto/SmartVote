import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SocialMediaField from './SocialMediaField';
import PropostaList from './PropostaList';
import FormField from './FormField';
import CustomButton from './CustomButton';
import styles from './FormularioCandidato.module.css';
import apiUrl from '../../../axios/config';

const FormularioCandidato: React.FC = () => {
  const [nome, setNome] = useState('');
  const [foto, setFoto] = useState<string | ArrayBuffer | null>('');
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

          <div className="mb-3">
            <label htmlFor="foto" className="form-label">Foto</label>
            <input type="file" className="form-control" id="foto" accept="image/*" onChange={handleImageUpload} />
            {errors.foto && <div className={styles.error_message}>{errors.foto}</div>}
            {foto && <img src={foto as string} alt="Foto do Candidato" className="mt-3" />}
          </div>

          <div className="mb-3">
            <label htmlFor="partido" className="form-label">Partido</label>
            <select className="form-select" id="partido" value={partido} onChange={e => setPartido(e.target.value)}>
              <option value="">Selecione um partido</option>
              {partidos.map(partido => (
                <option key={partido.sigla} value={partido.sigla}>{partido.sigla}</option>
              ))}
            </select>
            {errors.partido && <div className={styles.error_message}>{errors.partido}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="cargo" className="form-label">Cargo</label>
            <select className="form-select" id="cargo" value={cargo} onChange={e => setCargo(e.target.value)}>
              <option value="Prefeito">Prefeito</option>
              <option value="Vereador">Vereador</option>
              <option value="Senador">Senador</option>
              <option value="Presidente">Presidente</option>
              <option value="Governador">Governador</option>
            </select>
            {errors.cargo && <div className={styles.error_message}>{errors.cargo}</div>}
          </div>

          <PropostaList
            propostas={propostas}
            novaProposta={novaProposta}
            onAddProposta={handleAddProposta}
            onRemoveProposta={(index) => {
              setPropostas(propostas.filter((_, i) => i !== index));
            }}
            onChangeNovaProposta={(e) => setNovaProposta(e.target.value)}
          />

          <FormField
            id="email"
            label="Email de Contato"
            type="email"
            value={email}
            placeholder="Email de Contato"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className={styles.error_message}>{errors.email}</div>}

          <FormField
            id="numero"
            label="Número do Candidato"
            type="text"
            value={numero}
            placeholder="Número do Candidato"
            onChange={(e) => setNumero(e.target.value)}
          />
          {errors.numero && <div className={styles.error_message}>{errors.numero}</div>}

          <SocialMediaField
            facebook={facebook}
            instagram={instagram}
            linkedin={linkedin}
            youtube={youtube}
            email={email}
            onChange={handleSocialMediaChange}
          />

          <CustomButton
            texto="Cadastrar"
            onClick={handleSubmit}
            estilo={`btn-success ${styles.btn_custom}`}
            tipo="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default FormularioCandidato;

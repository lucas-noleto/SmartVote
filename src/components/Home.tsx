import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import PartidosContainer from './PartidosContainer';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import styles from './Home.module.css';
import { Candidato } from '../types/types';
import Modal from './Modal/Modal'
import ContatoModal from './Modal/ModalContato'; 

import apiUrl from '../../axios/config'; 


const Home: React.FC = () => {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [candidatosFiltrados, setCandidatosFiltrados] = useState<Candidato[]>([]);
  const [busca, setBusca] = useState<string>('');
  const [filtro, setFiltro] = useState<string>('todos');
  const [expandido, setExpandido] = useState<string | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalContatoAberto, setModalContatoAberto] = useState(false); 
  const [email, setEmail] = useState('');
  const [mensagemErro, setMensagemErro] = useState<string | null>(null);
  const [candidatoParaVoto, setCandidatoParaVoto] = useState<string | null>(null);
  const [mensagem, setMensagem] = useState(''); 
  const [candidatoParaContato, setCandidatoParaContato] = useState<string | null>(null); 
  

  const fetchCandidatos = async (partido: string) => {
    try {
      let url = '/candidatos';
      if (partido !== 'todos') {
        url += `?partido=${partido}`;
      }
      const response = await apiUrl.get(url);
      setCandidatos(response.data);
    } catch (error) {
      console.error('Erro ao buscar candidatos:', error);
    }
  };
  useEffect(() => {
    fetchCandidatos(filtro);
  }, [filtro]);

  useEffect(() => {
    let filteredCandidatos = candidatos;

    if (busca.trim() !== '') {
      filteredCandidatos = filteredCandidatos.filter(candidato =>
        candidato.nome.toLowerCase().includes(busca.toLowerCase())
      );
    }

    if (filtro !== 'todos') {
      filteredCandidatos = filteredCandidatos.filter(candidato => {
        if (typeof candidato.partido === 'string') {
          return candidato.partido === filtro;
        } else {
          return candidato.partido?.sigla === filtro;
        }
      });
    }

    setCandidatosFiltrados(filteredCandidatos);
  }, [busca, candidatos, filtro]);

  const handleFiltro = (partido: string) => {
    setFiltro(partido);
  };

  const handleBusca = () => {
    setBusca(busca);
  };
  const fecharModal = () => {
    setModalAberto(false);
    setMensagemErro(null);
    setEmail('');
    setCandidatoParaVoto(null);
  };

  const fecharModalContato = () => {
    setModalContatoAberto(false);
    setEmail('');
    setMensagem('');
    setCandidatoParaContato(null);
  };

  const abrirModal = (id: string) => {
    setCandidatoParaVoto(id);
    setEmail('');
    setModalAberto(true);
  };

  const abrirModalContato = (id: string) => {
    setCandidatoParaContato(id); 
    setEmail('');
    setMensagem('');
    setModalContatoAberto(true);
  };

  const toggleExpand = (id: string) => {
    setExpandido(expandido === id ? null : id);
  };

  const votarCandidato = (id: string) => {
    abrirModal(id);
  };

  const confirmarVoto = async () => {
    if (!candidatoParaVoto || !email) return;

    try {
      const candidato = candidatos.find((c) => c.id === candidatoParaVoto);
      if (!candidato) return;

      const { data } = await apiUrl.get(`/intencao_votos?email=${email}&cargo=${candidato.cargo}`);

      if (data.length > 0) {
        setMensagemErro(`Você já votou para o cargo de ${candidato.cargo}.`);
        return;
      }

      await apiUrl.post('/intencao_votos', {
        candidatoId: candidatoParaVoto,
        email,
        cargo: candidato.cargo || 'Não informado',
        data: new Date().toISOString(),
      });

      fecharModal();
    } catch (error) {
      console.error('Erro ao registrar voto:', error);
      setMensagemErro('Erro ao registrar voto. Por favor, tente novamente.');
    }
  };

  
  const enviarMensagem = async (email: string, mensagem: string) => {
    if (!candidatoParaContato) return;

    try {
      await apiUrl.post('/mensagens', {
        candidatoId: candidatoParaContato,
        email,
        mensagem,
        data: new Date().toISOString(),
      });
      fecharModalContato();
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };
  
  return (
    <div className={styles.homeContainer}>
      <SearchBar onSearch={handleBusca} setBusca={setBusca} />
      <PartidosContainer onFiltro={handleFiltro} />
      <div className={styles.candidatosContainer}>
        {candidatosFiltrados.length === 0 ? (
          <p>Não há candidatos para exibir. Por favor, faça uma busca ou selecione um partido.</p>
        ) : (
          candidatosFiltrados.map(candidato => (
            <div key={candidato.id} className={styles.candidatoCard}>
              <div className={styles.candidatoHeader}>
                <img src={candidato.foto} alt={candidato.nome} className={styles.candidatoFoto} />
                <div className={styles.candidatoInfoHeader}>
                  <h3 className={styles.candidatoNome}>{candidato.nome}</h3>
                  <p className={styles.candidatoNumero}>Número: {candidato.numero}</p>
                </div>
              </div>
              <div className={styles.candidatoDetalhes}>
                <div className={styles.candidatoPropostas}>
                  <p><strong>Propostas:</strong></p>
                  <ul>
                    {candidato.propostas.map((proposta, index) => (
                      <li key={index}>{proposta}</li>
                    ))}
                  </ul>
                </div>
                {expandido === candidato.id && (
                  <div className={styles.candidatoDetalhesInfo}>
                    <p><strong>Partido:</strong> {typeof candidato.partido === 'string' ? candidato.partido : candidato.partido?.sigla || 'Não informado'}</p>
                    <p><strong>Cargo:</strong> {candidato.cargo}</p>
                  </div>
                )}
              </div>
              {expandido === candidato.id && (
                <>
                  <button
                    onClick={() => votarCandidato(candidato.id)}
                    className={styles.votarBtn}
                  >
                    Votar
                  </button>
                  <button
                    onClick={() => abrirModalContato(candidato.id)}
                    className={styles.contatoBtn} 
                  >
                    Entrar em contato
                  </button>
                  <div className={`${styles.redesSociais} ${expandido === candidato.id ? styles.expanded : ''}`}>
                    {/* Icones de redes sociais */}
                    {candidato.redes_sociais?.facebook && (
                      <a href={candidato.redes_sociais.facebook} target="_blank" rel="noopener noreferrer">
                        <FaFacebook className={styles.iconeRedeSocial} />
                      </a>
                    )}
                    {candidato.redes_sociais?.instagram && (
                      <a href={candidato.redes_sociais.instagram} target="_blank" rel="noopener noreferrer">
                        <FaInstagram className={styles.iconeRedeSocial} />
                      </a>
                    )}
                    {candidato.redes_sociais?.linkedin && (
                      <a href={candidato.redes_sociais.linkedin} target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className={styles.iconeRedeSocial} />
                      </a>
                    )}
                    {candidato.redes_sociais?.youtube && (
                      <a href={candidato.redes_sociais.youtube} target="_blank" rel="noopener noreferrer">
                        <FaYoutube className={styles.iconeRedeSocial} />
                      </a>
                    )}
                  </div>
                </>
              )}
              <button onClick={() => toggleExpand(candidato.id)} className={styles.verMaisBtn}>
                {expandido === candidato.id ? 'Ver Menos' : 'Ver Mais'}
              </button>
            </div>
          ))
        )}
      </div>

     {/* Componente Modal de votação*/}
     <Modal
        title="Confirme seu voto"
        isOpen={modalAberto}
        onClose={fecharModal}
        onConfirm={confirmarVoto}
        confirmLabel="Confirmar Voto"
        errorMessage={mensagemErro}
        confirmDisabled={!email} 
      >
        <p>Insira seu e-mail para confirmar o voto.</p>
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Modal>
      <ContatoModal
        isOpen={modalContatoAberto}
        onClose={fecharModalContato}
        onConfirm={enviarMensagem}
      />

    </div>
  );
};

export default Home;

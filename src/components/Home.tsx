import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import PartidosContainer from './PartidosContainer';
import styles from './Home.module.css';
import { Candidato } from '../types/types';

const Home: React.FC = () => {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [candidatosFiltrados, setCandidatosFiltrados] = useState<Candidato[]>([]);
  const [busca, setBusca] = useState<string>('');
  const [filtro, setFiltro] = useState<string>('todos');
  const [expandido, setExpandido] = useState<string | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [email, setEmail] = useState('');
  const [mensagemErro, setMensagemErro] = useState<string | null>(null);
  const [candidatoParaVoto, setCandidatoParaVoto] = useState<string | null>(null);

  const fetchCandidatos = async (partido: string) => {
    try {
      let url = 'http://localhost:5000/candidatos';
      if (partido !== 'todos') {
        url += `?partido=${partido}`;
      }
      const response = await axios.get(url);
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

  const abrirModal = (id: string) => {
    setCandidatoParaVoto(id);
    setEmail(''); // Limpa o campo de email ao abrir o modal
    setModalAberto(true);
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
      const candidato = candidatos.find(c => c.id === candidatoParaVoto);
      if (!candidato) return;

      const { data } = await axios.get(`http://localhost:5000/intencao_votos?email=${email}&cargo=${candidato.cargo}`);

      if (data.length > 0) {
        setMensagemErro(`Você já votou para o cargo de ${candidato.cargo}.`);
        return;
      }

      await axios.post('http://localhost:5000/intencao_votos', {
        candidatoId: candidatoParaVoto,
        email,
        cargo: candidato.cargo || 'Não informado',
        data: new Date().toISOString()
      });

      console.log(`Voto registrado para o candidato ${candidatoParaVoto}`);
      setModalAberto(false);
      setMensagemErro(null);
    } catch (error) {
      console.error('Erro ao registrar voto:', error);
      setMensagemErro('Erro ao registrar voto. Por favor, tente novamente.');
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
                  <div className={`${styles.redesSociais} ${expandido === candidato.id ? styles.expanded : ''}`}>
                    {/* Links das redes sociais */}
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

      {modalAberto && (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2>Confirme seu voto</h2>
          <p>Digite seu e-mail para confirmar o voto:</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu e-mail"
            className={styles.modalInput}
          />
          {mensagemErro && <p className={styles.errorMsg}>{mensagemErro}</p>}
          <button onClick={confirmarVoto} className={styles.confirmarBtn}>Confirmar Voto</button>
          <button onClick={fecharModal} className={styles.cancelarBtn}>Cancelar</button>
        </div>
      </div>
    )}
    </div>
  );
};

export default Home;

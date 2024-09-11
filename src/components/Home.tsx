import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import PartidosContainer from './PartidosContainer';
import styles from './Home.module.css';
import { Candidato } from '../types/types';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; 

const Home: React.FC = () => {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [candidatosFiltrados, setCandidatosFiltrados] = useState<Candidato[]>([]);
  const [busca, setBusca] = useState<string>('');
  const [filtro, setFiltro] = useState<string>('todos');
  const [expandido, setExpandido] = useState<string | null>(null); 

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

  const toggleExpand = (id: string) => {
    setExpandido(expandido === id ? null : id);
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
                <div className={`${styles.redesSociais} ${expandido === candidato.id ? styles.expanded : ''}`}>
                  {candidato.redes_sociais?.facebook && (
                    <a href={candidato.redes_sociais.facebook} target="_blank" rel="noopener noreferrer" className={styles.redeSocialLink}>
                      <FaFacebookF />
                    </a>
                  )}
                  {candidato.redes_sociais?.twitter && (
                    <a href={candidato.redes_sociais.twitter} target="_blank" rel="noopener noreferrer" className={styles.redeSocialLink}>
                      <FaTwitter />
                    </a>
                  )}
                  {candidato.redes_sociais?.instagram && (
                    <a href={candidato.redes_sociais.instagram} target="_blank" rel="noopener noreferrer" className={styles.redeSocialLink}>
                      <FaInstagram />
                    </a>
                  )}
                  {candidato.redes_sociais?.linkedin && (
                    <a href={candidato.redes_sociais.linkedin} target="_blank" rel="noopener noreferrer" className={styles.redeSocialLink}>
                      <FaLinkedin />
                    </a>
                  )}
                </div>
              )}
              <button onClick={() => toggleExpand(candidato.id)} className={styles.verMaisBtn}>
                {expandido === candidato.id ? 'Ver Menos' : 'Ver Mais'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import PartidosContainer from './PartidosContainer';
import styles from './Home.module.css';
import { Candidato } from '../types/types';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Importando ícones de redes sociais

const Home: React.FC = () => {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [candidatosFiltrados, setCandidatosFiltrados] = useState<Candidato[]>([]);
  const [busca, setBusca] = useState<string>('');
  const [filtro, setFiltro] = useState<string>('todos');
  const [expandido, setExpandido] = useState<string | null>(null); // Estado para controlar a expansão

  // Função para buscar candidatos com base no filtro
  const fetchCandidatos = async (partido: string) => {
    try {
      // Define a URL do endpoint com base no partido
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
    // Busca todos os candidatos quando o componente é montado
    fetchCandidatos(filtro);
  }, [filtro]);

  useEffect(() => {
    let filteredCandidatos = candidatos;

    if (busca.trim() !== '') {
      filteredCandidatos = filteredCandidatos.filter(candidato =>
        candidato.nome.toLowerCase().includes(busca.toLowerCase())
      );
    }

    // Ajuste para lidar com a estrutura do partido
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
    setExpandido(expandido === id ? null : id); // Alterna entre expandir e recolher
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
              <img src={candidato.foto} alt={candidato.nome} className={styles.candidatoFoto} />
              <div className={styles.candidatoInfo}>
                <h3 className={styles.candidatoNome}>{candidato.nome}</h3>
                <p className={styles.candidatoNumero}>Número: {candidato.numero}</p>
                <p><strong>Propostas:</strong></p>
                <ul>
                  {candidato.propostas.map((proposta, index) => (
                    <li key={index}>{proposta}</li>
                  ))}
                </ul>
                {expandido === candidato.id ? (
                  <div className={styles.candidatoDetalhes}>
                    <p><strong>Partido:</strong> {typeof candidato.partido === 'string' ? candidato.partido : candidato.partido?.sigla || 'Não informado'}</p>
                    <p><strong>Cargo:</strong> {candidato.cargo}</p>
                    <p><strong>Redes sociais:</strong></p>
                    <div className={styles.redesSociais}>
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
                  </div>
                ) : null}
                <button onClick={() => toggleExpand(candidato.id)} className={styles.verMaisBtn}>
                  {expandido === candidato.id ? 'Ver Menos' : 'Ver Mais'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;

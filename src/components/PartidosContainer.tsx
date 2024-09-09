import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './PartidosContainer.module.css';

interface Partido {
  sigla: string;
  nome: string;
}

interface PartidosContainerProps {
  onFiltro: (partido: string) => void;
}

const PartidosContainer: React.FC<PartidosContainerProps> = ({ onFiltro }) => {
  const [partidos, setPartidos] = useState<Partido[]>([]);

  useEffect(() => {
    const fetchPartidos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/partidos');
        setPartidos(response.data);
      } catch (error) {
        console.error('Erro ao buscar partidos:', error);
      }
    };

    fetchPartidos();
  }, []);

  return (
    <div className={styles.partidosContainer}>
      {/* Botão para buscar todos os candidatos */}
      <button onClick={() => onFiltro('todos')} className={styles.todosPartidosBtn}>
        Todos os Candidatos
      </button>

      {/* Botões para filtrar candidatos por partido */}
      {partidos.map(partido => (
        <button key={partido.sigla} onClick={() => onFiltro(partido.sigla)} className={styles.todosPartidosBtn}>
          {partido.sigla}
        </button>
      ))}
    </div>
  );
};

export default PartidosContainer;

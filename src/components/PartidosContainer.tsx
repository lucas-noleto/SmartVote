import { useEffect, useState } from 'react';
import axios from 'axios';
import BotaoPartido from './BotaoPartido';
import styles from './PartidosContainer.module.css';

interface Partido {
  nome: string;
  sigla: string;
}

function PartidosContainer() {
  const [partidos, setPartidos] = useState<Partido[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/partidos')
      .then(response => setPartidos(response.data))
      .catch(error => console.error(error));
  }, []);

  const listarTodosCandidatos = () => {
    alert("Listar todos os candidatos de todos os partidos");
  };

  return (
    <div className={styles.partidosContainer}>
    <button className={styles.todosPartidosBtn}>Todos os Partidos</button>
    {partidos.map((partido) => (
      <button key={partido.sigla} className={styles.todosPartidosBtn}>
        {partido.sigla}
      </button>
    ))}
  </div>
  
  );
}

export default PartidosContainer;

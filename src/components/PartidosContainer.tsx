// PartidosContainer.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BotaoPartido from './BotaoPartido';

interface Partido {
  nome: string;
  sigla: string;
}

function PartidosContainer() {
  const [partidos, setPartidos] = useState<Partido[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/partidos')
      .then(response => setPartidos(response.data))
      .catch(error => console.error(error));
  }, []);

  const listarTodosCandidatos = () => {
    alert("Listar todos os candidatos de todos os partidos");
  };

  return (
    <div>
      <h2>Partidos</h2>
      <button onClick={listarTodosCandidatos}>Todos os Partidos</button>
      {partidos.map(partido => (
        <BotaoPartido key={partido.sigla} partido={partido} />
      ))}
    </div>
  );
}

export default PartidosContainer;
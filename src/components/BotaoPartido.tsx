
// BotaoPartido.tsx
import React from 'react';

interface Partido {
  nome: string;
  sigla: string;
}

function BotaoPartido({ partido }: { partido: Partido }) {
  const listarCandidatosPorPartido = () => {
    alert(`Listar candidatos do partido: ${partido.nome}`);
  };

  return <button onClick={listarCandidatosPorPartido}>{partido.sigla}</button>;
}

export default BotaoPartido;
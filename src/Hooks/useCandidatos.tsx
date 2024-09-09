import { useState } from 'react';
import { Candidato } from '../types/types';

const useCandidatos = () => {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);

  const adicionarCandidato = (candidato: Candidato) => {
    setCandidatos(prevCandidatos => [...prevCandidatos, candidato]);
  };

  const buscarCandidatos = () => {
    // Função para buscar a lista de candidatos do servidor
    // e atualizar o estado
  };

  return { candidatos, adicionarCandidato, buscarCandidatos };
};

export default useCandidatos;

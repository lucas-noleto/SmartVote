import { useEffect, useState } from 'react';
import axios from 'axios';
import {Candidato}  from '../types/types';
import Botao from '../components/BotaoCRUD';
import TabelaCandidatos from '../components/TabelaCandidatos';
import { useNavigate } from 'react-router-dom'; // Para navegação

const MasterPage = () => {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const navigate = useNavigate(); // Usado para navegação

  useEffect(() => {
    axios.get('http://localhost:5000/candidatos')
      .then(response => setCandidatos(response.data))
      .catch(error => console.error(error));
  }, []);

  // Função para criar candidato
  const handleCreate = () => {
    navigate('/master/create'); // Redireciona para o formulário de criação
  };

  return (
    <div>
      {/* Botão para criar novo candidato */}
      <Botao onClick={handleCreate} texto="Criar Novo Candidato" tipo="criar" />
      <TabelaCandidatos candidatos={candidatos} />

    </div>
  );
};

export default MasterPage;

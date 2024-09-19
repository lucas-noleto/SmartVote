import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Candidato } from '../types/types';
import Botao from './Botões/BotaoCRUD';
import styles from './TabelaCandidatos.module.css';

interface TabelaCandidatosProps {
  candidatos: Candidato[];
}

const TabelaCandidatos: React.FC<TabelaCandidatosProps> = ({ candidatos }) => {
  const [localCandidatos, setLocalCandidatos] = useState<Candidato[]>(candidatos);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Função para buscar candidatos do servidor
    const fetchCandidatos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/candidatos');
        setLocalCandidatos(response.data);
      } catch (error) {
        console.error('Erro ao buscar candidatos:', error);
      }
    };

    // Atualiza a lista de candidatos quando o componente é montado ou quando a navegação retorna
    fetchCandidatos();
  }, [navigate]);

  // Funções de ação
  const handleCreate = () => {
    navigate('/master/create');
  };

  const handleEdit = (id: string) => {
    navigate(`/master/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este candidato?")) {
      axios.delete(`http://localhost:5000/candidatos/${id}`)
        .then(() => {
          // Atualiza a lista local após exclusão
          setLocalCandidatos(prev => prev.filter(candidato => candidato.id !== id));
        })
        .catch(error => console.error('Erro ao excluir candidato:', error));
    }
  };

  const handleView = (id: string) => {
    navigate(`/master/view/${id}`);
  };

  return (
    <div>
      <div className={styles.container}>
        <div>
          <h2>Lista de Candidatos</h2>
        </div>
      </div>

      <div className={styles.createButtonContainer}>
        <Botao onClick={handleCreate} texto="Criar Novo Candidato" tipo="criar" />
      </div>

      <div className={styles.container_table}>  
        <table className={styles.styled_table}>
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nome</th>
              <th>Partido</th>
              <th>Cargo</th>
              <th>Propostas</th>
              <th>Número </th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {localCandidatos.map((candidato) => (
              <tr key={candidato.id}>
                <td>
                  <img
                    src={candidato.foto}
                    alt={candidato.nome}
                    style={{ width: '50px' }}
                  />
                </td>
                <td>{candidato.nome}</td>
                <td>{candidato.partido ? candidato.partido.sigla : 'Não informado'}</td>
                <td>{candidato.cargo}</td>
                <td>
                  {/* Renderiza as propostas como uma lista separada por linha */}
                  {candidato.propostas.join(', ')}
                </td>
                <td>{candidato.numero}</td>
                <td>
                  <Botao onClick={() => handleView(candidato.id)} texto="Visualizar" tipo="visualizar" />
                  <Botao onClick={() => handleEdit(candidato.id)} texto="Editar" tipo="editar" />
                  <Botao onClick={() => handleDelete(candidato.id)} texto="Excluir" tipo="excluir" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelaCandidatos;

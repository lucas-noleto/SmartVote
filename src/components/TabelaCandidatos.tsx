import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Candidato } from '../types/types';
import Botao from './BotaoCRUD';
import styles from './TabelaCandidatos.module.css'

interface TabelaCandidatosProps {
  candidatos: Candidato[];
}

const TabelaCandidatos: React.FC<TabelaCandidatosProps> = ({ candidatos }) => {
  const navigate = useNavigate();

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
          window.location.reload(); // Atualiza a página após exclusão
        })
        .catch(error => console.error('Erro ao excluir candidato:', error));
    }
  };

  const handleView = (id: string) => {
    navigate(`/master/view/${id}`);
  };

  return (
    <div >
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
              <th>Número de Propostas</th>
              <th>Número de Votos</th>
              <th>Ações</th>
            </tr>
          </thead>
            <tbody>
              {candidatos.map((candidato) => (
                <tr key={candidato.id}>
                  <td>
                    <img
                      src={candidato.foto}
                      alt={candidato.nome}
                      style={{ width: '50px' }}
                    />
                  </td>
                  <td>{candidato.nome}</td>
                  <td>{candidato.partido.sigla}</td>
                  <td>{candidato.cargo}</td>
                  <td>{typeof candidato.propostas === 'string' ? candidato.propostas : candidato.propostas.proposta}</td>
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

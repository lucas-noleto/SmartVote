import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, LabelList } from 'recharts';
import styles from './Estatisticas.module.css';

interface Candidato {
  id: string;
  nome: string;
  foto: string;
}

interface Voto {
  candidatoId: string;
  cargo: string;
  quantidade: number;
}

interface CargoData {
  cargo: string;
  total: number;
  votos: Voto[];
}

const Estatisticas: React.FC = () => {
  const [votosPorCargo, setVotosPorCargo] = useState<CargoData[]>([]);
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [carregandoCandidatos, setCarregandoCandidatos] = useState(true);

  useEffect(() => {
    const fetchCandidatos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/candidatos');
        setCandidatos(response.data);
      } catch (error) {
        console.error('Erro ao buscar candidatos:', error);
      } finally {
        setCarregandoCandidatos(false);
      }
    };

    fetchCandidatos();
  }, []);

  useEffect(() => {
    const fetchVotos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/intencao_votos');
        const votos = response.data;

        const votosAgrupados: { [key: string]: CargoData } = {};

        votos.forEach((voto: any) => {
          const cargo = voto.cargo;
          if (!votosAgrupados[cargo]) {
            votosAgrupados[cargo] = { cargo, total: 0, votos: [] };
          }

          const candidato = votosAgrupados[cargo].votos.find((v: Voto) => v.candidatoId === voto.candidatoId);
          if (candidato) {
            candidato.quantidade += 1;
          } else {
            votosAgrupados[cargo].votos.push({ candidatoId: voto.candidatoId, cargo, quantidade: 1 });
          }

          votosAgrupados[cargo].total += 1;
        });

        setVotosPorCargo(Object.values(votosAgrupados));
      } catch (error) {
        console.error('Erro ao buscar dados de votos:', error);
      } finally {
        setCarregando(false);
      }
    };

    fetchVotos();
  }, []);

  if (carregando || carregandoCandidatos) {
    return <p>Carregando estatísticas...</p>;
  }

  const colors = ['#ff7300', '#387908', '#8884d8', '#8dd1e1', '#82ca9d'];

  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className={styles.legendContainer}>
        {payload.map((entry: any, index: number) => {
          const candidato = candidatos.find(c => c.id === entry.value);
          return candidato ? (
            <div key={`legend-item-${index}`} className={styles.legendItem}>
              <img src={candidato.foto} alt={candidato.nome} className={styles.candidatoFoto} />
              <p>{candidato.nome} ({entry.payload.value} votos)</p>
            </div>
          ) : null;
        })}
      </div>
    );
  };

  return (
    <div className={styles.estatisticasContainer}>
      <h1 className={styles.titulo}>Intenções de Voto por Cargo</h1>
      {votosPorCargo.map((cargoData) => (
        <div key={cargoData.cargo} className={styles.graficoContainer}>
          <h2 className={styles.cargoTitulo}>{cargoData.cargo}</h2>
          <PieChart width={600} height={400}>
            <Pie
              data={cargoData.votos}
              dataKey="quantidade"
              nameKey="candidatoId"
              outerRadius={150}
              label
              isAnimationActive={true}
            >
              {cargoData.votos.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
              <LabelList dataKey="quantidade" position="outside" />
            </Pie>
            <Tooltip />
            <Legend content={renderLegend} />
          </PieChart>
          <div className={styles.estatisticasInfo}>
            {cargoData.votos.map((voto, index) => {
              const candidato = candidatos.find(c => c.id === voto.candidatoId);
              return candidato ? (
                <div key={index} className={styles.estatisticasItem}>
                  <div className={styles.estatisticasLegenda} style={{ backgroundColor: colors[index % colors.length] }} />
                  <div>
                    <p><strong>{candidato.nome}:</strong> {voto.quantidade} votos ({((voto.quantidade / cargoData.total) * 100).toFixed(2)}%)</p>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Estatisticas;

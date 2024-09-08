import styles from './BotaoPartido.module.css';

interface Partido {
  nome: string;
  sigla: string;
}

function BotaoPartido({ partido }: { partido: Partido }) {
  const listarCandidatosPorPartido = () => {
    alert(`Listar candidatos do partido: ${partido.nome}`);
  };

  return (
    <button className={styles.BotaoPartido} onClick={listarCandidatosPorPartido}>
      {partido.sigla}
    </button>
  );
}

export default BotaoPartido;

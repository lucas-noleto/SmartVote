// types/types.ts
export interface Partido {
    sigla: string;
    nome: string;
  }
  
  export interface Candidato {
    id: string; // Adicione o campo id
    nome: string;
    foto: string;
    partido: Partido;
    cargo: string;
    propostas: string | { proposta: string };
    redes_sociais: { twitter: string };
    contato: string;
    numero: number;
  }
  
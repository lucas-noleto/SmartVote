// types/types.ts
export interface Partido {
  sigla: string;
  nome: string;
}

export interface Candidato {
  id: string;
  nome: string;
  foto: string;
  partido: Partido;
  cargo: string;
  propostas: string[]; // Array de propostas
  redes_sociais: { [key: string]: string }; // Objeto para redes sociais
  contato: string;
  numero: number;
}

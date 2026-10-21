export interface Poema {
  id: string;
  titulo: string;
  data: string; // Formato ISO YYYY-MM-DD
  mensagemExibicao: string;
  corpo: string;
}

export interface Texto {
  id: string;
  titulo: string;
  subtitulo: string;
  data: string; // Formato ISO YYYY-MM-DD
  mensagemExibicao: string;
  corpo: string;
}

export interface FotoMetadata {
  arquivo: string;
  data?: string;
  mensagemExibicao?: string;
}

export interface FotoItem {
  id: string;
  arquivo: string;
  url: string;
  data?: string;
  mensagemExibicao: string;
  hasCustomMetadata: boolean;
}

export interface MusicaItem {
  id: string;
  titulo: string;
  nomeArquivo: string;
  arquivo?: string;
  url: string;
}

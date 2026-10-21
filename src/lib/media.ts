import fotosData from '../data/Fotos.json';
import { FotoItem, FotoMetadata, MusicaItem } from './types';

// Descoberta automática de fotografias via Vite import.meta.glob
const fotoModules = import.meta.glob<string>(
  '../assets/Nossas fotos/*.{jpg,jpeg,png,webp,avif,gif,JPG,JPEG,PNG,WEBP,AVIF,GIF}',
  { eager: true, import: 'default' }
);

// Descoberta automática de músicas via Vite import.meta.glob
const musicaModules = import.meta.glob<string>(
  '../assets/Músicas/*.{mp3,wav,ogg,m4a,aac,MP3,WAV,OGG,M4A,AAC}',
  { eager: true, import: 'default' }
);

/**
 * Normaliza o nome do arquivo para buscas sem distinção de maiúsculas e caracteres especiais
 */
function normalizarNome(nome: string): string {
  try {
    return decodeURIComponent(nome).trim().toLowerCase();
  } catch {
    return nome.trim().toLowerCase();
  }
}

/**
 * Obtém a lista de fotografias processadas e associadas aos metadados do Fotos.json
 */
export function getFotografias(): FotoItem[] {
  try {
    const metadadosList: FotoMetadata[] = Array.isArray(fotosData) ? (fotosData as FotoMetadata[]) : [];
    
    // Mapear metadados por nome de arquivo normalizado
    const metaMap = new Map<string, FotoMetadata>();
    for (const item of metadadosList) {
      if (item && item.arquivo) {
        metaMap.set(normalizarNome(item.arquivo), item);
      }
    }

    const items: FotoItem[] = [];
    const arquivosEncontrados = new Set<string>();

    // Processar módulos descobertos
    for (const [caminho, url] of Object.entries(fotoModules)) {
      const nomeArquivo = caminho.split('/').pop() || '';
      const nomeNorm = normalizarNome(nomeArquivo);
      arquivosEncontrados.add(nomeNorm);

      const meta = metaMap.get(nomeNorm);
      
      items.push({
        id: `foto-${nomeNorm.replace(/[^a-z0-9]/g, '-')}`,
        arquivo: nomeArquivo,
        url,
        data: meta?.data || undefined,
        mensagemExibicao: meta?.mensagemExibicao || 'Um instante guardado para sempre no nosso coração.',
        hasCustomMetadata: Boolean(meta)
      });
    }

    // Alerta de desenvolvimento para arquivos no JSON que não existem na pasta
    if (import.meta.env?.DEV) {
      for (const meta of metadadosList) {
        if (meta?.arquivo && !arquivosEncontrados.has(normalizarNome(meta.arquivo))) {
          console.warn(
            `[Álbum] O arquivo "${meta.arquivo}" está cadastrado em Fotos.json, mas não foi encontrado em "src/assets/Nossas fotos/".`
          );
        }
      }
    }

    // Ordenação: Da mais recente para a mais antiga.
    // Imagens sem data são posicionadas depois das datadas, ordenadas pelo nome do arquivo.
    return items.sort((a, b) => {
      if (a.data && b.data) {
        const timeA = new Date(a.data).getTime();
        const timeB = new Date(b.data).getTime();
        if (timeB !== timeA) return timeB - timeA;
        return a.arquivo.localeCompare(b.arquivo);
      }
      if (a.data && !b.data) return -1;
      if (!a.data && b.data) return 1;
      return a.arquivo.localeCompare(b.arquivo);
    });
  } catch (err) {
    console.error('Erro ao carregar fotografias:', err);
    return [];
  }
}

/**
 * Limpa o nome do arquivo para exibição poética no player de música
 */
function limparTituloMusica(nomeArquivo: string): string {
  const semExtensao = nomeArquivo.replace(/\.[^/.]+$/, '');
  return semExtensao
    .replace(/^[\d\s._-]+/, '') // remove números iniciais como 01_ ou 1 -
    .replace(/[_-]+/g, ' ')
    .trim();
}

/**
 * Obtém a lista de músicas descobertas na pasta src/assets/Músicas/
 */
export function getPlaylist(): MusicaItem[] {
  try {
    const musicas: MusicaItem[] = [];

    for (const [caminho, url] of Object.entries(musicaModules)) {
      const nomeArquivo = caminho.split('/').pop() || '';
      if (!nomeArquivo || nomeArquivo.startsWith('.')) continue;

      musicas.push({
        id: `track-${normalizarNome(nomeArquivo).replace(/[^a-z0-9]/g, '-')}`,
        arquivo: nomeArquivo,
        titulo: limparTituloMusica(nomeArquivo) || 'Melodia do Nosso Amor',
        nomeArquivo,
        url
      });
    }

    // Ordenação alfabética previsível pelo nome do arquivo
    return musicas.sort((a, b) => a.nomeArquivo.localeCompare(b.nomeArquivo));
  } catch (err) {
    console.error('Erro ao processar músicas:', err);
    return [];
  }
}

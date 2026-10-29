import poemasData from '../data/Poemas.json';
import textosData from '../data/Textos.json';
import { Poema, Texto } from './types';

/**
 * Formata datas ISO (YYYY-MM-DD) para português brasileiro elegante (ex: 21 de outubro de 2026)
 */
export function formatarData(dataStr?: string): string {
  if (!dataStr) return '';
  try {
    // Parse manual para evitar desvios de fuso horário do UTC
    const [ano, mes, dia] = dataStr.split('-').map(Number);
    if (!ano || !mes || !dia) return dataStr;
    const data = new Date(ano, mes - 1, dia);
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(data);
  } catch {
    return dataStr;
  }
}

/**
 * Obtém os poemas ordenados decrescentemente por data, com ID como desempate
 */
export function getPoemas(): Poema[] {
  try {
    if (!Array.isArray(poemasData)) return [];
    
    const validos = poemasData.filter(
      (p): p is Poema => Boolean(p && typeof p === 'object' && p.id && p.titulo)
    );

    // Salvaguarda contra IDs duplicados
    const seenIds = new Set<string>();
    const unicos = validos.map((p, index) => {
      let uniqueId = p.id;
      if (seenIds.has(uniqueId)) {
        uniqueId = `${p.id}-dupl-${index}`;
      }
      seenIds.add(uniqueId);
      return { ...p, id: uniqueId };
    });

    return [...unicos].sort((a, b) => {
      const timeA = a.data ? new Date(a.data).getTime() : 0;
      const timeB = b.data ? new Date(b.data).getTime() : 0;
      if (timeB !== timeA) {
        return timeB - timeA;
      }
      return b.id.localeCompare(a.id);
    });
  } catch (err) {
    console.error('Erro ao processar Poemas.json:', err);
    return [];
  }
}

/**
 * Obtém os textos ordenados decrescentemente por data, com ID como desempate
 */
export function getTextos(): Texto[] {
  try {
    if (!Array.isArray(textosData)) return [];

    const validos = textosData.filter(
      (t): t is Texto => Boolean(t && typeof t === 'object' && t.id && t.titulo)
    );

    // Salvaguarda contra IDs duplicados
    const seenIds = new Set<string>();
    const unicos = validos.map((t, index) => {
      let uniqueId = t.id;
      if (seenIds.has(uniqueId)) {
        uniqueId = `${t.id}-dupl-${index}`;
      }
      seenIds.add(uniqueId);
      return { ...t, id: uniqueId };
    });

    return [...unicos].sort((a, b) => {
      const timeA = a.data ? new Date(a.data).getTime() : 0;
      const timeB = b.data ? new Date(b.data).getTime() : 0;
      if (timeB !== timeA) {
        return timeB - timeA;
      }
      return b.id.localeCompare(a.id);
    });
  } catch (err) {
    console.error('Erro ao processar Textos.json:', err);
    return [];
  }
}

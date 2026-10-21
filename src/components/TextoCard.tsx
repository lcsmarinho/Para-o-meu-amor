import React from 'react';
import { BookOpen, ArrowUpRight } from 'lucide-react';
import { Texto } from '../lib/types';
import { formatarData } from '../lib/content';

interface TextoCardProps {
  texto: Texto;
  onOpen: (texto: Texto) => void;
}

export const TextoCard: React.FC<TextoCardProps> = ({ texto, onOpen }) => {
  return (
    <article
      onClick={() => onOpen(texto)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(texto);
        }
      }}
      tabIndex={0}
      role="button"
      className="paper-card group cursor-pointer rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#A98473]/40 min-h-[250px]"
      aria-label={`Ler texto: ${texto.titulo}`}
    >
      <div>
        {/* Date & category header */}
        <div className="flex items-center justify-between gap-2 text-xs font-sans text-[#A98473] uppercase tracking-wider mb-3">
          <span>{formatarData(texto.data)}</span>
          <BookOpen className="w-3.5 h-3.5 text-[#A98473]/60 group-hover:text-[#A98473] transition-colors" />
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#483934] tracking-tight leading-snug group-hover:text-[#302521] transition-colors mb-2">
          {texto.titulo}
        </h3>

        {/* Subtitle */}
        {texto.subtitulo && (
          <h4 className="font-serif italic text-sm text-[#A98473] mb-3 line-clamp-1">
            {texto.subtitulo}
          </h4>
        )}

        {/* Preview message */}
        <p className="font-body text-sm sm:text-base text-[#66524B]/80 leading-relaxed line-clamp-3">
          {texto.mensagemExibicao}
        </p>
      </div>

      {/* Reading affordance */}
      <div className="mt-6 pt-4 border-t border-[#A98473]/15 flex items-center justify-between text-xs font-sans font-medium text-[#A98473] group-hover:text-[#66524B] transition-colors">
        <span className="tracking-wide">Abrir leitura completa</span>
        <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>
    </article>
  );
};

import React from 'react';
import { Feather, ArrowUpRight } from 'lucide-react';
import { Poema } from '../lib/types';
import { formatarData } from '../lib/content';

interface PoemaCardProps {
  poema: Poema;
  onOpen: (poema: Poema) => void;
}

export const PoemaCard: React.FC<PoemaCardProps> = ({ poema, onOpen }) => {
  return (
    <article
      onClick={() => onOpen(poema)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(poema);
        }
      }}
      tabIndex={0}
      role="button"
      className="paper-card group cursor-pointer rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#A98473]/40 min-h-[220px]"
      aria-label={`Ler poema: ${poema.titulo}`}
    >
      <div>
        {/* Date and icon */}
        <div className="flex items-center justify-between gap-2 text-xs font-sans text-[#A98473] uppercase tracking-wider mb-3">
          <span>{formatarData(poema.data)}</span>
          <Feather className="w-3.5 h-3.5 text-[#A98473]/60 group-hover:text-[#A98473] transition-colors" />
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#483934] tracking-tight leading-snug group-hover:text-[#302521] transition-colors mb-3">
          {poema.titulo}
        </h3>

        {/* Preview message */}
        <p className="font-body text-sm sm:text-base text-[#66524B]/80 leading-relaxed italic line-clamp-3">
          “{poema.mensagemExibicao}”
        </p>
      </div>

      {/* Reading affordance */}
      <div className="mt-6 pt-4 border-t border-[#A98473]/15 flex items-center justify-between text-xs font-sans font-medium text-[#A98473] group-hover:text-[#66524B] transition-colors">
        <span className="tracking-wide">Ler verso completo</span>
        <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>
    </article>
  );
};

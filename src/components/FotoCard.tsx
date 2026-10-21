import React, { useState } from 'react';
import { Maximize2, Image as ImageIcon } from 'lucide-react';
import { FotoItem } from '../lib/types';
import { formatarData } from '../lib/content';

interface FotoCardProps {
  foto: FotoItem;
  onOpen: (foto: FotoItem) => void;
}

export const FotoCard: React.FC<FotoCardProps> = ({ foto, onOpen }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      onClick={() => onOpen(foto)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(foto);
        }
      }}
      tabIndex={0}
      role="button"
      className="group cursor-pointer rounded-2xl overflow-hidden bg-[#FFF9F4] border border-[#A98473]/20 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col focus:outline-none focus:ring-2 focus:ring-[#A98473]/40"
      aria-label={`Ver fotografia: ${foto.mensagemExibicao}`}
    >
      {/* Visual Frame strictly 4:5 aspect ratio */}
      <div className="relative w-full aspect-[4/5] bg-[#FBEFF2] overflow-hidden">
        {!hasError ? (
          <img
            src={foto.url}
            alt={foto.mensagemExibicao}
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-[#A98473]">
            <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
            <p className="text-xs font-serif italic text-[#66524B]">Memória guardada com carinho</p>
          </div>
        )}

        {/* Delicate hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#483934]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 text-[#FFF9F4]">
          <span className="text-xs font-sans tracking-wide">Ampliar memória</span>
          <Maximize2 className="w-4 h-4" />
        </div>
      </div>

      {/* Card Info Footer */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-[#FFF9F4]">
        {foto.data && (
          <span className="text-[11px] font-sans text-[#A98473] uppercase tracking-wider mb-1 block">
            {formatarData(foto.data)}
          </span>
        )}
        <p className="font-serif italic text-sm sm:text-base text-[#66524B] line-clamp-2 leading-relaxed">
          {foto.mensagemExibicao}
        </p>
      </div>
    </div>
  );
};

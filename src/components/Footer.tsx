import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-16 border-t border-[#A98473]/15 bg-gradient-to-b from-transparent to-[#FBEFF2]/40 text-center">
      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center">
        {/* Delicate botanical divider */}
        <div className="flex items-center gap-3 text-[#A98473]/40 mb-6" aria-hidden="true">
          <span className="w-12 h-px bg-[#A98473]/25" />
          <svg className="w-5 h-5 fill-current text-[#A98473]/50" viewBox="0 0 24 24">
            <path d="M12 2C12 2 13 8 18 10C13 12 12 18 12 18C12 18 11 12 6 10C11 8 12 2 12 2Z" />
          </svg>
          <span className="w-12 h-px bg-[#A98473]/25" />
        </div>

        {/* Mandatory romantic dedication */}
        <p className="font-serif italic text-xl sm:text-2xl text-[#66524B] tracking-wide mb-3">
          “Enquanto houver amanhã, haverá mais uma página para nós.”
        </p>

        <p className="text-xs text-[#A98473] font-sans tracking-widest uppercase mt-2">
          Um espaço vivo de afeto, memória e literatura permanente
        </p>
      </div>
    </footer>
  );
};

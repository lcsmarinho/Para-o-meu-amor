import React, { useState } from 'react';
import { getTextos } from '../lib/content';
import { Texto } from '../lib/types';
import { TextoCard } from '../components/TextoCard';
import { ReadingModal } from '../components/ReadingModal';
import { Pagination } from '../components/Pagination';
import { BookOpen } from 'lucide-react';

const ITEMS_PER_PAGE = 9;

export const Textos: React.FC = () => {
  const [textos] = useState<Texto[]>(() => getTextos());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedTexto, setSelectedTexto] = useState<Texto | null>(null);

  const totalPages = Math.ceil(textos.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTextos = textos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" id="textos-top">
        {/* Page Editorial Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#A98473] mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Capítulo II · Cartas e Reflexões</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#483934] tracking-tight leading-tight mb-4">
            Nunca deixarei de pensar
          </h1>
          <p className="font-body italic text-base sm:text-lg text-[#66524B]/80 leading-relaxed text-balance">
            Porque mesmo quando não estou escrevendo, existe sempre alguma parte de mim pensando em você.
          </p>
          <div className="w-16 h-px bg-[#A98473]/30 mx-auto mt-6" aria-hidden="true" />
        </div>

        {/* Textos Grid */}
        {textos.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {paginatedTextos.map((texto) => (
                <TextoCard
                  key={texto.id}
                  texto={texto}
                  onOpen={(t) => setSelectedTexto(t)}
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
              scrollTargetId="textos-top"
            />
          </>
        ) : (
          <div className="paper-card rounded-2xl p-12 text-center max-w-lg mx-auto">
            <BookOpen className="w-10 h-10 text-[#A98473]/50 mx-auto mb-4" />
            <h2 className="font-serif text-2xl text-[#483934] mb-2">Páginas aguardando suas histórias</h2>
            <p className="font-body text-sm text-[#66524B]/80 leading-relaxed">
              Adicione novos textos ao arquivo <code className="font-mono text-xs">src/data/Textos.json</code> para que apareçam aqui organizados por data.
            </p>
          </div>
        )}

        {/* Reading Modal */}
        <ReadingModal
          isOpen={Boolean(selectedTexto)}
          onClose={() => setSelectedTexto(null)}
          title={selectedTexto?.titulo || ''}
          subtitle={selectedTexto?.subtitulo}
          date={selectedTexto?.data}
          content={selectedTexto?.corpo || ''}
          type="texto"
        />
      </div>
    </div>
  );
};

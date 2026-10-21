import React, { useState } from 'react';
import { getPoemas } from '../lib/content';
import { Poema } from '../lib/types';
import { PoemaCard } from '../components/PoemaCard';
import { ReadingModal } from '../components/ReadingModal';
import { Pagination } from '../components/Pagination';
import { Feather } from 'lucide-react';

const ITEMS_PER_PAGE = 9;

export const Poemas: React.FC = () => {
  const [poemas] = useState<Poema[]>(() => getPoemas());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedPoema, setSelectedPoema] = useState<Poema | null>(null);

  const totalPages = Math.ceil(poemas.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPoemas = poemas.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" id="poemas-top">
        {/* Page Editorial Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#A98473] mb-3">
            <Feather className="w-3.5 h-3.5" />
            <span>Capítulo I · Versos e Rimas</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#483934] tracking-tight leading-tight mb-4">
            Nunca cansarei de te dizer
          </h1>
          <p className="font-body italic text-base sm:text-lg text-[#66524B]/80 leading-relaxed text-balance">
            Porque existem sentimentos que merecem ser transformados em versos, quantas vezes forem necessárias.
          </p>
          <div className="w-16 h-px bg-[#A98473]/30 mx-auto mt-6" aria-hidden="true" />
        </div>

        {/* Poems Grid */}
        {poemas.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {paginatedPoemas.map((poema) => (
                <PoemaCard
                  key={poema.id}
                  poema={poema}
                  onOpen={(p) => setSelectedPoema(p)}
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
              scrollTargetId="poemas-top"
            />
          </>
        ) : (
          <div className="paper-card rounded-2xl p-12 text-center max-w-lg mx-auto">
            <Feather className="w-10 h-10 text-[#A98473]/50 mx-auto mb-4" />
            <h2 className="font-serif text-2xl text-[#483934] mb-2">Um caderno à espera de versos</h2>
            <p className="font-body text-sm text-[#66524B]/80 leading-relaxed">
              Adicione novos poemas ao arquivo <code className="font-mono text-xs">src/data/Poemas.json</code> para que apareçam aqui automaticamente em ordem cronológica.
            </p>
          </div>
        )}

        {/* Reading Modal */}
        <ReadingModal
          isOpen={Boolean(selectedPoema)}
          onClose={() => setSelectedPoema(null)}
          title={selectedPoema?.titulo || ''}
          date={selectedPoema?.data}
          content={selectedPoema?.corpo || ''}
          type="poema"
        />
      </div>
    </div>
  );
};

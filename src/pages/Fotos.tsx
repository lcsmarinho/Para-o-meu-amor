import React, { useState } from 'react';
import { getFotografias } from '../lib/media';
import { FotoItem } from '../lib/types';
import { FotoCard } from '../components/FotoCard';
import { PhotoLightbox } from '../components/PhotoLightbox';
import { Pagination } from '../components/Pagination';
import { Image as ImageIcon, Camera, FolderHeart } from 'lucide-react';

const PHOTOS_PER_PAGE = 12;

export const Fotos: React.FC = () => {
  const [fotos] = useState<FotoItem[]>(() => getFotografias());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const totalPages = Math.ceil(fotos.length / PHOTOS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * PHOTOS_PER_PAGE;
  const paginatedFotos = fotos.slice(startIndex, startIndex + PHOTOS_PER_PAGE);

  const handleOpenPhoto = (foto: FotoItem) => {
    // Find index in full list for seamless lightbox navigation
    const index = fotos.findIndex((f) => f.id === foto.id);
    setSelectedPhotoIndex(index !== -1 ? index : 0);
  };

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" id="fotos-top">
        {/* Page Editorial Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#A98473] mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Capítulo III · Álbum de Memórias</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#483934] tracking-tight leading-tight mb-4">
            Nunca deixaremos de viver
          </h1>
          <p className="font-body italic text-base sm:text-lg text-[#66524B]/80 leading-relaxed text-balance">
            Porque cada fotografia guarda um instante que o tempo jamais poderá nos tirar.
          </p>
          <div className="w-16 h-px bg-[#A98473]/30 mx-auto mt-6" aria-hidden="true" />
        </div>

        {/* Gallery Grid or Beautiful Empty State */}
        {fotos.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {paginatedFotos.map((foto) => (
                <FotoCard
                  key={foto.id}
                  foto={foto}
                  onOpen={handleOpenPhoto}
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
              scrollTargetId="fotos-top"
            />
          </>
        ) : (
          /* Poetic, heartwarming Empty State */
          <div className="paper-card rounded-3xl p-8 sm:p-14 text-center max-w-2xl mx-auto border border-[#A98473]/25 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#FBEFF2] border border-[#A98473]/20 flex items-center justify-center text-[#A98473] mx-auto mb-6">
              <FolderHeart className="w-8 h-8" />
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#483934] mb-3">
              Um álbum à espera dos nossos instantes
            </h2>

            <p className="font-body text-base text-[#66524B]/85 leading-relaxed mb-6 max-w-lg mx-auto">
              Este espaço foi preparado para acolher nossas fotografias mais queridas. Cada imagem colocada aqui será um testemunho eterno dos dias felizes que compartilhamos.
            </p>

            <div className="bg-[#FBEFF2]/60 rounded-xl p-5 text-left border border-[#A98473]/15 text-xs font-sans text-[#66524B] space-y-2">
              <div className="font-semibold text-[#A98473] uppercase tracking-wider flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4" />
                <span>Como adicionar fotografias:</span>
              </div>
              <p>
                1. Coloque seus arquivos de imagem na pasta <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-[#A98473]/20">src/assets/Nossas fotos/</code> (formatos: JPG, PNG, WebP, AVIF, GIF).
              </p>
              <p>
                2. Opcionalmente, cadastre a data e uma legenda delicada no arquivo <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-[#A98473]/20">src/data/Fotos.json</code> relacionando com o nome exato do arquivo.
              </p>
              <p>
                3. A aplicação detectará tudo automaticamente e organizará o álbum em perfeita proporção estética!
              </p>
            </div>
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedPhotoIndex !== null && (
          <PhotoLightbox
            isOpen={selectedPhotoIndex !== null}
            onClose={() => setSelectedPhotoIndex(null)}
            photos={fotos}
            currentIndex={selectedPhotoIndex}
            onNavigate={(index) => setSelectedPhotoIndex(index)}
          />
        )}
      </div>
    </div>
  );
};

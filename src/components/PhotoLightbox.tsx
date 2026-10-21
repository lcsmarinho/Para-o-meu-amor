import React, { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { FotoItem } from '../lib/types';
import { formatarData } from '../lib/content';

interface PhotoLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  photos: FotoItem[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  isOpen,
  onClose,
  photos,
  currentIndex,
  onNavigate
}) => {
  const currentPhoto = photos[currentIndex];
  const touchStartX = useRef<number | null>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [currentIndex]);

  // Bloqueio de rolagem e atalhos de teclado
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          onNavigate(currentIndex - 1);
        } else {
          onNavigate(photos.length - 1);
        }
      } else if (e.key === 'ArrowRight') {
        if (currentIndex < photos.length - 1) {
          onNavigate(currentIndex + 1);
        } else {
          onNavigate(0);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, photos.length, onClose, onNavigate]);

  // Gestos de toque (touch swipe)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    const minSwipeDistance = 50;

    if (diff > minSwipeDistance) {
      // Swipe left -> próxima foto
      onNavigate((currentIndex + 1) % photos.length);
    } else if (diff < -minSwipeDistance) {
      // Swipe right -> foto anterior
      onNavigate((currentIndex - 1 + photos.length) % photos.length);
    }
    touchStartX.current = null;
  };

  if (!isOpen || !currentPhoto) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex - 1 + photos.length) % photos.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex + 1) % photos.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2d221e]/92 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label="Visualização ampliada da fotografia"
    >
      {/* Top action bar */}
      <div className="absolute top-0 inset-x-0 p-4 sm:p-6 flex items-center justify-between text-[#FFF9F4] z-20 pointer-events-none">
        <span className="text-xs font-sans tracking-widest text-[#FFF9F4]/70">
          {currentIndex + 1} de {photos.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="pointer-events-auto p-2.5 rounded-full bg-black/30 hover:bg-black/50 text-[#FFF9F4] transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
          aria-label="Fechar galeria"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Prev / Next buttons */}
      {photos.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 hover:bg-black/60 text-[#FFF9F4] transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label="Fotografia anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 hover:bg-black/60 text-[#FFF9F4] transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label="Próxima fotografia"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Center Image Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl max-h-[85vh] w-full px-4 sm:px-16 flex flex-col items-center justify-center"
      >
        <div className="relative max-h-[70vh] flex items-center justify-center">
          {!imgError ? (
            <img
              src={currentPhoto.url}
              alt={currentPhoto.mensagemExibicao}
              onError={() => setImgError(true)}
              className="max-h-[68vh] max-w-full w-auto h-auto object-contain rounded-lg shadow-2xl transition-all"
            />
          ) : (
            <div className="p-12 text-center text-[#FFF9F4]/70 font-serif">
              Não foi possível carregar esta fotografia.
            </div>
          )}
        </div>

        {/* Caption & Metadata below */}
        <div className="mt-4 max-w-xl text-center px-4">
          {currentPhoto.data && (
            <div className="inline-flex items-center gap-1.5 text-xs font-sans text-[#FFF9F4]/60 uppercase tracking-widest mb-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatarData(currentPhoto.data)}</span>
            </div>
          )}
          <p className="font-serif italic text-base sm:text-lg text-[#FFF9F4] leading-relaxed drop-shadow-sm">
            “{currentPhoto.mensagemExibicao}”
          </p>
        </div>
      </div>
    </div>
  );
};

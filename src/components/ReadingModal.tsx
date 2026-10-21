import React, { useEffect, useRef } from 'react';
import { X, Calendar } from 'lucide-react';
import { formatarData } from '../lib/content';

interface ReadingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  date?: string;
  content: string;
  type?: 'poema' | 'texto';
}

export const ReadingModal: React.FC<ReadingModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  date,
  content,
  type = 'poema'
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Trancar rolagem do fundo e gerenciar tecla Escape e foco
  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement as HTMLElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Focar no modal ao abrir
    if (modalRef.current) {
      modalRef.current.focus();
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#66524B]/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-reading-title"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#FFF9F4] text-[#66524B] rounded-2xl border border-[#A98473]/30 shadow-2xl overflow-hidden focus:outline-none"
      >
        {/* Subtle decorative book binding line on left */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#A98473]/30 hidden sm:block" />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 sm:px-10 sm:pt-8 sm:pb-5 border-b border-[#A98473]/15">
          <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#A98473]">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatarData(date)}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-[#A98473] hover:text-[#66524B] hover:bg-[#FBEFF2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#A98473]/30"
            aria-label="Fechar leitura"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:px-12 sm:py-8 overflow-y-auto flex-1 overscroll-contain">
          {/* Title */}
          <h2
            id="modal-reading-title"
            className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#483934] tracking-tight leading-snug mb-3 text-balance"
          >
            {title}
          </h2>

          {/* Subtitle if available */}
          {subtitle && (
            <p className="font-serif italic text-base sm:text-lg text-[#A98473] mb-8 leading-relaxed">
              {subtitle}
            </p>
          )}

          {/* Hairline decorative rule */}
          <div className="w-16 h-px bg-[#A98473]/40 my-6" aria-hidden="true" />

          {/* Content rendered according to type */}
          {type === 'poema' ? (
            <div className="font-serif text-lg sm:text-xl text-[#52413b] leading-relaxed whitespace-pre-line tracking-wide py-2">
              {content}
            </div>
          ) : (
            <div className="font-body text-base sm:text-lg text-[#52413b] leading-relaxed space-y-5">
              {content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="first-letter:text-3xl first-letter:font-serif first-letter:font-semibold first-letter:text-[#A98473] first-letter:mr-1">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          )}

          {/* End-of-reading subtle ornament */}
          <div className="mt-12 pt-6 border-t border-[#A98473]/15 flex justify-center text-[#A98473]/50">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C12 2 13 8 18 10C13 12 12 18 12 18C12 18 11 12 6 10C11 8 12 2 12 2Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

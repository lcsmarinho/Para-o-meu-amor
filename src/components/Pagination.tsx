import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  scrollTargetId?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  scrollTargetId
}) => {
  if (totalPages <= 1) return null;

  const handlePageClick = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
    
    // Scroll back to target or top smoothly
    if (scrollTargetId) {
      const el = document.getElementById(scrollTargetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page numbers
  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav
      className="flex items-center justify-center gap-1 sm:gap-2 mt-12 py-4"
      aria-label="Navegação entre páginas"
    >
      <button
        type="button"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3 py-1.5 text-xs sm:text-sm font-sans rounded-md border border-[#A98473]/25 bg-[#FFF9F4] text-[#66524B] hover:bg-[#FBEFF2] disabled:opacity-30 disabled:pointer-events-none transition-colors"
        aria-label="Página anterior"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Anterior</span>
      </button>

      <div className="flex items-center gap-1">
        {pages.map((p) => {
          const isActive = p === currentPage;
          return (
            <button
              key={p}
              type="button"
              onClick={() => handlePageClick(p)}
              className={`min-w-[36px] h-9 px-2 text-xs sm:text-sm font-serif rounded-md transition-all ${
                isActive
                  ? 'bg-[#A98473] text-[#FFF9F4] font-bold shadow-xs'
                  : 'bg-[#FFF9F4] text-[#66524B] border border-[#A98473]/20 hover:bg-[#FBEFF2]'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {p}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-3 py-1.5 text-xs sm:text-sm font-sans rounded-md border border-[#A98473]/25 bg-[#FFF9F4] text-[#66524B] hover:bg-[#FBEFF2] disabled:opacity-30 disabled:pointer-events-none transition-colors"
        aria-label="Próxima página"
      >
        <span className="hidden sm:inline">Próxima</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
};

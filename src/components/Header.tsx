import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Feather, Heart, Image as ImageIcon, ChevronRight, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    {
      to: '/',
      label: 'Início',
      shortLabel: 'Início',
      subtitle: 'Página inicial & últimos versos',
      icon: Heart
    },
    {
      to: '/poemas',
      label: 'Nunca cansarei de te dizer',
      shortLabel: 'Poemas',
      subtitle: 'Poemas e rimas de amor',
      icon: Feather
    },
    {
      to: '/textos',
      label: 'Nunca deixarei de pensar',
      shortLabel: 'Textos',
      subtitle: 'Cartas, reflexões e memórias',
      icon: BookOpen
    },
    {
      to: '/fotografias',
      label: 'Nunca deixaremos de viver',
      shortLabel: 'Fotografias',
      subtitle: 'Nosso álbum de fotografias',
      icon: ImageIcon
    },
  ];

  // Fechar menu mobile automaticamente ao trocar de página
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Trancar rolagem do body quando menu mobile estiver aberto
  useEffect(() => {
    if (mobileMenuOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [mobileMenuOpen]);

  // Fechar menu com a tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F4DDE4]/95 backdrop-blur-md border-b border-[#A98473]/15 transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-8">
          {/* Brand Zone: Título responsivo que não quebra nem empurra botões em celulares */}
          <Link
            to="/"
            className="group flex items-center gap-2 min-w-0 max-w-[calc(100%-3.5rem)] md:max-w-none text-[#66524B] hover:text-[#483934] transition-colors"
          >
            <span className="font-serif text-lg sm:text-2xl md:text-3xl font-medium tracking-tight text-[#483934] truncate">
              Um Amor Que Continua Sendo Escrito
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium shrink-0">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `transition-colors duration-200 py-1 border-b-2 whitespace-nowrap text-sm ${
                    isActive
                      ? 'border-[#A98473] font-semibold text-[#483934]'
                      : 'border-transparent text-[#66524B]/80 hover:text-[#483934] hover:border-[#A98473]/40'
                  }`
                }
              >
                {link.shortLabel || link.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile menu button com alvo de toque aprimorado (>=44px) */}
          <div className="flex md:hidden items-center shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-[#FFF9F4]/80 border border-[#A98473]/25 text-[#483934] shadow-xs active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#A98473]/40 cursor-pointer"
              aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Backdrop Scrim */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-16 z-40 bg-[#483934]/40 backdrop-blur-xs md:hidden animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal de navegação"
          className="fixed top-16 inset-x-0 z-50 bg-[#FFF9F4] border-b border-[#A98473]/25 shadow-2xl md:hidden overflow-y-auto max-h-[calc(100vh-4rem)] p-4 sm:p-6 animate-in slide-in-from-top-3 duration-200"
        >
          {/* Header do menu mobile */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#A98473]/15">
            <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#A98473] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Capítulos do Nosso Amor</span>
            </div>
            <span className="text-[11px] font-serif italic text-[#A98473]">
              Nosso cantinho
            </span>
          </div>

          {/* Lista de links em cartões de toque amplos e confortáveis */}
          <nav className="space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between p-3.5 rounded-xl transition-all duration-200 border ${
                      isActive
                        ? 'bg-[#FBEFF2] border-[#A98473]/40 text-[#483934] shadow-xs'
                        : 'bg-white/60 border-[#A98473]/15 text-[#66524B] hover:bg-[#FBEFF2]/60 hover:border-[#A98473]/30'
                    }`
                  }
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-[#FBEFF2] border border-[#A98473]/20 flex items-center justify-center text-[#A98473] shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 text-left">
                      <div className="font-serif text-base font-semibold leading-tight text-[#483934] truncate">
                        {link.label}
                      </div>
                      <div className="text-xs font-sans text-[#A98473] tracking-wide mt-0.5 truncate">
                        {link.subtitle}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#A98473]/60 shrink-0 ml-2" />
                </NavLink>
              );
            })}
          </nav>

          {/* Rodapé com citação dentro do menu mobile */}
          <div className="mt-5 pt-4 border-t border-[#A98473]/15 text-center">
            <p className="font-serif italic text-xs text-[#66524B]">
              “Enquanto houver amanhã, haverá mais uma página para nós.”
            </p>
          </div>
        </div>
      )}
    </>
  );
};

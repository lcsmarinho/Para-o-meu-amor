import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, BookOpen, Feather, Heart, Image as ImageIcon } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Início', icon: Heart },
    { to: '/poemas', label: 'Nunca cansarei de te dizer', shortLabel: 'Poemas', icon: Feather },
    { to: '/textos', label: 'Nunca deixarei de pensar', shortLabel: 'Textos', icon: BookOpen },
    { to: '/fotografias', label: 'Nunca deixaremos de viver', shortLabel: 'Fotografias', icon: ImageIcon },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F4DDE4]/90 backdrop-blur-md border-b border-[#A98473]/15 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Brand Zone: Single wordmark in display face */}
        <Link
          to="/"
          className="group flex items-center gap-2.5 text-slate-800 hover:text-[#66524B] transition-colors shrink-0"
        >
          <span className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#66524B]">
            Um Amor Que Continua Sendo Escrito
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition-colors duration-200 py-1 border-b-2 text-[#66524B] whitespace-nowrap ${
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

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#66524B] hover:bg-[#FBEFF2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#A98473]/30"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#A98473]/15 bg-[#FBEFF2]/95 backdrop-blur-lg px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="text-xs uppercase tracking-widest text-[#A98473] font-sans font-medium mb-2">
            Capítulos do Nosso Amor
          </div>
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2.5 px-3 rounded-lg text-base transition-colors ${
                    isActive
                      ? 'bg-[#FFF9F4] text-[#483934] font-semibold shadow-xs'
                      : 'text-[#66524B] hover:bg-[#FFF9F4]/60'
                  }`
                }
              >
                <Icon className="w-4 h-4 text-[#A98473]" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </header>
  );
};

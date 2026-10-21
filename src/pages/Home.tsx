import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Feather, BookOpen, Image as ImageIcon, ArrowRight, Heart } from 'lucide-react';
import { useMusic } from '../contexts/MusicContext';
import { getPoemas } from '../lib/content';
import { Poema } from '../lib/types';
import { PoemaCard } from '../components/PoemaCard';
import { ReadingModal } from '../components/ReadingModal';

export const Home: React.FC = () => {
  const { isPlaying, startStoryWithAudio, playlist } = useMusic();
  const [poemas] = useState<Poema[]>(() => getPoemas());
  const [selectedPoema, setSelectedPoema] = useState<Poema | null>(null);

  // Sempre os últimos poemas feitos (já ordenados decrescentemente por data)
  const ultimosPoemas = poemas.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 flex flex-col items-center">
        {/* Editorial Hero Section */}
        <div className="w-full text-center max-w-3xl flex flex-col items-center mb-16 sm:mb-20">
          {/* Subtle top indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-sans uppercase tracking-widest text-[#A98473] mb-6">
            <Heart className="w-3.5 h-3.5 text-[#A98473]" />
            <span>Nosso Refúgio Literário</span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium text-[#483934] tracking-tight leading-[1.15] text-balance mb-8">
            Há amores que merecem ser escritos para sempre.
          </h1>

          {/* Hairline botanical divider */}
          <div className="flex items-center gap-4 text-[#A98473]/30 mb-8 w-48" aria-hidden="true">
            <span className="flex-1 h-px bg-[#A98473]/30" />
            <span className="w-2 h-2 rotate-45 border border-[#A98473]/50" />
            <span className="flex-1 h-px bg-[#A98473]/30" />
          </div>

          {/* Love Declaration */}
          <div className="bg-[#FFF9F4]/80 backdrop-blur-xs rounded-2xl border border-[#A98473]/20 p-6 sm:p-10 shadow-xs text-left sm:text-center relative overflow-hidden">
            <div className="absolute top-2 left-3 font-serif text-5xl text-[#A98473]/15 select-none" aria-hidden="true">
              “
            </div>
            <p className="font-body text-base sm:text-lg lg:text-xl text-[#52413b] leading-relaxed relative z-10">
              Este é o lugar onde guardo aquilo que as palavras tentam alcançar, o que os pensamentos insistem em lembrar e o que os nossos dias transformam em eternidade. Um pequeno universo feito de tudo aquilo que vivemos, sentimos e ainda viveremos.
            </p>
            <div className="mt-4 text-xs font-sans uppercase tracking-widest text-[#A98473]/80">
              Para você, com todo o meu amor
            </div>
          </div>

          {/* Soundtrack button if not yet playing */}
          {!isPlaying && playlist.length > 0 && (
            <button
              type="button"
              onClick={startStoryWithAudio}
              className="mt-8 inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#FFF9F4] border border-[#A98473]/30 text-[#66524B] hover:bg-[#FBEFF2] transition-all text-xs font-sans font-medium tracking-wide shadow-xs hover:shadow-md cursor-pointer group"
            >
              <span className="w-2 h-2 rounded-full bg-[#B8CD91] animate-pulse" />
              <span>Ouvir a trilha da nossa história</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#A98473] group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

        {/* Seção: Últimos Poemas Escritos */}
        {ultimosPoemas.length > 0 && (
          <section className="w-full mb-16 sm:mb-24">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#A98473]/15">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#A98473] mb-2">
                  <Feather className="w-3.5 h-3.5" />
                  <span>Recém-saídos do coração</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#483934] tracking-tight">
                  Últimos Versos Escritos
                </h2>
              </div>
              <Link
                to="/poemas"
                className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-[#A98473] hover:text-[#483934] transition-colors group"
              >
                <span>Ver todos os poemas</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {ultimosPoemas.map((poema) => (
                <PoemaCard
                  key={poema.id}
                  poema={poema}
                  onOpen={(p) => setSelectedPoema(p)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Seção: 3 Portais de Exploração da História */}
        <section className="w-full">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="text-xs uppercase tracking-widest text-[#A98473] font-sans font-medium mb-2">
              Capítulos da Nossa História
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#483934] tracking-tight">
              Os Lugares do Nosso Amor
            </h2>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Portal 1: Poemas */}
            <Link
              to="/poemas"
              className="paper-card group rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-[#A98473]/40"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-[#FBEFF2] border border-[#A98473]/20 flex items-center justify-center text-[#A98473] mb-6 group-hover:scale-105 transition-transform">
                  <Feather className="w-5 h-5" />
                </div>
                <div className="text-xs uppercase tracking-widest text-[#A98473] font-sans font-semibold mb-2">
                  Capítulo I · Versos
                </div>
                <h3 className="font-serif text-2xl font-semibold text-[#483934] leading-snug mb-3 group-hover:text-[#302521] transition-colors">
                  Nunca cansarei de te dizer
                </h3>
                <p className="font-body text-sm sm:text-base text-[#66524B]/80 leading-relaxed italic">
                  “Porque existem sentimentos que merecem ser transformados em versos, quantas vezes forem necessárias.”
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#A98473]/15 flex items-center justify-between text-xs font-sans font-medium text-[#A98473] group-hover:text-[#66524B]">
                <span>Entrar nos poemas</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Portal 2: Textos */}
            <Link
              to="/textos"
              className="paper-card group rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-[#A98473]/40"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-[#FBEFF2] border border-[#A98473]/20 flex items-center justify-center text-[#A98473] mb-6 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="text-xs uppercase tracking-widest text-[#A98473] font-sans font-semibold mb-2">
                  Capítulo II · Reflexões
                </div>
                <h3 className="font-serif text-2xl font-semibold text-[#483934] leading-snug mb-3 group-hover:text-[#302521] transition-colors">
                  Nunca deixarei de pensar
                </h3>
                <p className="font-body text-sm sm:text-base text-[#66524B]/80 leading-relaxed italic">
                  “Porque mesmo quando não estou escrevendo, existe sempre alguma parte de mim pensando em você.”
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#A98473]/15 flex items-center justify-between text-xs font-sans font-medium text-[#A98473] group-hover:text-[#66524B]">
                <span>Abrir as reflexões</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Portal 3: Fotografias */}
            <Link
              to="/fotografias"
              className="paper-card group rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-[#A98473]/40"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-[#FBEFF2] border border-[#A98473]/20 flex items-center justify-center text-[#A98473] mb-6 group-hover:scale-105 transition-transform">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div className="text-xs uppercase tracking-widest text-[#A98473] font-sans font-semibold mb-2">
                  Capítulo III · Memórias
                </div>
                <h3 className="font-serif text-2xl font-semibold text-[#483934] leading-snug mb-3 group-hover:text-[#302521] transition-colors">
                  Nunca deixaremos de viver
                </h3>
                <p className="font-body text-sm sm:text-base text-[#66524B]/80 leading-relaxed italic">
                  “Porque cada fotografia guarda um instante que o tempo jamais poderá nos tirar.”
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#A98473]/15 flex items-center justify-between text-xs font-sans font-medium text-[#A98473] group-hover:text-[#66524B]">
                <span>Ver nosso álbum</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </section>

        {/* Modal para leitura direta dos últimos poemas na Home */}
        <ReadingModal
          isOpen={Boolean(selectedPoema)}
          onClose={() => setSelectedPoema(null)}
          title={selectedPoema?.titulo || ''}
          date={selectedPoema?.data}
          content={selectedPoema?.corpo || ''}
          type="poema"
        />
      </main>
    </div>
  );
};

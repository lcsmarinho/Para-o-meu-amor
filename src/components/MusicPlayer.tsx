import React, { useState, useEffect, useRef } from 'react';
import {
  Music,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Volume1,
  X,
  Sparkles,
  GripHorizontal
} from 'lucide-react';
import { useMusic } from '../contexts/MusicContext';

export const MusicPlayer: React.FC = () => {
  const {
    playlist,
    currentTrack,
    isPlaying,
    volume,
    progress,
    currentTime,
    duration,
    isPlayerOpen,
    showAutoplayBanner,
    playerPosition,
    togglePlay,
    nextTrack,
    prevTrack,
    setVolume,
    seekTo,
    setIsPlayerOpen,
    dismissAutoplayBanner,
    setPlayerPosition,
    startStoryWithAudio
  } = useMusic();

  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ startX: number; startY: number; posX: number; posY: number }>({
    startX: 0,
    startY: 0,
    posX: 0,
    posY: 0
  });
  const hasMovedRef = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Formatação de minutos:segundos
  const formatTime = (secs: number) => {
    if (!secs || isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Dragging handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    hasMovedRef.current = false;
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: playerPosition.x,
      posY: playerPosition.y
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.startX;
    const deltaY = e.clientY - dragStartRef.current.startY;

    if (Math.hypot(deltaX, deltaY) > 5) {
      hasMovedRef.current = true;
    }

    const newX = dragStartRef.current.posX - deltaX; // offset from right edge
    const newY = dragStartRef.current.posY - deltaY; // offset from bottom edge

    // Limites da tela
    const maxX = window.innerWidth - 64;
    const maxY = window.innerHeight - 64;

    const clampedX = Math.max(16, Math.min(maxX, newX));
    const clampedY = Math.max(16, Math.min(maxY, newY));

    setPlayerPosition({ x: clampedX, y: clampedY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignorar
    }
  };

  const handleButtonClick = () => {
    if (!hasMovedRef.current) {
      setIsPlayerOpen(!isPlayerOpen);
    }
  };

  // Se a tela for redimensionada, garantir que o botão não fique fora
  useEffect(() => {
    const handleResize = () => {
      const maxX = window.innerWidth - 64;
      const maxY = window.innerHeight - 64;
      if (playerPosition.x > maxX || playerPosition.y > maxY) {
        setPlayerPosition({
          x: Math.max(16, Math.min(maxX, playerPosition.x)),
          y: Math.max(16, Math.min(maxY, playerPosition.y))
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [playerPosition, setPlayerPosition]);

  const isNearLeft = typeof window !== 'undefined' && playerPosition.x > window.innerWidth / 2;
  const isNearTop = typeof window !== 'undefined' && playerPosition.y > window.innerHeight / 2;

  return (
    <>
      {/* Convite Suave de Trilha Sonora (Autoplay Banner) */}
      {showAutoplayBanner && !isPlaying && playlist.length > 0 && (
        <aside
          role="region"
          aria-label="Convite para trilha sonora"
          className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-24 sm:w-80 z-40 bg-[#FFF9F4] border border-[#A98473]/30 rounded-2xl p-4 shadow-xl animate-in slide-in-from-bottom-3 duration-300"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#A98473]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Trilha Afetiva</span>
            </div>
            <button
              type="button"
              onClick={dismissAutoplayBanner}
              className="text-[#A98473]/60 hover:text-[#66524B] p-1 rounded-full transition-colors"
              aria-label="Fechar convite"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="font-serif italic text-sm text-[#483934] mt-1.5 mb-3 leading-snug">
            Esta história também tem uma trilha sonora.
          </p>
          <button
            type="button"
            onClick={startStoryWithAudio}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#A98473] hover:bg-[#967464] text-[#FFF9F4] text-xs font-sans font-medium rounded-lg shadow-xs transition-colors"
          >
            <Music className="w-3.5 h-3.5" />
            <span>Ouvir nossa história</span>
          </button>
        </aside>
      )}

      {/* Floating draggable button and panel container */}
      <div
        ref={containerRef}
        style={{
          position: 'fixed',
          right: `${playerPosition.x}px`,
          bottom: `${playerPosition.y}px`,
          zIndex: 45
        }}
        className="touch-none select-none"
      >
        {/* Expanded Panel */}
        {isPlayerOpen && (
          <div
            style={{
              position: 'absolute',
              bottom: isNearTop ? 'auto' : '60px',
              top: isNearTop ? '60px' : 'auto',
              right: isNearLeft ? 'auto' : '0',
              left: isNearLeft ? '0' : 'auto'
            }}
            className="w-72 sm:w-80 bg-[#FFF9F4] border border-[#A98473]/30 rounded-2xl p-5 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#A98473]/15">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-[#A98473]" />
                <span className="text-xs font-sans uppercase tracking-widest text-[#A98473]">
                  Nossa Trilha Sonora
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsPlayerOpen(false)}
                className="text-[#A98473]/60 hover:text-[#66524B] p-1 rounded-full transition-colors"
                aria-label="Minimizar player"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {playlist.length > 0 ? (
              <div className="mt-3">
                {/* Title & Playing animation */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="overflow-hidden">
                    <p className="font-serif font-medium text-base text-[#483934] truncate">
                      {currentTrack?.titulo || 'Música do Nosso Amor'}
                    </p>
                    <p className="text-[11px] font-sans text-[#A98473] tracking-wide">
                      {isPlaying ? 'Em reprodução contínua' : 'Pausado'}
                    </p>
                  </div>
                  {/* Subtle audio visualizer bars */}
                  <div className="flex items-end gap-0.5 h-4 shrink-0" aria-hidden="true">
                    <span
                      className={`w-1 bg-[#A98473] rounded-full transition-all duration-300 ${
                        isPlaying ? 'h-4 animate-pulse' : 'h-1.5 opacity-40'
                      }`}
                    />
                    <span
                      className={`w-1 bg-[#A98473] rounded-full transition-all duration-200 ${
                        isPlaying ? 'h-3 animate-pulse' : 'h-1.5 opacity-40'
                      }`}
                    />
                    <span
                      className={`w-1 bg-[#A98473] rounded-full transition-all duration-300 ${
                        isPlaying ? 'h-4 animate-pulse' : 'h-1.5 opacity-40'
                      }`}
                    />
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1 mb-4">
                  <div
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      const percent = (clickX / rect.width) * 100;
                      seekTo(percent);
                    }}
                    className="h-1.5 bg-[#F4DDE4] rounded-full overflow-hidden cursor-pointer"
                  >
                    <div
                      style={{ width: `${progress}%` }}
                      className="h-full bg-[#A98473] rounded-full transition-all duration-150"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-sans text-[#A98473] tabular-nums">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Playback Controls */}
                <div className="flex items-center justify-center gap-4 mb-4">
                  <button
                    type="button"
                    onClick={prevTrack}
                    className="p-2 rounded-full text-[#66524B] hover:bg-[#FBEFF2] transition-colors"
                    aria-label="Música anterior"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="p-3 rounded-full bg-[#A98473] text-[#FFF9F4] hover:bg-[#967464] shadow-md transition-transform hover:scale-105"
                    aria-label={isPlaying ? 'Pausar música' : 'Reproduzir música'}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={nextTrack}
                    className="p-2 rounded-full text-[#66524B] hover:bg-[#FBEFF2] transition-colors"
                    aria-label="Próxima música"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>

                {/* Volume Slider & Controls */}
                <div className="flex items-center gap-2 pt-2 border-t border-[#A98473]/15">
                  <button
                    type="button"
                    onClick={() => setVolume(volume === 0 ? 0.6 : 0)}
                    className="text-[#A98473] hover:text-[#66524B] p-1 rounded-md transition-colors"
                    aria-label={volume === 0 ? 'Ativar som' : 'Silenciar som'}
                  >
                    {volume === 0 ? (
                      <VolumeX className="w-4 h-4" />
                    ) : volume < 0.5 ? (
                      <Volume1 className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-[#F4DDE4] accent-[#A98473] rounded-full cursor-pointer"
                    aria-label="Controle de volume"
                  />
                  <span className="text-[10px] font-sans text-[#A98473] tabular-nums w-8 text-right">
                    {Math.round(volume * 100)}%
                  </span>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center text-xs font-serif text-[#A98473]">
                Nenhuma música adicionada ainda em <br />
                <code className="text-[11px] text-[#66524B] font-mono">src/assets/Músicas/</code>
              </div>
            )}
          </div>
        )}

        {/* Floating Toggle Button (Draggable) */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onClick={handleButtonClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsPlayerOpen(!isPlayerOpen);
            }
          }}
          className={`relative flex items-center justify-center w-12 h-12 rounded-full shadow-lg border border-[#A98473]/30 cursor-grab active:cursor-grabbing transition-colors duration-200 ${
            isPlaying
              ? 'bg-[#A98473] text-[#FFF9F4] ring-4 ring-[#F4DDE4]'
              : 'bg-[#FFF9F4] text-[#66524B] hover:bg-[#FBEFF2]'
          }`}
          aria-label={isPlayerOpen ? 'Fechar player de música' : 'Abrir player de música'}
          title="Arraste para reposicionar ou clique para abrir"
        >
          <Music className={`w-5 h-5 ${isPlaying ? 'animate-bounce' : ''}`} />

          {/* Discreet drag grip indicator on top */}
          <div className="absolute -top-1 opacity-40 hover:opacity-100">
            <GripHorizontal className="w-3.5 h-3.5 text-[#66524B]" />
          </div>

          {/* Playing indicator ring */}
          {isPlaying && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#B8CD91] border-2 border-[#FFF9F4] rounded-full" />
          )}
        </div>
      </div>
    </>
  );
};

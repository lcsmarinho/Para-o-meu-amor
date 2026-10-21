import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { getPlaylist } from '../lib/media';
import { MusicaItem } from '../lib/types';

interface Position {
  x: number;
  y: number;
}

interface MusicContextType {
  playlist: MusicaItem[];
  currentTrackIndex: number;
  currentTrack: MusicaItem | null;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  progress: number;
  currentTime: number;
  duration: number;
  isPlayerOpen: boolean;
  showAutoplayBanner: boolean;
  playerPosition: Position;
  togglePlay: () => void;
  play: () => void;
  pause: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setVolume: (vol: number) => void;
  seekTo: (percent: number) => void;
  setIsPlayerOpen: (open: boolean) => void;
  dismissAutoplayBanner: () => void;
  setPlayerPosition: (pos: Position) => void;
  startStoryWithAudio: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

const STORAGE_KEY_POS = 'amor_player_pos_v1';
const STORAGE_KEY_VOL = 'amor_player_vol_v1';

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playlist, setPlaylist] = useState<MusicaItem[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_VOL);
      return saved ? Math.max(0, Math.min(1, parseFloat(saved))) : 0.6;
    } catch {
      return 0.6;
    }
  });

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlayerOpen, setIsPlayerOpen] = useState<boolean>(false);
  const [showAutoplayBanner, setShowAutoplayBanner] = useState<boolean>(true);

  // Posição inicial do player flutuante (canto inferior direito)
  const [playerPosition, setPlayerPositionState] = useState<Position>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_POS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.x === 'number' && typeof parsed.y === 'number') {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return { x: 24, y: 24 }; // Offset da margem inferior-direita
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playlistRef = useRef<MusicaItem[]>([]);
  const currentTrackIndexRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);

  // Manter refs sincronizados com os states
  useEffect(() => {
    playlistRef.current = playlist;
  }, [playlist]);

  useEffect(() => {
    currentTrackIndexRef.current = currentTrackIndex;
  }, [currentTrackIndex]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Inicializar playlist
  useEffect(() => {
    const list = getPlaylist();
    setPlaylist(list);
    playlistRef.current = list;
  }, []);

  const currentTrack = playlist[currentTrackIndex] || null;

  // Criar elemento de áudio único persistente com loop garantido
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.volume = volume;
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      const list = playlistRef.current;
      if (list.length === 0) return;

      if (list.length === 1) {
        // Loop contínuo para faixa única
        audio.currentTime = 0;
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.warn('Erro ao reiniciar faixa em loop:', err));
      } else {
        // Avança para a próxima música sequencialmente ou volta ao início da playlist
        const nextIdx = (currentTrackIndexRef.current + 1) % list.length;
        currentTrackIndexRef.current = nextIdx;
        setCurrentTrackIndex(nextIdx);

        audio.src = list[nextIdx].url;
        audio.load();
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.warn('Erro ao tocar próxima música em loop:', err));
      }
    };

    const handleError = (e: Event) => {
      console.warn('Aviso de reprodução de áudio:', e);
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
    };
  }, []);

  // Atualizar fonte de áudio quando a faixa muda manualmente
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    // Apenas atualizar o src se for diferente do atual
    const currentSrc = audio.src ? new URL(audio.src, window.location.href).href : '';
    const newSrc = new URL(currentTrack.url, window.location.href).href;

    if (currentSrc !== newSrc) {
      const wasPlaying = isPlayingRef.current;
      audio.src = currentTrack.url;
      audio.load();

      if (wasPlaying) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  }, [currentTrackIndex, currentTrack]);

  // Atualizar volume no elemento de áudio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Tentar reprodução inicial silenciosa ou convite suave
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || playlist.length === 0) return;

    // Tentativa suave de autoplay
    audio.src = playlist[0].url;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        setShowAutoplayBanner(false);
      })
      .catch(() => {
        // Bloqueado pelo navegador: normal, mantém o convite discreto visível
        setIsPlaying(false);
      });
  }, [playlist]);

  const play = () => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        setShowAutoplayBanner(false);
      })
      .catch((err) => {
        console.warn('Reprodução bloqueada:', err);
      });
  };

  const pause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const startStoryWithAudio = () => {
    setShowAutoplayBanner(false);
    play();
  };

  const nextTrack = () => {
    const list = playlistRef.current;
    if (list.length === 0) return;
    if (list.length === 1) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().then(() => setIsPlaying(true)).catch(console.warn);
      }
      return;
    }
    const nextIdx = (currentTrackIndexRef.current + 1) % list.length;
    currentTrackIndexRef.current = nextIdx;
    setCurrentTrackIndex(nextIdx);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    const list = playlistRef.current;
    if (list.length === 0) return;
    if (list.length === 1) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().then(() => setIsPlaying(true)).catch(console.warn);
      }
      return;
    }
    const prevIdx = (currentTrackIndexRef.current - 1 + list.length) % list.length;
    currentTrackIndexRef.current = prevIdx;
    setCurrentTrackIndex(prevIdx);
    setIsPlaying(true);
  };

  const setVolume = (val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    if (clamped > 0 && isMuted) {
      setIsMuted(false);
    }
    try {
      localStorage.setItem(STORAGE_KEY_VOL, clamped.toString());
    } catch {
      // Ignorar erro de storage
    }
  };

  const seekTo = (percent: number) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const target = (percent / 100) * duration;
    audio.currentTime = target;
    setCurrentTime(target);
  };

  const setPlayerPosition = (pos: Position) => {
    setPlayerPositionState(pos);
    try {
      localStorage.setItem(STORAGE_KEY_POS, JSON.stringify(pos));
    } catch {
      // Ignorar erro de storage
    }
  };

  const dismissAutoplayBanner = () => {
    setShowAutoplayBanner(false);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <MusicContext.Provider
      value={{
        playlist,
        currentTrackIndex,
        currentTrack,
        isPlaying,
        isMuted,
        volume,
        progress,
        currentTime,
        duration,
        isPlayerOpen,
        showAutoplayBanner,
        playerPosition,
        togglePlay,
        play,
        pause,
        nextTrack,
        prevTrack,
        setVolume,
        seekTo,
        setIsPlayerOpen,
        dismissAutoplayBanner,
        setPlayerPosition,
        startStoryWithAudio
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic deve ser utilizado dentro de MusicProvider');
  }
  return context;
};

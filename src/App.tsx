import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MusicProvider } from './contexts/MusicContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MusicPlayer } from './components/MusicPlayer';
import { Home } from './pages/Home';
import { Poemas } from './pages/Poemas';
import { Textos } from './pages/Textos';
import { Fotos } from './pages/Fotos';

export default function App() {
  return (
    <BrowserRouter>
      <MusicProvider>
        <div className="min-h-screen flex flex-col bg-[#F4DDE4] text-[#66524B] font-body selection:bg-[#FBEFF2] selection:text-[#483934]">
          <Header />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/poemas" element={<Poemas />} />
              <Route path="/textos" element={<Textos />} />
              <Route path="/fotografias" element={<Fotos />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Footer />
          {/* Floating draggable music player persistent across all routes */}
          <MusicPlayer />
        </div>
      </MusicProvider>
    </BrowserRouter>
  );
}

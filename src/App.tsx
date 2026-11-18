/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useCallback } from 'react';
import { MessageCircle } from 'lucide-react';
import { IntroEntrance } from './components/IntroEntrance.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { EletrofunkCommand } from './components/EletrofunkCommand.tsx';
import { SpotifySection } from './components/SpotifySection.tsx';
import { Gallery } from './components/Gallery.tsx';
import { Experience } from './components/Experience.tsx';
import { Booking } from './components/Booking.tsx';
import { Footer } from './components/Footer.tsx';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [hasEntered, setHasEntered] = useState(false);
  const [logoConnected, setLogoConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const userExplicitlyMutedRef = useRef(false);

  const handleStartReveal = useCallback(() => {
    setHasEntered(true);
    userExplicitlyMutedRef.current = false;
    const video = heroVideoRef.current;
    if (video) {
      video.muted = false;
      video.volume = 1.0;
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsMuted(false);
          })
          .catch(() => {
            video.muted = true;
            setIsMuted(true);
            video.play().catch(() => {});
          });
      }
    }
  }, []);

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-[#050505] text-[#F4F4F5] selection:bg-white selection:text-black flex flex-col font-body">
      {/* Automatic Animated Entrance with DJ NERY Logo connecting to Hero */}
      {showIntro && (
        <IntroEntrance
          onStartReveal={handleStartReveal}
          onLogoConnected={() => setLogoConnected(true)}
          onComplete={() => setShowIntro(false)}
        />
      )}

      {/* Fixed Header */}
      <Navbar />

      {/* Main Landing Page Sections */}
      <main className="flex-1 w-full max-w-[100vw] overflow-x-hidden">
        {/* 1. HERO / DJ NERY */}
        <Hero
          videoRef={heroVideoRef}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          userExplicitlyMutedRef={userExplicitlyMutedRef}
          hasEntered={hasEntered}
          logoConnected={logoConnected}
        />

        {/* MARQUEE DIVIDER (LOOP CONTÍNUO) */}
        <EletrofunkCommand />

        {/* 2. SPOTIFY OFICIAL */}
        <SpotifySection />

        {/* 3. PALCO & ESTÚDIO / MOMENTOS & SHOWS */}
        <Gallery />

        {/* 4. SOBRE O DJ NERY */}
        <Experience />

        {/* 5. CONTRATAÇÕES */}
        <Booking />
      </main>

      {/* 6. RODAPÉ */}
      <Footer />

      {/* Mobile Floating Quick Message Button (< 50px) */}
      <aside aria-label="Acesso rápido para contratar" className="sm:hidden fixed bottom-5 right-5 z-30">
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('dados-evento') || document.getElementById('contratacoes');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-white via-zinc-200 to-zinc-300 text-black flex items-center justify-center shadow-2xl border border-white/40 active:scale-95 transition-transform cursor-pointer"
          aria-label="Montar dados do evento para contratar DJ NERY"
        >
          <MessageCircle className="w-5 h-5" />
        </button>
      </aside>
    </div>
  );
}

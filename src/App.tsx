/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  const [isRevealing, setIsRevealing] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const userExplicitlyMutedRef = useRef(false);
  const revealTriggeredRef = useRef(false);

  const startRevealSequence = useCallback(() => {
    if (revealTriggeredRef.current) return;
    revealTriggeredRef.current = true;
    setIsRevealing(true);
    window.setTimeout(() => {
      setIntroDone(true);
    }, 950);
  }, []);

  // Synchronous tap handler when mobile browser requires an in-page tap to allow audio
  const handleTapEnter = useCallback(() => {
    const video = heroVideoRef.current;
    userExplicitlyMutedRef.current = false;
    if (video) {
      video.muted = false;
      video.volume = 1.0;
      const p = video.play();
      if (p !== undefined) {
        p.then(() => {
          setIsMuted(false);
        }).catch(() => {});
      }
    }
    setNeedsTap(false);
    startRevealSequence();
  }, [startRevealSequence]);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) {
      const t = window.setTimeout(startRevealSequence, 1000);
      return () => window.clearTimeout(t);
    }

    video.volume = 1.0;
    video.muted = false;

    const p = video.play();
    if (p !== undefined) {
      p.then(() => {
        // Browser permitted cold unmuted autoplay -> auto-open after logo intro
        setIsMuted(false);
        setNeedsTap(false);
        window.setTimeout(startRevealSequence, 1000);
      }).catch(() => {
        // Mobile Safari/Chrome blocked unmuted autoplay until user taps ->
        // keep video pre-buffering silently and invite single tap on the intro logo
        video.muted = true;
        setIsMuted(true);
        video.play().catch(() => {});
        setNeedsTap(true);
      });
    } else {
      window.setTimeout(startRevealSequence, 1000);
    }
  }, [startRevealSequence]);

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-[#050505] text-[#F4F4F5] selection:bg-white selection:text-black flex flex-col font-body">
      {/* Split-curtain entrance synced with Hero's single-element logo and audio unlock */}
      {!introDone && (
        <IntroEntrance
          isRevealing={isRevealing}
          needsTap={needsTap}
          onTapEnter={handleTapEnter}
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
          isRevealing={isRevealing}
          introDone={introDone}
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

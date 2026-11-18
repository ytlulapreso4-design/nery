/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { EletrofunkCommand } from './components/EletrofunkCommand.tsx';
import { Gallery } from './components/Gallery.tsx';
import { SpotifySection } from './components/SpotifySection.tsx';
import { Experience } from './components/Experience.tsx';
import { Booking } from './components/Booking.tsx';
import { Footer } from './components/Footer.tsx';

export default function App() {
  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-[#050505] text-[#F4F4F5] selection:bg-white selection:text-black flex flex-col font-body">
      {/* Fixed Header */}
      <Navbar />

      {/* Main Landing Page Sections */}
      <main className="flex-1 w-full max-w-[100vw] overflow-x-hidden">
        {/* 1. HERO / DJ NERY */}
        <Hero />

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

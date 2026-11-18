import React, { useEffect, useRef } from 'react';
import { Disc3, ArrowUpRight, Headphones } from 'lucide-react';
import { ARTIST_CONFIG } from '../config/media.ts';
import { requestHeroMute } from './Hero.tsx';

export const SpotifySection: React.FC = () => {
  const spotifyIframeRef = useRef<HTMLIFrameElement>(null);

  // Detect when user clicks inside the cross-origin Spotify embed iframe
  useEffect(() => {
    const handleWindowBlur = () => {
      window.setTimeout(() => {
        if (document.activeElement === spotifyIframeRef.current) {
          requestHeroMute();
        }
      }, 0);
    };

    window.addEventListener('blur', handleWindowBlur);
    return () => window.removeEventListener('blur', handleWindowBlur);
  }, []);

  return (
    <section
      id="spotify"
      className="relative py-20 sm:py-28 bg-[#08080A] text-[#F4F4F5] border-t border-white/10 overflow-hidden w-full max-w-full"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Editorial Info & CTA */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 mb-3">
              <Headphones className="w-3.5 h-3.5 text-zinc-300" />
              <span>Spotify Oficial · Goiânia</span>
            </div>

            <h2
              className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-white leading-[1.02]"
              style={{ textWrap: 'balance' }}
            >
              Ouça o som do <span className="text-chrome">DJ NERY</span> agora.
            </h2>

            <p className="mt-5 text-sm sm:text-base text-zinc-300 leading-relaxed">
              Confira as faixas, produções de eletrofunk e sets que movimentam as pistas e paredões de Goiânia para todo o Brasil. Dê o play diretamente abaixo ou acompanhe o perfil oficial no Spotify.
            </p>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
              <a
                href={ARTIST_CONFIG.contacts.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={requestHeroMute}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-white via-zinc-200 to-zinc-300 text-black hover:from-zinc-100 hover:to-white transition-all whitespace-nowrap shrink-0"
              >
                <Disc3 className="w-4 h-4" />
                <span>Seguir no Spotify</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Official Spotify Artist Embed */}
          <div className="lg:col-span-7">
            <div className="p-3 sm:p-4 bg-[#0E0E11] border border-white/15 shadow-2xl">
              <iframe
                ref={spotifyIframeRef}
                title="Player Oficial DJ NERY no Spotify"
                src={ARTIST_CONFIG.contacts.spotifyEmbedUrl}
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="w-full rounded-lg bg-[#121212]"
              />
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400 px-1">
                <span>DJ NERY · Eletrofunk</span>
                <a
                  href={ARTIST_CONFIG.contacts.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={requestHeroMute}
                  className="text-zinc-200 hover:text-white inline-flex items-center gap-1 transition-colors"
                >
                  <span>Abrir no aplicativo</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

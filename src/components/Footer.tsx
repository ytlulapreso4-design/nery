import React from 'react';
import { ArrowUp, Disc3, MessageCircle } from 'lucide-react';
import { ARTIST_CONFIG } from '../config/media.ts';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050505] text-[#F4F4F5] border-t border-white/10 pt-16 sm:pt-20 pb-12 overflow-hidden overflow-x-clip w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Area: Brand Signature & Direct Links */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-white/10">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.22em] text-zinc-400 block mb-3">
              Site Oficial · {ARTIST_CONFIG.city}
            </span>
            <div className="flex items-center gap-4">
              <img
                src={ARTIST_CONFIG.media.logo.path}
                alt="DJ NERY"
                className="h-12 sm:h-14 w-auto object-contain"
              />
              <span className="sr-only">DJ NERY</span>
            </div>
          </div>

          {/* Official Action Links */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={ARTIST_CONFIG.contacts.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 text-xs font-mono uppercase tracking-wider bg-white/[0.04] hover:bg-white/[0.1] border border-white/15 text-white hover:border-white/50 transition-all whitespace-nowrap"
            >
              <Disc3 className="w-4 h-4 text-zinc-300" />
              <span>Spotify</span>
            </a>

            <a
              href={ARTIST_CONFIG.getWhatsappBookingUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 text-xs font-mono uppercase tracking-wider bg-white/[0.04] hover:bg-white/[0.1] border border-white/15 text-white hover:border-white/50 transition-all whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-zinc-300" />
              <span>WhatsApp Shows</span>
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              className="p-3 text-zinc-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.1] border border-white/15 transition-colors cursor-pointer"
              aria-label="Voltar ao topo da página"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div>
            © {currentYear} DJ NERY. Todos os direitos reservados.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-zinc-400">
            <span>Goiânia, GO · Brasil</span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span className="tabular-nums">{ARTIST_CONFIG.contacts.whatsappNumber}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

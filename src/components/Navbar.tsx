import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { ARTIST_CONFIG } from '../config/media.ts';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const next = window.scrollY > 40;
          setIsScrolled((prev) => (prev !== next ? next : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Spotify', href: '#spotify' },
    { label: 'Momentos', href: '#momentos' },
    { label: 'Sobre', href: '#experiencia' },
    { label: 'Contratar', href: '#contratacoes' },
  ];

  const scrollToBooking = () => {
    const el = document.getElementById('dados-evento') || document.getElementById('contratacoes');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#050505]/92 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-black/85 via-black/45 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Single-element Brand Wordmark */}
          <a
            href="#"
            className="flex items-center shrink-0 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label="DJ NERY Início"
          >
            <img
              src={ARTIST_CONFIG.media.logo.path}
              alt="DJ NERY"
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </a>

          {/* Zone 2: 4 Clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-mono text-zinc-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-white transition-colors relative py-1 group whitespace-nowrap shrink-0"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-white to-zinc-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary action */}
          <div className="hidden sm:flex items-center shrink-0">
            <button
              type="button"
              onClick={scrollToBooking}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-white via-zinc-200 to-zinc-300 text-black hover:from-zinc-100 hover:to-white transition-all duration-200 whitespace-nowrap shrink-0 shadow-md group cursor-pointer"
            >
              <span>Contratar Show</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Hamburger Trigger */}
          <button
            type="button"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 text-zinc-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={isMobileOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-30 bg-[#050505]/98 backdrop-blur-2xl md:hidden flex flex-col justify-between p-6 pt-24">
          <div className="flex flex-col gap-6 text-center">
            <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
              Navegação · {ARTIST_CONFIG.city}
            </span>
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="font-display text-3xl uppercase tracking-wider text-white hover:text-zinc-300 transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                setIsMobileOpen(false);
                scrollToBooking();
              }}
              className="w-full py-3.5 text-center font-bold text-xs uppercase tracking-widest bg-gradient-to-r from-white via-zinc-200 to-zinc-300 text-black shadow-lg cursor-pointer"
            >
              Contratar Show
            </button>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-zinc-400">
              <a
                href={ARTIST_CONFIG.contacts.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Spotify Oficial
              </a>
              <span aria-hidden="true">·</span>
              <span>{ARTIST_CONFIG.contacts.whatsappNumber}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

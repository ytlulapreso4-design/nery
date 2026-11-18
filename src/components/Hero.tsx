import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, Volume2, VolumeX, Disc3 } from 'lucide-react';
import { ARTIST_CONFIG } from '../config/media.ts';

export const Hero: React.FC = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userExplicitlyMutedRef = useRef(false);

  const enableSound = useCallback(() => {
    const video = videoRef.current;
    if (!video || userExplicitlyMutedRef.current) return;

    video.muted = false;
    video.volume = 1.0;
    const p = video.play();
    if (p !== undefined) {
      p.then(() => {
        setIsMuted(false);
      }).catch(() => {
        // Browser policy blocked cold unmuted playback
      });
    }
  }, []);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || userExplicitlyMutedRef.current || video.muted) return;

    const duration = video.duration;
    const currentTime = video.currentTime;
    if (!duration || isNaN(duration)) return;

    const fadeOutTime = 3.5;
    const fadeInTime = 2.0;
    const timeRemaining = duration - currentTime;

    if (timeRemaining <= fadeOutTime) {
      video.volume = Math.max(0, timeRemaining / fadeOutTime);
    } else if (currentTime <= fadeInTime) {
      video.volume = Math.min(1, Math.max(0.15, currentTime / fadeInTime));
    } else {
      video.volume = 1.0;
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = 1.0;
    video.muted = false;
    const initialPlay = video.play();

    if (initialPlay !== undefined) {
      initialPlay
        .then(() => {
          setIsMuted(false);
        })
        .catch(() => {
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {});
        });
    }

    const handleGesture = () => {
      if (!userExplicitlyMutedRef.current && videoRef.current && videoRef.current.muted) {
        enableSound();
      }
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener('touchstart', handleGesture);
      window.removeEventListener('touchend', handleGesture);
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('scroll', handleGesture);
      window.removeEventListener('pointerdown', handleGesture);
    };

    window.addEventListener('touchstart', handleGesture, { passive: true, once: true });
    window.addEventListener('touchend', handleGesture, { passive: true, once: true });
    window.addEventListener('click', handleGesture, { passive: true, once: true });
    window.addEventListener('scroll', handleGesture, { passive: true, once: true });
    window.addEventListener('pointerdown', handleGesture, { passive: true, once: true });

    return () => {
      cleanup();
    };
  }, [enableSound]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!isMuted) {
      userExplicitlyMutedRef.current = true;
      video.muted = true;
      setIsMuted(true);
    } else {
      userExplicitlyMutedRef.current = false;
      video.muted = false;
      video.volume = 1.0;
      video.play().catch(() => {});
      setIsMuted(false);
    }
  };

  return (
    <section className="relative w-full max-w-[100vw] h-[100svh] min-h-[660px] flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        {!videoError && (
          <video
            ref={videoRef}
            src={ARTIST_CONFIG.media.heroVideo.path}
            poster={ARTIST_CONFIG.media.heroVideo.fallbackPoster}
            autoPlay
            loop
            playsInline
            preload="metadata"
            onTimeUpdate={handleTimeUpdate}
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            className={`w-full h-full object-cover object-center transition-opacity duration-700 grayscale-[35%] contrast-110 ${
              videoLoaded ? 'opacity-60' : 'opacity-0'
            }`}
          />
        )}

        {/* Fallback Obsidian & Brushed Silver Stage Backdrop */}
        {(!videoLoaded || videoError) && (
          <div className="absolute inset-0 bg-[#050505] overflow-hidden w-full h-full">
            <img
              src={ARTIST_CONFIG.media.heroVideo.fallbackPoster}
              alt="DJ NERY ao vivo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-35 grayscale contrast-125"
            />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[420px] bg-gradient-to-b from-white/10 via-zinc-400/5 to-transparent blur-3xl pointer-events-none" />
          </div>
        )}

        {/* Measured Scrims for High-Contrast Foreground Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/65 to-[#050505]/50 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/85 via-transparent to-[#050505] z-10 pointer-events-none" />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center flex flex-col items-center justify-center pt-16 sm:pt-20">
        {/* Clean Unboxed Origin Metadata */}
        <div className="flex items-center justify-center gap-2.5 text-xs font-mono tracking-[0.2em] uppercase text-zinc-300 mb-5">
          <span>Eletrofunk</span>
          <span aria-hidden="true" className="text-zinc-500">·</span>
          <span>Goiânia, GO</span>
        </div>

        {/* Custom Artist Logo Mark */}
        <div className="relative my-1 select-none w-full flex justify-center">
          <img
            src={ARTIST_CONFIG.media.logo.path}
            alt="DJ NERY"
            className="h-24 sm:h-36 md:h-44 w-auto object-contain drop-shadow-[0_12px_40px_rgba(255,255,255,0.25)]"
          />
        </div>

        {/* Primary Display Headline */}
        <h1
          className="mt-5 font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.02] uppercase tracking-wide text-chrome max-w-3xl px-2"
          style={{ textWrap: 'balance' }}
        >
          {ARTIST_CONFIG.tagline}
        </h1>

        {/* Concise Value Statement */}
        <p className="mt-4 text-sm sm:text-base text-zinc-300 font-body max-w-xl px-4 leading-relaxed">
          Graves de eletrofunk com pressão de festival, mixagem precisa e identidade de Goiânia para incendiar a pista do seu evento.
        </p>

        {/* Action Group: 1 Primary CTA + 1 Quiet Secondary Link */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-4 sm:px-0">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('dados-evento') || document.getElementById('contratacoes');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-white via-zinc-200 to-zinc-300 text-black hover:from-zinc-100 hover:to-white active:scale-[0.98] transition-all shadow-xl shadow-white/10 flex items-center justify-center gap-3 group cursor-pointer whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>Contratar Show</span>
          </button>

          <a
            href={ARTIST_CONFIG.contacts.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-widest bg-black/60 hover:bg-white/10 text-zinc-200 hover:text-white border border-white/25 hover:border-white/60 active:scale-[0.98] transition-all backdrop-blur-md flex items-center justify-center gap-2.5 whitespace-nowrap"
          >
            <Disc3 className="w-4 h-4 text-zinc-300" />
            <span>Ouvir no Spotify</span>
          </a>
        </div>
      </div>

      {/* Dedicated Corner Sound Controller */}
      <button
        type="button"
        onClick={toggleMute}
        aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
        className="absolute bottom-6 right-6 z-20 flex items-center gap-2 px-4 py-2.5 bg-black/80 hover:bg-black border border-white/20 hover:border-white/60 text-white text-xs font-mono backdrop-blur-md transition-all group cursor-pointer shadow-xl"
      >
        {isMuted ? (
          <>
            <VolumeX className="w-4 h-4 text-zinc-400 group-hover:text-white" />
            <span className="text-zinc-300 group-hover:text-white uppercase tracking-wider text-[11px] font-medium whitespace-nowrap">
              Ativar Som
            </span>
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4 text-white" />
            <span className="text-white uppercase tracking-wider text-[11px] font-medium whitespace-nowrap">
              Desativar Som
            </span>
          </>
        )}
      </button>

      {/* Bottom Scrim Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />
    </section>
  );
};

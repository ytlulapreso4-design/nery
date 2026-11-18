import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Volume2, VolumeX, Disc3 } from 'lucide-react';
import { ARTIST_CONFIG } from '../config/media.ts';

interface HeroProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  userExplicitlyMutedRef: React.MutableRefObject<boolean>;
  hasEntered: boolean;
  logoConnected: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  videoRef,
  isMuted,
  setIsMuted,
  userExplicitlyMutedRef,
  hasEntered,
  logoConnected,
}) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

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
        // Browser policy blocked cold unmuted playback until user gesture
      });
    }
  }, [videoRef, userExplicitlyMutedRef, setIsMuted]);

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

    if (!hasEntered) {
      video.muted = true;
      setIsMuted(true);
      video.play().catch(() => {});
      return;
    }

    if (!userExplicitlyMutedRef.current) {
      video.muted = false;
      video.volume = 1.0;
      const p = video.play();
      if (p !== undefined) {
        p.then(() => {
          setIsMuted(false);
        }).catch(() => {
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {});
        });
      }
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
      window.removeEventListener('keydown', handleGesture);
    };

    window.addEventListener('touchstart', handleGesture, { passive: true, once: true });
    window.addEventListener('touchend', handleGesture, { passive: true, once: true });
    window.addEventListener('click', handleGesture, { passive: true, once: true });
    window.addEventListener('scroll', handleGesture, { passive: true, once: true });
    window.addEventListener('pointerdown', handleGesture, { passive: true, once: true });
    window.addEventListener('keydown', handleGesture, { passive: true, once: true });

    return () => {
      cleanup();
    };
  }, [hasEntered, videoRef, userExplicitlyMutedRef, setIsMuted, enableSound]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!isMuted) {
      userExplicitlyMutedRef.current = true;
      video.muted = true;
      setIsMuted(true);
    } else {
      userExplicitlyMutedRef.current = false;
      enableSound();
    }
  };

  return (
    <section className="relative w-full max-w-[100vw] h-[100svh] min-h-[660px] flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Background Video Layer (Bright & Vivid) */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        {!videoError && (
          <video
            ref={videoRef}
            src={ARTIST_CONFIG.media.heroVideo.path}
            poster={ARTIST_CONFIG.media.heroVideo.fallbackPoster}
            autoPlay
            loop
            playsInline
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            className={`w-full h-full object-cover object-center transition-opacity duration-700 brightness-110 contrast-105 ${
              videoLoaded ? 'opacity-95' : 'opacity-0'
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
              className="w-full h-full object-cover object-center opacity-60 contrast-110"
            />
          </div>
        )}

        {/* Lightened Scrims */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(5,5,5,0.42) 0%, rgba(5,5,5,0.14) 65%, rgba(5,5,5,0.48) 100%)',
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#050505]/75 to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#050505] via-[#050505]/45 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center flex flex-col items-center justify-center pt-16 sm:pt-20">
        {/* Clean Unboxed Origin Metadata */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: hasEntered ? 1 : 0, y: hasEntered ? 0 : 10 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-2.5 text-xs font-mono tracking-[0.2em] uppercase text-zinc-200 mb-5 drop-shadow"
        >
          <span>Eletrofunk</span>
          <span aria-hidden="true" className="text-zinc-400">·</span>
          <span>Goiânia, GO</span>
        </motion.div>

        {/* Custom Artist Logo Mark (Target destination for IntroEntrance morph) */}
        <div className="relative my-1 select-none w-full flex justify-center">
          <img
            id="hero-main-logo"
            src={ARTIST_CONFIG.media.logo.path}
            alt="DJ NERY"
            className={`h-24 sm:h-36 md:h-44 w-auto object-contain drop-shadow-[0_12px_40px_rgba(0,0,0,0.85)] ${
              logoConnected ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        {/* Primary Display Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: hasEntered ? 1 : 0, y: hasEntered ? 0 : 14 }}
          transition={{ duration: 0.65, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.02] uppercase tracking-wide text-chrome max-w-3xl px-2 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
          style={{ textWrap: 'balance' }}
        >
          {ARTIST_CONFIG.tagline}
        </motion.h1>

        {/* Concise Value Statement */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: hasEntered ? 1 : 0, y: hasEntered ? 0 : 12 }}
          transition={{ duration: 0.65, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-sm sm:text-base text-zinc-100 font-body max-w-xl px-4 leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
        >
          Graves de eletrofunk com pressão de festival, mixagem precisa e identidade de Goiânia para incendiar a pista do seu evento.
        </motion.p>

        {/* Action Group */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: hasEntered ? 1 : 0, y: hasEntered ? 0 : 12 }}
          transition={{ duration: 0.65, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-4 sm:px-0"
        >
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('dados-evento') || document.getElementById('contratacoes');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-white via-zinc-200 to-zinc-300 text-black hover:from-zinc-100 hover:to-white active:scale-[0.98] transition-all shadow-xl shadow-black/40 flex items-center justify-center gap-3 group cursor-pointer whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>Contratar Show</span>
          </button>

          <a
            href={ARTIST_CONFIG.contacts.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-widest bg-black/65 hover:bg-black/85 text-white border border-white/35 hover:border-white active:scale-[0.98] transition-all backdrop-blur-md flex items-center justify-center gap-2.5 whitespace-nowrap shadow-lg"
          >
            <Disc3 className="w-4 h-4 text-zinc-200" />
            <span>Ouvir no Spotify</span>
          </a>
        </motion.div>
      </div>

      {/* Dedicated Corner Sound Controller */}
      <button
        type="button"
        onClick={toggleMute}
        aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
        className="absolute bottom-6 right-6 z-20 flex items-center gap-2 px-4 py-2.5 bg-black/80 hover:bg-black border border-white/25 hover:border-white/70 text-white text-xs font-mono backdrop-blur-md transition-all group cursor-pointer shadow-xl"
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
    </section>
  );
};

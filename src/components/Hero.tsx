import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Volume2, VolumeX, Disc3 } from 'lucide-react';
import { ARTIST_CONFIG } from '../config/media.ts';

interface HeroProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  userExplicitlyMutedRef: React.MutableRefObject<boolean>;
  isRevealing: boolean;
  introDone: boolean;
}

export const MUTE_HERO_EVENT = 'dj-nery:mute-hero';

export const requestHeroMute = () => {
  window.dispatchEvent(new CustomEvent(MUTE_HERO_EVENT));
};

export const Hero: React.FC<HeroProps> = ({
  videoRef,
  isMuted,
  setIsMuted,
  userExplicitlyMutedRef,
  isRevealing,
  introDone,
}) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const muteVideo = useCallback(() => {
    const video = videoRef.current;
    userExplicitlyMutedRef.current = true;
    if (video) {
      video.muted = true;
    }
    setIsMuted(true);
  }, [videoRef, userExplicitlyMutedRef, setIsMuted]);

  // Synchronous unmute + play helper for iOS Safari / Android Chrome gesture stack
  const unlockSoundSync = useCallback(() => {
    const video = videoRef.current;
    if (!video || userExplicitlyMutedRef.current) return;

    video.muted = false;
    video.volume = 1.0;
    const p = video.play();
    if (p !== undefined) {
      p.then(() => {
        if (!video.muted && !video.paused) {
          setIsMuted(false);
        }
      }).catch(() => {
        video.muted = true;
        setIsMuted(true);
        video.play().catch(() => {});
      });
    }
  }, [videoRef, userExplicitlyMutedRef, setIsMuted]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || userExplicitlyMutedRef.current || video.muted) return;

    const duration = video.duration;
    const currentTime = video.currentTime;
    if (!duration || isNaN(duration)) return;

    const fadeOutTime = 1.5;
    const fadeInTime = 1.0;
    const timeRemaining = duration - currentTime;

    if (timeRemaining <= fadeOutTime) {
      video.volume = Math.max(0.15, timeRemaining / fadeOutTime);
    } else if (currentTime <= fadeInTime) {
      video.volume = Math.min(1, Math.max(0.25, currentTime / fadeInTime));
    } else {
      video.volume = 1.0;
    }
  };

  useEffect(() => {
    const handleExternalMute = () => {
      muteVideo();
    };
    window.addEventListener(MUTE_HERO_EVENT, handleExternalMute);

    // Fallback listener on real activation events (click/touchend/keydown) in case sound is still muted
    const handleGestureUnlock = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('[data-mute-control="true"]') || target?.closest('a[href*="spotify"]')) {
        return;
      }
      if (userExplicitlyMutedRef.current) return;
      const video = videoRef.current;
      if (video && (video.muted || video.paused)) {
        unlockSoundSync();
      }
    };

    window.addEventListener('click', handleGestureUnlock, true);
    window.addEventListener('touchend', handleGestureUnlock, true);
    window.addEventListener('keydown', handleGestureUnlock, true);

    return () => {
      window.removeEventListener(MUTE_HERO_EVENT, handleExternalMute);
      window.removeEventListener('click', handleGestureUnlock, true);
      window.removeEventListener('touchend', handleGestureUnlock, true);
      window.removeEventListener('keydown', handleGestureUnlock, true);
    };
  }, [muteVideo, unlockSoundSync, videoRef, userExplicitlyMutedRef]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!isMuted) {
      muteVideo();
    } else {
      userExplicitlyMutedRef.current = false;
      unlockSoundSync();
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
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            className={`w-full h-full object-cover object-center transition-opacity duration-700 brightness-110 contrast-105 ${
              videoLoaded ? 'opacity-95' : 'opacity-0'
            }`}
          />
        )}

        {/* Fallback Backdrop */}
        {(!videoLoaded || videoError) && (
          <div className="absolute inset-0 bg-[#050505] overflow-hidden w-full h-full">
            <img
              src={ARTIST_CONFIG.media.heroVideo.fallbackPoster}
              alt="DJ NERY ao vivo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-65 contrast-110"
            />
          </div>
        )}

        {/* Lightened Scrims */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(5,5,5,0.40) 0%, rgba(5,5,5,0.12) 65%, rgba(5,5,5,0.46) 100%)',
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#050505]/75 to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#050505] via-[#050505]/45 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center flex flex-col items-center justify-center pt-16 sm:pt-20">
        {/* Clean Unboxed Origin Metadata */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isRevealing ? 1 : 0, y: isRevealing ? 0 : 10 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 flex items-center justify-center gap-2.5 text-xs font-mono tracking-[0.2em] uppercase text-zinc-200 mb-5 drop-shadow"
        >
          <span>Eletrofunk</span>
          <span aria-hidden="true" className="text-zinc-400">·</span>
          <span>Goiânia, GO</span>
        </motion.div>

        {/* Single-Element Logo Transition floating cleanly over split curtain */}
        <motion.div
          initial={{ opacity: 0, scale: 1.24, y: 58 }}
          animate={
            isRevealing
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 1, scale: 1.24, y: 58 }
          }
          transition={{
            duration: isRevealing ? 0.9 : 0.65,
            ease: isRevealing ? [0.76, 0, 0.24, 1] : [0.16, 1, 0.3, 1],
          }}
          className={`relative ${introDone ? 'z-20' : 'z-[55]'} my-1 select-none w-full flex justify-center will-change-transform pointer-events-none`}
        >
          <div className="relative overflow-hidden px-4 py-2">
            <img
              src={ARTIST_CONFIG.media.logo.path}
              alt="DJ NERY"
              className="h-24 sm:h-36 md:h-44 w-auto object-contain drop-shadow-[0_12px_40px_rgba(0,0,0,0.85)] relative z-10"
            />
            {!isRevealing && (
              <div
                aria-hidden="true"
                className="animate-chrome-sweep absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent z-20 pointer-events-none"
              />
            )}
          </div>
        </motion.div>

        {/* Primary Display Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: isRevealing ? 1 : 0, y: isRevealing ? 0 : 14 }}
          transition={{ duration: 0.75, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 mt-5 font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.02] uppercase tracking-wide text-chrome max-w-3xl px-2 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
          style={{ textWrap: 'balance' }}
        >
          {ARTIST_CONFIG.tagline}
        </motion.h1>

        {/* Concise Value Statement */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: isRevealing ? 1 : 0, y: isRevealing ? 0 : 12 }}
          transition={{ duration: 0.75, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 mt-4 text-sm sm:text-base text-zinc-100 font-body max-w-xl px-4 leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
        >
          Graves de eletrofunk com pressão de festival, mixagem precisa e identidade de Goiânia para incendiar a pista do seu evento.
        </motion.p>

        {/* Action Group */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: isRevealing ? 1 : 0, y: isRevealing ? 0 : 12 }}
          transition={{ duration: 0.75, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-4 sm:px-0"
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
            onClick={requestHeroMute}
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
        data-mute-control="true"
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

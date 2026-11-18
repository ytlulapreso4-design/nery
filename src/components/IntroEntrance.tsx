import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ARTIST_CONFIG } from '../config/media.ts';

interface IntroEntranceProps {
  onStartReveal: () => void;
  onLogoConnected: () => void;
  onComplete: () => void;
}

interface MorphTarget {
  x: number;
  y: number;
  scale: number;
}

export const IntroEntrance: React.FC<IntroEntranceProps> = ({
  onStartReveal,
  onLogoConnected,
  onComplete,
}) => {
  const [phase, setPhase] = useState<'enter' | 'connect'>('enter');
  const [morphTarget, setMorphTarget] = useState<MorphTarget>({ x: 0, y: 0, scale: 1 });
  const introLogoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const connectTimer = window.setTimeout(() => {
      const introEl = introLogoRef.current;
      const heroEl = document.getElementById('hero-main-logo');

      if (introEl && heroEl) {
        const introRect = introEl.getBoundingClientRect();
        const heroRect = heroEl.getBoundingClientRect();

        if (introRect.width > 0 && heroRect.width > 0) {
          const introCenterX = introRect.left + introRect.width / 2;
          const introCenterY = introRect.top + introRect.height / 2;
          const heroCenterX = heroRect.left + heroRect.width / 2;
          const heroCenterY = heroRect.top + heroRect.height / 2;

          setMorphTarget({
            x: heroCenterX - introCenterX,
            y: heroCenterY - introCenterY,
            scale: heroRect.height / introRect.height,
          });
        }
      }

      setPhase('connect');
      onStartReveal();
    }, 950);

    const swapTimer = window.setTimeout(() => {
      onLogoConnected();
    }, 1820);

    const completeTimer = window.setTimeout(() => {
      onComplete();
    }, 1900);

    return () => {
      window.clearTimeout(connectTimer);
      window.clearTimeout(swapTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onStartReveal, onLogoConnected, onComplete]);

  const isConnecting = phase === 'connect';

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden pointer-events-none select-none"
    >
      {/* Top Split Curtain Panel */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isConnecting ? '-100%' : 0 }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#050505] border-b border-white/25"
      />

      {/* Bottom Split Curtain Panel */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isConnecting ? '100%' : 0 }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#050505] border-t border-white/25"
      />

      {/* Subtle Radial Chrome Glow during initial hold */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isConnecting ? 0 : 0.75,
          scale: isConnecting ? 1.3 : 1,
        }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-white/[0.06] blur-[90px]"
      />

      {/* Logo that enters centered, then flies/scales directly into #hero-main-logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.86, x: 0, y: 0 }}
        animate={
          isConnecting
            ? {
                opacity: 1,
                x: morphTarget.x,
                y: morphTarget.y,
                scale: morphTarget.scale,
              }
            : { opacity: 1, scale: 1, x: 0, y: 0 }
        }
        transition={{
          duration: isConnecting ? 0.85 : 0.7,
          ease: isConnecting ? [0.76, 0, 0.24, 1] : [0.16, 1, 0.3, 1],
        }}
        className="relative z-10 overflow-hidden px-6 py-4"
      >
        <img
          ref={introLogoRef}
          src={ARTIST_CONFIG.media.logo.path}
          alt="DJ NERY"
          className="h-28 sm:h-40 md:h-48 w-auto object-contain drop-shadow-[0_12px_40px_rgba(0,0,0,0.85)] relative z-10"
        />

        {/* Metallic Silver Light Sweep during entry */}
        {!isConnecting && (
          <div className="animate-chrome-sweep absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent z-20" />
        )}
      </motion.div>
    </div>
  );
};

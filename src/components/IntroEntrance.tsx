import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ARTIST_CONFIG } from '../config/media.ts';

interface IntroEntranceProps {
  isRevealing: boolean;
  onEnter: () => void;
}

interface MorphTarget {
  x: number;
  y: number;
  scale: number;
}

export const IntroEntrance: React.FC<IntroEntranceProps> = ({
  isRevealing,
  onEnter,
}) => {
  const [morphTarget, setMorphTarget] = useState<MorphTarget>({
    x: 0,
    y: -48,
    scale: 0.88,
  });
  const introLogoRef = useRef<HTMLImageElement>(null);

  const handleEnterClick = () => {
    if (isRevealing) return;

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

    onEnter();
  };

  return (
    <div
      role={!isRevealing ? 'dialog' : undefined}
      aria-modal={!isRevealing ? 'true' : undefined}
      aria-label={!isRevealing ? 'Entrada oficial DJ NERY' : undefined}
      onKeyDown={(e) => {
        if (!isRevealing && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleEnterClick();
        }
      }}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center select-none overflow-hidden ${
        isRevealing ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
    >
      {/* Top Split Curtain Panel */}
      <motion.div
        initial={{ y: '0%' }}
        animate={{ y: isRevealing ? '-100%' : '0%' }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#050505] border-b border-white/20 will-change-transform"
      />

      {/* Bottom Split Curtain Panel */}
      <motion.div
        initial={{ y: '0%' }}
        animate={{ y: isRevealing ? '100%' : '0%' }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#050505] border-t border-white/20 will-change-transform"
      />

      {/* Subtle Radial Chrome Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{
          opacity: isRevealing ? 0 : 0.75,
          scale: isRevealing ? 1.25 : 1,
        }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="absolute w-72 h-72 sm:w-[440px] sm:h-[440px] rounded-full bg-white/[0.06] blur-[100px] pointer-events-none"
      />

      {/* Centered Logo + "Conhecer artista" Stack inside Fixed Overlay */}
      <div className="relative z-20 flex flex-col items-center justify-center px-6 text-center gap-8 sm:gap-10">
        {/* DJ NERY Logo rendered directly on top of the curtain */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 0, y: 0 }}
          animate={
            isRevealing
              ? {
                  opacity: 0,
                  x: morphTarget.x,
                  y: morphTarget.y,
                  scale: morphTarget.scale,
                }
              : { opacity: 1, scale: 1, x: 0, y: 0 }
          }
          transition={{
            opacity: isRevealing
              ? { duration: 0.25, delay: 0.55, ease: 'easeOut' }
              : { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
            x: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
            y: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
            scale: isRevealing
              ? { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
              : { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
          }}
          className="relative overflow-hidden px-4 py-2 will-change-transform"
        >
          <img
            ref={introLogoRef}
            src={ARTIST_CONFIG.media.logo.path}
            alt="DJ NERY"
            className="h-28 sm:h-40 md:h-48 w-auto object-contain drop-shadow-[0_12px_36px_rgba(255,255,255,0.22)] relative z-10"
          />
          {!isRevealing && (
            <div
              aria-hidden="true"
              className="animate-chrome-sweep absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent z-20 pointer-events-none"
            />
          )}
        </motion.div>

        {/* Center Action Button: "Conhecer artista" */}
        <motion.button
          type="button"
          onClick={handleEnterClick}
          initial={{ opacity: 0, y: 10 }}
          animate={
            isRevealing
              ? { opacity: 0, y: -8, scale: 0.96 }
              : { opacity: 1, y: 0, scale: 1 }
          }
          transition={{
            duration: isRevealing ? 0.22 : 0.6,
            delay: isRevealing ? 0 : 0.25,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-flex items-center gap-3 px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-white via-zinc-200 to-zinc-300 text-black hover:from-white hover:to-white active:scale-[0.97] transition-all shadow-[0_0_35px_rgba(255,255,255,0.2)] cursor-pointer whitespace-nowrap group"
        >
          <span>Conhecer artista</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </div>
    </div>
  );
};

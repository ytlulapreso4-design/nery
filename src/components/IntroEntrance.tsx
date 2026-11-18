import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface IntroEntranceProps {
  isRevealing: boolean;
  onEnter: () => void;
}

export const IntroEntrance: React.FC<IntroEntranceProps> = ({
  isRevealing,
  onEnter,
}) => {
  return (
    <div
      role={!isRevealing ? 'dialog' : undefined}
      aria-modal={!isRevealing ? 'true' : undefined}
      aria-label={!isRevealing ? 'Entrada oficial DJ NERY' : undefined}
      onKeyDown={(e) => {
        if (!isRevealing && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onEnter();
        }
      }}
      className={`fixed inset-0 z-[45] select-none overflow-hidden ${
        isRevealing ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
    >
      {/* Top Split Curtain Panel */}
      <motion.div
        initial={{ y: '0%' }}
        animate={{ y: isRevealing ? '-100%' : '0%' }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#050505] border-b border-white/20 will-change-transform"
      />

      {/* Bottom Split Curtain Panel */}
      <motion.div
        initial={{ y: '0%' }}
        animate={{ y: isRevealing ? '100%' : '0%' }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#050505] border-t border-white/20 will-change-transform"
      />

      {/* Subtle Radial Chrome Glow behind centered logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{
          opacity: isRevealing ? 0 : 0.75,
          scale: isRevealing ? 1.25 : 1,
        }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-[440px] sm:h-[440px] rounded-full bg-white/[0.06] blur-[100px] pointer-events-none"
      />

      {/* Center Action Button: "Conhecer artista" */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={
          isRevealing
            ? { opacity: 0, y: -8, scale: 0.96 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={{
          duration: isRevealing ? 0.28 : 0.65,
          delay: isRevealing ? 0 : 0.35,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute top-[calc(50%+48px)] sm:top-[calc(50%+84px)] left-0 right-0 flex flex-col items-center justify-center px-6 z-20"
      >
        <button
          type="button"
          onClick={onEnter}
          className="inline-flex items-center gap-3 px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-white via-zinc-200 to-zinc-300 text-black hover:from-white hover:to-white active:scale-[0.97] transition-all shadow-[0_0_35px_rgba(255,255,255,0.2)] cursor-pointer whitespace-nowrap group"
        >
          <span>Conhecer artista</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </motion.div>
    </div>
  );
};

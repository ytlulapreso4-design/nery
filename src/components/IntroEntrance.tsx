import React from 'react';
import { motion } from 'motion/react';

interface IntroEntranceProps {
  isRevealing: boolean;
  needsTap: boolean;
  onTapEnter: () => void;
}

export const IntroEntrance: React.FC<IntroEntranceProps> = ({
  isRevealing,
  needsTap,
  onTapEnter,
}) => {
  return (
    <div
      role={needsTap && !isRevealing ? 'button' : undefined}
      tabIndex={needsTap && !isRevealing ? 0 : undefined}
      aria-label={needsTap && !isRevealing ? 'Toque para entrar com áudio' : undefined}
      onClick={!isRevealing ? onTapEnter : undefined}
      onKeyDown={(e) => {
        if (!isRevealing && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onTapEnter();
        }
      }}
      className={`fixed inset-0 z-[45] select-none overflow-hidden ${
        isRevealing ? 'pointer-events-none' : 'cursor-pointer pointer-events-auto'
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
          opacity: isRevealing ? 0 : 0.7,
          scale: isRevealing ? 1.2 : 1,
        }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-[440px] sm:h-[440px] rounded-full bg-white/[0.06] blur-[100px] pointer-events-none"
      />

      {/* Minimal mobile audio unlock prompt (only shown if browser blocked cold unmuted autoplay) */}
      {needsTap && !isRevealing && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-14 sm:bottom-16 left-0 right-0 flex justify-center px-6 pointer-events-none"
        >
          <span className="text-xs font-mono uppercase tracking-[0.26em] text-zinc-300 border-b border-white/30 pb-1.5">
            Toque para entrar
          </span>
        </motion.div>
      )}
    </div>
  );
};

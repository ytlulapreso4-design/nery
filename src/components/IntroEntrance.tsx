import React from 'react';
import { motion } from 'motion/react';

interface IntroEntranceProps {
  isRevealing: boolean;
}

export const IntroEntrance: React.FC<IntroEntranceProps> = ({ isRevealing }) => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[45] pointer-events-none select-none overflow-hidden"
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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-[440px] sm:h-[440px] rounded-full bg-white/[0.06] blur-[100px]"
      />
    </div>
  );
};

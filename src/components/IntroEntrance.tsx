import React from 'react';
import { motion } from 'motion/react';

interface IntroEntranceProps {
  isRevealing: boolean;
}

export const IntroEntrance: React.FC<IntroEntranceProps> = ({ isRevealing }) => {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 1 }}
      animate={{ opacity: isRevealing ? 0 : 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[45] bg-[#050505] pointer-events-none select-none overflow-hidden"
    >
      {/* Subtle radial chrome glow centered behind the logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{
          opacity: isRevealing ? 0 : 0.75,
          scale: isRevealing ? 1.25 : 1,
        }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-[440px] sm:h-[440px] rounded-full bg-white/[0.06] blur-[100px]"
      />
    </motion.div>
  );
};

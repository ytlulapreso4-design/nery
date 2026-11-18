import React from 'react';

const ROW_1_ITEMS = [
  { text: 'ELETROFUNK', className: 'text-white' },
  { text: 'ELETROFUNK', className: 'text-stroke-silver' },
  { text: 'ELETROFUNK', className: 'text-white' },
  { text: 'ELETROFUNK', className: 'text-stroke-chrome' },
  { text: 'ELETROFUNK', className: 'text-white' },
  { text: 'ELETROFUNK', className: 'text-stroke-silver' },
];

const ROW_2_ITEMS = [
  { text: 'DJ NERY', className: 'text-chrome' },
  { text: 'DJ NERY', className: 'text-stroke-silver' },
  { text: 'ELETROFUNK', className: 'text-white' },
  { text: 'DJ NERY', className: 'text-stroke-chrome' },
  { text: 'DJ NERY', className: 'text-chrome' },
  { text: 'ELETROFUNK', className: 'text-stroke-silver' },
];

export const EletrofunkCommand: React.FC = () => {
  return (
    <section
      id="eletrofunk"
      aria-label="Identidade sonora DJ NERY"
      className="marquee-container py-10 sm:py-14 bg-[#050505] text-[#F4F4F5] border-t border-b border-white/10"
      style={{ contain: 'paint', overflow: 'hidden', width: '100%', maxWidth: '100vw' }}
    >
      {/* Subtle Chrome Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[540px] max-w-full h-[140px] bg-white/[0.04] blur-[90px] pointer-events-none rounded-full" />

      {/* Continuous Seamless Infinite Marquee Ribbon */}
      <div
        className="py-2 w-full max-w-full overflow-hidden select-none opacity-90 space-y-2"
        style={{ contain: 'paint', width: '100%', maxWidth: '100vw' }}
      >
        {/* Row 1: Two identical halves for zero-seam -50% infinite loop */}
        <div className="animate-marquee text-[clamp(3rem,7.5vw,6.5rem)] font-display uppercase tracking-tight leading-none whitespace-nowrap">
          {[0, 1].map((copyIndex) => (
            <div
              key={copyIndex}
              aria-hidden={copyIndex === 1}
              className="flex items-center shrink-0 gap-8 pr-8"
            >
              {ROW_1_ITEMS.map((item, idx) => (
                <span key={idx} className={`shrink-0 ${item.className}`}>
                  {item.text}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Row 2: Reverse continuous seamless loop */}
        <div className="animate-marquee-reverse text-[clamp(2.25rem,5.5vw,5rem)] font-display uppercase tracking-tight leading-none whitespace-nowrap">
          {[0, 1].map((copyIndex) => (
            <div
              key={copyIndex}
              aria-hidden={copyIndex === 1}
              className="flex items-center shrink-0 gap-8 pr-8"
            >
              {ROW_2_ITEMS.map((item, idx) => (
                <span key={idx} className={`shrink-0 ${item.className}`}>
                  {item.text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

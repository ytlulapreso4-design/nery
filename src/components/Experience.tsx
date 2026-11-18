import React from 'react';
import { MessageCircle } from 'lucide-react';
import { ARTIST_CONFIG } from '../config/media.ts';
import { MediaSlot } from './MediaSlot.tsx';

export const Experience: React.FC = () => {
  const pillars = [
    {
      num: '01.',
      title: 'Pressão Sonora de Eletrofunk',
      desc: 'Graves encorpados, sub-frequências limpas e viradas construídas para sistemas de som de grande porte e paredões.',
    },
    {
      num: '02.',
      title: 'Identidade de Goiânia',
      desc: 'Influência direta da cena goiana, unindo estética urbana monocromática com leitura precisa do público na pista.',
    },
    {
      num: '03.',
      title: 'Presença & Entrega ao Vivo',
      desc: 'Performance dinâmica na cabine que sustenta o pico de energia do início ao fim da apresentação.',
    },
  ];

  return (
    <section
      id="experiencia"
      className="relative py-24 sm:py-28 bg-[#050505] text-[#F4F4F5] overflow-hidden overflow-x-clip w-full max-w-full border-t border-white/10"
    >
      {/* Subtle Ambient Silver Aura */}
      <div className="absolute top-1/3 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-white/[0.03] blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main 2-Column Split with Equal Stretch Height */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
          {/* Left Column: DJ NERY Portrait */}
          <div className="lg:col-span-5 relative flex">
            <div className="relative w-full h-full min-h-[420px] border border-white/15 bg-[#0E0E11]">
              <MediaSlot
                type="image"
                src={ARTIST_CONFIG.media.experiencePhoto.path}
                alt="Retrato oficial do DJ NERY"
                title=""
                subtitle=""
                hideOverlayInfo={true}
                aspectRatio="aspect-[4/5] lg:aspect-auto lg:h-full"
                objectFit="cover"
                objectPosition="object-top"
                className="w-full h-full border-0"
              />
            </div>
          </div>

          {/* Right Column: Editorial Story & Booking Hook */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8 py-2">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 mb-3">
                Sobre o Artista · {ARTIST_CONFIG.city}
              </p>

              <h2
                className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white leading-[1.02]"
                style={{ textWrap: 'balance' }}
              >
                Não é só set.
                <br />
                <span className="text-chrome">É identidade de pista.</span>
              </h2>

              <p className="mt-6 text-base sm:text-lg text-zinc-300 font-body leading-relaxed max-w-2xl">
                {ARTIST_CONFIG.bio}
              </p>
            </div>

            {/* Clean Editorial Numbered Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
              {pillars.map((pillar) => (
                <div key={pillar.num} className="space-y-2">
                  <span className="text-xs font-mono text-zinc-400 block tabular-nums">
                    {pillar.num}
                  </span>
                  <h3 className="text-sm font-semibold text-white tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Direct Booking Hook */}
            <div className="p-6 bg-[#0E0E11] border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                  Agenda Aberta · Shows & Festivais
                </p>
                <p className="font-display text-xl text-white uppercase mt-1">
                  Consulte datas para o seu evento
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('dados-evento') || document.getElementById('contratacoes');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-zinc-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Montar Proposta</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

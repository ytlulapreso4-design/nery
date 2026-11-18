import React, { useState } from 'react';
import { Camera, Film, ArrowUpRight } from 'lucide-react';
import { ARTIST_CONFIG, GalleryItem } from '../config/media.ts';
import { MediaSlot } from './MediaSlot.tsx';
import { LightboxModal } from './LightboxModal.tsx';

export const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'image' | 'video'>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const allItems = ARTIST_CONFIG.media.gallery;
  const filteredItems = allItems.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  const videoItem = allItems.find((item) => item.id === 'nery-live-video');
  const photoItems = allItems.filter((item) => item.type === 'image');

  return (
    <section
      id="momentos"
      className="relative py-24 sm:py-28 bg-[#050505] text-[#F4F4F5] overflow-hidden w-full max-w-full"
    >
      {/* Subtle Chrome Background Glow */}
      <div className="absolute top-1/4 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-white/[0.03] blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-white/10">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 mb-2">
              Palco & Estúdio · {ARTIST_CONFIG.city}
            </p>
            <h2
              className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white"
              style={{ textWrap: 'balance' }}
            >
              Momentos & Shows.
            </h2>
          </div>

          {/* Interactive Segmented Filter Controls */}
          <div className="flex items-center gap-1 p-1 bg-[#0E0E11] border border-white/12 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-white text-black font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Todos ({allItems.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('image')}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                activeFilter === 'image'
                  ? 'bg-white text-black font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Fotos</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('video')}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                activeFilter === 'video'
                  ? 'bg-white text-black font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Vídeos</span>
            </button>
          </div>
        </div>

        {/* Unboxed Editorial Sub-bar */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-zinc-400">
          <span>Registros Oficiais DJ NERY · Press Kit & Performance</span>
          <span>Clique em qualquer registro para ampliar em tela cheia</span>
        </div>

        {/* Asymmetric Balanced Bento Grid for "all", Clean Grid for Filtered */}
        {activeFilter === 'all' && videoItem ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            {/* Left Primary Video Showcase */}
            <div className="lg:col-span-5 flex flex-col">
              <MediaSlot
                type={videoItem.type}
                src={videoItem.path}
                poster={videoItem.poster}
                title={videoItem.title}
                subtitle={videoItem.subtitle}
                category={videoItem.category}
                aspectRatio="aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[540px]"
                showPlayButton={true}
                onClick={() => setSelectedItem(videoItem)}
                className="flex-1"
              />
              {videoItem.commentary && (
                <div className="mt-4 pt-3 border-t border-white/10">
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {videoItem.commentary}
                  </p>
                </div>
              )}
            </div>

            {/* Right Stacked Photo Showcases */}
            <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-8 justify-between">
              {photoItems.map((item) => (
                <div key={item.id} className="flex flex-col flex-1">
                  <MediaSlot
                    type={item.type}
                    src={item.path}
                    poster={item.poster}
                    title={item.title}
                    subtitle={item.subtitle}
                    category={item.category}
                    aspectRatio="aspect-[16/10]"
                    objectPosition={item.objectPosition || 'object-center'}
                    onClick={() => setSelectedItem(item)}
                  />
                  {item.commentary && (
                    <div className="mt-3 pt-2.5 border-t border-white/10">
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {item.commentary}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <div key={item.id} className="flex flex-col">
                <MediaSlot
                  type={item.type}
                  src={item.path}
                  poster={item.poster}
                  title={item.title}
                  subtitle={item.subtitle}
                  category={item.category}
                  aspectRatio={item.type === 'video' ? 'aspect-[4/5] max-h-[560px]' : 'aspect-[4/3]'}
                  objectPosition={item.objectPosition || 'object-center'}
                  showPlayButton={item.type === 'video'}
                  onClick={() => setSelectedItem(item)}
                />
                {item.commentary && (
                  <div className="mt-3 pt-2.5 border-t border-white/10">
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {item.commentary}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Spotify Callout Strip */}
        <div className="mt-16 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
              Catálogo Musical · Streaming Oficial
            </span>
            <p className="font-display text-2xl sm:text-3xl text-white uppercase mt-1">
              Ouça os lançamentos do <span className="text-chrome">DJ NERY</span> no Spotify
            </p>
          </div>

          <a
            href={ARTIST_CONFIG.contacts.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-widest bg-white text-black hover:bg-zinc-200 transition-colors whitespace-nowrap shrink-0"
          >
            <span>Abrir Spotify</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  );
};

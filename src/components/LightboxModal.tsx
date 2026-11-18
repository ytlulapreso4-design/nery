import React, { useEffect, useRef } from 'react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { GalleryItem } from '../config/media.ts';

interface LightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-3 sm:p-6 md:p-8 overflow-y-auto"
      onClick={handleClose}
    >
      {/* Primary Floating Screen Close Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[70] p-3 text-white bg-black/85 hover:bg-white hover:text-black border border-white/25 transition-all rounded-full shadow-2xl cursor-pointer flex items-center justify-center active:scale-95"
        aria-label="Fechar visualização"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Modal Dialog Card */}
      <div
        className="relative max-w-5xl w-full bg-[#0E0E11] border border-white/20 overflow-hidden shadow-2xl flex flex-col my-auto z-[60]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Close */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-3 py-1.5 bg-black/85 hover:bg-white hover:text-black text-white border border-white/20 text-xs font-mono uppercase tracking-wider backdrop-blur-md transition-all shadow-xl cursor-pointer"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
          <span className="font-semibold">Fechar</span>
        </button>

        {/* Media Container */}
        <div className="relative w-full bg-black min-h-[280px] sm:min-h-[360px] max-h-[70vh] flex items-center justify-center overflow-hidden">
          {item.type === 'video' ? (
            <video
              ref={videoRef}
              src={item.path}
              controls
              autoPlay
              playsInline
              className="w-full max-h-[70vh] object-contain"
            >
              Seu navegador não suporta a reprodução deste vídeo.
            </video>
          ) : (
            <img
              src={item.path}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full max-h-[70vh] object-contain"
            />
          )}
        </div>

        {/* Modal Info Bar & Actions */}
        <div className="p-5 sm:p-6 bg-[#0B0B0E] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="pr-4">
            <div className="flex items-center gap-2 mb-1 text-xs font-mono text-zinc-400">
              <span className="uppercase tracking-wider text-zinc-200 font-medium">
                {item.category}
              </span>
              <span aria-hidden="true">·</span>
              <span>{item.type === 'video' ? 'Áudio & Vídeo' : 'Fotografia'}</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl text-white uppercase tracking-wide">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">{item.subtitle}</p>

            {item.commentary && (
              <p className="mt-3 text-xs sm:text-sm text-zinc-300 border-t border-white/10 pt-3 max-w-2xl leading-relaxed">
                {item.commentary}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-mono uppercase tracking-wider bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white border border-white/15 transition-colors cursor-pointer whitespace-nowrap"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar</span>
            </button>

            <button
              type="button"
              onClick={() => {
                handleClose();
                setTimeout(() => {
                  const el = document.getElementById('dados-evento') || document.getElementById('contratacoes');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-white via-zinc-200 to-zinc-300 text-black hover:from-zinc-100 hover:to-white active:scale-[0.98] transition-all shadow-lg cursor-pointer whitespace-nowrap"
            >
              <span>Contratar Show</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

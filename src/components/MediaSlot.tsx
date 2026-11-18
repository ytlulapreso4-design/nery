import React, { useState } from 'react';
import { Play, Image as ImageIcon, Video as VideoIcon } from 'lucide-react';

interface MediaSlotProps {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  poster?: string;
  title: string;
  subtitle?: string;
  category?: string;
  className?: string;
  aspectRatio?: string;
  onClick?: () => void;
  showPlayButton?: boolean;
  objectFit?: 'cover' | 'contain';
  objectPosition?: string;
  imgClassName?: string;
  hideOverlayInfo?: boolean;
}

export const MediaSlot: React.FC<MediaSlotProps> = ({
  type,
  src,
  alt,
  poster,
  title,
  subtitle,
  category,
  className = '',
  aspectRatio = 'aspect-[16/9]',
  onClick,
  showPlayButton = false,
  objectFit = 'cover',
  objectPosition = 'object-center',
  imgClassName = '',
  hideOverlayInfo = false,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden bg-[#0E0E11] border border-white/12 transition-colors duration-300 hover:border-white/45 ${aspectRatio} ${className} ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      {/* Real Media Rendering */}
      {!hasError && (
        <>
          {type === 'image' ? (
            <img
              src={src}
              alt={alt || title}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
              className={`w-full h-full ${
                objectFit === 'contain' ? 'object-contain p-4' : `object-cover ${objectPosition}`
              } transition-transform duration-700 ease-out group-hover:scale-[1.03] ${imgClassName} ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : poster ? (
            <img
              src={poster}
              alt={alt || title}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
              className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03] ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : (
            <video
              src={src}
              poster={poster}
              preload="metadata"
              muted
              playsInline
              loop
              onLoadedData={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
              className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03] ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
        </>
      )}

      {/* Clean Fallback Container (Zero-Broken-Image Policy) */}
      {(hasError || !isLoaded) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#141418] to-[#08080A] text-center">
          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/15 flex items-center justify-center mb-3">
            {type === 'video' ? (
              <VideoIcon className="w-5 h-5 text-zinc-300" />
            ) : (
              <ImageIcon className="w-5 h-5 text-zinc-300" />
            )}
          </div>
          {title && (
            <p className="font-display text-lg tracking-wide text-white uppercase">
              {title}
            </p>
          )}
          {subtitle && (
            <p className="text-xs text-zinc-400 mt-1 max-w-[260px]">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Measured Scrim Overlay & Captions */}
      {isLoaded && !hasError && !hideOverlayInfo && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

          {/* Center Play Button for Video */}
          {(showPlayButton || type === 'video') && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-black/70 border border-white/35 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:border-white transition-all duration-200">
                <Play className="w-6 h-6 text-white group-hover:text-black ml-0.5 fill-current transition-colors" />
              </div>
            </div>
          )}

          {/* Bottom Metadata & Captions (Unboxed Typography) */}
          {(title || subtitle || category) && (
            <div className="absolute bottom-5 left-5 right-5 z-10">
              {category && (
                <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1">
                  <span>{category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{type === 'video' ? 'Vídeo' : 'Foto'}</span>
                </div>
              )}
              {title && (
                <h4 className="font-display text-xl text-white uppercase tracking-wide">
                  {title}
                </h4>
              )}
              {subtitle && (
                <p className="text-xs text-zinc-300 mt-1 line-clamp-2">{subtitle}</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

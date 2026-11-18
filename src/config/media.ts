/**
 * Central Media and Artist Configuration for DJ NERY
 */

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  path: string;
  poster?: string;
  title: string;
  subtitle: string;
  category: string;
  aspectRatio: string;
  spanClass: string;
  objectPosition?: string;
  commentary?: string;
}

export const ARTIST_CONFIG = {
  name: 'DJ NERY',
  city: 'Goiânia, GO',
  genre: 'Eletrofunk',
  tagline: 'ELETROFUNK COM PRESSÃO DE PALCO.',
  subtagline: 'GOIÂNIA · ELETROFUNK · SOM AUTOMOTIVO & CLUB',
  bio: 'Direto de Goiânia para as pistas do Brasil, DJ NERY constrói sets de eletrofunk com graves profundos, viradas precisas e presença de palco marcante. Uma assinatura sonora pensada para incendiar festivais, clubs e grandes eventos.',

  contacts: {
    whatsappNumber: '+55 (62) 99219-1555',
    whatsappRaw: '5562992191555',
    spotifyUrl: 'https://open.spotify.com/intl-pt/artist/7fqnaq7gkPuOxIe6ZHZmDa?si=3FIDJS-7TqqWhKpmXQz1hQ',
    spotifyEmbedUrl: 'https://open.spotify.com/embed/artist/7fqnaq7gkPuOxIe6ZHZmDa?utm_source=generator&theme=0',
    defaultBookingMessage: 'Olá! Gostaria de consultar a agenda e valores de show do DJ NERY.',
  },

  getWhatsappBookingUrl: (customMessage?: string) => {
    const message = customMessage || ARTIST_CONFIG.contacts.defaultBookingMessage;
    return `https://wa.me/${ARTIST_CONFIG.contacts.whatsappRaw}?text=${encodeURIComponent(message)}`;
  },

  media: {
    logo: {
      path: '/images/logo%20nery.png',
      alt: 'Logo oficial DJ NERY',
    },

    heroVideo: {
      path: '/videos/NeryAutomozaya.mp4',
      label: 'DJ NERY — Performance Ao Vivo',
      fallbackPoster: '/videos/nery-poster.jpg',
    },

    experiencePhoto: {
      path: '/images/foto%20nery.jpeg',
      title: 'DJ NERY — Ensaio Oficial',
    },

    gallery: [
      {
        id: 'nery-live-video',
        type: 'video',
        path: '/videos/NeryAutomozaya.mp4',
        poster: '/videos/nery-poster.jpg',
        title: 'Automozaya — Performance Ao Vivo',
        subtitle: 'Drop pesado, interação direta com o público e cabine no comando',
        commentary: 'Registro ao vivo capturando a resposta imediata da pista no clímax do set de eletrofunk.',
        category: 'Vídeo ao Vivo',
        aspectRatio: 'aspect-[4/5]',
        spanClass: 'col-span-12 lg:col-span-5',
      },
      {
        id: 'nery-press-portrait',
        type: 'image',
        path: '/images/foto%20nery.jpeg',
        title: 'Press Kit Oficial — Estúdio',
        subtitle: 'Identidade visual monocromática e estética urbana de Goiânia',
        commentary: 'Retrato oficial de divulgação para flyers, line-ups de festivais e material de imprensa.',
        category: 'Press Kit',
        aspectRatio: 'aspect-[4/3]',
        spanClass: 'col-span-12 md:col-span-6 lg:col-span-7',
        objectPosition: 'object-top',
      },
      {
        id: 'nery-stage-decks',
        type: 'image',
        path: '/videos/nery-stage-live.jpg',
        title: 'No Comando dos Decks',
        subtitle: 'Estrutura de festival, painel de LED e mixagem ao vivo',
        commentary: 'Domínio de pista com transições rápidas entre graves eletrônicos e batidas de eletrofunk.',
        category: 'Registro de Palco',
        aspectRatio: 'aspect-[16/9]',
        spanClass: 'col-span-12 md:col-span-6 lg:col-span-7',
        objectPosition: 'object-center',
      },
    ] as GalleryItem[],
  },
};

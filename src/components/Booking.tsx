import React, { useState } from 'react';
import { MessageCircle, Calendar, MapPin, Send, CheckCircle2, Disc3 } from 'lucide-react';
import { ARTIST_CONFIG } from '../config/media.ts';
import { requestHeroMute } from './Hero.tsx';

export const Booking: React.FC = () => {
  const [eventType, setEventType] = useState('Festival');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [producerName, setProducerName] = useState('');
  const [copied, setCopied] = useState(false);

  const eventTypes = [
    'Festival',
    'Casa Noturna / Club',
    'Sunset / Day Party',
    'Formatura / Universitária',
    'Evento Privado',
  ];

  const handleCustomWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    let text = `Olá! Gostaria de consultar a disponibilidade e valores do DJ NERY para um evento.`;
    if (eventType) text += `\n- Tipo: ${eventType}`;
    if (location.trim()) text += `\n- Cidade/Estado: ${location.trim()}`;
    if (date.trim()) text += `\n- Data pretendida: ${date.trim()}`;
    if (producerName.trim()) text += `\n- Responsável/Produtora: ${producerName.trim()}`;

    window.open(ARTIST_CONFIG.getWhatsappBookingUrl(text), '_blank');
  };

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText(ARTIST_CONFIG.contacts.whatsappNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contratacoes"
      className="relative py-24 sm:py-32 bg-[#08080A] text-[#F4F4F5] border-t border-white/10 overflow-hidden w-full max-w-full"
    >
      {/* Subtle Chrome Background Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] max-w-full h-[400px] bg-white/[0.03] blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Strategic Booking Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <p className="text-xs font-mono uppercase tracking-[0.22em] text-zinc-400 mb-3">
            Booking & Contratações · {ARTIST_CONFIG.city}
          </p>

          <h2
            className="font-display text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white leading-tight"
            style={{ textWrap: 'balance' }}
          >
            Leve o show do <span className="text-chrome">DJ NERY</span> para o seu evento.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-zinc-300 font-normal">
            Shows de eletrofunk para festivais, clubs, eventos universitários e festas em todo o Brasil.
          </p>
        </div>

        {/* 2-Column Booking Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 1º BLOCO: MONTE OS DADOS DO SEU EVENTO */}
          <div className="lg:col-span-7">
            <div
              id="dados-evento"
              className="p-8 sm:p-10 bg-[#0E0E11] border border-white/12 relative scroll-mt-24"
            >
              <div className="mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                  Atendimento & Cotação
                </span>
                <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-wide text-white mt-1">
                  Monte os Dados do Seu Evento
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  Preencha as informações abaixo para iniciar a conversa já com os detalhes do seu evento no WhatsApp.
                </p>
              </div>

              <form onSubmit={handleCustomWhatsAppSend} className="space-y-6">
                {/* Event Type Selector */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2.5">
                    Tipo de Evento
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {eventTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setEventType(type)}
                        className={`px-3.5 py-2 text-xs font-mono uppercase transition-all border cursor-pointer whitespace-nowrap ${
                          eventType === type
                            ? 'bg-white text-black border-white font-semibold'
                            : 'bg-white/[0.03] text-zinc-400 border-white/12 hover:border-white/35 hover:text-white'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid Inputs: Location & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                      Cidade / Estado
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="Ex: Goiânia - GO"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full bg-[#050505] border border-white/15 focus:border-white text-sm text-white px-3 py-2.5 pl-9 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                      Data Prevista
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="Ex: 20 de Dezembro"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-[#050505] border border-white/15 focus:border-white text-sm text-white px-3 py-2.5 pl-9 outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Producer / Contractor Name */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                    Seu Nome ou Produtora (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Lucas / Produtora X"
                    value={producerName}
                    onChange={(e) => setProducerName(e.target.value)}
                    className="w-full bg-[#050505] border border-white/15 focus:border-white text-sm text-white px-3 py-2.5 outline-none transition-colors"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full py-4 text-xs sm:text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-white via-zinc-200 to-zinc-300 text-black hover:from-zinc-100 hover:to-white active:scale-[0.99] transition-all flex items-center justify-center gap-3 shadow-xl cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Consulta via WhatsApp</span>
                </button>

                <p className="text-[11px] font-mono text-center text-zinc-400">
                  Redirecionamento direto para o WhatsApp oficial de shows ({ARTIST_CONFIG.contacts.whatsappNumber}).
                </p>
              </form>
            </div>
          </div>

          {/* 2º BLOCO: ATENDIMENTO DIRETO */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="p-8 bg-[#0E0E11] border border-white/12 relative overflow-hidden">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                Canal Oficial de Shows
              </span>
              <h3 className="font-display text-2xl uppercase tracking-wide text-white mt-1 mb-4">
                Atendimento Direto
              </h3>

              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                Contato ágil para produtores de eventos, casas noturnas e contratantes em Goiânia, Centro-Oeste e todo o Brasil.
              </p>

              <div className="space-y-4 pt-4 border-t border-white/10 text-xs font-mono">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-zinc-400">WHATSAPP:</span>
                  <button
                    type="button"
                    onClick={copyPhoneNumber}
                    className="text-white hover:text-zinc-300 transition-colors flex items-center gap-2 cursor-pointer tabular-nums"
                  >
                    <span>{ARTIST_CONFIG.contacts.whatsappNumber}</span>
                    <span className="text-[10px] text-zinc-200 border border-white/25 px-1.5 py-0.5">
                      {copied ? 'Copiado!' : 'Copiar'}
                    </span>
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-zinc-400">SPOTIFY:</span>
                  <a
                    href={ARTIST_CONFIG.contacts.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={requestHeroMute}
                    className="text-white hover:text-zinc-300 transition-colors inline-flex items-center gap-1.5"
                  >
                    <Disc3 className="w-3.5 h-3.5" />
                    <span>Perfil Oficial DJ NERY</span>
                  </a>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-zinc-400">ORIGEM:</span>
                  <span className="text-white">{ARTIST_CONFIG.city}</span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-zinc-400">SONORIDADE:</span>
                  <span className="text-white">Eletrofunk · Som de Pista</span>
                </div>
              </div>

              <a
                href={ARTIST_CONFIG.getWhatsappBookingUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full py-4 text-xs font-bold uppercase tracking-widest bg-white text-black hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chamar no WhatsApp Agora</span>
              </a>
            </div>

            {/* Contractor Assurance Points */}
            <div className="p-6 bg-[#0B0B0E] border border-white/10 space-y-3.5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-zinc-200 shrink-0 mt-0.5" />
                <p className="text-xs text-zinc-300 leading-relaxed">
                  <strong className="text-white">Rider Técnico Disponível:</strong> Especificações claras de cabine, CDJs e retorno para máxima performance.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-zinc-200 shrink-0 mt-0.5" />
                <p className="text-xs text-zinc-300 leading-relaxed">
                  <strong className="text-white">Logística Nacional:</strong> Saída de Goiânia com facilidade de deslocamento para capitais e interior.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-zinc-200 shrink-0 mt-0.5" />
                <p className="text-xs text-zinc-300 leading-relaxed">
                  <strong className="text-white">Set Adaptado ao Evento:</strong> Dinâmica ajustada conforme o horário, estrutura e perfil do público.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

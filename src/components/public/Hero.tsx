import React from 'react';
import { 
  Sparkles, 
  MessageCircle, 
  Ruler, 
  Scan, 
  Flame, 
  Compass,
  ArrowDown
} from 'lucide-react';
import { BrandSettings, SocialLinks } from '../../types/restaurant';

interface HeroProps {
  brand: BrandSettings;
  socials: SocialLinks;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  brand,
  socials,
  onExploreClick
}) => {
  const whatsappUrl = `https://wa.me/${socials.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hola ${brand.name}, quisiera reservar una mesa para cenar hoy.`
  )}`;

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background with Dark Atmospheric Image & Amber Light Cones */}
      <div className="absolute inset-0 z-0">
        <img 
          src={brand.coverBannerUrl || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80"}
          alt="Gastronomía de Autor"
          className="w-full h-full object-cover object-center opacity-30 filter brightness-75 scale-105 animate-in fade-in duration-700"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/80 to-[#0b0c10]/40"></div>
        <div className="absolute inset-0 bg-radial at-center from-transparent via-[#0b0c10]/60 to-[#0b0c10]"></div>
        
        {/* Subtle decorative glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs uppercase tracking-widest font-semibold mb-6 shadow-lg shadow-amber-500/5 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Experiencia Inmersiva WebAR Escala 1:1</span>
        </div>

        {/* Big Editorial Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.1] mb-6">
          {brand.name}
        </h1>

        {/* Culinary Subtitle */}
        <p className="text-lg sm:text-2xl font-light text-amber-100/90 font-serif italic max-w-2xl mb-5">
          "{brand.culinaryTagline}"
        </p>

        {/* Detailed Description */}
        <p className="text-sm sm:text-base text-gray-300 max-w-2xl font-normal leading-relaxed mb-10">
          {brand.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mb-14">
          <button
            type="button"
            onClick={onExploreClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#0b0c10] font-bold text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 active:scale-98 transition-all cursor-pointer"
          >
            <Compass className="w-4 h-4 text-black" />
            <span>Explorar Carta 3D</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-sm tracking-wide backdrop-blur-md transition-all active:scale-98 shadow-sm"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Reservar por WhatsApp</span>
          </a>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl pt-8 border-t border-white/10">
          <div className="flex items-center justify-center sm:justify-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Ruler className="w-4 h-4" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-semibold text-white">Escala Real 1:1</h4>
              <p className="text-[11px] text-gray-400">Medidas exactas en tu mesa</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Scan className="w-4 h-4" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-semibold text-white">Digitalización 3D</h4>
              <p className="text-[11px] text-gray-400">Capturado con Scaniverse</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Flame className="w-4 h-4" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-semibold text-white">Cocina & Maridaje</h4>
              <p className="text-[11px] text-gray-400">Fichas técnicas y alérgenos</p>
            </div>
          </div>
        </div>

      </div>

      {/* Subtle down scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
        <ArrowDown className="w-4 h-4 text-amber-300 animate-bounce" />
      </div>
    </section>
  );
};

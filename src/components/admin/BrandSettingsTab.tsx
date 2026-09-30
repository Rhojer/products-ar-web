import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Clock, 
  MessageCircle, 
  Globe, 
  KeyRound, 
  Sparkles,
  Check
} from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '../common/SocialIcons';
import { BrandSettings, SocialLinks } from '../../types/restaurant';

interface BrandSettingsTabProps {
  brand: BrandSettings;
  socials: SocialLinks;
  onUpdateBrand: (updated: BrandSettings) => void;
  onUpdateSocials: (updated: SocialLinks) => void;
  onSaveBrandAndSocials?: (brand: BrandSettings, socials: SocialLinks) => void;
}

export const BrandSettingsTab: React.FC<BrandSettingsTabProps> = ({
  brand,
  socials,
  onUpdateBrand,
  onUpdateSocials,
  onSaveBrandAndSocials
}) => {
  const [formData, setFormData] = useState<BrandSettings>(brand);
  const [socialData, setSocialData] = useState<SocialLinks>(socials);
  const [savedToast, setSavedToast] = useState(false);

  useEffect(() => {
    setFormData(brand);
  }, [brand]);

  useEffect(() => {
    setSocialData(socials);
  }, [socials]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSaveBrandAndSocials) {
      onSaveBrandAndSocials(formData, socialData);
    } else {
      onUpdateBrand(formData);
      onUpdateSocials(socialData);
    }
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-1">
            Identidad de Marca & Redes Sociales
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Actualiza el nombre, el horario, el estado del salón y tus canales de reserva en tiempo real.
          </p>
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
        >
          {savedToast ? <Check className="w-4 h-4 text-black" /> : <Sparkles className="w-4 h-4 text-black" />}
          <span>{savedToast ? '¡Cambios Guardados!' : 'Guardar Identidad'}</span>
        </button>
      </div>

      {/* Grid Section 1: Brand Info */}
      <div className="bg-[#141722] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-amber-300 pb-3 border-b border-white/5">
          <Building2 className="w-4 h-4" />
          <span>Datos Generales del Restaurante</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-2">
              Nombre del Local / Restaurante *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#0e1017] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
              placeholder="Ej. AURA Bistro"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-2">
              Nombre de la Sucursal / Sede del Local
            </label>
            <input
              type="text"
              value={formData.localVenueName || ''}
              onChange={(e) => setFormData({ ...formData, localVenueName: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#0e1017] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
              placeholder="Ej. AURA Bistro • Masaryk"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-2">
              Lema Culinario / Subtítulo
            </label>
            <input
              type="text"
              value={formData.culinaryTagline}
              onChange={(e) => setFormData({ ...formData, culinaryTagline: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#0e1017] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
              placeholder="Ej. Cocina Contemporánea"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-2">
              Título Principal de la Carta (Texto del Principio)
            </label>
            <input
              type="text"
              value={formData.menuTitle || ''}
              onChange={(e) => setFormData({ ...formData, menuTitle: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#0e1017] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
              placeholder="Ej. Nuestra Carta Gastronómica"
            />
          </div>
        </div>

        {/* Season and Subtitle at top */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3 border-t border-white/5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-2">
              Etiqueta Superior / Temporada (Texto del Principio)
            </label>
            <input
              type="text"
              value={formData.seasonTag || ''}
              onChange={(e) => setFormData({ ...formData, seasonTag: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#0e1017] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
              placeholder="Ej. Temporada Otoño • Invierno"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-2">
              Subtítulo / Tipo de Menú (Texto del Principio)
            </label>
            <input
              type="text"
              value={formData.menuSubtype || ''}
              onChange={(e) => setFormData({ ...formData, menuSubtype: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#0e1017] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
              placeholder="Ej. Menú Degustación"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-white/5">
          <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-2">
            Texto Introductorio del Principio (Párrafo explicativo bajo el título)
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#0e1017] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors leading-relaxed"
            placeholder="Explora nuestra selección completa en vista compacta..."
          />
        </div>

        {/* Schedule & Live Status Switch */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Horarios de Atención y Cocina</span>
            </label>
            <input
              type="text"
              value={formData.hours}
              onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#0e1017] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
              placeholder="Ej. Martes a Domingo: 13:00 - 16:30 | 20:00 - 23:45"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-2">
              Conmutador de Estado en Vivo
            </label>
            <div className="flex items-center gap-4 p-3 bg-[#0e1017] border border-white/10 rounded-xl">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, isOpenManual: true })}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  formData.isOpenManual 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Abierto Ahora</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, isOpenManual: false })}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  !formData.isOpenManual 
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                <span>Cerrado</span>
              </button>
            </div>
          </div>
        </div>

        {/* Currency & Security PIN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-2">
              Símbolo de Moneda
            </label>
            <input
              type="text"
              value={formData.currencySymbol}
              onChange={(e) => setFormData({ ...formData, currencySymbol: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#0e1017] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
              placeholder="€, $, USD, etc."
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-2 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span>PIN de Acceso a /admin (4 Dígitos)</span>
            </label>
            <input
              type="password"
              maxLength={6}
              value={formData.adminPin}
              onChange={(e) => setFormData({ ...formData, adminPin: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#0e1017] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors tracking-widest font-mono"
              placeholder="1234"
            />
          </div>
        </div>

        {/* Photo URL */}
        <div className="pt-4 border-t border-white/5">
          <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-2">
            URL de Portada / Banner Hero
          </label>
          <input
            type="url"
            value={formData.coverBannerUrl || ''}
            onChange={(e) => setFormData({ ...formData, coverBannerUrl: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#0e1017] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
            placeholder="https://images.unsplash.com/photo-..."
          />
        </div>

      </div>

      {/* Grid Section 2: Social Media & Channels */}
      <div className="bg-[#141722] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-amber-300 pb-3 border-b border-white/5">
          <Globe className="w-4 h-4" />
          <span>Canales de Contacto & Redes Sociales</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Instagram */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-2 flex items-center gap-1.5">
              <InstagramIcon className="w-4 h-4 text-pink-400" />
              <span>Perfil de Instagram</span>
            </label>
            <input
              type="url"
              value={socialData.instagram}
              onChange={(e) => setSocialData({ ...socialData, instagram: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#0e1017] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
              placeholder="https://instagram.com/tumenu"
            />
          </div>

          {/* TikTok */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-2 flex items-center gap-1.5">
              <span className="font-bold text-cyan-400 text-xs">TT</span>
              <span>Perfil de TikTok</span>
            </label>
            <input
              type="url"
              value={socialData.tiktok}
              onChange={(e) => setSocialData({ ...socialData, tiktok: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#0e1017] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
              placeholder="https://tiktok.com/@tumenu"
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-2 flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp de Reservas (con prefijo de país) *</span>
            </label>
            <input
              type="tel"
              required
              value={socialData.whatsapp}
              onChange={(e) => setSocialData({ ...socialData, whatsapp: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#0e1017] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
              placeholder="+34 600 000 000"
            />
            <span className="text-[11px] text-gray-500 mt-1 block">
              Los comensales podrán pulsar un botón para iniciar una conversación de reserva directa.
            </span>
          </div>

          {/* Facebook or Website */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-2 flex items-center gap-1.5">
              <FacebookIcon className="w-4 h-4 text-blue-400" />
              <span>Facebook o Web Corporativa</span>
            </label>
            <input
              type="url"
              value={socialData.facebook || ''}
              onChange={(e) => setSocialData({ ...socialData, facebook: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#0e1017] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
              placeholder="https://facebook.com/tupagina"
            />
          </div>
        </div>

      </div>

      {/* Floating Save Button */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider shadow-xl shadow-amber-500/10 active:scale-95 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Guardar Cambios de Identidad</span>
        </button>
      </div>

    </form>
  );
};

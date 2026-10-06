import React from 'react';
import { LocationInfo, BrandSettings, SocialLinks } from '../../types/restaurant';

interface LocationSectionProps {
  location: LocationInfo;
  brand: BrandSettings;
  socials: SocialLinks;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  location,
  brand,
  socials
}) => {
  const whatsappUrl = `https://wa.me/${socials.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hola ${brand.name}, me gustaría pedir una Marquesa de Limón en Coro, Falcón.`
  )}`;

  return (
    <div id="sede" className="flex flex-col gap-6">
      
      {/* 6. SEDE FÍSICA & HORARIOS (CARD MATCHING STITCH) */}
      <section className="bg-white rounded-3xl overflow-hidden border border-[#e4beb3]/30 shadow-xs flex flex-col">
        
        {/* Interactive Map Header with Coro, Falcón Embed */}
        <div className="relative w-full h-52 bg-[#f0edf1] overflow-hidden">
          <iframe
            src={location.googleMapsEmbedUrl || "https://maps.google.com/maps?q=11.403120,-69.675580&hl=es&z=16&output=embed"}
            title="Ubicación en Coro, Falcón"
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
          />
          <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
          
          <div className="absolute top-3 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#e4beb3]/30 shadow-xs pointer-events-none">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5a1f] animate-pulse"></span>
            <span className="text-xs font-headline font-bold text-[#1b1b1e]">
              Coro, Falcón
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-5 flex flex-col gap-3.5">
          <div>
            <h3 className="text-base sm:text-lg font-headline text-[#1b1b1e] font-bold">
              {brand.name} • {brand.localVenueName?.trim() || 'Coro, Falcón'}
            </h3>
            {([location.address, location.neighborhood, location.city].filter(Boolean).length > 0) && (
              <p className="text-xs sm:text-sm text-[#5b4038] flex items-center gap-1.5 mt-1">
                <span className="material-symbols-outlined text-base text-[#ae3200]">
                  pin_drop
                </span>
                <span>{[location.address, location.neighborhood, location.city, location.country].filter(Boolean).join(', ')}</span>
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-0.5 rounded-md bg-[#acedff] text-[#001f26] font-semibold">
              {brand.isOpenManual ? 'Abierto Ahora' : 'Cerrado'}
            </span>
            {brand.hours?.trim() && (
              <span className="text-[#8f7067]">{brand.hours}</span>
            )}
          </div>

          {/* Quick Access Details */}
          {(location.metroBusAccess?.trim() || location.parkingInfo?.trim()) && (
            <div className="text-[11px] text-[#5b4038] bg-[#f6f2f7] p-3 rounded-2xl border border-[#e4beb3]/20 space-y-1">
              {location.metroBusAccess?.trim() && (
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-xs text-[#00687a]">local_shipping</span>
                  <span>{location.metroBusAccess}</span>
                </div>
              )}
              {location.parkingInfo?.trim() && (
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-xs text-[#855300]">storefront</span>
                  <span>{location.parkingInfo}</span>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons: Abrir en Google Maps & Pedir por WhatsApp */}
          {(location.googleMapsUrl?.trim() || socials.whatsapp?.trim()) && (
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#e4beb3]/20">
              {location.googleMapsUrl?.trim() && (
                <a
                  href={location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#f0edf1] hover:bg-[#eae7eb] text-[#1b1b1e] text-xs font-semibold transition-colors active:scale-95"
                >
                  <span className="material-symbols-outlined text-base text-[#ae3200]">
                    navigation
                  </span>
                  <span>Abrir Google Maps</span>
                </a>
              )}

              {socials.whatsapp?.trim() && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#ff5a1f] text-white text-xs font-bold shadow-sm hover:bg-[#ae3200] transition-colors active:scale-95"
                >
                  <span className="material-symbols-outlined text-base">
                    chat
                  </span>
                  <span>Pedir por WhatsApp</span>
                </a>
              )}
            </div>
          )}

        </div>

      </section>

      {/* 7. REDES SOCIALES & CONTACTO (COMUNIDAD POSTRES) */}
      {(socials.instagram?.trim() || socials.tiktok?.trim() || socials.whatsapp?.trim() || socials.facebook?.trim()) && (
        <section className="bg-[#f6f2f7] rounded-3xl p-4 sm:p-5 border border-[#e4beb3]/20 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#1b1b1e] font-headline">
                Comunidad {brand.name}
              </h3>
              <p className="text-xs text-[#8f7067]">Novedades y pedidos directos</p>
            </div>

            <div className="w-8 h-8 rounded-full bg-[#ffdbd0]/60 flex items-center justify-center text-[#ae3200]">
              <span className="material-symbols-outlined text-base">share</span>
            </div>
          </div>

          {/* Social Channels Grid */}
          <div className="flex flex-wrap gap-2">
            {/* Instagram */}
            {socials.instagram?.trim() && (
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[90px] flex flex-col items-center justify-center gap-1 p-2.5 rounded-xl bg-white border border-[#e4beb3]/20 active:scale-95 hover:border-[#ae3200]/30 transition-all text-center group"
              >
                <span className="material-symbols-outlined text-lg text-[#ae3200] group-hover:scale-110 transition-transform">
                  photo_camera
                </span>
                <span className="text-[10px] font-bold text-[#1b1b1e]">Instagram</span>
              </a>
            )}

            {/* TikTok */}
            {socials.tiktok?.trim() && (
              <a
                href={socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[90px] flex flex-col items-center justify-center gap-1 p-2.5 rounded-xl bg-white border border-[#e4beb3]/20 active:scale-95 hover:border-[#00687a]/30 transition-all text-center group"
              >
                <span className="material-symbols-outlined text-lg text-[#00687a] group-hover:scale-110 transition-transform">
                  play_circle
                </span>
                <span className="text-[10px] font-bold text-[#1b1b1e]">TikTok</span>
              </a>
            )}

            {/* WhatsApp */}
            {socials.whatsapp?.trim() && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[90px] flex flex-col items-center justify-center gap-1 p-2.5 rounded-xl bg-white border border-[#e4beb3]/20 active:scale-95 hover:border-[#855300]/30 transition-all text-center group"
              >
                <span className="material-symbols-outlined text-lg text-[#855300] group-hover:scale-110 transition-transform">
                  chat
                </span>
                <span className="text-[10px] font-bold text-[#1b1b1e]">WhatsApp</span>
              </a>
            )}

            {/* Facebook */}
            {socials.facebook?.trim() && (
              <a
                href={socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[90px] flex flex-col items-center justify-center gap-1 p-2.5 rounded-xl bg-white border border-[#e4beb3]/20 active:scale-95 hover:border-[#1877f2]/30 transition-all text-center group"
              >
                <span className="material-symbols-outlined text-lg text-[#1877f2] group-hover:scale-110 transition-transform">
                  public
                </span>
                <span className="text-[10px] font-bold text-[#1b1b1e]">Facebook</span>
              </a>
            )}
          </div>

        </section>
      )}

    </div>
  );
};

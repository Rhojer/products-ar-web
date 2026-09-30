import React from 'react';
import { BrandSettings, SocialLinks, LocationInfo } from '../../types/restaurant';

interface NavbarProps {
  brand: BrandSettings;
  socials: SocialLinks;
  location: LocationInfo;
  onNavigateAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  brand,
  location,
  onNavigateAdmin
}) => {
  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#fbf8fc]/90 backdrop-blur-md border-b border-[#e4beb3]/30 shadow-sm">
      <div className="max-w-lg md:max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Left: Brand Icon + Title + Subtitle */}
        <div className="flex items-center gap-2.5">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-[#ffdbd0] text-[#ae3200] flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-xl">restaurant_menu</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-lg sm:text-xl font-bold tracking-tight text-[#ae3200] leading-none">
                {brand.name}
              </span>
              {brand.culinaryTagline?.trim() && (
                <span className="text-[10px] text-[#8f7067] font-medium tracking-wide">
                  {brand.culinaryTagline}
                </span>
              )}
            </div>
          </a>
        </div>

        {/* Right: Location Selector Chip + Admin Shortcut */}
        <div className="flex items-center gap-2">
          {(brand.localVenueName?.trim() || location.neighborhood?.trim()) && (
            <a
              href="#sede"
              className="flex items-center gap-1 py-1.5 px-3 rounded-full bg-[#f0edf1] hover:bg-[#eae7eb] transition-colors active:scale-95 text-xs font-semibold text-[#1b1b1e]"
            >
              <span className="material-symbols-outlined text-[#00a0bb] text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                location_on
              </span>
              <span>{brand.localVenueName?.trim() || location.neighborhood}</span>
              <span className="material-symbols-outlined text-sm text-[#8f7067]">
                expand_more
              </span>
            </a>
          )}

          <button
            type="button"
            onClick={onNavigateAdmin}
            title="Panel de Configuración (/admin)"
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-full bg-[#ffdbd0]/60 hover:bg-[#ffdbd0] text-[#ae3200] text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">settings</span>
            <span className="hidden sm:inline text-[11px] font-mono">/admin</span>
          </button>
        </div>

      </div>
    </header>
  );
};

import React, { useState } from 'react';
import { Dish, BrandSettings, SocialLinks } from '../../types/restaurant';

interface MenuCatalogProps {
  dishes: Dish[];
  brand: BrandSettings;
  socials: SocialLinks;
  onOpenARModal: (dish: Dish) => void;
}

export const MenuCatalog: React.FC<MenuCatalogProps> = ({
  dishes,
  brand,
  socials,
  onOpenARModal
}) => {
  // Selected dish for the interactive expanded card
  const [activeDishId, setActiveDishId] = useState<string>(dishes[0]?.id || 'marquesa-limon');

  const activeDish = dishes.find(d => d.id === activeDishId) || dishes[0];

  const handleOrderWhatsApp = () => {
    if (!activeDish) return;
    const msg = `¡Hola ${brand.name}! Quisiera ordenar: "${activeDish.name}" (${activeDish.price.toFixed(2)} ${brand.currencySymbol}).`;
    window.open(`https://wa.me/${socials.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* 1. REFINED EDITORIAL HEADER (TEXTO DEL PRINCIPIO) */}
      {(brand.seasonTag?.trim() || brand.menuSubtype?.trim() || brand.menuTitle?.trim() || brand.description?.trim()) && (
        <section className="flex flex-col gap-2 pt-1">
          {(brand.seasonTag?.trim() || brand.menuSubtype?.trim()) && (
            <div className="flex items-center justify-between">
              {brand.seasonTag?.trim() ? (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-headline tracking-wider uppercase text-[#ae3200] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#ff5a1f] animate-pulse"></span>
                  {brand.seasonTag}
                </span>
              ) : <span />}
              {brand.menuSubtype?.trim() && (
                <span className="text-[11px] font-headline text-[#8f7067] uppercase tracking-wider font-semibold">
                  {brand.menuSubtype}
                </span>
              )}
            </div>
          )}

          {brand.menuTitle?.trim() && (
            <h1 className="text-2xl sm:text-3xl font-headline font-bold text-[#1b1b1e] tracking-tight">
              {brand.menuTitle}
            </h1>
          )}

          {brand.description?.trim() && (
            <p className="text-sm font-sans text-[#5b4038] leading-relaxed">
              {brand.description}
            </p>
          )}
        </section>
      )}

      {/* 2. DISH SELECTION (THUMBNAILS + EXPANDED CARD) */}
      <section className="flex flex-col gap-4" id="carta">
        
        {/* Header Count */}
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-headline font-bold text-[#1b1b1e]">
            Selección de Platillos
          </h2>
          <span className="text-[11px] font-headline uppercase tracking-wider text-[#8f7067]">
            {dishes.length} {dishes.length === 1 ? 'platillo' : 'platillos'}
          </span>
        </div>

        {/* Thumbnails Row Grid with Dynamic Scaling (selected is large, others are shrunk) */}
        <div className="grid grid-cols-3 gap-2 items-center">
          {dishes.map((dish) => {
            const isSelected = dish.id === activeDish?.id;
            
            const badgeBg = 'bg-[#ff5a1f]';
            const badgeLabel = dish.badgeText?.trim();

            return (
              <button
                key={dish.id}
                type="button"
                onClick={() => setActiveDishId(dish.id)}
                className={`text-left flex flex-col p-1.5 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden group bg-white shadow-xs ${
                  isSelected
                    ? 'scale-105 border-2 border-[#ae3200] ring-2 ring-[#ae3200]/25 shadow-md z-10 opacity-100'
                    : 'scale-90 opacity-60 hover:opacity-90 hover:scale-95 border border-[#e4beb3]/30'
                }`}
              >
                {/* Square Image with Badge (only if badgeLabel exists) */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#f0edf1] mb-1.5">
                  <img
                    src={dish.coverImage}
                    alt={dish.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {badgeLabel && (
                    <div className={`absolute top-1 left-1 px-1.5 py-0.5 rounded-full ${badgeBg} text-white text-[9px] font-bold uppercase tracking-wider shadow-xs`}>
                      {badgeLabel}
                    </div>
                  )}
                </div>

                <span className={`text-[11px] line-clamp-1 leading-tight ${isSelected ? 'font-bold text-[#1b1b1e]' : 'font-medium text-[#5b4038]'}`}>
                  {dish.name}
                </span>
                <span className={`text-[11px] font-bold ${isSelected ? 'text-[#ae3200]' : 'text-[#8f7067]'}`}>
                  {brand.currencySymbol}{dish.price.toFixed(2)}
                </span>
              </button>
            );
          })}
        </div>

        {/* 4. EXPANDED FEATURED DISH CARD (MATCHING STITCH) */}
        {activeDish && (
          <article className="bg-white rounded-3xl p-4 sm:p-5 border border-[#e4beb3]/30 shadow-[0_4px_16px_rgba(24,24,27,0.04)] flex flex-col gap-3.5 transition-all duration-300 animate-in fade-in duration-200">
            
            {/* 16:10 Photo - Clicking this large image opens the WebAR 1:1 view */}
            <div 
              onClick={() => onOpenARModal(activeDish)}
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-[#1a1c18] rounded-2xl overflow-hidden cursor-pointer group select-none shadow-inner"
              title="Haz clic para proyectar en Realidad Aumentada (WebAR 1:1)"
            >
              {/* Blurred atmospheric backdrop to blend poster sides */}
              <img
                src={activeDish.coverImage}
                alt=""
                className="absolute inset-0 w-full h-full object-cover blur-md opacity-45 scale-110"
              />

              {/* Main crisp image */}
              <img
                src={activeDish.coverImage}
                alt={activeDish.name}
                className="relative z-10 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              />

              {/* Pulsing AR Callout Pill in the center/upper area */}
              <div className="absolute inset-0 z-20 bg-black/15 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/75 group-hover:bg-[#ff5a1f] text-white text-xs font-bold backdrop-blur-md border border-white/20 shadow-xl transform transition-transform group-hover:scale-105">
                  <span className="material-symbols-outlined text-base text-[#acedff] group-hover:text-white animate-pulse">
                    view_in_ar
                  </span>
                  <span>Toca la imagen para ver en AR 1:1</span>
                </div>
              </div>

              {/* Top-left tag (only if featured or badgeText exists) */}
              {(activeDish.featured || activeDish.badgeText?.trim()) && (
                <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full bg-[#ff5a1f] text-white text-[10px] uppercase font-bold tracking-wider shadow-sm pointer-events-none">
                  {activeDish.featured ? 'Firma del Chef' : activeDish.badgeText}
                </div>
              )}

              {/* Bottom-left Rating (only if rating exists and > 0) */}
              {activeDish.rating && activeDish.rating > 0 ? (
                <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#303033]/85 backdrop-blur-sm text-white text-xs font-semibold pointer-events-none">
                  <span className="material-symbols-outlined text-[#fea619] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                  <span>{activeDish.rating}</span>
                  {activeDish.reviewsCount && activeDish.reviewsCount > 0 ? (
                    <span className="text-white/70 text-[11px]">({activeDish.reviewsCount})</span>
                  ) : null}
                </div>
              ) : null}

              {/* Bottom-right Price */}
              <div className="absolute bottom-3 right-3 z-20 px-3 py-1 rounded-full bg-[#303033]/90 backdrop-blur-sm text-white font-bold text-base font-headline pointer-events-none">
                {brand.currencySymbol}{activeDish.price.toFixed(2)}
              </div>
            </div>

            {/* Title & Short Description */}
            <div className="flex flex-col gap-2">
              <div>
                <h3 className="text-lg sm:text-xl font-headline font-bold text-[#1b1b1e]">
                  {activeDish.name}
                </h3>
                {activeDish.shortDescription?.trim() && (
                  <p className="text-xs sm:text-sm text-[#5b4038] mt-1 leading-relaxed">
                    {activeDish.shortDescription}
                  </p>
                )}
              </div>

              {/* Quick Specs Grid (Preparación, Calorías, Maridaje) */}
              {(activeDish.prepTime?.trim() || activeDish.calories?.trim() || activeDish.sommelierPairing?.trim()) && (
                <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-[#f6f2f7] border border-[#e4beb3]/20">
                  {activeDish.prepTime?.trim() && (
                    <div className="flex items-start gap-1.5">
                      <span className="material-symbols-outlined text-[#ae3200] text-base mt-0.5">
                        timer
                      </span>
                      <div>
                        <span className="block text-[10px] text-[#8f7067]">Preparación</span>
                        <span className="text-xs font-bold text-[#1b1b1e]">
                          {activeDish.prepTime}
                        </span>
                      </div>
                    </div>
                  )}

                  {activeDish.calories?.trim() && (
                    <div className="flex items-start gap-1.5">
                      <span className="material-symbols-outlined text-[#00687a] text-base mt-0.5">
                        local_fire_department
                      </span>
                      <div>
                        <span className="block text-[10px] text-[#8f7067]">Calorías</span>
                        <span className="text-xs font-bold text-[#1b1b1e]">
                          {activeDish.calories}
                        </span>
                      </div>
                    </div>
                  )}

                  {activeDish.sommelierPairing?.trim() && (
                    <div className="flex items-start gap-1.5 col-span-2 pt-1 border-t border-[#e4beb3]/20">
                      <span className="material-symbols-outlined text-[#855300] text-base mt-0.5">
                        wine_bar
                      </span>
                      <div>
                        <span className="block text-[10px] text-[#8f7067]">Maridaje sugerido</span>
                        <span className="text-xs font-bold text-[#1b1b1e]">
                          {activeDish.sommelierPairing}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Ingredientes & Origen Chips */}
              {activeDish.keyIngredients && activeDish.keyIngredients.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-headline uppercase tracking-wider text-[#8f7067] font-bold">
                    Ingredientes & Origen
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeDish.keyIngredients.map((ing, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-full bg-[#f0edf1] text-[11px] font-medium text-[#1b1b1e] border border-[#e4beb3]/30"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Nota del Chef Ejecutivo */}
              {activeDish.chefNote?.trim() && (
                <div className="p-3 rounded-2xl bg-[#f0edf1]/60 border-l-4 border-[#ae3200]">
                  <span className="text-[10px] font-headline uppercase tracking-wider text-[#ae3200] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">person</span>
                    Nota del Chef Ejecutivo
                  </span>
                  <p className="text-xs text-[#5b4038] mt-1 italic leading-relaxed">
                    "{activeDish.chefNote}"
                  </p>
                </div>
              )}

              {/* Action Buttons: WebAR 3D & Add to Order */}
              <div className="flex flex-col gap-2 pt-2 border-t border-[#e4beb3]/20">
                <button
                  type="button"
                  onClick={() => onOpenARModal(activeDish)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#eae7eb] hover:bg-[#f0edf1] text-[#1b1b1e] text-xs font-bold border border-[#e4beb3]/40 transition-all active:scale-98 cursor-pointer shadow-xs"
                >
                  <span className="material-symbols-outlined text-[#00a0bb] text-lg">
                    view_in_ar
                  </span>
                  <span>Ver en Realidad Aumentada / AR 3D</span>
                </button>

                <button
                  type="button"
                  onClick={handleOrderWhatsApp}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#ff5a1f] hover:bg-[#ae3200] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">
                    add_shopping_cart
                  </span>
                  <span>Agregar a la Orden</span>
                </button>
              </div>

            </div>

          </article>
        )}

      </section>

    </div>
  );
};

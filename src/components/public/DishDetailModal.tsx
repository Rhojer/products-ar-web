import React, { useEffect } from 'react';
import { Dish, BrandSettings, SocialLinks } from '../../types/restaurant';
import { ALLERGENS_LIST } from '../../data/initialData';
import { ModelViewerAR } from '../common/ModelViewerAR';

interface DishDetailModalProps {
  dish: Dish | null;
  brand: BrandSettings;
  socials: SocialLinks;
  onClose: () => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  brand,
  socials,
  onClose
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (dish) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dish, onClose]);

  if (!dish) return null;

  const dishAllergens = ALLERGENS_LIST.filter(a => dish.allergens.includes(a.id));

  const handleOrderWhatsApp = () => {
    const msg = `¡Hola ${brand.name}! Quisiera ordenar el plato "${dish.name}" (${dish.price.toFixed(2)} ${brand.currencySymbol}).`;
    window.open(`https://wa.me/${socials.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose}></div>

      {/* Modal Container Shell with strict border clipping */}
      <div className="relative z-10 bg-white w-full max-w-lg max-h-[90vh] rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#e4beb3]/40 flex flex-col animate-in slide-in-from-bottom duration-200">
        
        {/* Modal Top Bar (Fixed Header) */}
        <div className="flex-shrink-0 flex items-center justify-between px-5 py-3.5 bg-white border-b border-[#e4beb3]/20">
          <span className="text-[11px] font-headline uppercase tracking-wider text-[#8f7067] font-bold">
            Ficha Técnica & Maridaje WebAR 1:1
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f0edf1] flex items-center justify-center text-[#1b1b1e] hover:bg-[#eae7eb] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Scrollable Inner Body - Scrollbar is safely contained between header and footer */}
        <div className="flex-1 overflow-y-auto min-h-0 modal-scrollbar overscroll-contain">
          {/* 3D AR Viewer Component Container */}
          <div className="p-4 bg-[#fbf8fc]">
            <ModelViewerAR
              glbUrl={dish.glbModelUrl}
              posterImage={dish.coverImage}
              dishName={dish.name}
              dimensions={dish.dimensions}
              dishId={dish.id}
              className="w-full shadow-md"
            />
          </div>

        {/* Modal Body Content */}
        <div className="p-5 flex flex-col gap-4">
          
          {/* Title & Price Header */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              {(dish.featured || dish.badgeText?.trim()) && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#ff5a1f] text-white text-[10px] uppercase font-bold tracking-wider">
                  {dish.featured ? 'Firma del Chef' : dish.badgeText}
                </span>
              )}
              <span className="font-headline font-bold text-xl text-[#ae3200] ml-auto">
                {brand.currencySymbol}{dish.price.toFixed(2)}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-headline font-bold text-[#1b1b1e]">
              {dish.name}
            </h2>

            {(dish.fullDescription?.trim() || dish.shortDescription?.trim()) && (
              <p className="text-xs sm:text-sm text-[#5b4038] mt-1.5 leading-relaxed">
                {dish.fullDescription || dish.shortDescription}
              </p>
            )}
          </div>

          {/* Ficha Técnica Specs Grid */}
          {(dish.prepTime?.trim() || dish.calories?.trim() || dish.sommelierPairing?.trim() || dishAllergens.length > 0) && (
            <div className="grid grid-cols-2 gap-2.5 p-3.5 rounded-2xl bg-[#f6f2f7] border border-[#e4beb3]/20">
              {/* Preparación */}
              {dish.prepTime?.trim() && (
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#ae3200] text-lg mt-0.5">
                    timer
                  </span>
                  <div>
                    <span className="block text-[10px] text-[#8f7067]">Preparación</span>
                    <span className="text-xs font-bold text-[#1b1b1e]">
                      {dish.prepTime}
                    </span>
                  </div>
                </div>
              )}

              {/* Calorías */}
              {dish.calories?.trim() && (
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#00687a] text-lg mt-0.5">
                    local_fire_department
                  </span>
                  <div>
                    <span className="block text-[10px] text-[#8f7067]">Aporte calórico</span>
                    <span className="text-xs font-bold text-[#1b1b1e]">
                      {dish.calories}
                    </span>
                  </div>
                </div>
              )}

              {/* Maridaje */}
              {dish.sommelierPairing?.trim() && (
                <div className="flex items-start gap-2 col-span-2 pt-1 border-t border-[#e4beb3]/20">
                  <span className="material-symbols-outlined text-[#855300] text-lg mt-0.5">
                    wine_bar
                  </span>
                  <div>
                    <span className="block text-[10px] text-[#8f7067]">Maridaje sugerido</span>
                    <span className="text-xs font-bold text-[#1b1b1e]">
                      {dish.sommelierPairing}
                    </span>
                  </div>
                </div>
              )}

              {/* Alérgenos */}
              {dishAllergens.length > 0 && (
                <div className="flex items-start gap-2 col-span-2 pt-1 border-t border-[#e4beb3]/20">
                  <span className="material-symbols-outlined text-[#8f7067] text-lg mt-0.5">
                    warning
                  </span>
                  <div>
                    <span className="block text-[10px] text-[#8f7067]">Alérgenos</span>
                    <span className="text-xs font-bold text-[#1b1b1e]">
                      {dishAllergens.map(a => `${a.icon} ${a.name}`).join(', ')}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Ingredientes Principales & Origen */}
          {dish.keyIngredients && dish.keyIngredients.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-headline uppercase tracking-wider text-[#8f7067] font-bold">
                Ingredientes Principales & Origen
              </span>
              <div className="flex flex-wrap gap-1.5">
                {dish.keyIngredients.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-full bg-[#f0edf1] text-[11px] font-medium text-[#1b1b1e] border border-[#e4beb3]/30"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Nota del Chef Ejecutivo */}
          {dish.chefNote?.trim() && (
            <div className="p-3.5 rounded-2xl bg-[#f0edf1]/60 border-l-4 border-[#ae3200]">
              <span className="text-[10px] font-headline uppercase tracking-wider text-[#ae3200] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">person</span>
                Nota del Chef Ejecutivo
              </span>
              <p className="text-xs text-[#5b4038] mt-1 italic leading-relaxed">
                "{dish.chefNote}"
              </p>
            </div>
          )}

          </div>
        </div>

        {/* Modal Fixed Footer Bar for Action Order Button */}
        <div className="flex-shrink-0 p-4 bg-white/95 backdrop-blur-md border-t border-[#e4beb3]/30">
          <button
            type="button"
            onClick={handleOrderWhatsApp}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#ff5a1f] text-white text-xs font-bold shadow-md hover:bg-[#ae3200] transition-colors active:scale-95 cursor-pointer uppercase tracking-wider"
          >
            <span className="material-symbols-outlined text-lg">
              add_shopping_cart
            </span>
            <span>Pedir por WhatsApp ({brand.currencySymbol}{dish.price.toFixed(2)})</span>
          </button>
        </div>

      </div>
    </div>
  );
};

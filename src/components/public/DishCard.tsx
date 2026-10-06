import React from 'react';
import { Sparkles, Ruler, Eye, Wine, AlertCircle } from 'lucide-react';
import { Dish } from '../../types/restaurant';
import { ALLERGENS_LIST } from '../../data/initialData';

interface DishCardProps {
  dish: Dish;
  currencySymbol: string;
  onSelect: (dish: Dish) => void;
}

export const DishCard: React.FC<DishCardProps> = ({
  dish,
  currencySymbol,
  onSelect
}) => {
  const hasGlb = Boolean(dish.glbModelUrl || dish.glbStorageKey);

  // Find allergens details
  const dishAllergens = ALLERGENS_LIST.filter(a => dish.allergens.includes(a.id));

  return (
    <div 
      onClick={() => onSelect(dish)}
      className={`group relative bg-gradient-to-b from-[#131620] to-[#0d0f15] border rounded-3xl overflow-hidden transition-all duration-300 flex flex-col cursor-pointer ${
        dish.isAvailable 
          ? 'border-white/10 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1' 
          : 'border-white/5 opacity-60 grayscale-[40%]'
      }`}
    >
      {/* Dish Photo Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#181c28]">
        <img 
          src={dish.coverImage || "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"} 
          alt={dish.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Soft bottom dark shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#131620] via-transparent to-black/30"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {hasGlb ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-amber-500/40 text-amber-300 text-[11px] font-semibold tracking-wide shadow-lg">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>WebAR 1:1</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-gray-300 text-[11px]">
              Ficha Gourmet
            </span>
          )}

          {!dish.isAvailable && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 text-[11px] font-medium">
              <AlertCircle className="w-3 h-3" />
              Agotado hoy
            </span>
          )}

          {dish.featured && dish.isAvailable && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-500/90 text-black text-[10px] font-bold uppercase tracking-wider shadow">
              Recomendado
            </span>
          )}
        </div>

        {/* Dimension indicator badge on photo */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-gray-300 text-[11px] border border-white/10">
            <Ruler className="w-3 h-3 text-amber-400" />
            <span>Ø {dish.dimensions.diameterCm} cm · {dish.dimensions.portionWeightG} g</span>
          </div>
        </div>

        {/* Hover preview button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-black font-semibold text-xs tracking-wider uppercase shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-4 h-4" />
            <span>Abrir Ficha 3D</span>
          </span>
        </div>
      </div>

      {/* Dish Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-amber-200 transition-colors leading-snug">
              {dish.name}
            </h3>
            <span className="font-serif text-lg sm:text-xl font-bold text-amber-400 whitespace-nowrap">
              {dish.price.toFixed(2)} {currencySymbol}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 leading-relaxed mb-4">
            {dish.shortDescription}
          </p>
        </div>

        <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2 mt-auto">
          {/* Allergens small icons */}
          <div className="flex items-center gap-1">
            {dishAllergens.length > 0 ? (
              dishAllergens.slice(0, 4).map(allergen => (
                <span 
                  key={allergen.id} 
                  title={allergen.name}
                  className="w-6 h-6 rounded-md bg-white/5 border border-white/5 flex items-center justify-center text-xs"
                >
                  {allergen.icon}
                </span>
              ))
            ) : (
              <span className="text-[11px] text-gray-500">Sin alérgenos comunes</span>
            )}
            {dishAllergens.length > 4 && (
              <span className="text-[10px] text-gray-400 pl-1">+{dishAllergens.length - 4}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

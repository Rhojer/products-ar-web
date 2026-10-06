import React, { useState } from 'react';
import { RestaurantReview } from '../../types/restaurant';

interface ReviewsSectionProps {
  reviews: RestaurantReview[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  const [showReviewModal, setShowReviewModal] = useState(false);

  if (!reviews || reviews.length === 0) return null;

  const validRatings = reviews.filter(r => typeof r.rating === 'number' && r.rating > 0);
  const avgRating = validRatings.length > 0
    ? (validRatings.reduce((sum, r) => sum + r.rating, 0) / validRatings.length).toFixed(1)
    : null;

  return (
    <section id="resenas" className="flex flex-col gap-4 mt-2">
      
      {/* Section Header */}
      <div className="flex items-end justify-between">
        <div>
          <span className="text-[10px] font-headline uppercase tracking-wider text-[#ae3200] font-bold">
            Comunidad & Crítica
          </span>
          <h2 className="text-xl sm:text-2xl font-headline font-bold text-[#1b1b1e]">
            Reseñas de Comensales
          </h2>
        </div>

        {/* Rating Score Badge (only if ratings exist) */}
        {avgRating && (
          <div className="flex items-center gap-1 bg-[#f0edf1] px-3 py-1.5 rounded-xl border border-[#e4beb3]/20">
            <span className="material-symbols-outlined text-[#fea619] text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
              star
            </span>
            <span className="font-bold text-base text-[#1b1b1e] font-headline">{avgRating}</span>
            <span className="text-[#8f7067] text-xs">/ 5.0</span>
          </div>
        )}
      </div>

      {/* Review Cards List */}
      <div className="flex flex-col gap-3">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white p-4 rounded-2xl border border-[#e4beb3]/25 shadow-xs flex flex-col gap-3"
          >
            {/* Top Author and Rating */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {rev.avatarUrl && (
                  <img
                    src={rev.avatarUrl}
                    alt={rev.author}
                    className="w-10 h-10 rounded-full object-cover border border-[#e4beb3]/40"
                  />
                )}
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="text-xs font-bold text-[#1b1b1e]">{rev.author}</h4>
                    <span className="material-symbols-outlined text-[#00687a] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                      verified
                    </span>
                  </div>
                  {rev.date && (
                    <span className="text-[11px] text-[#8f7067]">
                      {rev.date}
                    </span>
                  )}
                </div>
              </div>

              {/* 5 Stars */}
              <div className="flex text-[#fea619]">
                {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
            </div>

            {/* Quote Comment */}
            <p className="text-xs sm:text-sm text-[#1b1b1e] leading-relaxed">
              "{rev.comment}"
            </p>

            {/* Highlighted Dish Pill */}
            {rev.highlightedDish && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#f0edf1] text-[11px] text-[#5b4038] w-fit font-medium">
                <span className="material-symbols-outlined text-xs text-[#ae3200]">
                  restaurant
                </span>
                <span>Platillo: {rev.highlightedDish}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Write a Review Button */}
      <button
        type="button"
        onClick={() => setShowReviewModal(true)}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full border border-[#8f7067]/30 bg-[#f6f2f7] hover:bg-[#f0edf1] transition-colors active:scale-95 text-[#1b1b1e] text-xs font-semibold cursor-pointer"
      >
        <span className="material-symbols-outlined text-base text-[#ae3200]">
          rate_review
        </span>
        <span>Escribir una reseña sobre tu visita</span>
      </button>

      {/* Review Dialog */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-[#e4beb3]/30">
            <h3 className="font-headline font-bold text-lg text-[#1b1b1e]">Comparte tu Experiencia</h3>
            <p className="text-xs text-[#5b4038]">¿Qué te pareció proyectar la Marquesa en Realidad Aumentada y cómo fue tu experiencia con POSTRES?</p>
            <textarea
              rows={3}
              placeholder="Cuéntanos sobre los sabores, la textura, la experiencia WebAR..."
              className="w-full p-3 bg-[#f6f2f7] rounded-xl text-xs border border-[#e4beb3]/30 focus:outline-none focus:border-[#ae3200]"
            />
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setShowReviewModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-[#8f7067] hover:bg-[#f0edf1]"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('¡Gracias por tu reseña! Ha sido enviada a moderación del chef.');
                  setShowReviewModal(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#ff5a1f] text-white hover:bg-[#ae3200]"
              >
                Publicar
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

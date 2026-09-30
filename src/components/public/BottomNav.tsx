import React from 'react';

interface BottomNavProps {
  activeTab: 'carta' | 'reservas' | 'resenas' | 'ubicacion';
  onSelectTab: (tab: 'carta' | 'reservas' | 'resenas' | 'ubicacion') => void;
  onNavigateAdmin: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  onNavigateAdmin
}) => {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-40 bg-white/95 backdrop-blur-xl border-t border-[#e4beb3]/30 shadow-[0_-4px_20px_rgba(24,24,27,0.06)]">
      <div className="max-w-lg mx-auto flex justify-around items-center px-3 py-1.5">
        
        {/* Carta */}
        <button
          type="button"
          onClick={() => {
            onSelectTab('carta');
            const el = document.getElementById('carta');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeTab === 'carta'
              ? 'text-[#ff5a1f] font-bold bg-[#ffdbd0]/40 scale-102'
              : 'text-[#5b4038] hover:text-[#ae3200]'
          }`}
        >
          <span
            className="material-symbols-outlined text-2xl"
            style={{ fontVariationSettings: activeTab === 'carta' ? "'FILL' 1" : "'FILL' 0" }}
          >
            restaurant
          </span>
          <span className="text-[10px] font-headline uppercase tracking-wider font-bold">
            Carta
          </span>
        </button>

        {/* Reservas */}
        <a
          href="#sede"
          onClick={() => onSelectTab('reservas')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeTab === 'reservas'
              ? 'text-[#ff5a1f] font-bold bg-[#ffdbd0]/40'
              : 'text-[#5b4038] hover:text-[#ae3200]'
          }`}
        >
          <span className="material-symbols-outlined text-2xl">
            book_online
          </span>
          <span className="text-[10px] font-headline uppercase tracking-wider font-bold">
            Reservas
          </span>
        </a>

        {/* Reseñas */}
        <a
          href="#resenas"
          onClick={() => onSelectTab('resenas')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeTab === 'resenas'
              ? 'text-[#ff5a1f] font-bold bg-[#ffdbd0]/40'
              : 'text-[#5b4038] hover:text-[#ae3200]'
          }`}
        >
          <span className="material-symbols-outlined text-2xl">
            rate_review
          </span>
          <span className="text-[10px] font-headline uppercase tracking-wider font-bold">
            Reseñas
          </span>
        </a>

        {/* Ubicación */}
        <a
          href="#sede"
          onClick={() => onSelectTab('ubicacion')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeTab === 'ubicacion'
              ? 'text-[#ff5a1f] font-bold bg-[#ffdbd0]/40'
              : 'text-[#5b4038] hover:text-[#ae3200]'
          }`}
        >
          <span className="material-symbols-outlined text-2xl">
            pin_drop
          </span>
          <span className="text-[10px] font-headline uppercase tracking-wider font-bold">
            Ubicación
          </span>
        </a>

        {/* Admin Shortcut */}
        <button
          type="button"
          onClick={onNavigateAdmin}
          title="Panel Admin"
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-[#8f7067] hover:text-[#ae3200] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-2xl">
            tune
          </span>
          <span className="text-[10px] font-headline uppercase tracking-wider font-bold">
            Admin
          </span>
        </button>

      </div>
    </nav>
  );
};

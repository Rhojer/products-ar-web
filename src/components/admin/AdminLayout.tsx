import React, { useState } from 'react';
import { 
  Building2, 
  UtensilsCrossed, 
  MapPin, 
  Eye, 
  Database, 
  LogOut,
  Sparkles
} from 'lucide-react';
import { RestaurantData, BrandSettings, SocialLinks, LocationInfo, Dish } from '../../types/restaurant';
import { BrandSettingsTab } from './BrandSettingsTab';
import { MenuManagerTab } from './MenuManagerTab';
import { LocationSettingsTab } from './LocationSettingsTab';
import { BackupModal } from './BackupModal';

interface AdminLayoutProps {
  data: RestaurantData;
  onUpdateBrand: (brand: BrandSettings) => void;
  onUpdateSocials: (socials: SocialLinks) => void;
  onSaveBrandAndSocials?: (brand: BrandSettings, socials: SocialLinks) => void;
  onUpdateLocation: (location: LocationInfo) => void;
  onAddDish: (dish: Dish) => void;
  onUpdateDish: (dish: Dish) => void;
  onDeleteDish: (dishId: string) => void;
  onImportData: (data: RestaurantData) => void;
  onResetData: () => void;
  onExitAdmin: () => void;
  onLockSession: () => void;
}

type AdminTab = 'brand' | 'menu' | 'location';

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  data,
  onUpdateBrand,
  onUpdateSocials,
  onSaveBrandAndSocials,
  onUpdateLocation,
  onAddDish,
  onUpdateDish,
  onDeleteDish,
  onImportData,
  onResetData,
  onExitAdmin,
  onLockSession
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('menu');
  const [showBackupModal, setShowBackupModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#e0e2ec] flex flex-col">
      
      {/* Top Administration Navigation Bar */}
      <header className="bg-[#12151e] border-b border-white/10 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand Logo & Breadcrumb */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <UtensilsCrossed className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-white text-base sm:text-lg">
                    {data.brand.name}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[10px] font-mono font-semibold">
                    /admin
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-gray-400">
                  <span className={`w-1.5 h-1.5 rounded-full ${data.brand.isOpenManual ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
                  <span>{data.brand.isOpenManual ? 'Salón Abierto' : 'Salón Cerrado'}</span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Back to Public Web Preview */}
              <button
                type="button"
                onClick={onExitAdmin}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-200 hover:text-white transition-all cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Ver Menú Público</span>
                <span className="sm:hidden">Menú</span>
              </button>

              {/* Backup & JSON */}
              <button
                type="button"
                onClick={() => setShowBackupModal(true)}
                title="Copias de Seguridad"
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Database className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden md:inline">Respaldos</span>
              </button>

              {/* Lock / Logout */}
              <button
                type="button"
                onClick={onLockSession}
                title="Bloquear Panel"
                className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-300 border border-white/5 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Tab Selection Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5 flex items-center gap-2 overflow-x-auto scrollbar-none">
          
          <button
            type="button"
            onClick={() => setActiveTab('brand')}
            className={`py-3 px-4 border-b-2 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'brand'
                ? 'border-amber-400 text-amber-300 bg-amber-500/5'
                : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Pestaña 1: Identidad & Redes</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('menu')}
            className={`py-3 px-4 border-b-2 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'menu'
                ? 'border-amber-400 text-amber-300 bg-amber-500/5'
                : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Pestaña 2: Platillos & 3D Scaniverse</span>
            <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-gray-300 font-mono">
              {data.dishes.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('location')}
            className={`py-3 px-4 border-b-2 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'location'
                ? 'border-amber-400 text-amber-300 bg-amber-500/5'
                : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Pestaña 3: Ubicación & Mapas</span>
          </button>

        </div>
      </header>

      {/* Admin Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {activeTab === 'brand' && (
          <BrandSettingsTab
            brand={data.brand}
            socials={data.socials}
            onUpdateBrand={onUpdateBrand}
            onUpdateSocials={onUpdateSocials}
            onSaveBrandAndSocials={onSaveBrandAndSocials}
          />
        )}

        {activeTab === 'menu' && (
          <MenuManagerTab
            dishes={data.dishes}
            currencySymbol={data.brand.currencySymbol}
            onAddDish={onAddDish}
            onUpdateDish={onUpdateDish}
            onDeleteDish={onDeleteDish}
          />
        )}

        {activeTab === 'location' && (
          <LocationSettingsTab
            location={data.location}
            onUpdateLocation={onUpdateLocation}
          />
        )}
      </main>

      {/* Backup Modal */}
      {showBackupModal && (
        <BackupModal
          currentData={data}
          onImportData={onImportData}
          onResetData={onResetData}
          onClose={() => setShowBackupModal(false)}
        />
      )}

    </div>
  );
};

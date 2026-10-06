import React, { useState, useEffect } from 'react';
import { RestaurantData, Dish, BrandSettings, SocialLinks, LocationInfo } from './types/restaurant';
import { INITIAL_RESTAURANT_DATA } from './data/initialData';
import { 
  loadRestaurantData, 
  saveRestaurantData, 
  deleteDishMedia, 
  resetToDefaultData 
} from './services/storage';

// Public Components
import { Navbar } from './components/public/Navbar';
import { MenuCatalog } from './components/public/MenuCatalog';
import { ReviewsSection } from './components/public/ReviewsSection';
import { LocationSection } from './components/public/LocationSection';
import { BottomNav } from './components/public/BottomNav';
import { DishDetailModal } from './components/public/DishDetailModal';

// Admin Components
import { AdminGate } from './components/admin/AdminGate';
import { AdminLayout } from './components/admin/AdminLayout';

export function App() {
  const [data, setData] = useState<RestaurantData>(INITIAL_RESTAURANT_DATA);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Routing state
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  // Navigation tab state
  const [activeNavTab, setActiveNavTab] = useState<'carta' | 'reservas' | 'resenas' | 'ubicacion'>('carta');

  // Selected dish for 3D AR modal
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  // Load data on startup
  useEffect(() => {
    const initData = async () => {
      try {
        const loaded = await loadRestaurantData();
        setData(loaded);
      } catch (err) {
        console.error('Failed to load storage data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    initData();
  }, []);

  // Handle URL route changes (/admin or #admin or query param ?dish=...)
  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const params = new URLSearchParams(window.location.search);

      if (path === '/admin' || hash === '#admin') {
        setIsAdminRoute(true);
      } else {
        setIsAdminRoute(false);
      }

      // Check for deep-linked dish from QR code
      const dishIdParam = params.get('dish');
      if (dishIdParam && data.dishes.length > 0) {
        const targetDish = data.dishes.find(d => d.id === dishIdParam);
        if (targetDish) {
          setSelectedDish(targetDish);
        }
      }
    };

    checkRoute();
    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);
    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, [data.dishes]);

  // Navigation handlers
  const navigateToAdmin = () => {
    window.history.pushState(null, '', '/admin');
    setIsAdminRoute(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPublic = () => {
    window.history.pushState(null, '', '/');
    setIsAdminRoute(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // State update helpers (saves to LocalStorage using functional state updates to avoid stale closure races)
  const handleUpdateBrandAndSocials = (updatedBrand: BrandSettings, updatedSocials: SocialLinks) => {
    setData(prev => {
      const next = { ...prev, brand: updatedBrand, socials: updatedSocials };
      saveRestaurantData(next);
      return next;
    });
  };

  const handleUpdateBrand = (updatedBrand: BrandSettings) => {
    setData(prev => {
      const next = { ...prev, brand: updatedBrand };
      saveRestaurantData(next);
      return next;
    });
  };

  const handleUpdateSocials = (updatedSocials: SocialLinks) => {
    setData(prev => {
      const next = { ...prev, socials: updatedSocials };
      saveRestaurantData(next);
      return next;
    });
  };

  const handleUpdateLocation = (updatedLocation: LocationInfo) => {
    setData(prev => {
      const next = { ...prev, location: updatedLocation };
      saveRestaurantData(next);
      return next;
    });
  };

  const handleAddDish = (newDish: Dish) => {
    setData(prev => {
      const next = {
        ...prev,
        dishes: [newDish, ...prev.dishes]
      };
      saveRestaurantData(next);
      return next;
    });
  };

  const handleUpdateDish = (updatedDish: Dish) => {
    setData(prev => {
      const next = {
        ...prev,
        dishes: prev.dishes.map(d => d.id === updatedDish.id ? updatedDish : d)
      };
      saveRestaurantData(next);
      return next;
    });
  };

  const handleDeleteDish = async (dishId: string) => {
    setData(prev => {
      const dishToDelete = prev.dishes.find(d => d.id === dishId);
      if (dishToDelete) {
        deleteDishMedia(dishId, dishToDelete.glbStorageKey).catch(console.error);
      }
      const next = {
        ...prev,
        dishes: prev.dishes.filter(d => d.id !== dishId)
      };
      saveRestaurantData(next);
      return next;
    });
  };

  const handleImportData = (imported: RestaurantData) => {
    setData(imported);
    saveRestaurantData(imported);
  };

  const handleResetData = async () => {
    const fresh = await resetToDefaultData();
    setData(fresh);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fbf8fc] flex flex-col items-center justify-center text-[#1b1b1e]">
        <div className="w-12 h-12 border-3 border-[#ffdbd0] border-t-[#ae3200] rounded-full animate-spin mb-4"></div>
        <p className="font-headline font-bold text-lg text-[#ae3200]">AURA Pâtisserie</p>
        <p className="text-xs text-[#8f7067] mt-1 uppercase tracking-widest">Iniciando experiencia WebAR...</p>
      </div>
    );
  }

  // Admin View
  if (isAdminRoute) {
    if (!isAdminAuthenticated) {
      return (
        <AdminGate
          correctPin={data.brand.adminPin || '1234'}
          onSuccess={() => setIsAdminAuthenticated(true)}
          onCancel={navigateToPublic}
        />
      );
    }

    return (
      <AdminLayout
        data={data}
        onUpdateBrand={handleUpdateBrand}
        onUpdateSocials={handleUpdateSocials}
        onSaveBrandAndSocials={handleUpdateBrandAndSocials}
        onUpdateLocation={handleUpdateLocation}
        onAddDish={handleAddDish}
        onUpdateDish={handleUpdateDish}
        onDeleteDish={handleDeleteDish}
        onImportData={handleImportData}
        onResetData={handleResetData}
        onExitAdmin={navigateToPublic}
        onLockSession={() => setIsAdminAuthenticated(false)}
      />
    );
  }

  // Public Landing Page & WebAR Menu View (Stitch Mobile-First Shell)
  return (
    <div className="min-h-screen bg-[#fbf8fc] text-[#1b1b1e] font-sans">
      
      {/* Top Navigation Bar */}
      <Navbar
        brand={data.brand}
        socials={data.socials}
        location={data.location}
        onNavigateAdmin={navigateToAdmin}
      />

      {/* Main Container matching Stitch Mobile Layout */}
      <main className="max-w-lg md:max-w-xl mx-auto pt-20 pb-28 px-4 flex flex-col gap-6 overflow-x-hidden">
        
        {/* Menu Catalog with Thumbnails & Active Dish Card */}
        <MenuCatalog
          dishes={data.dishes}
          brand={data.brand}
          socials={data.socials}
          onOpenARModal={(dish) => setSelectedDish(dish)}
        />

        {/* Diner Reviews Section */}
        <ReviewsSection reviews={data.reviews} />

        {/* Physical Location & Community Section */}
        <LocationSection
          location={data.location}
          brand={data.brand}
          socials={data.socials}
        />

      </main>

      {/* Fixed Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeNavTab}
        onSelectTab={(tab) => setActiveNavTab(tab)}
        onNavigateAdmin={navigateToAdmin}
      />

      {/* Interactive 3D / WebAR 1:1 Modal */}
      {selectedDish && (
        <DishDetailModal
          dish={selectedDish}
          brand={data.brand}
          socials={data.socials}
          onClose={() => {
            setSelectedDish(null);
            if (window.location.search.includes('dish=')) {
              window.history.replaceState(null, '', window.location.pathname);
            }
          }}
        />
      )}

    </div>
  );
}

export default App;

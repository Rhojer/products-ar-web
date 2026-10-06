import { get, set, del, keys } from 'idb-keyval';
import { RestaurantData, BrandSettings, SocialLinks, LocationInfo } from '../types/restaurant';
import { INITIAL_RESTAURANT_DATA } from '../data/initialData';

const STORAGE_KEY = 'aura_postres_restaurant_data_v4';
const IDB_PREFIX_GLB = 'glb_model_';
const IDB_PREFIX_IMG = 'img_cover_';

// Cache for ObjectURLs to prevent memory leaks and recreate when needed
const objectUrlCache = new Map<string, string>();

export const loadRestaurantData = async (): Promise<RestaurantData> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Clean up previous v1, v2, v3 cache if exists
      localStorage.removeItem('aura_gastro_restaurant_data_v1');
      localStorage.removeItem('aura_postres_restaurant_data_v2');
      localStorage.removeItem('aura_postres_restaurant_data_v3');
      await saveRestaurantData(INITIAL_RESTAURANT_DATA);
      return INITIAL_RESTAURANT_DATA;
    }
    const data: Partial<RestaurantData> = JSON.parse(raw);

    // If storage still contains old data with multiple dishes or non-Coro location, refresh
    if ((data.dishes && data.dishes.length > 1) || data.location?.city !== 'Coro') {
      await saveRestaurantData(INITIAL_RESTAURANT_DATA);
      return INITIAL_RESTAURANT_DATA;
    }

    // Deep merge to ensure newly added keys (seasonTag, menuSubtype, etc.) are never missing
    const mergedBrand: BrandSettings = {
      ...INITIAL_RESTAURANT_DATA.brand,
      ...(data.brand || {})
    };
    const mergedSocials: SocialLinks = {
      ...INITIAL_RESTAURANT_DATA.socials,
      ...(data.socials || {})
    };
    const mergedLocation: LocationInfo = {
      ...INITIAL_RESTAURANT_DATA.location,
      ...(data.location || {})
    };

    const rawDishes = (data.dishes && data.dishes.length > 0) ? data.dishes : INITIAL_RESTAURANT_DATA.dishes;

    // Resolve any IndexedDB GLB models and images into live ObjectURLs
    const resolvedDishes = await Promise.all(
      rawDishes.map(async (dish) => {
        let glbModelUrl = dish.glbModelUrl;
        let coverImage = dish.coverImage;

        if (dish.glbStorageKey) {
          const blob = await get<Blob>(dish.glbStorageKey);
          if (blob) {
            // Check cache or create new ObjectURL
            if (!objectUrlCache.has(dish.glbStorageKey)) {
              objectUrlCache.set(dish.glbStorageKey, URL.createObjectURL(blob));
            }
            glbModelUrl = objectUrlCache.get(dish.glbStorageKey);
          }
        }

        // Check if cover image is in IndexedDB
        const imgKey = `${IDB_PREFIX_IMG}${dish.id}`;
        const imgBlob = await get<Blob>(imgKey);
        if (imgBlob) {
          if (!objectUrlCache.has(imgKey)) {
            objectUrlCache.set(imgKey, URL.createObjectURL(imgBlob));
          }
          coverImage = objectUrlCache.get(imgKey) || coverImage;
        }

        return {
          ...dish,
          glbModelUrl,
          coverImage
        };
      })
    );

    return {
      brand: mergedBrand,
      socials: mergedSocials,
      location: mergedLocation,
      dishes: resolvedDishes,
      reviews: (data.reviews && data.reviews.length > 0) ? data.reviews : INITIAL_RESTAURANT_DATA.reviews
    };
  } catch (error) {
    console.error('Error loading restaurant data from storage, using fallback:', error);
    return INITIAL_RESTAURANT_DATA;
  }
};

export const saveRestaurantData = async (data: RestaurantData): Promise<void> => {
  try {
    // Strip live blob: ObjectURLs before saving to LocalStorage so they don't break across sessions
    const sanitizedData: RestaurantData = {
      ...data,
      dishes: data.dishes.map((dish) => {
        const isBlobGlb = dish.glbModelUrl?.startsWith('blob:');
        const isBlobImg = dish.coverImage?.startsWith('blob:');
        return {
          ...dish,
          glbModelUrl: isBlobGlb ? undefined : dish.glbModelUrl,
          coverImage: isBlobImg ? '' : dish.coverImage
        };
      })
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitizedData));
  } catch (error) {
    console.error('Error saving restaurant data to LocalStorage:', error);
    throw error;
  }
};

// Store a GLB model file in IndexedDB for a specific dish
export const saveDishGlbFile = async (dishId: string, file: File | Blob): Promise<{ storageKey: string; url: string }> => {
  const storageKey = `${IDB_PREFIX_GLB}${dishId}_${Date.now()}`;
  await set(storageKey, file);
  
  // Revoke old object URL if exists
  if (objectUrlCache.has(storageKey)) {
    URL.revokeObjectURL(objectUrlCache.get(storageKey)!);
  }
  
  const objectUrl = URL.createObjectURL(file);
  objectUrlCache.set(storageKey, objectUrl);
  return { storageKey, url: objectUrl };
};

// Store a dish photo in IndexedDB
export const saveDishPhoto = async (dishId: string, file: File | Blob): Promise<{ storageKey: string; url: string }> => {
  const storageKey = `${IDB_PREFIX_IMG}${dishId}`;
  await set(storageKey, file);
  
  if (objectUrlCache.has(storageKey)) {
    URL.revokeObjectURL(objectUrlCache.get(storageKey)!);
  }
  
  const objectUrl = URL.createObjectURL(file);
  objectUrlCache.set(storageKey, objectUrl);
  return { storageKey, url: objectUrl };
};

// Delete stored files for a dish
export const deleteDishMedia = async (dishId: string, glbStorageKey?: string): Promise<void> => {
  if (glbStorageKey) {
    await del(glbStorageKey);
    if (objectUrlCache.has(glbStorageKey)) {
      URL.revokeObjectURL(objectUrlCache.get(glbStorageKey)!);
      objectUrlCache.delete(glbStorageKey);
    }
  }
  const imgKey = `${IDB_PREFIX_IMG}${dishId}`;
  await del(imgKey);
  if (objectUrlCache.has(imgKey)) {
    URL.revokeObjectURL(objectUrlCache.get(imgKey)!);
    objectUrlCache.delete(imgKey);
  }
};

// Reset everything to default initial data
export const resetToDefaultData = async (): Promise<RestaurantData> => {
  try {
    // Clean indexedDB keys
    const allKeys = await keys();
    for (const key of allKeys) {
      if (typeof key === 'string' && (key.startsWith(IDB_PREFIX_GLB) || key.startsWith(IDB_PREFIX_IMG))) {
        await del(key);
      }
    }
    // Clean cache
    objectUrlCache.forEach((url) => URL.revokeObjectURL(url));
    objectUrlCache.clear();

    localStorage.removeItem(STORAGE_KEY);
    return INITIAL_RESTAURANT_DATA;
  } catch (error) {
    console.error('Error resetting data:', error);
    return INITIAL_RESTAURANT_DATA;
  }
};

// Export full backup as JSON
export const exportDataBackup = (data: RestaurantData): void => {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `aura_backup_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

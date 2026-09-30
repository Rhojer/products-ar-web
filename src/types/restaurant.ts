export type Category = 
  | 'entradas' 
  | 'principales' 
  | 'carnes' 
  | 'pastas' 
  | 'postres' 
  | 'bebidas';

export interface Allergen {
  id: string;
  name: string;
  icon: string;
}

export interface PhysicalDimensions {
  diameterCm: number;    // Diámetro o largo en centímetros (ej. 24)
  widthCm?: number;      // Ancho en cm (opcional si es circular)
  heightCm: number;      // Altura en cm (ej. 6)
  portionWeightG: number;// Peso de la porción en gramos (ej. 320)
}

export interface Dish {
  id: string;
  name: string;
  category: Category;
  price: number;
  currency: string;
  coverImage: string;
  glbModelUrl?: string;          // URL o blob URL del .glb de Scaniverse
  glbStorageKey?: string;        // Clave si está almacenado en IndexedDB
  dimensions: PhysicalDimensions;
  shortDescription: string;
  fullDescription: string;
  keyIngredients: string[];
  allergens: string[];          // IDs de alérgenos
  sommelierPairing?: string;    // Maridaje sugerido (vino, cerveza artesanal, cóctel)
  isAvailable: boolean;         // En carta / Agotado del día
  featured?: boolean;
  prepTime?: string;
  calories?: string;
  chefNote?: string;
  badgeText?: string;           // ej. TOP, MAR, DULCE
  rating?: number;
  reviewsCount?: number;
}

export interface SocialLinks {
  instagram: string;
  tiktok: string;
  whatsapp: string;
  facebook?: string;
  website?: string;
}

export interface LocationInfo {
  address: string;
  neighborhood: string;
  postalCode: string;
  city: string;
  country: string;
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  metroBusAccess: string;
  parkingInfo: string;
  phone: string;
  email: string;
}

export interface BrandSettings {
  name: string;                  // Nombre del local / restaurante
  localVenueName?: string;       // Nombre de la sucursal o sede del local (ej. AURA Bistro • Masaryk)
  culinaryTagline: string;       // Lema culinario / subtítulo (ej. Cocina Contemporánea)
  seasonTag?: string;            // Etiqueta del principio (ej. Temporada Otoño • Invierno)
  menuSubtype?: string;          // Tipo de menú del principio (ej. Menú Degustación)
  menuTitle?: string;            // Título de la carta del principio (ej. Nuestra Carta Gastronómica)
  description: string;           // Texto del principio / párrafo introductorio de la carta
  hours: string;
  isOpenManual: boolean;         // Forzar estado abierto
  useAutomaticSchedule: boolean; // Si usa horario automático o manual
  currencySymbol: string;
  adminPin: string;             // PIN de 4 dígitos para acceder a /admin
  logoUrl?: string;
  coverBannerUrl?: string;
}

export interface RestaurantReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  highlightedDish?: string;
  avatarUrl?: string;
}

export interface RestaurantData {
  brand: BrandSettings;
  socials: SocialLinks;
  location: LocationInfo;
  dishes: Dish[];
  reviews: RestaurantReview[];
}

import { Allergen, RestaurantData } from '../types/restaurant';

export const ALLERGENS_LIST: Allergen[] = [
  { id: 'gluten', name: 'Gluten / Trigo', icon: '🌾' },
  { id: 'dairy', name: 'Lácteos', icon: '🧀' },
  { id: 'nuts', name: 'Frutos de Cáscara', icon: '🥜' },
  { id: 'crustaceans', name: 'Mariscos / Crustáceos', icon: '🦐' },
  { id: 'fish', name: 'Pescado', icon: '🐟' },
  { id: 'eggs', name: 'Huevo', icon: '🥚' },
  { id: 'soy', name: 'Soja', icon: '🌱' },
  { id: 'sesame', name: 'Sésamo', icon: '🥯' },
  { id: 'mustard', name: 'Mostaza', icon: '🌭' },
  { id: 'celery', name: 'Apio', icon: '🥬' },
];

export const INITIAL_RESTAURANT_DATA: RestaurantData = {
  brand: {
    name: 'POSTRES',
    localVenueName: 'Coro, Falcón',
    culinaryTagline: 'Repostería Artesanal & Postres',
    seasonTag: 'Colección Dulce & Cítricos',
    menuSubtype: 'Carta de Postres Artesanales',
    menuTitle: 'Nuestra Especialidad',
    description: 'Disfruta nuestra deliciosa Marquesa de Limón artesanal en Coro, Falcón. Proyéctala en Realidad Aumentada (WebAR 1:1) en tu mesa a escala real antes de ordenar.',
    hours: 'Horario hoy: 11:00 – 21:30 hrs',
    isOpenManual: true,
    useAutomaticSchedule: false,
    currencySymbol: '$',
    adminPin: '1234',
    logoUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80',
    coverBannerUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=80'
  },
  socials: {
    instagram: 'https://instagram.com/postres',
    tiktok: 'https://tiktok.com/@postres',
    whatsapp: '+584129506476',
    facebook: 'https://facebook.com/postres',
    website: 'https://postres.com'
  },
  location: {
    address: 'Calle Ampíes, Urb. Cruz Verde',
    neighborhood: 'Centro de Coro',
    postalCode: '4101',
    city: 'Coro',
    country: 'Venezuela',
    googleMapsUrl: 'https://maps.app.goo.gl/d75weHAsCTNKMLWx6',
    googleMapsEmbedUrl: 'https://maps.google.com/maps?q=11.403120,-69.675580&hl=es&z=16&output=embed',
    metroBusAccess: 'Entregas y pedidos para llevar en Coro, Falcón.',
    parkingInfo: 'Zona de retiro rápido en centro de Coro.',
    phone: '0412-9506476',
    email: 'pedidos@postres.com'
  },
  dishes: [
    {
      id: 'marquesa-limon',
      name: 'Marquesa de Limón Artesanal',
      category: 'postres',
      price: 3.50,
      currency: '$',
      coverImage: './images/marquesa-limon.jpg',
      glbModelUrl: './models/marquesa-limon.glb',
      dimensions: {
        diameterCm: 12,
        widthCm: 11.8,
        heightCm: 12.2,
        portionWeightG: 220
      },
      shortDescription: 'Para los antojitos de la tarde. Capas delicadas de galleta María artesanal alternadas con crema suave de limón fresco, ralladura de lima y un toque aterciopelado de leche condensada.',
      fullDescription: 'Nuestra emblemática Marquesa de Limón equilibra la acidez fresca del limón amarillo y verde con la sutil dulzura de nuestra crema artesanal reducida, intercalada con finas capas de galleta María infusionada con ralladura de lima kaffir.',
      keyIngredients: ['Limón Amarillo & Verde Fresco', 'Galleta María Casera', 'Crema Cítrica Reducida', 'Ralladura de Lima Kaffir'],
      allergens: ['gluten', 'dairy', 'eggs'],
      isAvailable: true,
      featured: true,
      badgeText: 'Especialidad WebAR',
      prepTime: 'Listo para degustar',
      calories: '360 kcal',
      chefNote: 'Servir bien fría. Recomendamos probar cada bocado abarcando todas sus capas para apreciar la armonía entre la crema cítrica y la galleta.',
      rating: 5.0,
      reviewsCount: 194
    }
  ],
  reviews: [
    {
      id: 'rev-1',
      author: 'Mariana Silva',
      rating: 5,
      date: 'Hace 1 día',
      comment: 'Poder proyectar la Marquesa de Limón en Realidad Aumentada en nuestra mesa antes de pedirla fue impresionante: la escala 1:1 es exacta y se ve cada detalle. Al probarla, el balance entre la galleta y la crema de limón superó todas las expectativas.',
      highlightedDish: 'Marquesa de Limón Artesanal',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80'
    },
    {
      id: 'rev-2',
      author: 'Alejandro Morales',
      rating: 5,
      date: 'Hace 3 días',
      comment: 'La mejor pastelería de autor. La textura de los postres y la atención son excepcionales. La experiencia 3D en el celular te da total seguridad del tamaño y presentación antes de ordenar.',
      highlightedDish: 'Marquesa de Limón Artesanal',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
    }
  ]
};

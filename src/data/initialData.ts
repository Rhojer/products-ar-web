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
    name: 'AURA Pâtisserie',
    localVenueName: 'AURA Pâtisserie • Boutique Dulce',
    culinaryTagline: 'Repostería Fina & Postres de Autor',
    seasonTag: 'Colección Dulce & Cítricos',
    menuSubtype: 'Carta de Postres Artesanales',
    menuTitle: 'Nuestra Selección de Postres',
    description: 'Explora nuestra exclusiva selección de repostería y postres de autor. Selecciona nuestra emblemática Marquesa de Limón para proyectarla en Realidad Aumentada (WebAR 1:1) en tu mesa a escala real antes de ordenar.',
    hours: 'Horario hoy: 11:00 – 21:30 hrs',
    isOpenManual: true,
    useAutomaticSchedule: false,
    currencySymbol: '$',
    adminPin: '1234',
    logoUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80',
    coverBannerUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=80'
  },
  socials: {
    instagram: 'https://instagram.com/aura_patisserie',
    tiktok: 'https://tiktok.com/@aurapatisserie',
    whatsapp: '+525512345678',
    facebook: 'https://facebook.com/aurapatisseriemx',
    website: 'https://aura-bistro.com'
  },
  location: {
    address: 'Av. Presidente Masaryk 410',
    neighborhood: 'Polanco IV Secc',
    postalCode: '11550',
    city: 'Ciudad de México',
    country: 'México',
    googleMapsUrl: 'https://maps.google.com/?q=Av.+Presidente+Masaryk+410+Polanco+CDMX',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.6617066925235!2d-99.19658592395349!3d19.430229381847113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d2020272b1604d%3A0xe5495f87b8dbcb2b!2sAv.%20Pdte.%20Masaryk%20410%2C%20Polanco%2C%20Polanco%20IV%20Secc%2C%20Miguel%20Hidalgo%2C%2011550%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses!2smx!4v1710000000000!5m2!1ses!2smx',
    metroBusAccess: 'Metro Polanco (Línea 7) a 6 minutos caminando. Acceso directo por Av. Molière y Masaryk.',
    parkingInfo: 'Valet Parking en puerta sobre Masaryk. Servicio concierge para pedidos especiales y mesas.',
    phone: '+52 55 9123 4567',
    email: 'concierge@aurapatisserie.mx'
  },
  dishes: [
    {
      id: 'marquesa-limon',
      name: 'Marquesa de Limón Artesanal',
      category: 'postres',
      price: 8.50,
      currency: '$',
      coverImage: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80',
      glbModelUrl: './models/marquesa-limon.glb',
      dimensions: {
        diameterCm: 12,
        widthCm: 11.8,
        heightCm: 12.2,
        portionWeightG: 220
      },
      shortDescription: 'Capas delicadas de galleta María artesanal alternadas con crema suave de limón fresco, ralladura de lima y un toque aterciopelado de leche condensada.',
      fullDescription: 'Nuestra emblemática Marquesa de Limón equilibra la acidez fresca del limón amarillo y verde con la sutil dulzura de nuestra crema artesanal reducida, intercalada con finas capas de galleta María infusionada con ralladura de lima kaffir.',
      keyIngredients: ['Limón Amarillo & Verde Fresco', 'Galleta María Casera', 'Crema Cítrica Reducida', 'Ralladura de Lima Kaffir'],
      allergens: ['gluten', 'dairy', 'eggs'],
      sommelierPairing: 'Té Earl Grey frío, Limoncello artesanal o Café Cold Brew',
      isAvailable: true,
      featured: true,
      badgeText: 'Especialidad WebAR',
      prepTime: 'Listo para degustar',
      calories: '360 kcal',
      chefNote: 'Servir bien fría. Recomendamos probar cada bocado abarcando todas sus capas para apreciar la armonía entre la crema cítrica y la galleta.',
      rating: 5.0,
      reviewsCount: 194
    },
    {
      id: 'esfera-chocolate',
      name: 'Esfera Volcánica de Chocolate Belga',
      category: 'postres',
      price: 9.50,
      currency: '$',
      coverImage: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80',
      glbModelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Cake/glTF-Binary/Cake.glb',
      dimensions: {
        diameterCm: 15,
        widthCm: 15,
        heightCm: 6.5,
        portionWeightG: 210
      },
      shortDescription: 'Cúpula de chocolate belga al 72%, corazón de praliné de avellanas tostadas del Piamonte y salsa caliente de toffee a la flor de sal.',
      fullDescription: 'Cúpula geométrica de chocolate amargo belga origen sostenible 72%. Al servir en mesa, se vierte una reducción caliente de toffee caramelizado que funde lentamente la cubierta liberando avellanas tostadas y frambuesas.',
      keyIngredients: ['Chocolate Belga 72%', 'Avellanas IGP Piamonte', 'Caramelo a la Flor de Sal', 'Frutos Rojos Silvestres'],
      allergens: ['gluten', 'dairy', 'nuts', 'eggs'],
      sommelierPairing: 'Vino dulce Oporto Tawny o Espresso Doble',
      isAvailable: true,
      featured: false,
      badgeText: 'Chocolate Lovers',
      prepTime: '5 min',
      calories: '420 kcal',
      chefNote: 'El contraste térmico entre la cúpula fría y la salsa tibia desencadena notas profundas de cacao tostado.',
      rating: 4.9,
      reviewsCount: 148
    },
    {
      id: 'pavlova-frutos-rojos',
      name: 'Pavlova Crujiente de Frutos Rojos',
      category: 'postres',
      price: 8.00,
      currency: '$',
      coverImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
      dimensions: {
        diameterCm: 13,
        widthCm: 13,
        heightCm: 8.0,
        portionWeightG: 180
      },
      shortDescription: 'Merengue francés crujiente con centro esponjoso tipo nube, chantilly ligera de vainilla de Papantla y coulis fresco de frambuesas silvestres.',
      fullDescription: 'Nube de merengue horneada lentamente a baja temperatura para lograr una corteza delicadamente quebradiza y un interior ligero. Coronada con chantilly fresca aromatizada con vainilla natural y frutos rojos de temporada.',
      keyIngredients: ['Merengue Francés', 'Vainilla Natural de Papantla', 'Frambuesas Frescas', 'Moras Silvestres'],
      allergens: ['dairy', 'eggs'],
      sommelierPairing: 'Champagne Rosé o Té Blanco de Jazmín',
      isAvailable: true,
      featured: false,
      badgeText: 'Ligero & Refrescante',
      prepTime: 'Listo para degustar',
      calories: '290 kcal',
      chefNote: 'Un postre sumamente sutil y etéreo con notas aromáticas florales y acidez natural de frutos silvestres.',
      rating: 4.8,
      reviewsCount: 112
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

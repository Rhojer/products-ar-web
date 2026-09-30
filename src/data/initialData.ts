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
    name: 'AURA Bistro',
    localVenueName: 'AURA Bistro • Masaryk',
    culinaryTagline: 'Cocina Contemporánea',
    seasonTag: 'Temporada Otoño • Invierno',
    menuSubtype: 'Menú Degustación',
    menuTitle: 'Nuestra Carta Gastronómica',
    description: 'Explora nuestra selección completa en vista compacta. Selecciona cualquier platillo para desplegar sus detalles de origen, notas del chef y opción de proyección tridimensional en Realidad Aumentada.',
    hours: 'Horario hoy: 13:00 – 23:30 hrs',
    isOpenManual: true,
    useAutomaticSchedule: false,
    currencySymbol: '$',
    adminPin: '1234',
    logoUrl: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=400&q=80',
    coverBannerUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80'
  },
  socials: {
    instagram: 'https://instagram.com/aura_bistro',
    tiktok: 'https://tiktok.com/@aurabistro',
    whatsapp: '+525512345678',
    facebook: 'https://facebook.com/aurabistromx',
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
    parkingInfo: 'Valet Parking en puerta sobre Masaryk. Estacionamiento privado techado con servicio concierge.',
    phone: '+52 55 9123 4567',
    email: 'concierge@aurabistro.mx'
  },
  dishes: [
    {
      id: 'ribeye',
      name: 'Ribeye Flameado al Romero & Trufa',
      category: 'carnes',
      price: 34.00,
      currency: '$',
      coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFKJs8rmDw7ZjkgZTZYJJzrPpXUTpWIp_7eeGCHmNtr5JKD0iBzzAf7BllZDJdnJVaBSm2ynmnBMkdKt0othpDdiKLM5n6zCzVVzG2mjjLaJvKXEGmRtuJwcQd6JtNbBva71l11scN1WiLyde98K6shTwamunI2z2HYFwAg6Y_jnvlLtBZUBYJCGTXNV6AQ4qkgfAajgdyzvftJCvLIaA3tX0Q5R4M2-iUYCSmjt67VaEKYPm6rXXe',
      glbModelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Burger/glTF-Binary/Burger.glb',
      dimensions: {
        diameterCm: 28,
        widthCm: 20,
        heightCm: 5.5,
        portionWeightG: 400
      },
      shortDescription: 'Corte Prime de 400g terminado en mesa con manteca de trufa negra, reducción aromática de oporto y puré rústico de papa ratte.',
      fullDescription: 'Corte Prime seleccionado de 400g terminado en sarteneta de hierro fundido frente al comensal para sellar los aromas de romero silvestre, con manteca de trufa negra de verano, reducción aromática de oporto Tawny 10 años y puré aterciopelado de papas ratte.',
      keyIngredients: ['Ribeye USDA Prime 400g', 'Trufa Negra de Verano', 'Romero Fresco', 'Oporto Tawny 10 Años', 'Papas Ratte'],
      allergens: ['dairy'],
      sommelierPairing: 'Cabernet Sauvignon Gran Reserva',
      isAvailable: true,
      featured: true,
      badgeText: 'TOP',
      prepTime: '20 - 25 min',
      calories: '680 kcal',
      chefNote: 'Recomendamos degustar en término medio para permitir que los matices terrosos de la trufa despierten las notas minerales del corte.',
      rating: 4.9,
      reviewsCount: 142
    },
    {
      id: 'salmon',
      name: 'Tartar de Salmón & Aguacate Crujiente',
      category: 'entradas',
      price: 22.50,
      currency: '$',
      coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADEzi1IaGzsEz0-nwi7Nj7AQ5KWWCR8Zy9gue2xHgxGwDHyVkKEcO4vG8mLXpZCPtIuwZOA1BIhS-andi5uOZSkBq85ZC85gYIX8goeSaQEuxn9nbsT8Nyy3ncEeWymfRknPKovIcpQ-UTHqhB0NKxU-ayHwi4CQ02citxIgHJdQjnACL27Z1oX4uUtLfd0N2A0FdLpoGNMkcbaTstNrNCbbK_z-DGgLfGw_PZyBx_3MoyIz12yqJp',
      glbModelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Avocado/glTF-Binary/Avocado.glb',
      dimensions: {
        diameterCm: 18,
        widthCm: 14,
        heightCm: 6.0,
        portionWeightG: 220
      },
      shortDescription: 'Salmón noruego salvaje cortado a cuchillo, emulsión vibrante de yuzu con jengibre fresco, aguacate tatemado y crocante de raíz de loto.',
      fullDescription: 'Tacos milimétricos de salmón noruego de grado sashimi, marinados al minuto con emulsión cítrica de yuzu japonés y jengibre fresco de montaña. Acompañado de quenelle de aguacate Hass tatemado, perlas de tobiko y chips crujientes de loto.',
      keyIngredients: ['Salmón Noruego Superior', 'Yuzu Japonés', 'Aguacate Hass Orgánico', 'Huevas de Tobiko', 'Chips de Loto'],
      allergens: ['fish', 'sesame', 'soy'],
      sommelierPairing: 'Albariño Rías Baixas o Champagne Brut',
      isAvailable: true,
      featured: true,
      badgeText: 'MAR',
      prepTime: '12 - 15 min',
      calories: '340 kcal',
      chefNote: 'La acidez botánica del yuzu equilibra la untuosidad natural del salmón salvaje sin desnaturalizar su textura cruda.',
      rating: 4.8,
      reviewsCount: 98
    },
    {
      id: 'chocolate',
      name: 'Esfera Volcánica de Chocolate Belga',
      category: 'postres',
      price: 18.00,
      currency: '$',
      coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsHe8vp_wsaluh-sBXfRpYPGNt5hpiXmn-5MWj3ELdR7vbUaJmMLY-ABkNeUU82LZEnGkcPwjQ8LjNaMZobcJO_pJlJlC0IKw5p6mrdE2EP4racMb6WutBdmTgruxjcy64jvvnaZLt3ohRP2LOVyekGNDpP8RLpmasDkW8kcwaQ6QnDLloe3_24FZUG0tA_BkDv-iAWaowJNqdPVW_MklZVWpGMhNBQPHj55enVi13NX5AOia3xwaP',
      glbModelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Cake/glTF-Binary/Cake.glb',
      dimensions: {
        diameterCm: 16,
        widthCm: 16,
        heightCm: 7.0,
        portionWeightG: 210
      },
      shortDescription: 'Esfera templada de cacao al 72%, corazón de crumble de avellana de Piamonte y salsa caliente de toffee salado vertida al momento.',
      fullDescription: 'Cúpula geométrica de chocolate negro belga origen sostenible 72%. En su interior esconde un bizcocho aireado de praliné y avellanas tostadas del Piamonte con frambuesas liofilizadas. Al servir en mesa, se funde ante el comensal con un baño de toffee caliente aromatizado a la sal ahumada de Colima.',
      keyIngredients: ['Chocolate Belga 72%', 'Avellanas IGP Piamonte', 'Caramelo a la Flor de Sal', 'Frutos Rojos Silvestres'],
      allergens: ['gluten', 'dairy', 'nuts', 'eggs'],
      sommelierPairing: 'Oporto Ruby o Café Espresso Arábica',
      isAvailable: true,
      featured: false,
      badgeText: 'DULCE',
      prepTime: '10 min',
      calories: '450 kcal',
      chefNote: 'El contraste térmico entre la esfera fría y la reducción tibia desencadena notas ahumadas de cacao tostado.',
      rating: 5.0,
      reviewsCount: 186
    }
  ],
  reviews: [
    {
      id: 'rev-1',
      author: 'Valeria Montes',
      rating: 5,
      date: 'Hace 2 días',
      comment: 'El Ribeye con reducción de oporto y manteca de trufa tiene una cocción perfecta. La presentación y los maridajes sugeridos elevan la experiencia culinaria a otro nivel.',
      highlightedDish: 'Ribeye al Romero & Trufa',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCx0ksXJtRz4iy4TZUiymW6gqgONXuhgXCa-b35rPczkeOGqZURET1sGey-m0tDEL2kMdURmCA0db4eCIFlg0r170mW_vpfjMGubBbsSWBwgHNdPEFEKKvkARVFtCo71ixmrPEkJPZ34QipQziOLHX1sK9wAYD-EkVPs1pE8JzBXXjZadqfFwyOL1OjiLHmJ0CIhivhpxKsWP5gWEUCdPpO2B4DdeDg5SNojUGNFTM4mtKf1YiQzVy3'
    },
    {
      id: 'rev-2',
      author: 'Carlos De La Vega',
      rating: 5,
      date: 'Hace 4 días',
      comment: 'El balance del tartar con yuzu y aguacate tatemado es impecable. Un servicio atento, ambiente sofisticado y respeto absoluto por la materia prima de temporada.',
      highlightedDish: 'Tartar de Salmón Salvaje',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_xJS8PPQ38hSin9xp90bEPSbB7CdzTjD7xbRiRUAJsiRJs6AG_aycMTIFZLjxhYSMJjZA0RHWbVlG12OWPZUfLWt-2a_HrUgWZclMpp9KRvEHFFicyOlW2STO4i5myzMxNFhx35Hry1O4YFpfAEn7J13a2QdPZgXV9VgaTRiFc89c_hpXnhTTMe1lsK9t5AEuVeHKb9ptqMcTRdrtLDi_DjrrjBDta6y5Ba24sODWhZt2OfZpoOcV'
    }
  ]
};

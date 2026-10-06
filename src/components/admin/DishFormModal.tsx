import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  Ruler, 
  Sparkles, 
  Layers, 
  Flame, 
  Wine, 
  ShieldAlert, 
  FileCheck, 
  Trash2,
  Check,
  AlertCircle
} from 'lucide-react';
import { Dish, Category } from '../../types/restaurant';
import { ALLERGENS_LIST } from '../../data/initialData';
import { saveDishGlbFile, saveDishPhoto } from '../../services/storage';

interface DishFormModalProps {
  initialDish?: Dish | null;
  currencySymbol: string;
  onSave: (dish: Dish) => void;
  onClose: () => void;
}

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'entradas', label: 'Entradas & Tapas' },
  { id: 'carnes', label: 'Carnes a la Brasa' },
  { id: 'pastas', label: 'Pastas & Arroces' },
  { id: 'principales', label: 'Platos Fuertes' },
  { id: 'postres', label: 'Postres de Autor' },
  { id: 'bebidas', label: 'Bebidas & Coctelería' },
];

// Presets de modelos 3D de alta fidelidad para pruebas inmediatas
const GLB_PRESETS = [
  { name: 'Marquesa de Limón (Modelo 3D Local)', url: './models/marquesa-limon.glb' },
  { name: 'Cúpula / Postre de Hojaldre', url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Cake/glTF-Binary/Cake.glb' },
  { name: 'Hamburguesa Artesanal (Burger)', url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Burger/glTF-Binary/Burger.glb' },
];

export const DishFormModal: React.FC<DishFormModalProps> = ({
  initialDish,
  currencySymbol,
  onSave,
  onClose
}) => {
  const isEditing = Boolean(initialDish);

  const [dishId] = useState<string>(initialDish?.id || `dish-${Date.now()}`);
  const [name, setName] = useState(initialDish?.name || '');
  const [category, setCategory] = useState<Category>(initialDish?.category || 'principales');
  const [price, setPrice] = useState<number>(initialDish?.price || 24.50);
  const [coverImage, setCoverImage] = useState(initialDish?.coverImage || '');
  const [glbModelUrl, setGlbModelUrl] = useState(initialDish?.glbModelUrl || '');
  const [glbStorageKey, setGlbStorageKey] = useState<string | undefined>(initialDish?.glbStorageKey);

  // Dimensions
  const [diameterCm, setDiameterCm] = useState<number>(initialDish?.dimensions.diameterCm || 24);
  const [widthCm, setWidthCm] = useState<number>(initialDish?.dimensions.widthCm || 24);
  const [heightCm, setHeightCm] = useState<number>(initialDish?.dimensions.heightCm || 6);
  const [portionWeightG, setPortionWeightG] = useState<number>(initialDish?.dimensions.portionWeightG || 320);

  // Gourmet details
  const [shortDescription, setShortDescription] = useState(initialDish?.shortDescription || '');
  const [fullDescription, setFullDescription] = useState(initialDish?.fullDescription || '');
  const [keyIngredientsText, setKeyIngredientsText] = useState(
    initialDish?.keyIngredients ? initialDish.keyIngredients.join(', ') : ''
  );
  const [allergens, setAllergens] = useState<string[]>(initialDish?.allergens || []);
  const [sommelierPairing, setSommelierPairing] = useState(initialDish?.sommelierPairing || '');
  const [isAvailable, setIsAvailable] = useState<boolean>(initialDish ? initialDish.isAvailable : true);
  const [featured, setFeatured] = useState<boolean>(initialDish ? Boolean(initialDish.featured) : false);

  const [isUploadingGlb, setIsUploadingGlb] = useState(false);
  const [glbFileName, setGlbFileName] = useState<string | null>(null);

  const glbInputRef = useRef<HTMLInputElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);

  // Handle GLB upload from file (Scaniverse export)
  const handleGlbFileUpload = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.glb')) {
      alert('Por favor selecciona un archivo con extensión .glb');
      return;
    }
    setIsUploadingGlb(true);
    try {
      const { storageKey, url } = await saveDishGlbFile(dishId, file);
      setGlbStorageKey(storageKey);
      setGlbModelUrl(url);
      setGlbFileName(file.name);
    } catch (err) {
      console.error('Error uploading GLB:', err);
      alert('Error al procesar el archivo 3D');
    } finally {
      setIsUploadingGlb(false);
    }
  };

  // Handle Photo upload
  const handlePhotoUpload = async (file: File) => {
    try {
      const { url } = await saveDishPhoto(dishId, file);
      setCoverImage(url);
    } catch (err) {
      console.error('Error saving photo:', err);
      alert('Error al guardar la fotografía');
    }
  };

  const toggleAllergen = (id: string) => {
    setAllergens(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const ingredientsList = keyIngredientsText
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const savedDish: Dish = {
      ...(initialDish || {}),
      id: dishId,
      name,
      category,
      price: Number(price),
      currency: currencySymbol,
      coverImage: coverImage || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      glbModelUrl: glbModelUrl || undefined,
      glbStorageKey: glbStorageKey || undefined,
      dimensions: {
        diameterCm: Number(diameterCm),
        widthCm: widthCm ? Number(widthCm) : undefined,
        heightCm: Number(heightCm),
        portionWeightG: Number(portionWeightG)
      },
      shortDescription,
      fullDescription: fullDescription || shortDescription,
      keyIngredients: ingredientsList,
      allergens,
      sommelierPairing: sommelierPairing || undefined,
      isAvailable,
      featured
    };

    onSave(savedDish);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative z-10 w-full max-w-4xl bg-[#11141c] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        
        {/* Top Bar */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#151824]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <h3 className="font-serif text-lg font-bold text-white">
              {isEditing ? 'Editar Platillo Gourmet' : 'Nuevo Platillo con WebAR 1:1'}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-8">
          
          {/* Section 1: Basic Info */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-wider text-amber-300 font-semibold flex items-center gap-2 pb-2 border-b border-white/5">
              <span>1. Datos Comerciales del Plato</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-1.5">
                  Nombre Comercial del Platillo *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#171b26] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                  placeholder="Ej. Brocheta Shish Kebab a la Leña de Roble"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-1.5">
                  Precio ({currencySymbol}) *
                </label>
                <input
                  type="number"
                  step="0.10"
                  min="0"
                  required
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 bg-[#171b26] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 font-mono"
                  placeholder="24.50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-1.5">
                  Categoría del Menú *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="w-full px-3.5 py-2.5 bg-[#171b26] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.id} className="bg-[#11141c]">
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Toggles */}
              <div className="flex items-center gap-6 pt-3 sm:pt-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAvailable}
                    onChange={(e) => setIsAvailable(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 bg-[#171b26] border-white/20 focus:ring-0"
                  />
                  <span className="text-xs text-gray-200">En carta activa (Disponible)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 bg-[#171b26] border-white/20 focus:ring-0"
                  />
                  <span className="text-xs text-amber-300 font-medium">Destacado del Chef</span>
                </label>
              </div>
            </div>

            {/* Photo Upload or URL */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-1.5">
                Fotografía de Portada del Plato
              </label>
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <input
                  type="url"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 bg-[#171b26] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  placeholder="https://images.unsplash.com/photo-..."
                />

                <span className="text-xs text-gray-500">o bien</span>

                <input
                  ref={imgInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handlePhotoUpload(f);
                  }}
                />

                <button
                  type="button"
                  onClick={() => imgInputRef.current?.click()}
                  className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs text-gray-300 hover:text-white flex items-center gap-2 transition-colors cursor-pointer shrink-0"
                >
                  <Upload className="w-3.5 h-3.5 text-amber-400" />
                  <span>Subir Foto Local</span>
                </button>
              </div>
            </div>

          </div>

          {/* Section 2: Scaniverse 3D Model Upload & Calibration */}
          <div className="p-5 rounded-2xl bg-[#141724] border border-amber-500/25 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/5">
              <h4 className="text-xs uppercase tracking-wider text-amber-300 font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>2. Modelo 3D de Scaniverse & Calibrador de Escala 1:1</span>
              </h4>
              <span className="text-[11px] text-gray-400">
                Exporta en formato <strong className="text-white">.GLB</strong> desde la app Scaniverse
              </span>
            </div>

            {/* Drop Zone for .GLB */}
            <div className="space-y-3">
              <input
                ref={glbInputRef}
                type="file"
                accept=".glb"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleGlbFileUpload(f);
                }}
              />

              <div 
                onClick={() => glbInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const f = e.dataTransfer.files?.[0];
                  if (f) handleGlbFileUpload(f);
                }}
                className={`p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                  glbModelUrl 
                    ? 'border-emerald-500/40 bg-emerald-500/5' 
                    : 'border-white/15 hover:border-amber-400/50 bg-[#171b26]'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 ${
                  glbModelUrl ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                }`}>
                  {glbModelUrl ? <FileCheck className="w-6 h-6" /> : <Upload className="w-6 h-6" />}
                </div>

                <p className="text-xs sm:text-sm font-medium text-white mb-1">
                  {glbFileName ? `Archivo cargado: ${glbFileName}` : glbModelUrl ? 'Modelo 3D activo (.GLB)' : 'Haz clic o arrastra tu archivo .GLB aquí'}
                </p>
                <p className="text-[11px] text-gray-400 max-w-sm">
                  Se almacena en el navegador vía IndexedDB para visualización offline y escala 1:1 inmediata.
                </p>
              </div>

              {/* Model Presets Quick Select */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-[11px] text-gray-400">¿No tienes un .glb a mano? Elige un modelo de prueba:</span>
                {GLB_PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setGlbModelUrl(p.url);
                      setGlbFileName(p.name);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-amber-300 transition-colors cursor-pointer"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Calibrator of Real Physical Dimensions (cm) */}
            <div className="pt-4 border-t border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <Ruler className="w-3.5 h-3.5 text-amber-400" />
                <span>Calibrador de Escala Real 1:1 (Medidas en Centímetros)</span>
              </div>
              <p className="text-[11px] text-gray-400">
                Introduce las medidas exactas del plato físico para que la Realidad Aumentada bloquee la escala a 1:1 en el teléfono del comensal.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1">
                    Diámetro / Largo (cm) *
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    required
                    value={diameterCm}
                    onChange={(e) => setDiameterCm(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-[#0e1017] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                    placeholder="26"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1">
                    Ancho (cm)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    value={widthCm}
                    onChange={(e) => setWidthCm(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-[#0e1017] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                    placeholder="26"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1">
                    Altura (cm) *
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    required
                    value={heightCm}
                    onChange={(e) => setHeightCm(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-[#0e1017] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                    placeholder="6"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1">
                    Peso Porción (g)
                  </label>
                  <input
                    type="number"
                    step="5"
                    min="10"
                    value={portionWeightG}
                    onChange={(e) => setPortionWeightG(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-[#0e1017] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                    placeholder="320"
                  />
                </div>
              </div>
            </div>

            {/* Live Model Preview inside the Form */}
            {glbModelUrl && (
              <div className="pt-4 border-t border-white/5">
                <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-2 block">
                  Previsualizador 3D en Vivo
                </span>
                <div className="h-48 w-full bg-[#0d0f15] border border-white/10 rounded-xl overflow-hidden relative">
                  <model-viewer
                    src={glbModelUrl}
                    alt="Previsualización 3D"
                    camera-controls
                    auto-rotate
                    rotation-per-second="30deg"
                    shadow-intensity="1.5"
                    style={{ width: '100%', height: '100%' }}
                  />
                  <div className="absolute bottom-2 left-2 text-[10px] text-gray-400 bg-black/60 px-2 py-0.5 rounded">
                    Calibrado a Ø {diameterCm} cm
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Section 3: Gourmet Profile */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-wider text-amber-300 font-semibold flex items-center gap-2 pb-2 border-b border-white/5">
              <span>3. Ficha Gourmet Culinaria</span>
            </h4>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-1.5">
                Descripción Corta para la Tarjeta *
              </label>
              <input
                type="text"
                required
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#171b26] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                placeholder="Ej. Corte noble sellado a la brasa viva con mantequilla de trufa negra."
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-1.5">
                Descripción Completa de Técnicas e Ingredientes
              </label>
              <textarea
                rows={3}
                value={fullDescription}
                onChange={(e) => setFullDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#171b26] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 leading-relaxed"
                placeholder="Detalla tiempos de cocción, maduraciones, leña utilizada, origen del producto..."
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-1.5">
                Ingredientes Clave (separados por comas)
              </label>
              <input
                type="text"
                value={keyIngredientsText}
                onChange={(e) => setKeyIngredientsText(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#171b26] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                placeholder="Black Angus 45 días, Carbón de Quebracho, Flor de sal, Romero"
              />
            </div>

            {/* Sommelier Pairing */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-1.5 flex items-center gap-1.5">
                <Wine className="w-3.5 h-3.5 text-purple-400" />
                <span>Maridaje Sugerido por Sumiller</span>
              </label>
              <input
                type="text"
                value={sommelierPairing}
                onChange={(e) => setSommelierPairing(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#171b26] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                placeholder="Ej. Tinto Reserva Ribera del Duero o Cerveza IPA Artesanal con notas cítricas"
              />
            </div>

            {/* Allergens Selector */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-2 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                <span>Selector de Alérgenos</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {ALLERGENS_LIST.map(a => {
                  const isChecked = allergens.includes(a.id);
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => toggleAllergen(a.id)}
                      className={`p-2 rounded-xl text-xs border text-left flex items-center gap-2 transition-all cursor-pointer ${
                        isChecked 
                          ? 'bg-amber-500/20 border-amber-500/50 text-amber-200' 
                          : 'bg-[#171b26] border-white/5 text-gray-400 hover:text-white'
                      }`}
                    >
                      <span className="text-sm">{a.icon}</span>
                      <span className="truncate">{a.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Modal Actions */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 transition-colors cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{isEditing ? 'Guardar Cambios' : 'Publicar Platillo'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

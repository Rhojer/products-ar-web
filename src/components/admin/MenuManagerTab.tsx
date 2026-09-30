import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Sparkles, 
  Ruler, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  Scan,
  AlertCircle
} from 'lucide-react';
import { Dish, Category } from '../../types/restaurant';
import { DishFormModal } from './DishFormModal';

interface MenuManagerTabProps {
  dishes: Dish[];
  currencySymbol: string;
  onAddDish: (dish: Dish) => void;
  onUpdateDish: (dish: Dish) => void;
  onDeleteDish: (dishId: string) => void;
}

export const MenuManagerTab: React.FC<MenuManagerTabProps> = ({
  dishes,
  currencySymbol,
  onAddDish,
  onUpdateDish,
  onDeleteDish
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredDishes = useMemo(() => {
    return dishes.filter(d => {
      if (selectedCategory !== 'all' && d.category !== selectedCategory) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return d.name.toLowerCase().includes(q) || d.shortDescription.toLowerCase().includes(q);
      }
      return true;
    });
  }, [dishes, selectedCategory, search]);

  const handleOpenNew = () => {
    setEditingDish(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (dish: Dish) => {
    setEditingDish(dish);
    setIsModalOpen(true);
  };

  const handleSaveModal = (savedDish: Dish) => {
    if (editingDish) {
      onUpdateDish(savedDish);
    } else {
      onAddDish(savedDish);
    }
    setIsModalOpen(false);
  };

  const toggleAvailability = (dish: Dish) => {
    onUpdateDish({
      ...dish,
      isAvailable: !dish.isAvailable
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top Header & New Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-1">
            Gestor de Platillos & Modelos 3D Scaniverse
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Administra el menú, calibra dimensiones métricas 1:1 y carga los archivos .GLB de tus elaboraciones.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenNew}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Platillo 3D</span>
        </button>
      </div>

      {/* Workflow Reminder Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
            <Scan className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-white">Flujo de Escaneo Rápido con Scaniverse (Gratuito)</h4>
            <p className="text-xs text-gray-400 mt-0.5">
              1. Mide el diámetro del plato con regla (ej. 24 cm) · 2. Escanea 30s con el móvil y exporta a .GLB · 3. Sube el archivo aquí con la medida real.
            </p>
          </div>
        </div>
      </div>

      {/* Toolbar: Search & Category filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#141722] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3.5 py-2 bg-[#141722] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="all">Todas las Categorías ({dishes.length})</option>
            <option value="entradas">Entradas & Tapas</option>
            <option value="carnes">Carnes a la Brasa</option>
            <option value="pastas">Pastas & Arroces</option>
            <option value="principales">Platos Fuertes</option>
            <option value="postres">Postres de Autor</option>
            <option value="bebidas">Bebidas & Coctelería</option>
          </select>

          <span className="text-xs text-gray-400 whitespace-nowrap">
            {filteredDishes.length} platillos
          </span>
        </div>
      </div>

      {/* Dishes List Cards */}
      <div className="space-y-3">
        {filteredDishes.map((dish) => {
          const hasGlb = Boolean(dish.glbModelUrl || dish.glbStorageKey);

          return (
            <div
              key={dish.id}
              className={`p-4 sm:p-5 rounded-2xl bg-[#141722] border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                dish.isAvailable 
                  ? 'border-white/5 hover:border-amber-500/30' 
                  : 'border-white/5 opacity-60 bg-[#0e1017]'
              }`}
            >
              {/* Photo & Basic Details */}
              <div className="flex items-center gap-4 flex-1">
                <img
                  src={dish.coverImage}
                  alt={dish.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-white/10 shrink-0"
                />

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] uppercase tracking-wider text-gray-400">
                      {dish.category}
                    </span>

                    {hasGlb ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-semibold border border-amber-500/30">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>WebAR 1:1</span>
                      </span>
                    ) : (
                      <span className="text-[10px] text-gray-500">Sin .GLB</span>
                    )}

                    {dish.featured && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-500 text-black text-[10px] font-bold">
                        Destacado
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm sm:text-base font-semibold text-white">
                    {dish.name}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="font-semibold text-amber-400 font-serif">
                      {dish.price.toFixed(2)} {currencySymbol}
                    </span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Ruler className="w-3 h-3 text-gray-400" />
                      Ø {dish.dimensions.diameterCm} cm (Alto {dish.dimensions.heightCm} cm) · ~{dish.dimensions.portionWeightG} g
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions & Live Switch */}
              <div className="flex items-center gap-3 w-full md:w-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
                {/* Switch Visibility */}
                <button
                  type="button"
                  onClick={() => toggleAvailability(dish)}
                  title={dish.isAvailable ? "Pausar plato (Agotado hoy)" : "Activar en la carta"}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                    dish.isAvailable
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-300 hover:bg-rose-500/20'
                  }`}
                >
                  {dish.isAvailable ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{dish.isAvailable ? 'En Carta' : 'Agotado'}</span>
                </button>

                {/* Edit Button */}
                <button
                  type="button"
                  onClick={() => handleOpenEdit(dish)}
                  className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Editar</span>
                </button>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`¿Eliminar definitivamente "${dish.name}" del menú?`)) {
                      onDeleteDish(dish.id);
                    }
                  }}
                  className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-300 border border-white/5 hover:border-rose-500/30 transition-colors cursor-pointer"
                  title="Eliminar plato"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}

        {filteredDishes.length === 0 && (
          <div className="text-center py-12 bg-[#141722] border border-white/5 rounded-2xl">
            <AlertCircle className="w-8 h-8 mx-auto text-gray-500 mb-2" />
            <p className="text-sm text-gray-300 font-medium">No hay platos que coincidan con la búsqueda</p>
            <p className="text-xs text-gray-500 mt-1">Crea un nuevo plato o ajusta tus filtros.</p>
          </div>
        )}
      </div>

      {/* Modal for Create / Edit */}
      {isModalOpen && (
        <DishFormModal
          initialDish={editingDish}
          currencySymbol={currencySymbol}
          onSave={handleSaveModal}
          onClose={() => setIsModalOpen(false)}
        />
      )}

    </div>
  );
};

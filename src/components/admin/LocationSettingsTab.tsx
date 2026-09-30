import React, { useState } from 'react';
import { 
  MapPin, 
  Train, 
  Car, 
  Phone, 
  Mail, 
  ExternalLink, 
  Sparkles, 
  Check 
} from 'lucide-react';
import { LocationInfo } from '../../types/restaurant';

interface LocationSettingsTabProps {
  location: LocationInfo;
  onUpdateLocation: (updated: LocationInfo) => void;
}

export const LocationSettingsTab: React.FC<LocationSettingsTabProps> = ({
  location,
  onUpdateLocation
}) => {
  const [formData, setFormData] = useState<LocationInfo>(location);
  const [savedToast, setSavedToast] = useState(false);

  React.useEffect(() => {
    setFormData(location);
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateLocation(formData);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-1">
            Ubicación Física & Google Maps
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Gestiona la dirección física, coordenadas del mapa, accesos de transporte y teléfono de sala.
          </p>
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
        >
          {savedToast ? <Check className="w-4 h-4 text-black" /> : <Sparkles className="w-4 h-4 text-black" />}
          <span>{savedToast ? '¡Ubicación Guardada!' : 'Guardar Ubicación'}</span>
        </button>
      </div>

      {/* Section 1: Postal Address */}
      <div className="bg-[#141722] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-amber-300 pb-3 border-b border-white/5">
          <MapPin className="w-4 h-4" />
          <span>Dirección Postal y Localización</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-2">
              Calle y Número *
            </label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#0e1017] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
              placeholder="Ej. Paseo de la Castellana, 88"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-2">
              Barrio / Distrito / Colonia
            </label>
            <input
              type="text"
              value={formData.neighborhood}
              onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#0e1017] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
              placeholder="Ej. Salamanca - Chamberí"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-2">
              Código Postal
            </label>
            <input
              type="text"
              value={formData.postalCode}
              onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#0e1017] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
              placeholder="Ej. 28046"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-2">
              Ciudad *
            </label>
            <input
              type="text"
              required
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#0e1017] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
              placeholder="Ej. Madrid"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-2">
              País *
            </label>
            <input
              type="text"
              required
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#0e1017] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
              placeholder="Ej. España"
            />
          </div>
        </div>

      </div>

      {/* Section 2: Google Maps links */}
      <div className="bg-[#141722] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-amber-300 pb-3 border-b border-white/5">
          <ExternalLink className="w-4 h-4" />
          <span>Integración con Google Maps</span>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-2">
            Enlace Directo a Google Maps (Para navegación GPS) *
          </label>
          <input
            type="url"
            required
            value={formData.googleMapsUrl}
            onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#0e1017] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
            placeholder="https://maps.google.com/?q=..."
          />
          <span className="text-[11px] text-gray-500 mt-1 block">
            Al pulsar el botón "Cómo Llegar", los clientes abrirán Google Maps en su smartphone.
          </span>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-2">
            URL de Inserción (Iframe Embed) de Google Maps
          </label>
          <input
            type="text"
            value={formData.googleMapsEmbedUrl}
            onChange={(e) => setFormData({ ...formData, googleMapsEmbedUrl: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#0e1017] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
            placeholder="https://www.google.com/maps/embed?pb=..."
          />
          <span className="text-[11px] text-gray-500 mt-1 block">
            Pega el enlace `src` de Google Maps &gt; Compartir &gt; Insertar un mapa.
          </span>
        </div>

      </div>

      {/* Section 3: Transit, Parking & Direct Phone */}
      <div className="bg-[#141722] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-amber-300 pb-3 border-b border-white/5">
          <Train className="w-4 h-4" />
          <span>Accesos Prácticos & Teléfono de Centralita</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-2 flex items-center gap-1.5">
              <Train className="w-3.5 h-3.5 text-amber-400" />
              <span>Metro y Autobús Cercanos</span>
            </label>
            <textarea
              rows={2}
              value={formData.metroBusAccess}
              onChange={(e) => setFormData({ ...formData, metroBusAccess: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#0e1017] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
              placeholder="Ej. Metro Gregorio Marañón (L7, L10). Líneas EMT 14, 27, 45."
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-2 flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-amber-400" />
              <span>Instrucciones de Aparcamiento / Valet</span>
            </label>
            <textarea
              rows={2}
              value={formData.parkingInfo}
              onChange={(e) => setFormData({ ...formData, parkingInfo: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#0e1017] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
              placeholder="Ej. Valet Parking en puerta. Parking concertado en C/ Zurbano 74."
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-2 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Teléfono de Centralita / Salón *</span>
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#0e1017] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
              placeholder="+34 912 345 678"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-2 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>Correo de Atención y Reservas</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#0e1017] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
              placeholder="reservas@aura-gastro.com"
            />
          </div>
        </div>

      </div>

      {/* Floating Save Button */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider shadow-xl shadow-amber-500/10 active:scale-95 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Guardar Cambios de Ubicación</span>
        </button>
      </div>

    </form>
  );
};

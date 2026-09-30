import React, { useRef } from 'react';
import { 
  X, 
  Download, 
  Upload, 
  RotateCcw, 
  Database, 
  AlertTriangle,
  FileCheck
} from 'lucide-react';
import { RestaurantData } from '../../types/restaurant';
import { exportDataBackup } from '../../services/storage';

interface BackupModalProps {
  currentData: RestaurantData;
  onImportData: (data: RestaurantData) => void;
  onResetData: () => void;
  onClose: () => void;
}

export const BackupModal: React.FC<BackupModalProps> = ({
  currentData,
  onImportData,
  onResetData,
  onClose
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    exportDataBackup(currentData);
  };

  const handleImportFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        if (parsed.brand && parsed.dishes && parsed.location) {
          onImportData(parsed);
          alert('¡Copia de seguridad restaurada con éxito!');
          onClose();
        } else {
          alert('El archivo no parece ser un respaldo válido de la plataforma.');
        }
      } catch (err) {
        console.error('Error importing backup:', err);
        alert('Error al leer el archivo JSON.');
      }
    };
    reader.readAsText(file);
  };

  const handleConfirmReset = () => {
    if (confirm('¿Estás seguro de que deseas restablecer todos los datos a la demostración inicial? Los cambios no guardados se perderán.')) {
      onResetData();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      
      <div className="fixed inset-0" onClick={onClose}></div>

      <div className="relative z-10 w-full max-w-md bg-[#131622] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Top */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400">
              <Database className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">
              Copias de Seguridad & Datos
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/5 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options */}
        <div className="space-y-4">
          
          {/* Export */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white">Exportar Respaldo</span>
              <button
                type="button"
                onClick={handleExport}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 text-black text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descargar .JSON</span>
              </button>
            </div>
            <p className="text-xs text-gray-400">
              Guarda en tu ordenador todos los platos, medidas de escala 1:1, precios y configuración de la tienda.
            </p>
          </div>

          {/* Import */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleImportFile(f);
              }}
            />

            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white">Importar Respaldo</span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-amber-400" />
                <span>Cargar .JSON</span>
              </button>
            </div>
            <p className="text-xs text-gray-400">
              Restaura un archivo de configuración generado previamente en otro equipo.
            </p>
          </div>

          {/* Reset */}
          <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-rose-300">Restablecer Menú Demo</span>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restablecer</span>
              </button>
            </div>
            <p className="text-xs text-rose-300/70">
              Vuelve al catálogo gastronómico inicial con los 5 platos gourmet y modelos 3D originales.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

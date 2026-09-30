import React from 'react';
import { Sparkles, Scan, Smartphone, Ruler, CheckCircle2 } from 'lucide-react';

export const ARFeatureShowcase: React.FC = () => {
  return (
    <section id="experiencia-ar" className="py-20 bg-gradient-to-b from-[#0b0c10] via-[#12151e] to-[#0b0c10] border-y border-white/5 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & Steps */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs uppercase tracking-widest font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Tecnología WebAR Sin Aplicaciones</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              Mira exactamente lo que vas a comer antes de pedir
            </h2>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
              Digitalizamos cada elaboración de nuestra cocina utilizando fotogrametría 3D de alta precisión con <strong className="text-white font-medium">Scaniverse</strong>. Gracias a los estándares WebAR nativos, no necesitas descargar ninguna aplicación ni registrarte.
            </p>

            {/* 3 Step Process */}
            <div className="space-y-4 pt-4">
              
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-amber-500/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm shrink-0">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">Explora la carta interactiva</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Toca cualquier plato marcado con la insignia <span className="text-amber-300 font-medium">WebAR 1:1</span> para abrir su visor 360° en alta definición.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-amber-500/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm shrink-0">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">Activa la cámara o escanea el QR</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Desde tu teléfono, pulsa "Ver en tu mesa". Si estás en ordenador o tablet, escanea el código QR que se genera en pantalla.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-amber-500/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm shrink-0">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">El plato aparece en tu mesa a escala 1:1</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Apunta al mantel: la realidad aumentada proyecta el plato con sus centímetros y volumen reales, garantizando cero sorpresas en sala.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Visual Graphic / Demo Mockup */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full max-w-md p-6 bg-gradient-to-b from-[#181c28] to-[#10121a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
              
              {/* Header inside device */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                  <span className="text-xs font-medium text-white">Sensor de Superficie Calibrado</span>
                </div>
                <div className="inline-flex items-center gap-1 text-[11px] text-amber-400 font-semibold">
                  <Ruler className="w-3 h-3" />
                  <span>Escala 1:1 Activa</span>
                </div>
              </div>

              {/* Realistic Food Simulation Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 border border-white/10 group">
                <img 
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80" 
                  alt="Plato en Realidad Aumentada"
                  className="w-full h-full object-cover scale-105"
                />
                
                {/* Simulated AR Target Reticle Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-48 h-48 border-2 border-dashed border-amber-400/80 rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 right-3 p-3 bg-black/75 backdrop-blur-md rounded-xl border border-white/10 text-xs flex items-center justify-between text-white">
                  <span>Distancia a la mesa: 45 cm</span>
                  <span className="text-amber-400 font-semibold">Ø 28 cm Real</span>
                </div>
              </div>

              <div className="space-y-2 text-center">
                <div className="inline-flex items-center gap-2 text-xs text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Fijación métrica antibloqueo (evita redimensionado)</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

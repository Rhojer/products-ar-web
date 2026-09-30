import React, { useEffect, useRef, useState } from 'react';
import '@google/model-viewer';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Maximize2, 
  RotateCw, 
  Smartphone, 
  QrCode, 
  X, 
  Ruler, 
  Sparkles,
  Layers,
  AlertCircle
} from 'lucide-react';
import { PhysicalDimensions } from '../../types/restaurant';

interface ModelViewerARProps {
  glbUrl?: string;
  posterImage?: string;
  dishName: string;
  dimensions: PhysicalDimensions;
  dishId: string;
  className?: string;
  compact?: boolean;
}

export const ModelViewerAR: React.FC<ModelViewerARProps> = ({
  glbUrl,
  posterImage,
  dishName,
  dimensions,
  dishId,
  className = ''
}) => {
  const modelViewerRef = useRef<HTMLElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<boolean>(false);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      const userAgent = (navigator.userAgent || navigator.vendor || '') as string;
      const isMobile = /android|iphone|ipad|ipod/i.test(userAgent);
      setIsMobileDevice(isMobile);
    };
    checkMobile();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setLoadError(false);

    const viewer = modelViewerRef.current;
    if (!viewer) return;

    const handleLoad = () => {
      setIsLoading(false);
      setLoadError(false);
    };

    const handleError = () => {
      setIsLoading(false);
      setLoadError(true);
    };

    viewer.addEventListener('load', handleLoad);
    viewer.addEventListener('error', handleError);

    return () => {
      viewer.removeEventListener('load', handleLoad);
      viewer.removeEventListener('error', handleError);
    };
  }, [glbUrl]);

  const handleLaunchAR = () => {
    const viewer = modelViewerRef.current as (HTMLElement & { activateAR?: () => void }) | null;
    if (viewer && typeof viewer.activateAR === 'function' && isMobileDevice) {
      try {
        viewer.activateAR();
      } catch (e) {
        console.error('AR activation error:', e);
        setShowQrModal(true);
      }
    } else {
      setShowQrModal(true);
    }
  };

  const toggleAutoRotate = () => {
    setIsAutoRotating((prev) => !prev);
  };

  const handleResetCamera = () => {
    const viewer = modelViewerRef.current as (HTMLElement & { resetTurntableRotation?: () => void; cameraOrbit?: string }) | null;
    if (viewer) {
      if (viewer.resetTurntableRotation) viewer.resetTurntableRotation();
      viewer.setAttribute('camera-orbit', '0deg 75deg 105%');
    }
  };

  // Generate target URL for QR code so comensal can open this exact dish on phone
  const qrTargetUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${window.location.pathname}?dish=${encodeURIComponent(dishId)}#ar`
    : '';

  // Escala en metros para el modelo (Scaniverse exporta en escala métrica real)

  if (!glbUrl) {
    return (
      <div className={`relative flex flex-col items-center justify-center bg-gradient-to-b from-[#141721] to-[#0d0f15] border border-white/5 rounded-2xl overflow-hidden p-8 text-center ${className}`}>
        {posterImage && (
          <img 
            src={posterImage} 
            alt={dishName}
            className="absolute inset-0 w-full h-full object-cover opacity-20 filter blur-sm"
          />
        )}
        <div className="relative z-10 max-w-sm">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Layers className="w-7 h-7" />
          </div>
          <h4 className="text-lg font-serif text-white mb-2">Escaneo 3D en Preparación</h4>
          <p className="text-sm text-gray-400 leading-relaxed">
            Este plato está siendo escaneado en cocina con Scaniverse para calibrar su escala 1:1. Pronto podrás proyectarlo en tu mesa.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-xs text-gray-300 border border-white/10">
            <Ruler className="w-3.5 h-3.5 text-amber-400" />
            <span>Medidas reales: Ø {dimensions.diameterCm} cm · {dimensions.portionWeightG} g</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative bg-gradient-to-b from-[#151822] to-[#0c0e14] rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col ${className}`}>
      
      {/* 3D Viewport with model-viewer */}
      <div className="relative w-full flex-1 min-h-[340px] flex items-center justify-center">
        {isLoading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0c0e14]/90 backdrop-blur-sm">
            <div className="w-12 h-12 border-3 border-amber-500/20 border-t-amber-400 rounded-full animate-spin mb-3"></div>
            <p className="text-xs uppercase tracking-wider text-amber-300 font-medium">Cargando Modelo 3D...</p>
            <p className="text-[11px] text-gray-400 mt-1">Calibrando proporciones 1:1</p>
          </div>
        )}

        {loadError && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0c0e14]/95 p-6 text-center">
            <AlertCircle className="w-10 h-10 text-rose-400 mb-2" />
            <p className="text-sm font-medium text-white mb-1">No se pudo cargar el archivo 3D</p>
            <p className="text-xs text-gray-400 max-w-xs mb-4">
              Verifique el formato del archivo .GLB exportado desde Scaniverse.
            </p>
            {posterImage && (
              <img 
                src={posterImage} 
                alt={dishName} 
                className="w-48 h-32 object-cover rounded-xl border border-white/10"
              />
            )}
          </div>
        )}

        <model-viewer
          ref={modelViewerRef}
          src={glbUrl}
          poster={posterImage}
          alt={`Modelo 3D de ${dishName}`}
          ar
          ar-modes="webxr scene-viewer quick-look"
          ar-scale="fixed"
          camera-controls
          auto-rotate={isAutoRotating ? true : undefined}
          rotation-per-second="24deg"
          shadow-intensity="1.6"
          shadow-softness="0.7"
          exposure="1.05"
          touch-action="pan-y"
          style={{ width: '100%', height: '100%', minHeight: '340px' }}
        >
        </model-viewer>

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-amber-500/30 text-amber-300 text-xs font-medium shadow-lg pointer-events-auto">
            <Sparkles className="w-3.5 h-3.5" />
            <span>WebAR 1:1 Escala Real</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-gray-300 text-xs shadow-lg pointer-events-auto">
            <Ruler className="w-3.5 h-3.5 text-amber-400" />
            <span>Ø {dimensions.diameterCm} cm · Alto {dimensions.heightCm} cm</span>
          </div>
        </div>

        {/* Floating Viewport Controls */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10">
          <button
            type="button"
            onClick={toggleAutoRotate}
            title={isAutoRotating ? "Pausar giro automático" : "Giro 360° continuo"}
            className={`p-2.5 rounded-xl border backdrop-blur-md transition-all text-xs flex items-center gap-1.5 ${
              isAutoRotating 
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' 
                : 'bg-black/60 border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            <RotateCw className={`w-4 h-4 ${isAutoRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            <span className="hidden sm:inline text-[11px] font-medium">360°</span>
          </button>

          <button
            type="button"
            onClick={handleResetCamera}
            title="Centrar vista"
            className="p-2.5 rounded-xl bg-black/60 border border-white/10 text-gray-400 hover:text-white backdrop-blur-md transition-all text-xs"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* 360 Drag Hint */}
        <div className="absolute bottom-4 right-4 pointer-events-none z-10 hidden sm:block">
          <span className="text-[11px] text-gray-400 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/5">
            Arrastra para rotar · Pellizca para zoom
          </span>
        </div>
      </div>

      {/* AR Launch Banner */}
      <div className="p-4 bg-gradient-to-r from-[#171b26] via-[#1b202e] to-[#171b26] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-sm font-semibold text-white">Proyectar en tu mesa</h5>
            <p className="text-xs text-gray-400">Verás el plato a tamaño real en tu mantel</p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Main AR Button */}
          <button
            type="button"
            onClick={handleLaunchAR}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isMobileDevice ? 'Abrir Cámara AR 1:1' : 'Ver en AR (Móvil)'}</span>
          </button>

          {!isMobileDevice && (
            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              title="Escanear con teléfono"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all"
            >
              <QrCode className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* QR Code Modal for Desktop users */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-[#151824] border border-white/10 rounded-3xl p-6 shadow-2xl text-center">
            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400">
              <QrCode className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-serif font-medium text-white mb-1">
              Escanea para ver en tu mesa
            </h3>
            <p className="text-xs text-gray-400 mb-6">
              Apunta con la cámara de tu iPhone o Android para proyectar <span className="text-amber-300 font-medium">{dishName}</span> en escala real 1:1.
            </p>

            {/* QR Code Container */}
            <div className="inline-block p-4 bg-white rounded-2xl shadow-xl mx-auto mb-5">
              <QRCodeSVG 
                value={qrTargetUrl || window.location.href}
                size={200}
                level="M"
                includeMargin={false}
              />
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 bg-white/5 py-2 px-3 rounded-xl border border-white/5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Compatible con iOS QuickLook y Android WebXR</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

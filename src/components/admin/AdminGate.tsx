import React, { useState } from 'react';
import { Lock, ArrowLeft, KeyRound, AlertCircle, Sparkles } from 'lucide-react';

interface AdminGateProps {
  correctPin: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const AdminGate: React.FC<AdminGateProps> = ({
  correctPin,
  onSuccess,
  onCancel
}) => {
  const [enteredPin, setEnteredPin] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleDigit = (digit: string) => {
    if (enteredPin.length >= 6) return;
    const newPin = enteredPin + digit;
    setEnteredPin(newPin);
    setErrorMsg(null);

    // Auto submit if length equals pin length
    if (newPin === correctPin) {
      setTimeout(() => onSuccess(), 150);
    } else if (newPin.length === correctPin.length) {
      setErrorMsg('PIN incorrecto. Inténtalo de nuevo.');
      setTimeout(() => setEnteredPin(''), 600);
    }
  };

  const handleDelete = () => {
    setEnteredPin(prev => prev.slice(0, -1));
    setErrorMsg(null);
  };

  const handleClear = () => {
    setEnteredPin('');
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] flex items-center justify-center p-4">
      
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-sm bg-[#131622] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center">
        
        {/* Back link */}
        <button
          type="button"
          onClick={onCancel}
          className="self-start inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a la Web pública</span>
        </button>

        {/* Lock Icon */}
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 shadow-lg shadow-amber-500/5">
          <Lock className="w-7 h-7" />
        </div>

        <h2 className="font-serif text-2xl font-bold text-white mb-1 text-center">
          Panel de Control
        </h2>
        <p className="text-xs text-gray-400 text-center mb-6">
          Introduce tu código PIN maestro para gestionar el restaurante y los modelos 3D.
        </p>

        {/* PIN Indicators Dots */}
        <div className="flex items-center justify-center gap-3 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`w-3.5 h-3.5 rounded-full border transition-all duration-200 ${
                i < enteredPin.length
                  ? 'bg-amber-400 border-amber-400 shadow-[0_0_10px_#fbbf24]'
                  : 'bg-white/5 border-white/20'
              }`}
            ></div>
          ))}
        </div>

        {/* Error notification */}
        {errorMsg && (
          <div className="inline-flex items-center gap-1.5 text-xs text-rose-400 mb-4 animate-in fade-in">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Numeric Keypad Grid */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-[260px] mb-6">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => handleDigit(digit)}
              className="h-14 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-amber-500/20 active:border-amber-500/40 border border-white/5 text-lg font-semibold text-white transition-all flex items-center justify-center cursor-pointer select-none"
            >
              {digit}
            </button>
          ))}
          <button
            type="button"
            onClick={handleClear}
            className="h-14 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-medium text-gray-400 hover:text-white transition-all flex items-center justify-center cursor-pointer select-none"
          >
            Borrar
          </button>
          <button
            type="button"
            onClick={() => handleDigit('0')}
            className="h-14 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-amber-500/20 border border-white/5 text-lg font-semibold text-white transition-all flex items-center justify-center cursor-pointer select-none"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="h-14 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-medium text-gray-400 hover:text-white transition-all flex items-center justify-center cursor-pointer select-none"
          >
            ⌫
          </button>
        </div>

        {/* Default PIN Hint */}
        <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl text-center w-full">
          <p className="text-[11px] text-amber-300 font-medium">
            PIN inicial de demostración: <strong className="text-white font-mono text-xs">1234</strong>
          </p>
          <p className="text-[10px] text-gray-500 mt-0.5">
            Puedes cambiar este PIN en la Pestaña 1 de Configuración.
          </p>
        </div>

      </div>
    </div>
  );
};

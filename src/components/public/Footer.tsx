import React from 'react';
import { 
  MessageCircle, 
  Globe, 
  Settings, 
  UtensilsCrossed,
  Sparkles
} from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '../common/SocialIcons';
import { BrandSettings, SocialLinks, LocationInfo } from '../../types/restaurant';

interface FooterProps {
  brand: BrandSettings;
  socials: SocialLinks;
  location: LocationInfo;
  onNavigateAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  brand,
  socials,
  location,
  onNavigateAdmin
}) => {
  return (
    <footer className="bg-[#08090d] border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/30 border border-amber-500/40 flex items-center justify-center text-amber-300">
                <UtensilsCrossed className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-white block">
                  {brand.name}
                </span>
                <span className="text-[11px] uppercase tracking-widest text-amber-400 font-medium">
                  WebAR 1:1 Scaniverse
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 max-w-sm leading-relaxed">
              {brand.culinaryTagline}. Una propuesta gastronómica de vanguardia con trazabilidad, producto noble y visualización inmersiva en mesa.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {socials.instagram && (
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-amber-500/20 hover:text-amber-300 border border-white/5 flex items-center justify-center text-gray-400 transition-colors"
                  title="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              )}

              {socials.tiktok && (
                <a
                  href={socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-amber-500/20 hover:text-amber-300 border border-white/5 flex items-center justify-center text-gray-400 transition-colors font-bold text-xs"
                  title="TikTok"
                >
                  TT
                </a>
              )}

              {socials.whatsapp && (
                <a
                  href={`https://wa.me/${socials.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-300 border border-white/5 flex items-center justify-center text-gray-400 transition-colors"
                  title="WhatsApp Reservas"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              )}

              {socials.facebook && (
                <a
                  href={socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-blue-500/20 hover:text-blue-300 border border-white/5 flex items-center justify-center text-gray-400 transition-colors"
                  title="Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
              )}

              {socials.website && (
                <a
                  href={socials.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-amber-500/20 hover:text-amber-300 border border-white/5 flex items-center justify-center text-gray-400 transition-colors"
                  title="Página Web"
                >
                  <Globe className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-white font-semibold">
              Exploración
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <a href="#carta" className="hover:text-amber-300 transition-colors">Carta Digital de Platos</a>
              </li>
              <li>
                <a href="#experiencia-ar" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Realidad Aumentada 1:1</span>
                </a>
              </li>
              <li>
                <a href="#resenas" className="hover:text-amber-300 transition-colors">Opiniones & Valoraciones</a>
              </li>
              <li>
                <a href="#ubicacion" className="hover:text-amber-300 transition-colors">Ubicación & Google Maps</a>
              </li>
            </ul>
          </div>

          {/* Contact and Admin Portal Link (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-white font-semibold">
              Atención & Reservas
            </h4>
            <p className="text-xs text-gray-400">
              Teléfono: <span className="text-white">{location.phone}</span>
            </p>
            <p className="text-xs text-gray-400">
              Email: <span className="text-white">{location.email}</span>
            </p>
            <p className="text-xs text-gray-400">
              {location.address}, {location.city}
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={onNavigateAdmin}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 text-xs text-amber-300 transition-all cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Panel de Administración (/admin)</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <p>© {new Date().getFullYear()} {brand.name}. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span>Flujo 3D: Scaniverse Photogrammetry</span>
            <span>·</span>
            <span>WebAR 1:1 Metric Calibration</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

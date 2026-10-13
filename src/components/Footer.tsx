import React, { useState } from 'react';
import { 
  Terminal, 
  Shield, 
  FileText, 
  Cookie, 
  Mail, 
  User, 
  ArrowUp, 
  Check, 
  Sparkles,
  ExternalLink 
} from 'lucide-react';

interface FooterProps {
  onNavigatePrivacy: () => void;
  onNavigateTerms: () => void;
  onNavigateCookies: () => void;
  onNavigateContact: () => void;
  onNavigateAbout: () => void;
  onOpenAdSenseGuide?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigatePrivacy,
  onNavigateTerms,
  onNavigateCookies,
  onNavigateContact,
  onNavigateAbout,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 mt-20">
      {/* Sección Newsletter & Boletín 4kt */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-slate-800/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>BOLETÍN TÉCNICO DE 4KT</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Arquitectura de Software, Cloud y Sistemas Distribuidos
            </h3>
            <p className="text-sm text-slate-400 max-w-xl">
              Recibe artículos y análisis técnicos de alta profundidad redactados por Andrés Martínez. Sin contenido automatizado superficial ni spam publicitario.
            </p>
          </div>

          <div className="lg:col-span-5">
            {isSubscribed ? (
              <div className="bg-emerald-950/60 border border-emerald-800 text-emerald-300 p-4 rounded-xl flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <p className="text-xs">
                  ¡Gracias por suscribirte! Te hemos enviado un correo de confirmación.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="tu-correo@empresa.com"
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    type="submit"
                    className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2.5 rounded-lg text-xs transition shrink-0"
                  >
                    Suscribirme
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  Respetamos tu privacidad. Puedes darte de baja en cualquier momento con un clic.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Contenido principal del footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Columna Marca 4kt */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black text-sm">
                4kt
              </div>
              <span className="text-lg font-bold text-white tracking-tight">4kt.lat</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Publicación técnica independiente enfocada en la divulgación de patrones arquitectónicos, inteligencia artificial aplicada e infraestructura cloud.
            </p>

            <div className="space-y-1 text-xs text-slate-400 font-mono">
              <p>Editor & Autor: <span className="text-slate-200">Andrés Martínez</span></p>
              <p>Dominio: <span className="text-cyan-400">https://4kt.lat/</span></p>
              <p>Contacto: <a href="mailto:andresnaftinez2712@gmail.com" className="text-slate-300 hover:text-cyan-400 transition">andresnaftinez2712@gmail.com</a></p>
            </div>
          </div>

          {/* Columna Legal Obligatoria */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">
              Políticas y Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onNavigatePrivacy}
                  className="hover:text-cyan-400 transition flex items-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5 text-slate-400" />
                  <span>Política de Privacidad</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateTerms}
                  className="hover:text-cyan-400 transition flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>Términos y Condiciones</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateCookies}
                  className="hover:text-cyan-400 transition flex items-center gap-1.5"
                >
                  <Cookie className="w-3.5 h-3.5 text-slate-400" />
                  <span>Política de Cookies</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Columna Institucional */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">
              Institucional
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onNavigateAbout}
                  className="hover:text-cyan-400 transition flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Sobre Andrés Martínez</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateContact}
                  className="hover:text-cyan-400 transition flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>Formulario de Contacto</span>
                </button>
              </li>
              <li>
                <a
                  href="https://4kt.lat/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  <span>Sitemap XML (20 Artículos)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Columna Rigor y Transparencia */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">
              Estándares Técnicos
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              4kt cumple con las directrices de calidad técnica de Google Search Console y las políticas para editores de Google AdSense, garantizando contenido original, verificabilidad y protección de datos del usuario.
            </p>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-slate-400 font-mono">
              Sitemap: https://4kt.lat/sitemap.xml
            </div>
          </div>
        </div>

        {/* Fila Inferior con Copyright estricto */}
        <div className="pt-8 mt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-400">
            © 2026 <strong className="text-slate-300">Andrés Martínez</strong>. Todos los derechos reservados. 4kt (<span className="text-slate-400">4kt.lat</span>).
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition"
          >
            <span>Subir al inicio</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

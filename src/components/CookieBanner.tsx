import React, { useState, useEffect } from 'react';
import { Cookie, Shield, Check, X, Settings, ExternalLink } from 'lucide-react';

interface CookieBannerProps {
  onOpenPrivacy: () => void;
  onOpenCookiePolicy: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({
  onOpenPrivacy,
  onOpenCookiePolicy,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: true,
    advertising: true,
  });

  useEffect(() => {
    const consent = localStorage.getItem('4kt_cookie_consent');
    if (!consent) {
      // Delay slightly for smooth page entry
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const userConsent = { essential: true, analytics: true, advertising: true, date: new Date().toISOString() };
    localStorage.setItem('4kt_cookie_consent', JSON.stringify(userConsent));
    setIsOpen(false);
    setShowConfigModal(false);
  };

  const handleAcceptEssentialOnly = () => {
    const userConsent = { essential: true, analytics: false, advertising: false, date: new Date().toISOString() };
    localStorage.setItem('4kt_cookie_consent', JSON.stringify(userConsent));
    setIsOpen(false);
    setShowConfigModal(false);
  };

  const handleSavePreferences = () => {
    const userConsent = { ...preferences, essential: true, date: new Date().toISOString() };
    localStorage.setItem('4kt_cookie_consent', JSON.stringify(userConsent));
    setIsOpen(false);
    setShowConfigModal(false);
  };

  if (!isOpen && !showConfigModal) return null;

  return (
    <>
      {/* Banner flotante inferior */}
      {isOpen && (
        <div
          role="region"
          aria-label="Consentimiento de cookies"
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-xl z-50 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl p-5 shadow-2xl text-slate-200"
        >
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-cyan-950/80 border border-cyan-800/50 rounded-xl text-cyan-400 shrink-0">
              <Cookie className="w-6 h-6" />
            </div>

            <div className="flex-1">
              <h3 className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
                Aviso de Cookies y Privacidad en 4kt
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                Utilizamos cookies técnicas y de rendimiento para analizar el tráfico del sitio, recordar tus preferencias de lectura y garantizar la estabilidad de la plataforma según nuestras{' '}
                <button
                  onClick={onOpenPrivacy}
                  className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
                >
                  Política de Privacidad
                </button>{' '}
                y{' '}
                <button
                  onClick={onOpenCookiePolicy}
                  className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
                >
                  Política de Cookies
                </button>.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  onClick={handleAcceptAll}
                  className="px-3.5 py-2 text-xs font-medium bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg transition-colors font-medium shadow-sm"
                >
                  Aceptar Todas
                </button>
                <button
                  onClick={handleAcceptEssentialOnly}
                  className="px-3 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors"
                >
                  Solo Esenciales
                </button>
                <button
                  onClick={() => setShowConfigModal(true)}
                  className="px-3 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors inline-flex items-center gap-1.5"
                >
                  <Settings className="w-3.5 h-3.5" />
                  Configurar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Configuración Detallada de Cookies */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl text-slate-100 relative">
            <button
              onClick={() => setShowConfigModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 p-1"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <Shield className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold">Centro de Preferencias de Privacidad</h2>
            </div>

            <p className="text-xs text-slate-300 mb-5 leading-relaxed">
              En 4kt (https://4kt.lat/) respetamos tu derecho a la privacidad. Puedes elegir qué categorías de cookies permites que activemos durante tu navegación.
            </p>

            <div className="space-y-4 mb-6">
              {/* Esenciales */}
              <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-100">Cookies Técnicas Esenciales</span>
                    <span className="text-[10px] uppercase font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
                      Obligatorias
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Necesarias para la navegación básica, seguridad del sitio, prevención de ataques CSRF y almacenamiento de tus preferencias de consentimiento.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="mt-1 w-4 h-4 text-cyan-500 rounded bg-slate-900 border-slate-700 cursor-not-allowed"
                />
              </div>

              {/* Analíticas */}
              <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-start justify-between gap-3">
                <div>
                  <span className="text-sm font-semibold text-slate-100">Cookies de Medición y Analítica</span>
                  <p className="text-xs text-slate-400 mt-1">
                    Nos permiten cuantificar las visitas a los artículos de Andrés Martínez para entender qué guías técnicas resultan más útiles y optimizar los tiempos de carga.
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="cookie-analytics"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="mt-1 w-4 h-4 accent-cyan-500 rounded bg-slate-900 border-slate-700 cursor-pointer"
                />
              </div>

              {/* Publicidad Google AdSense */}
              <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-start justify-between gap-3">
                <div>
                  <span className="text-sm font-semibold text-slate-100">Cookies de Publicidad y AdSense</span>
                  <p className="text-xs text-slate-400 mt-1">
                    Utilizadas por Google y sus socios publicitarios para limitar la frecuencia con que ves un anuncio, medir la efectividad de las campañas y mostrar anuncios relevantes.
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="cookie-advertising"
                  checked={preferences.advertising}
                  onChange={(e) => setPreferences({ ...preferences, advertising: e.target.checked })}
                  className="mt-1 w-4 h-4 accent-cyan-500 rounded bg-slate-900 border-slate-700 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={handleAcceptEssentialOnly}
                className="px-3.5 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700"
              >
                Rechazar Opcionales
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-4 py-2 text-xs font-medium bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg"
              >
                Guardar Preferencias
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

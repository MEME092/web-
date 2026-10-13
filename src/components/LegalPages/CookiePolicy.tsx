import React from 'react';
import { Cookie, Settings, ExternalLink, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface CookiePolicyProps {
  onBack: () => void;
  onOpenPreferences: () => void;
}

export const CookiePolicy: React.FC<CookiePolicyProps> = ({ onBack, onOpenPreferences }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-slate-300">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver a 4kt</span>
      </button>

      <div className="border-b border-slate-800 pb-6 mb-8">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2">
          <Cookie className="w-4 h-4" />
          <span>Transparencia y Gestión del Almacenamiento Local</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Política de Cookies
        </h1>
        <p className="text-xs text-slate-400 mt-2 font-mono">
          Actualizada para 2026 | Responsable: Andrés Martínez | https://4kt.lat/
        </p>
      </div>

      <div className="space-y-8 text-sm leading-relaxed">
        {/* Introducción */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">1. ¿Qué son las Cookies?</h2>
          <p>
            Una cookie es un pequeño archivo de texto que un sitio web descarga en tu dispositivo (ordenador, smartphone o tablet) cuando accedes a sus páginas. Las cookies permiten almacenar y recuperar información sobre tus hábitos de navegación o tu equipo y, dependiendo de la información que contengan y de la forma en que utilices tu equipo, pueden emplearse para reconocer al usuario.
          </p>
        </section>

        {/* Botón de configuración */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-white mb-0.5">Control de Preferencias de Cookies</h3>
            <p className="text-xs text-slate-400">
              Puedes modificar o retirar tu consentimiento para las cookies no esenciales en cualquier momento.
            </p>
          </div>
          <button
            onClick={onOpenPreferences}
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg text-xs transition shrink-0"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Configurar Preferencias</span>
          </button>
        </div>

        {/* Tipos de cookies */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">2. Categorías de Cookies Utilizadas</h2>
          
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-base font-semibold text-white mb-1">A. Cookies Técnicas y Estrictamente Necesarias</h3>
              <p className="text-xs text-slate-300 mb-2">
                Son aquellas imprescindibles para la navegación y el funcionamiento de la plataforma, como mantener tu sesión, recordar tus opciones de privacidad y garantizar la estabilidad del servidor.
              </p>
              <div className="text-[11px] font-mono text-cyan-400 bg-slate-950 p-2 rounded border border-slate-800">
                Ejemplos: 4kt_cookie_consent, cf_clearance, csrf_token.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-base font-semibold text-white mb-1">B. Cookies Publicitarias de Google AdSense</h3>
              <p className="text-xs text-slate-300 mb-2">
                Utilizadas por Google LLC y sus socios para mostrar anuncios contextuales y personalizados según tu historial de navegación, limitar la frecuencia con que ves un mismo anuncio y evaluar la efectividad de las campañas.
              </p>
              <div className="text-[11px] font-mono text-cyan-400 bg-slate-950 p-2 rounded border border-slate-800">
                Ejemplos: __gads, __gpi, IDE (DoubleClick), DSID, test_cookie.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-base font-semibold text-white mb-1">C. Cookies de Análisis de Rendimiento</h3>
              <p className="text-xs text-slate-300 mb-2">
                Nos permiten medir métricas de Core Web Vitals (INP, LCP, CLS), tiempos de respuesta y páginas técnicas más leídas por nuestra audiencia, sin identificar directamente al usuario.
              </p>
              <div className="text-[11px] font-mono text-cyan-400 bg-slate-950 p-2 rounded border border-slate-800">
                Ejemplos: _ga, _gid, _gat_gtag.
              </div>
            </div>
          </div>
        </section>

        {/* Tabla resumen de cookies */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">3. Tabla Detallada de Cookies</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="bg-slate-900 text-slate-200 font-mono text-[11px] uppercase">
                <tr>
                  <th className="py-2.5 px-3">Cookie</th>
                  <th className="py-2.5 px-3">Proveedor</th>
                  <th className="py-2.5 px-3">Propósito</th>
                  <th className="py-2.5 px-3">Duración</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono text-[11px]">
                <tr className="bg-slate-950/40">
                  <td className="py-2 px-3 text-cyan-400">4kt_cookie_consent</td>
                  <td className="py-2 px-3">4kt.lat (Propia)</td>
                  <td className="py-2 px-3">Guarda la preferencia del banner de privacidad</td>
                  <td className="py-2 px-3">12 meses</td>
                </tr>
                <tr className="bg-slate-950/60">
                  <td className="py-2 px-3 text-cyan-400">__gads</td>
                  <td className="py-2 px-3">Google AdSense</td>
                  <td className="py-2 px-3">Medición de anuncios y prevención de fraude</td>
                  <td className="py-2 px-3">13 meses</td>
                </tr>
                <tr className="bg-slate-950/40">
                  <td className="py-2 px-3 text-cyan-400">__gpi</td>
                  <td className="py-2 px-3">Google AdSense</td>
                  <td className="py-2 px-3">Recopilación de eventos publicitarios para editores</td>
                  <td className="py-2 px-3">13 meses</td>
                </tr>
                <tr className="bg-slate-950/60">
                  <td className="py-2 px-3 text-cyan-400">IDE</td>
                  <td className="py-2 px-3">doubleclick.net</td>
                  <td className="py-2 px-3">Publicidad segmentada de Google en la web</td>
                  <td className="py-2 px-3">1 año</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Cómo deshabilitar en el navegador */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">4. ¿Cómo desactivar las Cookies en tu Navegador?</h2>
          <p>
            Puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo mediante la configuración de las opciones de tu navegador web:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-300 text-xs">
            <li><strong className="text-white">Google Chrome:</strong> Configuración &gt; Privacidad y seguridad &gt; Cookies y otros datos de sitios.</li>
            <li><strong className="text-white">Mozilla Firefox:</strong> Ajustes &gt; Privacidad &amp; Seguridad &gt; Cookies y datos del sitio.</li>
            <li><strong className="text-white">Apple Safari:</strong> Preferencias &gt; Privacidad &gt; Bloquear todas las cookies.</li>
            <li><strong className="text-white">Microsoft Edge:</strong> Configuración &gt; Permisos de sitios &gt; Cookies y datos del sitio.</li>
          </ul>
        </section>

        <section className="space-y-3 pt-4 border-t border-slate-800">
          <p className="text-xs text-slate-400 font-mono">
            Contacto sobre cookies y gestión de datos: Andrés Martínez · andresnaftinez2712@gmail.com · 4kt
          </p>
        </section>
      </div>
    </div>
  );
};

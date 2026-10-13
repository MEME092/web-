import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Copy, 
  Check, 
  Sparkles, 
  ExternalLink,
  Code2,
  FileCode2,
  AlertTriangle
} from 'lucide-react';

interface AdSenseGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdSenseGuideModal: React.FC<AdSenseGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedAdsTxt, setCopiedAdsTxt] = useState(false);

  if (!isOpen) return null;

  const adsenseHeadScript = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>`;

  const adsTxtContent = `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`;

  const copyToClipboard = (text: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const checklistItems = [
    { title: 'Autor y Propietario Definido', desc: 'Atribución clara y unificada a Andrés Martínez en todos los artículos y pie de página.', ok: true },
    { title: 'Contenido 100% Original de Alto Valor', desc: 'Guías de arquitectura, IA, ciberseguridad y rendimiento sin texto "Lorem Ipsum" ni plagio.', ok: true },
    { title: 'Páginas Legales Obligatorias', desc: 'Política de Privacidad (con cláusula AdSense/DART), Términos, Política de Cookies, Sobre el Autor y Contacto.', ok: true },
    { title: 'Espacios y Contenedores AdSense Preparados', desc: 'Top Banner (728x90), In-Article Ad y Sidebar Ad con etiquetas de "PUBLICIDAD" y sin saltos CLS.', ok: true },
    { title: 'Arquitectura de Navegación Clara', desc: 'Categorías temáticas accesibles, buscador en vivo, migas de pan y enlaces institucionales.', ok: true },
    { title: 'Imágenes Reales y Etiquetas ALT', desc: 'Fotografía técnica de alta definición vía Unsplash con textos descriptivos para accesibilidad y SEO.', ok: true },
    { title: 'E-E-A-T (Experiencia y Autoridad)', desc: 'Biografía técnica, principios editoriales y datos de contacto de Andrés Martínez para evaluación humana.', ok: true },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full p-6 shadow-2xl text-slate-100 my-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 p-1 rounded-lg"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-2">
          <div className="p-2 bg-cyan-950 border border-cyan-800 text-cyan-400 rounded-lg">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Guía de Aprobación & Integración de Google AdSense</h2>
            <span className="text-xs text-slate-400 font-mono">Dominio: https://4kt.lat/ | Autor: Andrés Martínez (andresnaftinez2712@gmail.com)</span>
          </div>
        </div>

        <p className="text-xs text-slate-300 my-4 leading-relaxed">
          Este sitio web fue diseñado siguiendo estrictamente las Políticas del Programa de Google AdSense y las directrices para evaluadores de calidad de búsqueda (Search Quality Rater Guidelines).
        </p>

        {/* Checklist */}
        <div className="space-y-2 mb-6">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
            Estado de Cumplimiento Técnico y Editorial:
          </h3>
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {checklistItems.map((item, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="text-xs font-bold text-white block">{item.title}</span>
                  <span className="text-[11px] text-slate-400">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pasos de activación de AdSense */}
        <div className="space-y-4 mb-6">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
            Pasos para Conectar tu Cuenta Oficial:
          </h3>

          {/* Paso 1 */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-cyan-400 font-mono">
                Paso 1: Script Principal en &lt;head&gt; de index.html
              </span>
              <button
                onClick={() => copyToClipboard(adsenseHeadScript, setCopiedScript)}
                className="text-[11px] text-slate-300 hover:text-white inline-flex items-center gap-1 font-mono bg-slate-800 px-2 py-0.5 rounded"
              >
                {copiedScript ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedScript ? 'Copiado' : 'Copiar Tag'}</span>
              </button>
            </div>
            <pre className="text-[11px] font-mono text-slate-300 bg-slate-900 p-2 rounded overflow-x-auto whitespace-pre-wrap">
              {adsenseHeadScript}
            </pre>
            <p className="text-[11px] text-slate-400">
              * El archivo <code className="text-cyan-400 font-mono">index.html</code> ya incluye el comentario con este script preparado para insertar tu ID de editor <code className="text-slate-200">ca-pub-XXXXXXXXXXXX</code>.
            </p>
          </div>

          {/* Paso 2 */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-cyan-400 font-mono">
                Paso 2: Archivo ads.txt para 4kt.lat
              </span>
              <button
                onClick={() => copyToClipboard(adsTxtContent, setCopiedAdsTxt)}
                className="text-[11px] text-slate-300 hover:text-white inline-flex items-center gap-1 font-mono bg-slate-800 px-2 py-0.5 rounded"
              >
                {copiedAdsTxt ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedAdsTxt ? 'Copiado' : 'Copiar ads.txt'}</span>
              </button>
            </div>
            <pre className="text-[11px] font-mono text-slate-300 bg-slate-900 p-2 rounded overflow-x-auto">
              {adsTxtContent}
            </pre>
            <p className="text-[11px] text-slate-400">
              * Coloca este archivo en la raíz de tu servidor: <code className="text-cyan-400 font-mono">https://4kt.lat/ads.txt</code> para evitar advertencias de ingresos.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg transition"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

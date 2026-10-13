import React from 'react';
import { 
  User, 
  Terminal, 
  Award, 
  BookOpen, 
  CheckCircle, 
  Mail, 
  ExternalLink, 
  ArrowLeft,
  ShieldCheck,
  Code2,
  Cpu,
  Globe
} from 'lucide-react';
import { ANDRES_MARTINEZ } from '../../data/articles';
import { AuthorAvatar } from '../AuthorAvatar';

interface AboutAuthorProps {
  onBack: () => void;
  onNavigateContact: () => void;
}

export const AboutAuthor: React.FC<AboutAuthorProps> = ({ onBack, onNavigateContact }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-slate-300">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver a 4kt</span>
      </button>

      {/* Cabecera del Autor */}
      <div className="border-b border-slate-800 pb-8 mb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <AuthorAvatar size="xl" showBadge={true} />

          <div className="flex-1">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-1">
              <span>Fundador & Editor en Jefe</span>
              <span>·</span>
              <span>4kt.lat</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
              Andrés Martínez
            </h1>
            <p className="text-base text-slate-300 font-medium mb-3">
              {ANDRES_MARTINEZ.role}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                https://4kt.lat/
              </span>
              <a href="mailto:andresnaftinez2712@gmail.com" className="flex items-center gap-1.5 hover:text-cyan-400 transition">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                andresnaftinez2712@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-10 text-sm leading-relaxed">
        {/* Trayectoria */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <User className="w-5 h-5 text-cyan-400" />
            <span>Perfil Profesional y Trayectoria</span>
          </h2>
          <p>
            ¡Hola! Soy <strong className="text-white">Andrés Martínez</strong>. Cuento con más de una década de experiencia diseñando y desplegando arquitecturas de software de alta concurrencia, sistemas de inteligencia artificial aplicados al sector productivo y topologías de infraestructura en la nube bajo estándares de ciberseguridad estrictos.
          </p>
          <p>
            A lo largo de mi carrera técnica he liderado procesos de migración desde monolitos masivos hacia arquitecturas orientadas a eventos (Kafka/RabbitMQ), optimización de bases de datos distribuidas y parametrización de pipelines de inferencia para modelos de lenguaje a gran escala (LLMs) tanto en entornos cloud (GCP, AWS) como en centros de datos locales (on-premise).
          </p>
        </section>

        {/* Sobre 4kt */}
        <section className="space-y-4 p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <span>La Misión de 4kt (https://4kt.lat/)</span>
          </h2>
          <p className="text-slate-300">
            Fundé <strong className="text-white">4kt</strong> en respuesta a la proliferación de contenido superficial generado automáticamente sin verificación práctica. La filosofía de esta plataforma es simple: <strong className="text-slate-100">rigor técnico, reproducibilidad de código y lecciones reales aprendidas en producción</strong>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <Code2 className="w-5 h-5 text-cyan-400 mb-2" />
              <h3 className="font-bold text-white text-xs mb-1">Código Probado</h3>
              <p className="text-[11px] text-slate-400">
                Cada fragmento de código y configuración es probado exhaustivamente antes de su publicación.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <Cpu className="w-5 h-5 text-cyan-400 mb-2" />
              <h3 className="font-bold text-white text-xs mb-1">Métricas Reales</h3>
              <p className="text-[11px] text-slate-400">
                Compartimos benchmarks, latencias y consumo de memoria contrastados empíricamente.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <ShieldCheck className="w-5 h-5 text-cyan-400 mb-2" />
              <h3 className="font-bold text-white text-xs mb-1">Cero Humo</h3>
              <p className="text-[11px] text-slate-400">
                Sin artículos clickbait ni texto de relleno: explicaciones directas para ingenieros.
              </p>
            </div>
          </div>
        </section>

        {/* Políticas Editoriales y E-E-A-T */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-400" />
            <span>Criterios Editoriales y Calidad (E-E-A-T)</span>
          </h2>
          <p>
            En cumplimiento de las directrices de calidad para evaluadores de Google y las políticas para editores, 4kt aplica un riguroso protocolo editorial:
          </p>
          <ul className="space-y-3 pl-2">
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Experiencia de Primera Mano (Experience):</strong> Los análisis parten de proyectos reales, implementaciones en clientes corporativos y laboratorios técnicos propios.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Especialización y Profundidad (Expertise):</strong> Cubrimos temas complejos con su contexto matemático, arquitectónico y operativo completo.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Autoridad e Integridad (Authoritativeness):</strong> Citamos fuentes oficiales (IETF, NIST, documentación de proveedores de nube) y publicamos correcciones transparentes.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Transparencia y Confianza (Trustworthiness):</strong> La monetización con Google AdSense nunca condiciona las conclusiones de nuestros análisis ni compromete la objetividad editorial.
              </div>
            </li>
          </ul>
        </section>

        {/* Canales de Contacto */}
        <section className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white mb-1">¿Tienes preguntas o deseas debatir un tema técnico?</h3>
            <p className="text-xs text-slate-400">
              Respondo personalmente las consultas de lectores y profesionales de la industria.
            </p>
          </div>
          <button
            onClick={onNavigateContact}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg text-xs transition shrink-0"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contactar a Andrés Martínez</span>
          </button>
        </section>
      </div>
    </div>
  );
};

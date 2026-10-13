import React from 'react';
import { FileText, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';

interface TermsAndConditionsProps {
  onBack: () => void;
}

export const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onBack }) => {
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
          <FileText className="w-4 h-4" />
          <span>Marco Legal y Condiciones de Uso</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Términos y Condiciones de Uso
        </h1>
        <p className="text-xs text-slate-400 mt-2 font-mono">
          Vigente desde: 2026 | Titular: Andrés Martínez | Dominio: https://4kt.lat/
        </p>
      </div>

      <div className="space-y-8 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">1. Objeto y Ámbito de Aplicación</h2>
          <p>
            Los presentes Términos y Condiciones regulan el acceso, navegación y uso del portal web <strong className="text-white">4kt</strong>, disponible en el dominio <strong className="text-cyan-400">https://4kt.lat/</strong>, propiedad y bajo la dirección editorial de <strong className="text-white">Andrés Martínez</strong>.
          </p>
          <p>
            El acceso al sitio atribuye la condición de Usuario y expresa la adhesión plena y sin reservas a todos los términos aquí estipulados. Si no estás de acuerdo con alguna disposición, te recomendamos abstenerte de utilizar la plataforma.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">2. Propiedad Intelectual e Industrial</h2>
          <p>
            Todos los contenidos publicados en 4kt —incluyendo sin limitación artículos técnicos, diagramas de arquitectura, fragmentos de código originales, logotipos, marcas, diseño visual e infografías— son propiedad intelectual exclusiva de <strong className="text-white">Andrés Martínez</strong> o se publican bajo licencias de atribución correspondientes (como recursos de Unsplash debidamente acreditados).
          </p>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider font-mono">
              Condiciones de Reproducción:
            </h4>
            <p className="text-xs text-slate-300">
              Se permite la cita o referencia de fragmentos breves de nuestros artículos siempre y cuando se incluya enlace directo ('dofollow') y atribución expresa al autor (<strong className="text-white">Andrés Martínez</strong>) y al artículo original en <strong className="text-cyan-400">https://4kt.lat/</strong>. Queda prohibida la reproducción masiva, extracción automatizada (scraping) o republishing integral sin autorización escrita previa.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">3. Exención de Responsabilidad Técnica</h2>
          <p>
            Los tutoriales, scripts, configuraciones de infraestructura cloud y análisis de software expuestos en 4kt se proporcionan con propósitos formativos, divulgativos y de orientación general.
          </p>
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-amber-200 text-xs flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-400" />
            <div>
              <strong className="block font-bold mb-1">Aviso de Arquitectura en Producción:</strong>
              Andrés Martínez no se hace responsable por interrupciones de servicio, pérdidas de datos o vulnerabilidades derivadas de la ejecución de comandos o configuraciones sin la debida auditoría y adaptación a los requisitos concretos de tu propia infraestructura.
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">4. Uso Permitido y Normas de Conducta</h2>
          <p>El Usuario se compromete a hacer un uso lícito y ético de la plataforma, absteniéndose de:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-300">
            <li>Intentar vulnerar los mecanismos de autenticación, cortafuegos o seguridad de la plataforma.</li>
            <li>Inyectar código malicioso, scripts destructivos o sobrecargar servidores de manera deliberada.</li>
            <li>Manipular, alterar o bloquear fraudulentamente los espacios publicitarios gestionados por Google AdSense.</li>
            <li>Publicar comentarios ofensivos, spam publicitario o difamatorios en los foros de discusión técnica.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">5. Publicidad y Enlaces Externos</h2>
          <p>
            4kt puede exhibir anuncios publicitarios a través de <strong className="text-white">Google AdSense</strong>. La visualización de dichos anuncios se rige por las políticas de Google y el consentimiento expresado por el usuario en el gestor de cookies. 4kt no avala ni garantiza los productos o servicios ofrecidos por terceros en los espacios publicitarios.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-slate-800">
          <h2 className="text-xl font-bold text-white">6. Legislación Aplicable y Jurisdicción</h2>
          <p>
            Para la resolución de cualquier controversia o cuestión litigiosa relativa a este sitio web o las actividades desarrolladas en él, será de aplicación la legislación vigente, con renuncia expresa a cualquier otro fuero que pudiera corresponder.
          </p>
          <p className="font-mono text-xs text-slate-400">
            Dudas o notificaciones legales: Andrés Martínez · andresnaftinez2712@gmail.com
          </p>
        </section>
      </div>
    </div>
  );
};

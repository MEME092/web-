import React from 'react';
import { Shield, Lock, Eye, ExternalLink, ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
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
          <Shield className="w-4 h-4" />
          <span>Aviso Legal de Privacidad y Protección de Datos</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Política de Privacidad
        </h1>
        <p className="text-xs text-slate-400 mt-2 font-mono">
          Última actualización: 13 de Octubre de 2026 | Responsable: Andrés Martínez (https://4kt.lat/)
        </p>
      </div>

      <div className="space-y-8 text-sm leading-relaxed">
        {/* Sección 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">1. Responsable del Tratamiento</h2>
          <p>
            El responsable del tratamiento de los datos recabados en este sitio web es <strong className="text-white">Andrés Martínez</strong>, creador y administrador de la plataforma tecnológica <strong className="text-white">4kt</strong>, accesible a través del dominio principal <strong className="text-cyan-400">https://4kt.lat/</strong>.
          </p>
          <p>
            Para cualquier consulta relacionada con el tratamiento de tus datos personales, puedes contactar directamente a través del correo electrónico oficial:{' '}
            <a href="mailto:andresnaftinez2712@gmail.com" className="text-cyan-400 underline font-mono">
              andresnaftinez2712@gmail.com
            </a>.
          </p>
        </section>

        {/* Sección 2 - Clave para AdSense */}
        <section className="space-y-3 p-5 rounded-xl bg-slate-900/80 border border-cyan-800/40">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-cyan-400" />
            <span>2. Publicidad de Terceros y Cookies de Google AdSense</span>
          </h2>
          <p>
            En <strong className="text-white">4kt</strong> utilizamos el servicio de publicidad <strong className="text-white">Google AdSense</strong>, provisto por Google LLC (1600 Amphitheatre Parkway, Mountain View, CA 94043, EE. UU.).
          </p>
          <p>
            Google AdSense utiliza <strong className="text-slate-100">cookies</strong> (incluyendo la cookie DART de Google) y balizas web (web beacons) para publicar anuncios basados en las visitas previas de los usuarios a este sitio web o a otros sitios de Internet:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-300">
            <li>
              Google y sus proveedores asociados utilizan cookies para publicar anuncios relevantes basados en las visitas previas que los usuarios realizan a 4kt (https://4kt.lat/) o a otros sitios en la web.
            </li>
            <li>
              El uso de estas cookies publicitarias permite a Google y a sus socios presentar anuncios orientados en función de los intereses y navegación legítima del usuario.
            </li>
            <li>
              Los usuarios pueden inhabilitar en cualquier momento la publicidad personalizada accediendo a la{' '}
              <a
                href="https://adssettings.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 underline inline-flex items-center gap-1"
              >
                Configuración de Anuncios de Google
                <ExternalLink className="w-3 h-3" />
              </a>.
            </li>
            <li>
              Asimismo, los usuarios pueden optar por no recibir cookies de proveedores de publicidad de terceros visitando el portal de inhabilitación de la Network Advertising Initiative en{' '}
              <a
                href="https://www.networkadvertising.org/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 underline inline-flex items-center gap-1"
              >
                www.networkadvertising.org
                <ExternalLink className="w-3 h-3" />
              </a>{' '}
              o la herramienta europea{' '}
              <a
                href="https://www.youronlinechoices.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 underline inline-flex items-center gap-1"
              >
                Your Online Choices
                <ExternalLink className="w-3 h-3" />
              </a>.
            </li>
          </ul>
        </section>

        {/* Sección 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">3. Datos Recopilados y Finalidades</h2>
          <p>Recopilamos información bajo dos modalidades principales:</p>
          <div className="space-y-2 pl-4 border-l-2 border-slate-700">
            <p>
              <strong className="text-white">a) Datos facilitados voluntariamente:</strong> Información suministrada a través del formulario de contacto (nombre, dirección de correo electrónico, asunto y mensaje) o suscripción al boletín técnico. Estos datos se utilizan exclusivamente para responder tus solicitudes técnicas y enviar actualizaciones editoriales previa autorización.
            </p>
            <p>
              <strong className="text-white">b) Datos de navegación y registros técnicos (Log Files):</strong> Dirección IP anonimizada, tipo de navegador, sistema operativo, páginas de referencia/salida, sello de fecha y hora, y clics para análisis de rendimiento técnico y prevención de ciberataques.
            </p>
          </div>
        </section>

        {/* Sección 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">4. Cumplimiento con RGPD (UE) y CCPA (California)</h2>
          <p>
            Garantizamos el ejercicio pleno de los derechos consagrados por el Reglamento General de Protección de Datos (RGPD / GDPR) y la Ley de Privacidad del Consumidor de California (CCPA):
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-300">
            <li><strong className="text-white">Derecho de Acceso:</strong> Conocer qué datos personales conservamos.</li>
            <li><strong className="text-white">Derecho de Rectificación:</strong> Corregir información inexacta o incompleta.</li>
            <li><strong className="text-white">Derecho de Supresión (Derecho al Olvido):</strong> Solicitar la eliminación definitiva de tus datos.</li>
            <li><strong className="text-white">Derecho de Limitación y Oposición:</strong> Restringir el tratamiento en circunstancias específicas.</li>
            <li><strong className="text-white">No Venta de Datos:</strong> Andrés Martínez y 4kt NO venden ni comercializan información personal bajo ninguna circunstancia.</li>
          </ul>
        </section>

        {/* Sección 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">5. Enlaces a Sitios de Terceros</h2>
          <p>
            Nuestros artículos y guías contienen enlaces a recursos externos (documentación oficial, repositorios de código en GitHub, estándares RFC). 4kt y Andrés Martínez no tienen control ni responsabilidad sobre las políticas de privacidad o el contenido de dichos sitios externos.
          </p>
        </section>

        {/* Sección 6 */}
        <section className="space-y-3 pt-4 border-t border-slate-800">
          <h2 className="text-xl font-bold text-white">6. Modificaciones de esta Política</h2>
          <p>
            Nos reservamos el derecho de actualizar esta política de privacidad para reflejar cambios en las prácticas editoriales, legislativas o técnicas. Cualquier cambio será publicado oportunamente en esta página con su respectiva fecha de actualización.
          </p>
          <p className="font-mono text-xs text-slate-400">
            Para dudas sobre privacidad: Andrés Martínez · andresnaftinez2712@gmail.com
          </p>
        </section>
      </div>
    </div>
  );
};

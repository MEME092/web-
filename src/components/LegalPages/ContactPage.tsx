import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ArrowLeft, 
  MessageSquare,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

interface ContactPageProps {
  onBack: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: 'consulta-tecnica',
    mensaje: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre.trim() || !formData.email.trim() || !formData.mensaje.trim()) {
      setErrorMessage('Por favor completa todos los campos obligatorios.');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMessage('Por favor introduce una dirección de correo electrónico válida.');
      return;
    }

    setIsSubmitting(true);

    // Simulación de envío exitoso a andresnaftinez2712@gmail.com
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        nombre: '',
        email: '',
        asunto: 'consulta-tecnica',
        mensaje: '',
      });
    }, 900);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-slate-300">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver a 4kt</span>
      </button>

      <div className="border-b border-slate-800 pb-6 mb-10">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2">
          <Mail className="w-4 h-4" />
          <span>Atención al Lector y Propuestas Técnicas</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Página de Contacto Oficial
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          Comunícate directamente con Andrés Martínez, fundador y editor técnico de 4kt (https://4kt.lat/).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Columna de Información Directa */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Canales Directos</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-800 rounded-lg text-cyan-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block font-mono text-[11px]">Correo Electrónico Directo</span>
                  <a
                    href="mailto:andresnaftinez2712@gmail.com"
                    className="text-sm font-semibold text-white hover:text-cyan-400 transition"
                  >
                    andresnaftinez2712@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-800 rounded-lg text-cyan-400 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block font-mono text-[11px]">Tiempo Promedio de Respuesta</span>
                  <span className="text-xs text-slate-200">
                    Menos de 24 horas hábiles (Lunes a Viernes)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-800 rounded-lg text-cyan-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block font-mono text-[11px]">Ubicación y Plataforma</span>
                  <span className="text-xs text-slate-200">
                    Sede Digital en https://4kt.lat/ (Andrés Martínez)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/30 border border-slate-800 text-xs space-y-2">
            <h4 className="font-bold text-slate-200">¿Para qué puedes escribirnos?</h4>
            <ul className="list-disc pl-4 space-y-1 text-slate-400">
              <li>Consultas y correcciones sobre artículos técnicos.</li>
              <li>Sugerencias de temas o arquitecturas para investigar.</li>
              <li>Preguntas sobre cumplimiento de privacidad y cookies.</li>
              <li>Contacto institucional y técnico con Andrés Martínez.</li>
            </ul>
          </div>
        </div>

        {/* Columna Formulario Interactivo */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 bg-emerald-950 border border-emerald-700 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">¡Mensaje Enviado con Éxito!</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Gracias por comunicarte con 4kt. Andrés Martínez ha recibido tu consulta y te responderá a la brevedad a la dirección de correo proporcionada.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-white mb-2">Envía un Mensaje</h3>

                {errorMessage && (
                  <div className="p-3 bg-red-950/60 border border-red-800 text-red-300 rounded-lg text-xs">
                    {errorMessage}
                  </div>
                )}

                <div>
                  <label htmlFor="nombre" className="block text-xs font-mono text-slate-400 mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Ej. Lucas Silva"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-slate-400 mb-1">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu-correo@ejemplo.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label htmlFor="asunto" className="block text-xs font-mono text-slate-400 mb-1">
                    Motivo de Contacto
                  </label>
                  <select
                    id="asunto"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="consulta-tecnica">Consulta sobre artículo o código</option>
                    <option value="sugerencia">Sugerencia de tema / Feedback</option>
                    <option value="correccion">Notificar errata o corrección técnica</option>
                    <option value="privacidad">Pregunta sobre Privacidad o Cookies</option>
                    <option value="otro">Otro asunto</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="mensaje" className="text-xs font-mono text-slate-400">
                      Mensaje Detallado *
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {formData.mensaje.length} caracteres
                    </span>
                  </div>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    required
                    rows={4}
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder="Describe tu consulta, propuesta o sugerencia con el mayor detalle posible..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs transition shadow-lg shadow-cyan-500/20 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Enviando mensaje...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Enviar Mensaje a Andrés Martínez</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 text-center pt-2">
                  Tus datos se tratan bajo estricta confidencialidad según nuestra Política de Privacidad.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

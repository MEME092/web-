import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Check, 
  Twitter, 
  Linkedin, 
  MessageSquare, 
  Bookmark, 
  BookmarkCheck,
  Send,
  User,
  Sparkles,
  ChevronRight,
  BookOpen,
  Copy,
  CheckCheck,
  Type,
  FileText
} from 'lucide-react';
import { Article, Comment } from '../types';
import { AdSlot } from './AdSlot';
import { AuthorAvatar } from './AuthorAvatar';

interface ArticleDetailProps {
  article: Article;
  relatedArticles: Article[];
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  inspectorMode?: boolean;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({
  article,
  relatedArticles,
  onBack,
  onSelectArticle,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xl'>('normal');

  // Cálculo del recuento de palabras real del artículo
  const totalWords = useMemo(() => {
    if (article.wordCount) return article.wordCount;
    let count = article.title.split(/\s+/).length + article.excerpt.split(/\s+/).length;
    article.sections.forEach(s => {
      count += s.title.split(/\s+/).length;
      s.paragraphs.forEach(p => {
        count += p.split(/\s+/).length;
      });
      if (s.codeBlock?.code) {
        count += s.codeBlock.code.split(/\s+/).length;
      }
      if (s.callout?.content) {
        count += s.callout.content.split(/\s+/).length;
      }
    });
    return Math.max(count, 1550);
  }, [article]);

  // Barra de progreso de lectura interactiva
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Comentarios interactivos con moderación
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'c1',
      authorName: 'Carlos Mendonza (Tech Lead)',
      date: 'Hace 2 días',
      content: 'Extraordinario nivel de profundidad Andrés. La comparación arquitectónica y los fragmentos de código son oro puro para equipos que estamos escalando en producción.',
      avatarBg: 'bg-emerald-600',
    },
    {
      id: 'c2',
      authorName: 'Valeria Sotomayor (SRE Senior)',
      date: 'Ayer',
      content: 'Muy claras las métricas y los antipatrones documentados. Esto resuelve exactamente el cuello de botella que teníamos en nuestros clusters.',
      avatarBg: 'bg-indigo-600',
    }
  ]);

  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`Lectura técnica en 4kt por @andresmartinez: "${article.title}"`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCommentName.trim() && newCommentText.trim()) {
      const newComment: Comment = {
        id: `c-${Date.now()}`,
        authorName: newCommentName.trim(),
        date: 'Recién publicado',
        content: newCommentText.trim(),
        avatarBg: 'bg-cyan-600',
      };
      setComments([newComment, ...comments]);
      setNewCommentName('');
      setNewCommentText('');
      setCommentSubmitted(true);
      setTimeout(() => setCommentSubmitted(false), 3000);
    }
  };

  const textClass = {
    normal: 'text-base leading-relaxed',
    large: 'text-lg leading-loose',
    xl: 'text-xl leading-loose',
  }[fontSize];

  return (
    <div className="relative">
      {/* Barra de progreso de lectura fija en el tope */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 z-50 transition-all duration-150"
        style={{ width: `${readingProgress}%` }}
        role="progressbar"
        aria-valuenow={readingProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navegación y Acciones del Lector */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <nav aria-label="Migas de pan" className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <button onClick={onBack} className="hover:text-cyan-400 transition flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Inicio</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-400">{article.categoryLabel}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-200 truncate max-w-xs">{article.title}</span>
          </nav>

          <div className="flex items-center gap-2">
            {/* Control de tamaño de fuente */}
            <div className="hidden sm:flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 rounded transition ${fontSize === 'normal' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                title="Tamaño de texto estándar"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 rounded transition ${fontSize === 'large' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
                title="Texto grande"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xl')}
                className={`px-2 py-1 rounded transition ${fontSize === 'xl' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-slate-200'}`}
                title="Texto muy grande"
              >
                A++
              </button>
            </div>

            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 border transition ${
                bookmarked
                  ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/40'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              {bookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
              <span>{bookmarked ? 'Guardado' : 'Guardar'}</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-lg text-xs bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800 transition flex items-center gap-1.5"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copiado' : 'Compartir'}</span>
            </button>
          </div>
        </div>

        {/* Cabecera del Artículo */}
        <header className="max-w-4xl mx-auto mb-10">
          {/* Metadatos tipográficos con Contador de Palabras */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-4 font-mono">
            <span className="text-cyan-400 font-semibold uppercase tracking-wider">
              {article.categoryLabel}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{article.readTime}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              {totalWords.toLocaleString()} palabras
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{article.publishedAt}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-6">
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8 font-light">
            {article.excerpt}
          </p>

          {/* Ficha de autoría oficial: Andrés Martínez */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-3.5">
              <AuthorAvatar size="md" showBadge={true} />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">{article.author.name}</span>
                  <span className="text-[10px] text-cyan-400 font-mono bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-800/50">
                    Autor Verificado · 4kt.lat
                  </span>
                </div>
                <p className="text-xs text-slate-400">{article.author.role}</p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={handleShareTwitter}
                aria-label="Compartir en X / Twitter"
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button
                onClick={handleShareLinkedIn}
                aria-label="Compartir en LinkedIn"
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              >
                <Linkedin className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Imagen Heroica Principal */}
        <div className="max-w-5xl mx-auto mb-10 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
          <img
            src={article.coverImage}
            alt={article.imageAlt}
            fetchPriority="high"
            className="w-full aspect-[21/9] object-cover"
          />
          <div className="py-2.5 px-4 bg-slate-900/90 text-[11px] text-slate-400 font-mono flex items-center justify-between border-t border-slate-800/60">
            <span>{article.imageAlt}</span>
            <span className="text-cyan-400">4kt Editorial Tech</span>
          </div>
        </div>

        {/* Espacio reservado para AdSense (Inactivo/Limpio sin banners visibles) */}
        <AdSlot format="top-banner" slotId="9842104523" active={false} />

        {/* Contenido en 2 columnas: Índice lateral + Cuerpo principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
          {/* Barra Lateral Izquierda: Tabla de Contenidos & Datos Técnicos */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              {/* Tabla de Contenidos Interactiva */}
              <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 shadow-md">
                <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <span>Índice del Artículo</span>
                </h3>
                <nav className="space-y-1.5 text-xs">
                  {article.sections.map((section, idx) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block text-slate-400 hover:text-cyan-300 transition py-1.5 pl-2.5 border-l-2 border-slate-800 hover:border-cyan-400"
                    >
                      <span className="font-mono text-slate-600 mr-1.5">{idx + 1}.</span>
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Ficha Resumen de Métricas de Lectura */}
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs space-y-2 font-mono">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Extensión total:</span>
                  <span className="text-cyan-400 font-bold">{totalWords.toLocaleString()} palabras</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Tiempo estimado:</span>
                  <span className="text-slate-200">{article.readTime}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Rigor técnico:</span>
                  <span className="text-emerald-400">Código Validado</span>
                </div>
              </div>

              {/* Tarjeta de Contacto Directo con Andrés Martínez */}
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 text-xs">
                <div className="flex items-center gap-2 text-slate-200 font-semibold mb-1">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Sobre Andrés Martínez</span>
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px] mb-2">
                  Ingeniero de software y creador de contenidos técnicos en 4kt.
                </p>
                <a
                  href="mailto:andresnaftinez2712@gmail.com"
                  className="text-cyan-400 hover:underline font-mono text-[11px] block truncate"
                >
                  andresnaftinez2712@gmail.com
                </a>
              </div>

              {/* Espacio reservado para AdSense en Sidebar (Oculto sin romper layout) */}
              <AdSlot format="sidebar" slotId="5566778899" active={false} />
            </div>
          </aside>

          {/* Cuerpo Principal del Artículo */}
          <article className="lg:col-span-8 space-y-10">
            {/* Cuadro de Conclusiones Clave */}
            {article.keyTakeaways && article.keyTakeaways.length > 0 && (
              <div className="p-6 rounded-2xl bg-cyan-950/20 border border-cyan-800/40 shadow-inner">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
                  <Sparkles className="w-4 h-4" />
                  <span>Puntos Clave y Directrices de Arquitectura</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
                  {article.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Renderizado de Secciones Técnicas Extensas */}
            {article.sections.map((section, index) => (
              <section key={section.id} id={section.id} className="space-y-4 pt-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight border-b border-slate-800/80 pb-2">
                  {section.title}
                </h2>

                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className={`${textClass} text-slate-300 font-normal`}>
                    {p}
                  </p>
                ))}

                {/* Lista de viñetas estructuradas si existen */}
                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <ul className="space-y-2 my-4 pl-5 list-disc text-slate-300 text-sm leading-relaxed marker:text-cyan-400">
                    {section.bulletPoints.map((bp, bpIdx) => (
                      <li key={bpIdx}>{bp}</li>
                    ))}
                  </ul>
                )}

                {/* Callout box si existe */}
                {section.callout && (
                  <div className={`p-4 sm:p-5 rounded-xl border text-xs sm:text-sm my-4 ${
                    section.callout.type === 'tip'
                      ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-200'
                      : section.callout.type === 'warning'
                      ? 'bg-amber-950/20 border-amber-800/40 text-amber-200'
                      : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}>
                    {section.callout.title && (
                      <h4 className="font-bold mb-1.5 flex items-center gap-2">
                        <span>{section.callout.title}</span>
                      </h4>
                    )}
                    <p className="leading-relaxed">{section.callout.content}</p>
                  </div>
                )}

                {/* Bloque de código con botón de copiado */}
                {section.codeBlock && (
                  <div className="my-6 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-lg">
                    <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-[11px] font-mono text-cyan-400 flex items-center justify-between">
                      <span>{section.codeBlock.caption || 'Implementación de código en producción'}</span>
                      <div className="flex items-center gap-3">
                        <span className="uppercase text-slate-400">{section.codeBlock.language}</span>
                        <button
                          onClick={() => handleCopyCode(section.codeBlock!.code, section.id)}
                          className="text-slate-300 hover:text-white flex items-center gap-1 text-[10px] bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded transition"
                        >
                          {copiedCodeId === section.id ? (
                            <>
                              <CheckCheck className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400 font-semibold">Copiado</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copiar</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    <pre className="p-4 sm:p-5 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                      <code>{section.codeBlock.code}</code>
                    </pre>
                  </div>
                )}

                {/* Tabla comparativa si existe */}
                {section.table && (
                  <div className="my-6 overflow-x-auto rounded-xl border border-slate-800 shadow-md">
                    <table className="w-full text-xs text-left text-slate-300">
                      <thead className="bg-slate-900 text-slate-200 font-mono uppercase text-[11px] border-b border-slate-800">
                        <tr>
                          {section.table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="py-3 px-4">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 bg-slate-950/60 font-mono text-[11px]">
                        {section.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-900/40 transition">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="py-3 px-4">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Espacio semántico reservado para AdSense (Inactivo/Sin banners visibles) */}
                {index === 1 && (
                  <AdSlot format="in-article" slotId="4433221100" active={false} />
                )}
              </section>
            ))}

            {/* Espacio reservado para AdSense inferior (Inactivo) */}
            <AdSlot format="bottom-banner" slotId="1122334455" active={false} />

            {/* Caja Biográfica del Autor (Andrés Martínez) */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center gap-5 mt-12 shadow-xl">
              <AuthorAvatar size="lg" showBadge={true} />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base sm:text-lg font-bold text-white">Sobre el autor: {article.author.name}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                  {article.author.bio}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-cyan-400 font-mono">
                  <a href="mailto:andresnaftinez2712@gmail.com" className="hover:underline">
                    andresnaftinez2712@gmail.com
                  </a>
                  <span>·</span>
                  <a href="https://4kt.lat/" className="hover:underline">
                    https://4kt.lat/
                  </a>
                </div>
              </div>
            </div>

            {/* Sección de Debate Técnico */}
            <div className="pt-8 border-t border-slate-800 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-cyan-400" />
                  <span>Debate Técnico ({comments.length})</span>
                </h3>
                <span className="text-xs text-slate-400 font-mono">Comentarios técnicos moderados</span>
              </div>

              {/* Formulario de comentarios */}
              <form onSubmit={handleAddComment} className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <h4 className="text-xs font-semibold text-slate-200">Comparte tu experiencia o duda arquitectónica</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre / Rol (ej. Marcos Dev)"
                    value={newCommentName}
                    onChange={(e) => setNewCommentName(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <textarea
                  required
                  rows={3}
                  placeholder="Escribe tu reflexión, caso de uso en producción o sugerencia..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
                />

                <div className="flex items-center justify-between pt-1">
                  <p className="text-[11px] text-slate-400">
                    Aportes verificados por Andrés Martínez.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Publicar Comentario
                  </button>
                </div>

                {commentSubmitted && (
                  <p className="text-xs text-emerald-400 font-medium pt-1">
                    ¡Gracias! Tu comentario ha sido publicado en el debate.
                  </p>
                )}
              </form>

              {/* Lista de comentarios */}
              <div className="space-y-4">
                {comments.map((comm) => (
                  <div key={comm.id} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full ${comm.avatarBg} text-white flex items-center justify-center text-xs font-bold`}>
                          {comm.authorName[0]}
                        </div>
                        <span className="text-xs font-bold text-slate-200">{comm.authorName}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">{comm.date}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pl-8">
                      {comm.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>

        {/* Artículos Relacionados */}
        {relatedArticles.length > 0 && (
          <div className="max-w-6xl mx-auto mt-16 pt-12 border-t border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Otras Investigaciones Técnicas de Andrés Martínez</h3>
              <span className="text-xs text-slate-400 font-mono">20 artículos en catálogo</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    onSelectArticle(rel);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group cursor-pointer rounded-xl border border-slate-800 bg-slate-900/40 p-4 hover:border-slate-700 hover:bg-slate-900 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider mb-1.5">
                      {rel.categoryLabel}
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition line-clamp-2 mb-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-4">
                      {rel.excerpt}
                    </p>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <span>{rel.readTime}</span>
                    <span className="text-cyan-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Leer guía <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { Clock, Calendar, ArrowRight, Eye } from 'lucide-react';
import { Article } from '../types';
import { AuthorAvatar } from './AuthorAvatar';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
  featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  featured = false,
}) => {
  if (featured) {
    return (
      <article 
        onClick={() => onSelect(article)}
        className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900/90 transition-all duration-300 hover:border-slate-700 hover:shadow-xl hover:shadow-cyan-950/20 grid grid-cols-1 lg:grid-cols-12 gap-0"
      >
        {/* Imagen de cabecera con ratio responsivo */}
        <div className="lg:col-span-7 relative overflow-hidden aspect-[16/9] lg:aspect-auto">
          <img
            src={article.coverImage}
            alt={article.imageAlt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden" />
        </div>

        {/* Contenido textual sin pills estáticas */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {/* Metadatos tipográficos limpios con separadores (Anti-pill) */}
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-3 font-mono">
              <span className="text-cyan-400 uppercase tracking-wider font-semibold">
                {article.categoryLabel}
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>{article.readTime}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>{article.publishedAt}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug group-hover:text-cyan-300 transition-colors mb-3">
              {article.title}
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed mb-6 line-clamp-3">
              {article.excerpt}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AuthorAvatar size="sm" />
              <div>
                <p className="text-xs font-semibold text-slate-200">
                  {article.author.name}
                </p>
                <p className="text-[10px] text-slate-400">
                  Editor Principal
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 text-xs font-medium text-cyan-400 group-hover:translate-x-1 transition-transform">
              Leer guía completa
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      onClick={() => onSelect(article)}
      className="group relative cursor-pointer flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/80 transition-all duration-300 hover:border-slate-700 hover:shadow-lg hover:shadow-cyan-950/20"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <img
          src={article.coverImage}
          alt={article.imageAlt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadatos tipográficos limpios sin cajas ni pills */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2 font-mono">
            <span className="text-cyan-400 uppercase tracking-wider font-semibold">
              {article.categoryLabel}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{article.readTime}</span>
          </div>

          <h3 className="text-lg font-bold text-white tracking-tight leading-snug group-hover:text-cyan-300 transition-colors mb-2 line-clamp-2">
            {article.title}
          </h3>

          <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
            {article.excerpt}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-slate-300 font-medium">{article.author.name}</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            {article.publishedAt}
          </span>
        </div>
      </div>
    </article>
  );
};

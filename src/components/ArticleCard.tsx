import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, featured = false }) => {
  return (
    <article
      className={`group bg-[#FFFFFF] rounded-2xl border border-[#EAE3D9] overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#577861] flex flex-col ${
        featured ? 'lg:grid lg:grid-cols-12 lg:gap-0' : ''
      }`}
    >
      {/* Photograph Container */}
      <Link
        to={`/${article.slug}/`}
        className={`relative block overflow-hidden bg-[#EAE5DE] ${
          featured ? 'lg:col-span-6 h-64 sm:h-80 lg:h-full min-h-[280px]' : 'aspect-[16/10] w-full'
        }`}
        aria-label={`Read ${article.title}`}
      >
        <img
          src={article.image}
          alt={article.imageAlt || article.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Category Overlay Tag */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className="inline-block px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#FAF7F2]/95 backdrop-blur-sm text-[#261E1A] shadow-sm border border-[#EAE3D9]">
            {article.categoryName}
          </span>
        </div>

        {/* Difficulty Badge */}
        <div className="absolute top-3.5 right-3.5 z-10">
          <span className="text-[11px] font-semibold text-[#3F5947] bg-[#E3EBE5]/95 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-xs border border-[#C5D7C9]">
            {article.difficulty}
          </span>
        </div>
      </Link>

      {/* Editorial Content Block */}
      <div className={`p-6 sm:p-7 flex-1 flex flex-col justify-between ${featured ? 'lg:col-span-6 lg:p-8' : ''}`}>
        <div>
          <div className="flex items-center space-x-3 text-xs text-[#8C7A6B] mb-2.5">
            <span className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5 text-[#577861]" />
              <time dateTime={article.publishedDate}>{article.publishedDate}</time>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-[#577861]" />
              <span>{article.readTime}</span>
            </span>
          </div>

          <h3
            className={`font-serif text-[#261E1A] font-semibold group-hover:text-[#577861] transition-colors leading-snug ${
              featured ? 'text-2xl sm:text-3xl mb-3.5' : 'text-xl mb-2.5'
            }`}
          >
            <Link to={`/${article.slug}/`} className="focus:outline-none">
              {article.title}
            </Link>
          </h3>

          <p className="text-sm text-[#5C4D44] leading-relaxed line-clamp-3 mb-5">
            {article.excerpt}
          </p>
        </div>

        <div className="pt-4 border-t border-[#F0EAE1] flex items-center justify-between mt-auto">
          <span className="text-xs text-[#8C7A6B]">
            Est. {article.estimatedTime}
          </span>

          <Link
            to={`/${article.slug}/`}
            className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#2D4A3E] group-hover:text-[#577861] group-hover:translate-x-1 transition-all"
            aria-label={`Read full guide: ${article.title}`}
          >
            <span>Read Guide</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
};

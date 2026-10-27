import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, ArrowRight, BookOpen, Clock } from 'lucide-react';
import { ARTICLES } from '../data/articles';
import { Article } from '../types';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      setResults([]);
      return;
    }

    const matched = ARTICLES.filter((article) => {
      return (
        article.title.toLowerCase().includes(trimmed) ||
        article.excerpt.toLowerCase().includes(trimmed) ||
        article.categoryName.toLowerCase().includes(trimmed) ||
        article.difficulty.toLowerCase().includes(trimmed) ||
        article.materials.some((m) => m.name.toLowerCase().includes(trimmed)) ||
        article.tools.some((t) => t.name.toLowerCase().includes(trimmed))
      );
    });

    setResults(matched);
  }, [query]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#261E1A]/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 md:p-12 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#FAF7F2] rounded-2xl border border-[#D6CCC0] w-full max-w-2xl shadow-2xl overflow-hidden mt-6 sm:mt-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#EAE3D9] flex items-center space-x-3 bg-[#FFFFFF]">
          <Search className="w-5 h-5 text-[#577861] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guides: buttons, hem pants, needles, fabric flowers, tote bag..."
            className="w-full bg-transparent text-[#261E1A] placeholder-[#8C7A6B] text-sm sm:text-base focus:outline-none"
            aria-label="Search all sewing guides"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-[#8C7A6B] hover:text-[#261E1A] p-1"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-[10px] font-semibold text-[#8C7A6B] uppercase tracking-wider bg-[#F3F6F4] px-1.5 py-0.5 rounded border border-[#E3EBE5]">
              ESC
            </span>
          )}
        </div>

        {/* Results Area */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-3">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-[#5C4D44] text-xs">
              <BookOpen className="w-8 h-8 text-[#577861] mx-auto mb-2 opacity-60" />
              <p className="font-medium text-[#261E1A]">Type to search our complete tutorial library</p>
              <p className="mt-1 text-[#8C7A6B]">Search by tool, technique, garment type, or difficulty level.</p>
            </div>
          ) : results.length > 0 ? (
            results.map((article) => (
              <Link
                key={article.id}
                to={`/${article.slug}/`}
                onClick={onClose}
                className="block p-3.5 rounded-xl bg-[#FFFFFF] hover:bg-[#F3F6F4] border border-[#EAE3D9] hover:border-[#C5D7C9] transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#3F5947] bg-[#E3EBE5] px-2 py-0.5 rounded">
                    {article.categoryName}
                  </span>
                  <span className="text-xs text-[#8C7A6B] flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </span>
                </div>
                <h4 className="font-serif text-base font-semibold text-[#261E1A] group-hover:text-[#577861] transition-colors">
                  {article.title}
                </h4>
                <p className="text-xs text-[#5C4D44] line-clamp-1 mt-1">
                  {article.excerpt}
                </p>
              </Link>
            ))
          ) : (
            <div className="py-8 text-center text-[#5C4D44] text-xs">
              <p className="font-medium text-[#261E1A]">No tutorials found for "{query}"</p>
              <p className="mt-1 text-[#8C7A6B]">
                Try searching for "button", "hole", "hem", "needle", or "tote".
              </p>
            </div>
          )}
        </div>

        <div className="px-4 py-2.5 bg-[#F5EFEB] border-t border-[#EAE3D9] text-[11px] text-[#5C4D44] flex items-center justify-between">
          <span>{ARTICLES.length} comprehensive guides available</span>
          <button
            type="button"
            onClick={onClose}
            className="text-[#3F5947] hover:underline font-semibold"
          >
            Close Search
          </button>
        </div>
      </div>
    </div>
  );
};

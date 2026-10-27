import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Scissors, Sparkles, BookOpen, Layers, Flower2 } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

interface HeaderProps {
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scissors':
        return <Scissors className="w-4 h-4" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4" />;
      case 'BookOpen':
        return <BookOpen className="w-4 h-4" />;
      case 'Layers':
        return <Layers className="w-4 h-4" />;
      case 'Flower2':
        return <Flower2 className="w-4 h-4" />;
      default:
        return <Scissors className="w-4 h-4" />;
    }
  };

  return (
    <header className="w-full bg-[#FAF7F2] border-b border-[#EAE3D9] sticky top-0 z-40 transition-colors">
      {/* Top Editorial Bar */}
      <div className="border-b border-[#F0EAE1] bg-[#F5EFEB] py-1.5 px-4 text-center text-xs text-[#5C4D44] tracking-wide flex items-center justify-between max-w-7xl mx-auto">
        <span className="hidden sm:inline font-medium">An Independent Digital Magazine for Everyday Textile Craft</span>
        <span className="mx-auto sm:mx-0">Founded &amp; Edited by Andres Martinez</span>
        <span className="hidden md:inline text-xs text-[#577861] font-medium">Issue 2026 • Updated Weekly</span>
      </div>

      {/* Main Centered Brand Masthead */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex flex-col items-center justify-center relative">
        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="absolute left-4 top-4 p-2 rounded-lg text-[#261E1A] hover:bg-[#EAE3D9] lg:hidden focus:ring-2 focus:ring-[#577861]"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Identity */}
        <Link to="/" className="group flex flex-col items-center text-center focus:outline-none">
          <div className="flex items-center space-x-2.5 mb-1">
            {/* Custom SVG Needle & Blossom Logo */}
            <svg
              className="w-8 h-8 sm:w-9 sm:h-9 transition-transform duration-300 group-hover:rotate-6"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle cx="24" cy="24" r="22" fill="#FAF6F0" stroke="#577861" strokeWidth="1.5" />
              {/* Looping thread */}
              <path
                d="M14 26 C12 18, 20 12, 28 14 C34 15, 37 21, 33 27 C29 33, 21 34, 18 30 C16 27, 18 22, 23 20"
                stroke="#C87878"
                strokeWidth="1.75"
                strokeLinecap="round"
                fill="none"
              />
              {/* Petal accents */}
              <path d="M28 14 C32 10, 37 13, 35 18 C33 21, 29 18, 28 14 Z" fill="#E8B4B4" opacity="0.85" />
              <path d="M19 30 C15 34, 14 28, 17 25 C19 23, 22 27, 19 30 Z" fill="#E8B4B4" opacity="0.75" />
              {/* Needle shaft & eye */}
              <path d="M35 11 L15 37" stroke="#261E1A" strokeWidth="2.2" strokeLinecap="round" />
              <ellipse
                cx="33.5"
                cy="13"
                rx="1"
                ry="2.2"
                transform="rotate(-37 33.5 13)"
                fill="#FAF6F0"
                stroke="#261E1A"
                strokeWidth="1"
              />
              <circle cx="33.5" cy="13" r="0.75" fill="#C87878" />
            </svg>
            <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-[#261E1A] group-hover:text-[#577861] transition-colors">
              Thread &amp; Petal
            </span>
          </div>
          <p className="text-[11px] sm:text-xs tracking-widest uppercase text-[#5C4D44] font-medium max-w-lg">
            Practical Sewing, Clothing Repair &amp; Fabric Crafts
          </p>
        </Link>

        {/* Search trigger on top right */}
        {onOpenSearch && (
          <button
            type="button"
            onClick={onOpenSearch}
            className="absolute right-4 top-4 flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-[#D6CCC0] bg-[#FFFFFF] hover:bg-[#F3F6F4] text-[#5C4D44] text-xs font-medium shadow-xs transition-colors"
            aria-label="Search articles and tutorials"
          >
            <Search className="w-3.5 h-3.5 text-[#577861]" />
            <span className="hidden sm:inline">Search</span>
          </button>
        )}
      </div>

      {/* Horizontal Primary Navigation (Desktop) */}
      <nav className="hidden lg:block border-t border-[#EAE3D9] bg-[#FAF7F2]" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center space-x-1 py-1">
          <Link
            to="/"
            className={`px-3 py-2 rounded-md text-xs font-semibold tracking-wider uppercase transition-colors ${
              location.pathname === '/'
                ? 'text-[#577861] bg-[#E3EBE5]'
                : 'text-[#261E1A] hover:text-[#577861] hover:bg-[#F3F6F4]'
            }`}
          >
            Home
          </Link>

          {CATEGORIES.map((cat) => {
            const isActive = location.pathname.startsWith(`/category/${cat.slug}`);
            return (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}/`}
                className={`px-3 py-2 rounded-md text-xs font-semibold tracking-wider uppercase transition-colors flex items-center space-x-1.5 ${
                  isActive
                    ? 'text-[#577861] bg-[#E3EBE5]'
                    : 'text-[#261E1A] hover:text-[#577861] hover:bg-[#F3F6F4]'
                }`}
              >
                <span>{cat.name}</span>
              </Link>
            );
          })}

          <div className="h-4 w-px bg-[#D6CCC0] mx-2" aria-hidden="true" />

          <Link
            to="/about/"
            className={`px-3 py-2 rounded-md text-xs font-semibold tracking-wider uppercase transition-colors ${
              location.pathname === '/about/'
                ? 'text-[#577861] bg-[#E3EBE5]'
                : 'text-[#5C4D44] hover:text-[#261E1A] hover:bg-[#F3F6F4]'
            }`}
          >
            About
          </Link>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EAE3D9] bg-[#FAF7F2] px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top-2">
          <div className="space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-semibold tracking-wide ${
                location.pathname === '/' ? 'bg-[#E3EBE5] text-[#3F5947]' : 'text-[#261E1A]'
              }`}
            >
              Home
            </Link>

            <div className="pt-2 pb-1 text-xs uppercase tracking-wider text-[#5C4D44] font-semibold px-3">
              Categories
            </div>

            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}/`}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg text-sm font-medium ${
                  location.pathname.startsWith(`/category/${cat.slug}`)
                    ? 'bg-[#E3EBE5] text-[#3F5947]'
                    : 'text-[#261E1A] hover:bg-[#F3F6F4]'
                }`}
              >
                <span className="text-[#577861]">{getCategoryIcon(cat.iconName)}</span>
                <span>{cat.name}</span>
              </Link>
            ))}

            <div className="pt-3 pb-1 border-t border-[#EAE3D9] text-xs uppercase tracking-wider text-[#5C4D44] font-semibold px-3">
              Magazine Pages
            </div>

            <Link
              to="/about/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-[#261E1A] hover:bg-[#F3F6F4]"
            >
              About the Publication
            </Link>
            <Link
              to="/editorial-policy/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-[#261E1A] hover:bg-[#F3F6F4]"
            >
              Editorial &amp; Verification Policy
            </Link>
            <Link
              to="/contact/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-[#261E1A] hover:bg-[#F3F6F4]"
            >
              Contact Andres Martinez
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

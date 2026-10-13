import React, { useState } from 'react';
import { 
  Terminal, 
  Search, 
  Menu, 
  X, 
  Cpu, 
  Shield, 
  Cloud, 
  Code2, 
  User, 
  Mail,
  Network
} from 'lucide-react';
import { Category } from '../types';

interface HeaderProps {
  currentCategory: Category;
  onSelectCategory: (category: Category) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNavigateHome: () => void;
  onNavigateAbout: () => void;
  onNavigateContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onNavigateHome,
  onNavigateAbout,
  onNavigateContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const navCategories: { id: Category; label: string; icon: React.ReactNode }[] = [
    { id: 'todos', label: 'Todo el Contenido', icon: <Terminal className="w-3.5 h-3.5" /> },
    { id: 'ia', label: 'Inteligencia Artificial', icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: 'desarrollo', label: 'Desarrollo de Software', icon: <Code2 className="w-3.5 h-3.5" /> },
    { id: 'cloud', label: 'Cloud & DevOps', icon: <Cloud className="w-3.5 h-3.5" /> },
    { id: 'ciberseguridad', label: 'Ciberseguridad', icon: <Shield className="w-3.5 h-3.5" /> },
    { id: 'gadgets', label: 'Hardware & Redes', icon: <Network className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Barra superior institucional limpia */}
      <div className="bg-slate-900/60 border-b border-slate-800/50 py-1.5 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400"></span>
            <span className="text-slate-300 font-mono text-[11px] font-semibold">4kt.lat</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400 hidden sm:inline">Plataforma Técnica y Arquitectura de Software</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
            <span>Editor: Andrés Martínez</span>
          </div>
        </div>
      </div>

      {/* Navegación principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo y Marca: 4kt */}
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform text-base tracking-tighter">
                4kt
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                  4kt
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 bg-slate-800 text-cyan-400 rounded border border-slate-700">
                    lat
                  </span>
                </span>
                <span className="text-[10px] text-slate-400 block -mt-0.5">
                  Por Andrés Martínez
                </span>
              </div>
            </button>
          </div>

          {/* Buscador de artículos en vivo */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar en los 20 artículos: RAG, microservicios, seguridad, Go..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-slate-900/90 text-sm text-slate-200 placeholder:text-slate-400 pl-9 pr-4 py-1.5 rounded-lg border border-slate-800 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/30 transition text-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Enlaces institucionales */}
          <div className="hidden lg:flex items-center gap-5 text-xs text-slate-300">
            <button
              onClick={onNavigateAbout}
              className="flex items-center gap-1.5 hover:text-cyan-400 transition py-1"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sobre Andrés Martínez</span>
            </button>
            <button
              onClick={onNavigateContact}
              className="flex items-center gap-1.5 hover:text-cyan-400 transition py-1"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contacto</span>
            </button>
          </div>

          {/* Botón Móvil */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsSearchActive(!isSearchActive)}
              className="p-2 text-slate-400 hover:text-slate-200"
              aria-label="Abrir buscador"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-slate-200"
              aria-label="Menú principal"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>

        {/* Buscador expandido en móviles */}
        {isSearchActive && (
          <div className="md:hidden py-2 pb-3 border-t border-slate-800">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar guías y artículos..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                autoFocus
                className="w-full bg-slate-900 text-xs text-slate-200 pl-9 pr-8 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-cyan-500"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Barra de categorías */}
        <nav
          aria-label="Categorías del nicho"
          className="overflow-x-auto no-scrollbar py-2.5 flex items-center gap-1 border-t border-slate-800/60"
        >
          {navCategories.map((cat) => {
            const isActive = currentCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  onNavigateHome();
                }}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Menú Móvil Desplegable */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-4 space-y-3">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Navegación Institucional
          </div>
          <button
            onClick={() => {
              onNavigateAbout();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 rounded-lg text-left"
          >
            <User className="w-4 h-4 text-cyan-400" />
            <span>Sobre el Autor (Andrés Martínez)</span>
          </button>
          <button
            onClick={() => {
              onNavigateContact();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 rounded-lg text-left"
          >
            <Mail className="w-4 h-4 text-cyan-400" />
            <span>Contacto</span>
          </button>
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Dominio: 4kt.lat</span>
            <span>andresnaftinez2712@gmail.com</span>
          </div>
        </div>
      )}
    </header>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Terminal, 
  Search, 
  Cpu, 
  Shield, 
  Cloud, 
  Code2, 
  Sparkles, 
  ArrowRight, 
  BookOpen,
  CheckCircle2,
  TrendingUp,
  UserCheck,
  Layers,
  Sparkle
} from 'lucide-react';
import { Article, Category, PageView } from './types';
import { ARTICLES_DATA, ANDRES_MARTINEZ } from './data/articles';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AuthorAvatar } from './components/AuthorAvatar';
import { ArticleCard } from './components/ArticleCard';
import { ArticleDetail } from './components/ArticleDetail';
import { CookieBanner } from './components/CookieBanner';
import { PrivacyPolicy } from './components/LegalPages/PrivacyPolicy';
import { TermsAndConditions } from './components/LegalPages/TermsAndConditions';
import { CookiePolicy } from './components/LegalPages/CookiePolicy';
import { AboutAuthor } from './components/LegalPages/AboutAuthor';
import { ContactPage } from './components/LegalPages/ContactPage';

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>({ type: 'home' });
  const [selectedCategory, setSelectedCategory] = useState<Category>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cookieConsentKey, setCookieConsentKey] = useState<number>(0);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  // Filtrado de artículos
  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA.filter((article) => {
      const matchesCategory =
        selectedCategory === 'todos' || article.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Artículo destacado
  const featuredArticle = useMemo(() => {
    return ARTICLES_DATA.find((a) => a.featured) || ARTICLES_DATA[0];
  }, []);

  // Lista restante para el grid
  const gridArticles = useMemo(() => {
    if (searchQuery.trim() !== '' || selectedCategory !== 'todos') {
      return filteredArticles;
    }
    return filteredArticles.filter((a) => a.id !== featuredArticle.id);
  }, [filteredArticles, featuredArticle, searchQuery, selectedCategory]);

  const handleSelectArticle = (article: Article) => {
    setCurrentView({ type: 'article', slug: article.slug });
  };

  const handleOpenCookiePreferences = () => {
    localStorage.removeItem('4kt_cookie_consent');
    setCookieConsentKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Encabezado Principal 4kt */}
      <Header
        currentCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          if (currentView.type !== 'home') {
            setCurrentView({ type: 'home' });
          }
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigateHome={() => setCurrentView({ type: 'home' })}
        onNavigateAbout={() => setCurrentView({ type: 'about' })}
        onNavigateContact={() => setCurrentView({ type: 'contact' })}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView.type === 'home' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Banner Hero Editorial Principal */}
            <div className="mb-12 p-6 sm:p-10 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 shadow-xl">
              <div className="max-w-4xl">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs mb-3">
                  <Terminal className="w-4 h-4" />
                  <span>4KT.LAT · PUBLICACIÓN INDEPENDIENTE DE ALTA INGENIERÍA</span>
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4">
                  Arquitectura de Software y Sistemas Distribuidos
                </h1>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6 font-light">
                  En <strong className="text-white">4kt</strong> analizamos patrones de infraestructura cloud, inteligencia artificial en producción, ciberseguridad zero trust y optimización de código de alto rendimiento. Todas las investigaciones son redactadas y validadas por <strong className="text-cyan-300">Andrés Martínez</strong>.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-2 border-t border-slate-800/80">
                  <span className="flex items-center gap-1.5 text-slate-200">
                    <UserCheck className="w-4 h-4 text-cyan-400" />
                    Andrés Martínez
                  </span>
                  <span>·</span>
                  <span className="text-slate-300">20 Artículos Técnicos Publicados</span>
                  <span>·</span>
                  <span className="text-slate-300">https://4kt.lat/</span>
                  <span>·</span>
                  <span className="text-cyan-400">andresnaftinez2712@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Filtro activo o resultados de búsqueda */}
            {searchQuery.trim() !== '' && (
              <div className="mb-8 p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400">Resultados para la búsqueda: </span>
                  <strong className="text-cyan-300 font-mono">"{searchQuery}"</strong>
                  <span className="text-slate-500 ml-2">({filteredArticles.length} artículos encontrados)</span>
                </div>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-cyan-400 hover:underline font-mono"
                >
                  Limpiar búsqueda
                </button>
              </div>
            )}

            {/* Artículo Destacado de la Semana */}
            {searchQuery.trim() === '' && selectedCategory === 'todos' && (
              <section className="mb-14" aria-label="Artículo destacado">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    <span>Investigación Destacada</span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    Lectura Recomendada
                  </span>
                </div>

                <ArticleCard
                  article={featuredArticle}
                  featured={true}
                  onSelect={handleSelectArticle}
                />
              </section>
            )}

            {/* Catálogo de Artículos Técnicos */}
            <section aria-label="Catálogo de artículos">
              <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-3">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
                  <BookOpen className="w-5 h-5 text-cyan-400" />
                  <span>
                    {selectedCategory === 'todos'
                      ? 'Catálogo Completo de Artículos y Guías'
                      : `Publicaciones en ${selectedCategory.toUpperCase()}`}
                  </span>
                </h2>
                <span className="text-xs text-slate-400 font-mono">
                  {gridArticles.length} {gridArticles.length === 1 ? 'guía' : 'guías'}
                </span>
              </div>

              {gridArticles.length === 0 ? (
                <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-slate-800">
                  <Terminal className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-slate-300 mb-1">
                    No se encontraron artículos
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    Intenta cambiar los términos de búsqueda o selecciona otra categoría temática.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('todos');
                    }}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg font-mono transition"
                  >
                    Restablecer Filtros
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gridArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onSelect={handleSelectArticle}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Caja de Autor Oficial (Andrés Martínez) */}
            <section className="mt-16 p-8 rounded-2xl bg-slate-900/80 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider font-semibold">
                  <UserCheck className="w-4 h-4" />
                  <span>Dirección Editorial & Autor</span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Andrés Martínez – Creador de 4kt
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Ingeniero de software especializado en sistemas distribuidos, inteligencia artificial aplicada y ciberseguridad en la nube. Todos los análisis de <span className="text-cyan-400 font-mono">4kt.lat</span> son desarrollados con foco en reproducibilidad y código en producción.
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono">
                  <button
                    onClick={() => setCurrentView({ type: 'about' })}
                    className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold"
                  >
                    <span>Trayectoria y metodología</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-slate-600">·</span>
                  <a
                    href="mailto:andresnaftinez2712@gmail.com"
                    className="text-slate-300 hover:text-white"
                  >
                    andresnaftinez2712@gmail.com
                  </a>
                </div>
              </div>

              <div className="lg:col-span-4 flex items-center justify-center lg:justify-end">
                <AuthorAvatar size="xl" showBadge={true} />
              </div>
            </section>
          </div>
        )}

        {/* Vista Detallada de Artículo */}
        {currentView.type === 'article' && (
          (() => {
            const currentArticle =
              ARTICLES_DATA.find((a) => a.slug === currentView.slug) || ARTICLES_DATA[0];
            const related = ARTICLES_DATA.filter((a) => a.id !== currentArticle.id).slice(0, 3);
            return (
              <ArticleDetail
                article={currentArticle}
                relatedArticles={related}
                onBack={() => setCurrentView({ type: 'home' })}
                onSelectArticle={handleSelectArticle}
              />
            );
          })()
        )}

        {/* Páginas Legales e Institucionales Obligatorias */}
        {currentView.type === 'privacy' && (
          <PrivacyPolicy onBack={() => setCurrentView({ type: 'home' })} />
        )}

        {currentView.type === 'terms' && (
          <TermsAndConditions onBack={() => setCurrentView({ type: 'home' })} />
        )}

        {currentView.type === 'cookies' && (
          <CookiePolicy
            onBack={() => setCurrentView({ type: 'home' })}
            onOpenPreferences={handleOpenCookiePreferences}
          />
        )}

        {currentView.type === 'about' && (
          <AboutAuthor
            onBack={() => setCurrentView({ type: 'home' })}
            onNavigateContact={() => setCurrentView({ type: 'contact' })}
          />
        )}

        {currentView.type === 'contact' && (
          <ContactPage onBack={() => setCurrentView({ type: 'home' })} />
        )}
      </main>

      {/* Pie de Página Obligatorio con Copyright a Andrés Martínez */}
      <Footer
        onNavigatePrivacy={() => setCurrentView({ type: 'privacy' })}
        onNavigateTerms={() => setCurrentView({ type: 'terms' })}
        onNavigateCookies={() => setCurrentView({ type: 'cookies' })}
        onNavigateContact={() => setCurrentView({ type: 'contact' })}
        onNavigateAbout={() => setCurrentView({ type: 'about' })}
      />

      {/* Banner de Consentimiento de Cookies (Cumplimiento de Privacidad) */}
      <CookieBanner
        key={cookieConsentKey}
        onOpenPrivacy={() => setCurrentView({ type: 'privacy' })}
        onOpenCookiePolicy={() => setCurrentView({ type: 'cookies' })}
      />
    </div>
  );
}

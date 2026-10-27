import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { SearchBar } from './components/SearchBar';

import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';
import { CategoryPage } from './pages/CategoryPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { EditorialPolicyPage } from './pages/EditorialPolicyPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { SitemapPage } from './pages/SitemapPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#261E1A] font-sans antialiased">
        <Header onOpenSearch={() => setIsSearchOpen(true)} />

        <div className="flex-1">
          <Routes>
            {/* Homepage */}
            <Route path="/" element={<HomePage />} />

            {/* Institutional & Legal Pages (supporting both trailing slash and non-trailing slash) */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about/" element={<AboutPage />} />

            <Route path="/contact" element={<ContactPage />} />
            <Route path="/contact/" element={<ContactPage />} />

            <Route path="/editorial-policy" element={<EditorialPolicyPage />} />
            <Route path="/editorial-policy/" element={<EditorialPolicyPage />} />

            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/privacy-policy/" element={<PrivacyPolicyPage />} />

            <Route path="/cookie-policy" element={<CookiePolicyPage />} />
            <Route path="/cookie-policy/" element={<CookiePolicyPage />} />

            <Route path="/sitemap" element={<SitemapPage />} />
            <Route path="/sitemap/" element={<SitemapPage />} />

            {/* Category Pages */}
            <Route path="/category/:categorySlug" element={<CategoryPage />} />
            <Route path="/category/:categorySlug/" element={<CategoryPage />} />

            {/* Article Slugs */}
            <Route path="/:slug" element={<ArticlePage />} />
            <Route path="/:slug/" element={<ArticlePage />} />

            {/* 404 Fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>

        <Footer />
        <CookieBanner />
        <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </div>
    </BrowserRouter>
  );
}

export default App;

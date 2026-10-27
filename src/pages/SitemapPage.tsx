import React from 'react';
import { Link } from 'react-router-dom';
import { ARTICLES } from '../data/articles';
import { CATEGORIES } from '../data/categories';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Compass, BookOpen, Layers, ShieldCheck } from 'lucide-react';

export const SitemapPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <SEOHead
        title="HTML Sitemap — Thread & Petal"
        description="Complete index of all sewing tutorials, garment repair guides, category archives, and institutional pages on Thread & Petal."
        canonicalPath="/sitemap/"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <Breadcrumbs items={[{ label: 'HTML Sitemap' }]} />

        <header className="space-y-4">
          <span className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-[#E3EBE5] text-[#3F5947]">
            Directory Index
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#261E1A] leading-tight">
            HTML Sitemap
          </h1>
          <p className="text-base sm:text-lg text-[#5C4D44] leading-relaxed">
            A comprehensive, structured index of all accessible pages and published tutorials across Thread &amp; Petal.
          </p>
        </header>

        <div className="bg-[#FFFFFF] rounded-2xl border border-[#EAE3D9] p-6 sm:p-10 space-y-10 shadow-xs">
          {/* Main Pages */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#261E1A] flex items-center space-x-2 border-b border-[#F0EAE1] pb-2">
              <Compass className="w-5 h-5 text-[#577861]" />
              <span>Core Magazine Pages</span>
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <li>
                <Link to="/" className="text-[#3F5947] hover:underline font-medium">
                  Home (Front Page)
                </Link>
                <span className="text-xs text-[#8C7A6B] block">https://4kt.lat/</span>
              </li>
              <li>
                <Link to="/about/" className="text-[#3F5947] hover:underline font-medium">
                  About the Publication
                </Link>
                <span className="text-xs text-[#8C7A6B] block">https://4kt.lat/about/</span>
              </li>
              <li>
                <Link to="/contact/" className="text-[#3F5947] hover:underline font-medium">
                  Contact Editorial Desk
                </Link>
                <span className="text-xs text-[#8C7A6B] block">https://4kt.lat/contact/</span>
              </li>
              <li>
                <Link to="/editorial-policy/" className="text-[#3F5947] hover:underline font-medium">
                  Editorial &amp; Verification Policy
                </Link>
                <span className="text-xs text-[#8C7A6B] block">https://4kt.lat/editorial-policy/</span>
              </li>
            </ul>
          </section>

          {/* Categories */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#261E1A] flex items-center space-x-2 border-b border-[#F0EAE1] pb-2">
              <Layers className="w-5 h-5 text-[#577861]" />
              <span>Editorial Categories</span>
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link to={`/category/${cat.slug}/`} className="text-[#3F5947] hover:underline font-medium">
                    {cat.name}
                  </Link>
                  <span className="text-xs text-[#8C7A6B] block">
                    https://4kt.lat/category/{cat.slug}/
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Published Articles */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#261E1A] flex items-center space-x-2 border-b border-[#F0EAE1] pb-2">
              <BookOpen className="w-5 h-5 text-[#577861]" />
              <span>Published Sewing &amp; Repair Tutorials ({ARTICLES.length})</span>
            </h2>
            <ul className="space-y-3 text-sm">
              {ARTICLES.map((article) => (
                <li key={article.id} className="p-3 rounded-lg bg-[#FAF7F2] border border-[#EAE3D9]">
                  <Link to={`/${article.slug}/`} className="text-[#261E1A] hover:text-[#577861] font-semibold block">
                    {article.title}
                  </Link>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#8C7A6B] mt-1">
                    <span className="text-[#3F5947] font-medium">{article.categoryName}</span>
                    <span>•</span>
                    <span>https://4kt.lat/{article.slug}/</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Legal & Compliance */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#261E1A] flex items-center space-x-2 border-b border-[#F0EAE1] pb-2">
              <ShieldCheck className="w-5 h-5 text-[#577861]" />
              <span>Legal &amp; Policy Pages</span>
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <li>
                <Link to="/privacy-policy/" className="text-[#3F5947] hover:underline font-medium">
                  Privacy Policy
                </Link>
                <span className="text-xs text-[#8C7A6B] block">https://4kt.lat/privacy-policy/</span>
              </li>
              <li>
                <Link to="/cookie-policy/" className="text-[#3F5947] hover:underline font-medium">
                  Cookie Policy &amp; Consent
                </Link>
                <span className="text-xs text-[#8C7A6B] block">https://4kt.lat/cookie-policy/</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

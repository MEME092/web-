import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  Mail,
  BookOpen,
  Sparkles,
  Scissors
} from 'lucide-react';
import { ARTICLES, getFeaturedArticles, getBeginnerGuides } from '../data/articles';
import { CATEGORIES } from '../data/categories';
import { ArticleCard } from '../components/ArticleCard';
import { SEOHead } from '../components/SEOHead';

export const HomePage: React.FC = () => {
  const featuredArticles = getFeaturedArticles();
  const beginnerGuides = getBeginnerGuides();
  const primaryFeatured = featuredArticles[0];
  const secondaryFeatured = featuredArticles.slice(1, 3);

  const scrollToGuides = () => {
    const el = document.getElementById('latest-guides');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <SEOHead
        title="Thread & Petal — Practical Sewing, Clothing Repair & Fabric Crafts"
        description="Practical sewing tutorials, step-by-step clothing repair guides, garment alterations, and creative fabric crafts designed for makers of all skill levels."
        canonicalPath="/"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 sm:space-y-20">
        {/* A. Bloque Editorial Principal */}
        <section aria-labelledby="editorial-hero-title" className="w-full">
          <div className="bg-[#FFFFFF] rounded-3xl border border-[#EAE3D9] overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Column: Editorial Headline & Copy */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E3EBE5] text-[#3F5947]">
                    Digital Editorial Magazine
                  </span>
                  <span className="text-xs text-[#8C7A6B]">
                    Issue 2026
                  </span>
                </div>

                <h1
                  id="editorial-hero-title"
                  className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#261E1A] leading-[1.15]"
                >
                  Make, Mend &amp; Create Something Beautiful
                </h1>

                <p className="text-base sm:text-lg text-[#5C4D44] leading-relaxed pt-1">
                  Thread &amp; Petal is an independent publication dedicated to the quiet art of keeping clothes in active rotation. From reattaching popped coat buttons and invisible knit mending to hemming slacks by hand and sewing durable canvas totes, we provide step-by-step guidance designed to make textile work approachable, satisfying, and enduring.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#261E1A] font-medium">
                  <span className="inline-flex items-center space-x-1.5">
                    <CheckCircle className="w-4 h-4 text-[#577861]" />
                    <span>Real studio photography</span>
                  </span>
                  <span className="inline-flex items-center space-x-1.5">
                    <CheckCircle className="w-4 h-4 text-[#577861]" />
                    <span>Hand &amp; machine techniques</span>
                  </span>
                  <span className="inline-flex items-center space-x-1.5">
                    <CheckCircle className="w-4 h-4 text-[#577861]" />
                    <span>Zero filler or AI fluff</span>
                  </span>
                </div>
              </div>

              {/* Functional CTA Button */}
              <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-[#F0EAE1]">
                <button
                  type="button"
                  onClick={scrollToGuides}
                  className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-[#2D4A3E] hover:bg-[#1F382E] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#577861]"
                >
                  <span>Explore Sewing Guides</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  to="/category/clothing-repair/"
                  className="inline-flex items-center space-x-1.5 px-5 py-3.5 rounded-xl border border-[#D6CCC0] hover:bg-[#F3F6F4] text-xs font-bold uppercase tracking-wider text-[#5C4D44] transition-colors"
                >
                  <span>Mending Guides</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Hero High-Quality Studio Photograph */}
            <div className="lg:col-span-6 relative bg-[#EAE5DE] min-h-[320px] sm:min-h-[420px] overflow-hidden">
              <img
                src="/assets/images/hero-sewing-craft.jpg"
                alt="Artisan sewing table with folded linen fabrics, wooden spools of thread, brass shears, measuring tape, and needle cushion"
                className="w-full h-full object-cover object-center"
                fetchPriority="high"
              />
              <div className="absolute bottom-4 right-4 bg-[#FAF7F2]/90 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-[#EAE3D9] text-[11px] text-[#5C4D44] hidden sm:block">
                Studio Flatlay • Natural Linen &amp; Tooling
              </div>
            </div>
          </div>
        </section>

        {/* B. Featured Guides */}
        <section aria-labelledby="featured-heading" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#EAE3D9] pb-4 gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#577861]">
                Editor's Selection
              </span>
              <h2 id="featured-heading" className="font-serif text-2xl sm:text-3xl font-semibold text-[#261E1A]">
                Featured Guides
              </h2>
            </div>
            <p className="text-xs text-[#5C4D44]">
              Essential projects for practical garment care and creative textile embellishment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            {/* Primary Large Card */}
            {primaryFeatured && (
              <div className="lg:col-span-7 flex">
                <ArticleCard article={primaryFeatured} featured={true} />
              </div>
            )}

            {/* Secondary Column Cards */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              {secondaryFeatured.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>

        {/* C. Latest Sewing Guides */}
        <section id="latest-guides" aria-labelledby="latest-heading" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#EAE3D9] pb-4 gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#577861]">
                Complete Library
              </span>
              <h2 id="latest-heading" className="font-serif text-2xl sm:text-3xl font-semibold text-[#261E1A]">
                Latest Sewing Guides
              </h2>
            </div>
            <span className="text-xs text-[#8C7A6B]">
              Showing all {ARTICLES.length} published guides with original photography
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {ARTICLES.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        {/* D. Browse by Category */}
        <section aria-labelledby="categories-heading" className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#577861]">
              Curated Collections
            </span>
            <h2 id="categories-heading" className="font-serif text-2xl sm:text-3xl font-semibold text-[#261E1A]">
              Browse by Category
            </h2>
            <p className="text-xs text-[#5C4D44]">
              Structured tutorials organized from core foundational stitches to completed textile projects.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((category) => {
              const articleCount = ARTICLES.filter((a) => a.categoryId === category.id).length;
              return (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}/`}
                  className="group bg-[#FFFFFF] rounded-2xl border border-[#EAE3D9] overflow-hidden hover:border-[#577861] hover:shadow-md transition-all flex flex-col"
                >
                  {/* Category Photograph */}
                  <div className="aspect-[16/9] w-full overflow-hidden bg-[#EAE5DE]">
                    <img
                      src={category.image}
                      alt={category.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#3F5947]">
                          {category.name}
                        </span>
                        <span className="text-xs text-[#8C7A6B] bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#EAE3D9]">
                          {articleCount} {articleCount === 1 ? 'guide' : 'guides'}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl font-semibold text-[#261E1A] group-hover:text-[#577861] transition-colors mb-2">
                        {category.name}
                      </h3>
                      <p className="text-xs text-[#5C4D44] leading-relaxed mb-4">
                        {category.description}
                      </p>
                    </div>

                    <div className="text-xs font-bold uppercase tracking-wider text-[#2D4A3E] flex items-center space-x-1.5 pt-3 border-t border-[#F0EAE1]">
                      <span>View Category</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* E. Beginner-Friendly Projects */}
        <section aria-labelledby="beginner-heading" className="bg-[#FFFFFF] rounded-3xl border border-[#EAE3D9] p-8 sm:p-12 space-y-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#F0EAE1] pb-6 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#577861]">
                Accessible Skills
              </span>
              <h2 id="beginner-heading" className="font-serif text-2xl sm:text-3xl font-semibold text-[#261E1A]">
                Beginner-Friendly Projects
              </h2>
            </div>
            <p className="text-xs text-[#5C4D44] max-w-md">
              Start with high-success foundational tasks that build confidence in needle control, thread tension, and straight cuts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {beginnerGuides.slice(0, 3).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        {/* F. About Thread & Petal */}
        <section aria-labelledby="about-publication-heading" className="bg-[#F5EFEB] rounded-3xl border border-[#EAE3D9] p-8 sm:p-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Monogram Portrait */}
            <div className="md:col-span-4 text-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full bg-[#FAF7F2] border-2 border-[#577861] flex items-center justify-center shadow-inner">
                <span className="font-serif text-3xl font-bold text-[#3F5947]">T&amp;P</span>
              </div>
              <h3 id="about-publication-heading" className="font-serif text-xl font-semibold text-[#261E1A] mt-4">
                Thread &amp; Petal
              </h3>
              <p className="text-xs text-[#577861] font-semibold uppercase tracking-wider">
                Edited by Andres Martinez
              </p>
              <div className="mt-3">
                <a
                  href="mailto:andresy1999f@gmail.com"
                  className="inline-flex items-center space-x-1.5 text-xs text-[#5C4D44] hover:text-[#577861] underline font-medium"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C87878]" />
                  <span>andresy1999f@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Editorial Mission Statement */}
            <div className="md:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#577861]">
                Editorial Purpose
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#261E1A]">
                Practical Sewing for Everyday Wear &amp; Lasting Garments
              </h2>
              <p className="text-sm text-[#5C4D44] leading-relaxed">
                Thread &amp; Petal was founded as a focused, independent digital publication centered exclusively on textile craftsmanship, clothing repair, and fabric crafts. We believe that clothing shouldn't be discarded over a loose button, a frayed seam, or an imperfect hem.
              </p>
              <p className="text-sm text-[#5C4D44] leading-relaxed">
                Our guides are planned and written with real materials, specific measurements, common pitfalls, and practical diagrams. We maintain zero tolerance for mass-produced generic filler, and we invite your questions and suggestions directly at our editorial desk.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  to="/about/"
                  className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#2D4A3E] hover:underline"
                >
                  <span>Read About the Publication</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[#D6CCC0]">•</span>
                <Link
                  to="/editorial-policy/"
                  className="text-xs font-semibold uppercase tracking-wider text-[#5C4D44] hover:text-[#261E1A] hover:underline"
                >
                  <span>Editorial Verification Policy</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

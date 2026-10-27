import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, BookOpen, Scissors } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { ARTICLES } from '../data/articles';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#FAF7F2] px-4 py-16">
      <SEOHead
        title="Page Not Found (404) — Thread & Petal"
        description="The page you are looking for does not exist on Thread & Petal. Browse our sewing and clothing repair tutorials."
        canonicalPath="/404"
      />

      <div className="max-w-xl mx-auto text-center space-y-6 bg-[#FFFFFF] p-8 sm:p-12 rounded-3xl border border-[#EAE3D9] shadow-sm">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF7F2] border border-[#577861] flex items-center justify-center text-[#577861]">
          <Scissors className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-[#964E4E] bg-[#F7EBEB] px-3 py-1 rounded-full border border-[#E8B4B4]">
          Error 404 • Uncharted Thread
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#261E1A]">
          This Page Could Not Be Found
        </h1>

        <p className="text-sm text-[#5C4D44] leading-relaxed">
          The guide or page you requested may have moved, or the URL might have been mistyped. Explore our popular sewing tutorials below or return to the magazine cover.
        </p>

        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#2D4A3E] hover:bg-[#1F382E] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            to="/sitemap/"
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-[#D6CCC0] hover:bg-[#F3F6F4] text-xs font-semibold text-[#5C4D44] transition-colors"
          >
            <Compass className="w-4 h-4 text-[#577861]" />
            <span>View HTML Sitemap</span>
          </Link>
        </div>

        <div className="pt-6 border-t border-[#F0EAE1] text-left">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#577861] mb-3 text-center">
            Popular Sewing Guides
          </h2>
          <ul className="space-y-2 text-xs text-[#5C4D44]">
            {ARTICLES.slice(0, 3).map((article) => (
              <li key={article.id}>
                <Link to={`/${article.slug}/`} className="text-[#3F5947] hover:underline font-medium block">
                  • {article.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

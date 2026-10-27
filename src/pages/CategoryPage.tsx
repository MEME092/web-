import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getCategoryById, CATEGORIES } from '../data/categories';
import { getArticlesByCategory } from '../data/articles';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ArticleCard } from '../components/ArticleCard';
import { ArrowRight, BookOpen } from 'lucide-react';

export const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();

  const category = categorySlug ? getCategoryById(categorySlug) : undefined;

  if (!category) {
    return <Navigate to="/404" replace />;
  }

  const categoryArticles = getArticlesByCategory(category.id);
  const otherCategories = CATEGORIES.filter((c) => c.id !== category.id);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <SEOHead
        title={`${category.name} Guides & Tutorials`}
        description={category.description}
        canonicalPath={`/category/${category.slug}/`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <Breadcrumbs items={[{ label: 'Categories' }, { label: category.name }]} />

        {/* Category Masthead with Photography */}
        <header className="bg-[#FFFFFF] rounded-3xl border border-[#EAE3D9] overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12 items-stretch">
          <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center space-y-4">
            <span className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-[#E3EBE5] text-[#3F5947] self-start">
              Category Archive
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#261E1A]">
              {category.name}
            </h1>
            <p className="text-base sm:text-lg text-[#5C4D44] leading-relaxed">
              {category.description}
            </p>
            <div className="pt-2 text-xs text-[#8C7A6B]">
              Featuring <strong>{categoryArticles.length}</strong> complete, step-by-step guides with original studio photography and technical schematics.
            </div>
          </div>

          <div className="md:col-span-5 relative bg-[#EAE5DE] min-h-[220px]">
            <img
              src={category.image}
              alt={`${category.name} editorial photography`}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </header>

        {/* Articles Grid */}
        <section aria-labelledby="category-articles-heading" className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#EAE3D9] pb-3">
            <h2 id="category-articles-heading" className="font-serif text-2xl font-semibold text-[#261E1A]">
              Published Tutorials in {category.name}
            </h2>
            <span className="text-xs text-[#8C7A6B]">
              {categoryArticles.length} {categoryArticles.length === 1 ? 'article' : 'articles'}
            </span>
          </div>

          {categoryArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {categoryArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="bg-[#FFFFFF] p-8 rounded-2xl border border-[#EAE3D9] text-center text-[#5C4D44]">
              <p>Articles for this category are currently in development by our editorial desk.</p>
              <Link to="/" className="text-xs font-semibold uppercase text-[#3F5947] hover:underline mt-2 inline-block">
                Return to Homepage
              </Link>
            </div>
          )}
        </section>

        {/* Other Categories Navigation */}
        <section className="pt-8 border-t border-[#EAE3D9]">
          <h2 className="font-serif text-2xl font-semibold text-[#261E1A] mb-6">
            Explore Other Disciplines
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {otherCategories.map((other) => (
              <Link
                key={other.id}
                to={`/category/${other.slug}/`}
                className="group bg-[#FFFFFF] rounded-2xl border border-[#EAE3D9] overflow-hidden hover:border-[#577861] hover:shadow-md transition-all flex flex-col"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-[#EAE5DE]">
                  <img
                    src={other.image}
                    alt={other.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-base font-semibold text-[#261E1A] group-hover:text-[#577861] transition-colors mb-1">
                      {other.name}
                    </h3>
                    <p className="text-xs text-[#5C4D44] line-clamp-2">
                      {other.description}
                    </p>
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#2D4A3E] flex items-center space-x-1 pt-3 border-t border-[#F0EAE1] mt-3">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

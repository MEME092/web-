import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Printer,
  Share2,
  Check,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  BookOpen,
  Scissors,
  ListOrdered,
  Layers,
  Sparkles,
  Mail,
  ChevronDown
} from 'lucide-react';
import { getArticleBySlug, ARTICLES } from '../data/articles';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { StepTracker } from '../components/StepTracker';
import { ArticleIllustration } from '../components/ArticleIllustration';
import { ArticleCard } from '../components/ArticleCard';
import { AdPlacement } from '../components/AdPlacement';

export const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);

  // Look up article by slug
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return <Navigate to="/404" replace />;
  }

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`https://4kt.lat/${article.slug}/`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Related articles lookup
  const relatedArticles = article.relatedSlugs
    .map((s) => getArticleBySlug(s))
    .filter((a): a is typeof article => a !== undefined);

  // ISO 8601 duration parser
  const getIsoDuration = (timeStr: string): string => {
    const match = timeStr.match(/(\d+)/);
    const minutes = match ? match[1] : '20';
    return `PT${minutes}M`;
  };

  // JSON-LD HowTo Schema (without artificial cost claims)
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: article.title,
    description: article.excerpt,
    image: `https://4kt.lat${article.image}`,
    totalTime: getIsoDuration(article.estimatedTime),
    supply: article.materials.map((m) => ({
      '@type': 'HowToSupply',
      name: m.name
    })),
    tool: article.tools.map((t) => ({
      '@type': 'HowToTool',
      name: t.name
    })),
    step: article.steps.map((s) => ({
      '@type': 'HowToStep',
      name: s.title,
      text: s.description,
      position: s.stepNumber
    })),
    author: {
      '@type': 'Person',
      name: article.author.name
    },
    publisher: {
      '@type': 'Organization',
      name: 'Thread & Petal',
      url: 'https://4kt.lat/'
    },
    datePublished: article.publishedDate,
    dateModified: article.updatedDate
  };

  return (
    <article className="min-h-screen bg-[#FAF7F2]">
      <SEOHead
        title={article.title}
        description={article.excerpt}
        canonicalPath={`/${article.slug}/`}
        ogType="article"
        publishedTime={article.publishedDate}
        modifiedTime={article.updatedDate}
        schema={howToSchema}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* A. Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: article.categoryName, to: `/category/${article.categoryId}/` },
            { label: article.title }
          ]}
        />

        {/* B. Cabecera Editorial */}
        <header className="mt-4 mb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to={`/category/${article.categoryId}/`}
              className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-[#E3EBE5] text-[#3F5947] hover:bg-[#C5D7C9] transition-colors"
            >
              {article.categoryName}
            </Link>
            <span className="text-xs text-[#5C4D44] bg-[#FFFFFF] px-2.5 py-1 rounded-md border border-[#D6CCC0]">
              Difficulty: <strong>{article.difficulty}</strong>
            </span>
            <span className="text-xs text-[#5C4D44] bg-[#FFFFFF] px-2.5 py-1 rounded-md border border-[#D6CCC0]">
              Est. Time: <strong>{article.estimatedTime}</strong>
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#261E1A] leading-[1.18]">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-[#5C4D44] leading-relaxed">
            {article.excerpt}
          </p>

          {/* Author Byline & Utility Actions */}
          <div className="pt-4 border-t border-b border-[#EAE3D9] py-3.5 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#5C4D44] gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#577861] flex items-center justify-center font-serif font-bold text-[#3F5947]">
                AM
              </div>
              <div>
                <p className="font-semibold text-[#261E1A]">
                  Written by {article.author.name}
                </p>
                <div className="flex flex-wrap items-center gap-x-2 text-[#8C7A6B]">
                  <span>Published {article.publishedDate}</span>
                  <span>•</span>
                  <span>Updated {article.updatedDate}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>

            {/* Utility buttons */}
            <div className="flex items-center space-x-2 print:hidden">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#D6CCC0] bg-[#FFFFFF] hover:bg-[#F3F6F4] text-[#5C4D44] transition-colors"
                title="Print this tutorial"
              >
                <Printer className="w-3.5 h-3.5 text-[#577861]" />
                <span>Print Guide</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#D6CCC0] bg-[#FFFFFF] hover:bg-[#F3F6F4] text-[#5C4D44] transition-colors"
                title="Copy shareable link"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#577861]" />
                    <span className="text-[#3F5947] font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-[#577861]" />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* C. Imagen Principal Fotográfica */}
        <div className="mb-10 rounded-2xl overflow-hidden border border-[#EAE3D9] bg-[#EAE5DE] shadow-sm">
          <img
            src={article.image}
            alt={article.imageAlt}
            className="w-full h-auto aspect-[16/10] object-cover object-center"
            fetchPriority="high"
          />
          <div className="px-4 py-2 bg-[#F5EFEB] border-t border-[#EAE3D9] flex items-center justify-between text-[11px] text-[#5C4D44]">
            <span>{article.imageAlt}</span>
            <span className="text-[#8C7A6B]">Thread &amp; Petal Editorial Studio</span>
          </div>
        </div>

        {/* E. Tabla de Contenidos */}
        <nav aria-label="Table of Contents" className="mb-10 p-5 sm:p-6 bg-[#FFFFFF] rounded-2xl border border-[#EAE3D9] shadow-xs">
          <div className="flex items-center space-x-2 text-[#261E1A] font-serif font-semibold text-base mb-3 border-b border-[#F0EAE1] pb-2">
            <ListOrdered className="w-4 h-4 text-[#577861]" />
            <span>Table of Contents</span>
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[#5C4D44]">
            <li>
              <a href="#overview" className="hover:text-[#577861] hover:underline flex items-center space-x-1">
                <span>1.</span>
                <span>Editorial Overview &amp; What to Expect</span>
              </a>
            </li>
            <li>
              <a href="#materials" className="hover:text-[#577861] hover:underline flex items-center space-x-1">
                <span>2.</span>
                <span>Materials &amp; Essential Tools</span>
              </a>
            </li>
            <li>
              <a href="#preparation" className="hover:text-[#577861] hover:underline flex items-center space-x-1">
                <span>3.</span>
                <span>Garment &amp; Workspace Preparation</span>
              </a>
            </li>
            <li>
              <a href="#instructions" className="hover:text-[#577861] hover:underline flex items-center space-x-1">
                <span>4.</span>
                <span>Step-by-Step Instructions</span>
              </a>
            </li>
            <li>
              <a href="#technical-diagram" className="hover:text-[#577861] hover:underline flex items-center space-x-1">
                <span>5.</span>
                <span>Technical Schematic Diagram</span>
              </a>
            </li>
            <li>
              <a href="#mistakes" className="hover:text-[#577861] hover:underline flex items-center space-x-1">
                <span>6.</span>
                <span>Common Mistakes &amp; Fixes</span>
              </a>
            </li>
            <li>
              <a href="#troubleshooting" className="hover:text-[#577861] hover:underline flex items-center space-x-1">
                <span>7.</span>
                <span>Practical Troubleshooting Notes</span>
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-[#577861] hover:underline flex items-center space-x-1">
                <span>8.</span>
                <span>Frequently Asked Questions</span>
              </a>
            </li>
          </ol>
        </nav>

        {/* D. Introducción Editorial Completa */}
        <section id="overview" className="space-y-4 text-base sm:text-lg text-[#382C26] leading-relaxed mb-10">
          <h2 className="font-serif text-2xl font-semibold text-[#261E1A] border-b border-[#EAE3D9] pb-2">
            Editorial Overview
          </h2>
          {article.introParagraphs.map((para, idx) => (
            <p key={idx} className={idx === 0 ? 'first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:mr-2.5 first-letter:float-left first-letter:text-[#3F5947]' : ''}>
              {para}
            </p>
          ))}
          <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E3EBE5] text-xs text-[#5C4D44]">
            <strong>Who this guide is for:</strong> Beginners seeking a lasting, professional-looking repair or craft project using standard domestic sewing tools. With basic hand dexterity and the steps below, you will achieve durable results without needing specialized industrial machinery.
          </div>
        </section>

        {/* F. Materials and Tools */}
        <section id="materials" aria-labelledby="materials-heading" className="my-10 bg-[#FFFFFF] rounded-2xl border border-[#EAE3D9] p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Materials List */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Scissors className="w-5 h-5 text-[#577861]" />
                <h2 id="materials-heading" className="font-serif text-xl font-semibold text-[#261E1A]">
                  Materials Needed
                </h2>
              </div>
              <ul className="space-y-3">
                {article.materials.map((mat, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#577861] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#261E1A]">{mat.name}:</strong>{' '}
                      <span className="text-[#5C4D44]">{mat.detail}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools List */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="w-5 h-5 text-[#577861]" />
                <h2 className="font-serif text-xl font-semibold text-[#261E1A]">
                  Tools &amp; Equipment
                </h2>
              </div>
              <ul className="space-y-3">
                {article.tools.map((tool, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#577861] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#261E1A]">{tool.name}:</strong>{' '}
                      <span className="text-[#5C4D44]">{tool.detail}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* G. Preparation Checklist */}
          {article.preparation.length > 0 && (
            <div id="preparation" className="mt-8 pt-6 border-t border-[#F0EAE1]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#577861] mb-3">
                Workspace &amp; Garment Preparation
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#5C4D44]">
                {article.preparation.map((prep, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#FAF7F2] border border-[#D6CCC0] flex items-center justify-center text-[10px] font-bold text-[#577861] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{prep}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* H. Step-by-Step Instructions */}
        <section id="instructions" aria-label="Step Instructions">
          <StepTracker steps={article.steps} />
        </section>

        {/* I. Diagramas Técnicos Complementarios */}
        <section id="technical-diagram" aria-labelledby="diagram-title" className="my-10">
          <div className="mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#577861]">
              Complementary Schematic
            </span>
            <h2 id="diagram-title" className="font-serif text-2xl font-semibold text-[#261E1A]">
              Technical Stitch Architecture
            </h2>
            <p className="text-xs text-[#5C4D44] mt-1">
              Visual cross-section showing mechanical alignment and thread clearances.
            </p>
          </div>
          <ArticleIllustration type={article.illustrationType} />
        </section>

        {/* AdSense Placement Slot Container */}
        <AdPlacement slotId="" className="my-6" />

        {/* J. Common Mistakes */}
        {article.mistakes.length > 0 && (
          <section id="mistakes" aria-labelledby="mistakes-heading" className="my-10 bg-[#FFFFFF] rounded-2xl border border-[#EAE3D9] p-6 sm:p-8 shadow-xs">
            <div className="flex items-center space-x-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-[#C87878]" />
              <h2 id="mistakes-heading" className="font-serif text-2xl font-semibold text-[#261E1A]">
                Common Mistakes &amp; How to Avoid Them
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#5C4D44] mb-6">
              Learn from frequent beginner pitfalls to save time and prevent irreversible fabric damage.
            </p>

            <div className="space-y-4">
              {article.mistakes.map((m, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-2">
                  <div className="font-semibold text-sm text-[#261E1A]">
                    Mistake: <span className="text-[#964E4E]">{m.mistake}</span>
                  </div>
                  <div className="text-xs text-[#5C4D44]">
                    <strong>Why it fails:</strong> {m.consequence}
                  </div>
                  <div className="text-xs text-[#3F5947] bg-[#FFFFFF] p-2.5 rounded-lg border border-[#E3EBE5] flex items-start space-x-1.5">
                    <Check className="w-4 h-4 text-[#577861] shrink-0 mt-0.5" />
                    <span><strong>Pro Solution:</strong> {m.solution}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* K. Troubleshooting */}
        {article.troubleshootingTips.length > 0 && (
          <section id="troubleshooting" aria-labelledby="troubleshooting-heading" className="my-8 bg-[#F5EFEB] rounded-2xl border border-[#EAE3D9] p-6 sm:p-8">
            <h2 id="troubleshooting-heading" className="font-serif text-xl font-semibold text-[#261E1A] mb-3">
              Practical Troubleshooting Notes
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#5C4D44]">
              {article.troubleshootingTips.map((tip, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-[#577861] font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* L. Frequently Asked Questions */}
        {article.faqs.length > 0 && (
          <section id="faq" aria-labelledby="faq-heading" className="my-10 bg-[#FFFFFF] rounded-2xl border border-[#EAE3D9] p-6 sm:p-8 shadow-xs">
            <div className="flex items-center space-x-2 mb-6">
              <HelpCircle className="w-5 h-5 text-[#577861]" />
              <h2 id="faq-heading" className="font-serif text-2xl font-semibold text-[#261E1A]">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {article.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EAE3D9]">
                  <h3 className="font-serif text-base font-semibold text-[#261E1A] mb-1.5">
                    {faq.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C4D44] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* N. Practical Conclusion & About the Editor */}
        <section className="my-10 p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#EAE3D9] space-y-6 shadow-xs">
          <div>
            <h2 className="font-serif text-xl font-semibold text-[#261E1A] mb-2">
              Conclusion &amp; Practical Advice
            </h2>
            <p className="text-sm text-[#5C4D44] leading-relaxed">
              Every garment repaired is a small victory for slow fashion, mindful consumption, and financial resourcefulness. Don't worry if your first attempt takes a few minutes longer than expected—hand sewing improves dramatically with practice. Press your work with steam when finished to meld the stitches into the fabric for a refined, professional finish.
            </p>
          </div>

          <div className="pt-6 border-t border-[#F0EAE1] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#5C4D44]">
              <p className="font-semibold text-[#261E1A] text-sm">
                Questions or suggestions on this guide?
              </p>
              <p>
                Edited by <strong>Andres Martinez</strong> at Thread &amp; Petal. We read and review all reader notes.
              </p>
            </div>
            <a
              href="mailto:andresy1999f@gmail.com"
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-lg bg-[#2D4A3E] hover:bg-[#1F382E] text-white text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
            >
              <Mail className="w-3.5 h-3.5 text-[#C87878]" />
              <span>Email Andres Martinez</span>
            </a>
          </div>
        </section>

        {/* M. Related Guides */}
        {relatedArticles.length > 0 && (
          <section aria-labelledby="related-heading" className="my-12 pt-8 border-t border-[#EAE3D9]">
            <div className="flex items-center justify-between mb-6">
              <h2 id="related-heading" className="font-serif text-2xl font-semibold text-[#261E1A]">
                Related Guides
              </h2>
              <Link
                to={`/category/${article.categoryId}/`}
                className="text-xs font-bold uppercase tracking-wider text-[#2D4A3E] hover:underline flex items-center space-x-1"
              >
                <span>More in {article.categoryName}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {relatedArticles.map((rel) => (
                <ArticleCard key={rel.id} article={rel} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
};

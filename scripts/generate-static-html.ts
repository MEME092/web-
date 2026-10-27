/**
 * Static HTML Pre-renderer & Sitemap Generator for Thread & Petal (https://4kt.lat/)
 * Runs after `vite build` to generate standalone, SEO-rich static HTML files for every route
 * into the `dist/` folder.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ARTICLES } from '../src/data/articles.ts';
import { CATEGORIES } from '../src/data/categories.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');
const BASE_HTML_PATH = path.join(DIST_DIR, 'index.html');
const SITE_URL = 'https://4kt.lat';

if (!fs.existsSync(BASE_HTML_PATH)) {
  console.error(`Base build template not found at ${BASE_HTML_PATH}. Run 'vite build' first.`);
  process.exit(1);
}

const baseHtml = fs.readFileSync(BASE_HTML_PATH, 'utf-8');

interface PageConfig {
  relativePath: string; // e.g. 'about/index.html' or 'index.html'
  canonicalUrl: string;
  title: string;
  description: string;
  ogImage: string;
  ogType: 'website' | 'article';
  schema: Record<string, unknown> | null;
  prerenderHtml: string;
}

const escapeHtml = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

const renderNavigation = () => `
  <header class="bg-[#FAF7F2] border-b border-[#EAE3D9] py-4 px-6">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <a href="/" class="text-xl font-serif font-bold text-[#261E1A]">Thread &amp; Petal</a>
      <nav class="hidden md:flex items-center space-x-6 text-sm text-[#5C4D44]">
        <a href="/" class="hover:text-[#3F5947]">Home</a>
        <a href="/category/sewing-basics/" class="hover:text-[#3F5947]">Sewing Basics</a>
        <a href="/category/clothing-repair/" class="hover:text-[#3F5947]">Clothing Repair</a>
        <a href="/category/patterns-projects/" class="hover:text-[#3F5947]">Patterns &amp; Projects</a>
        <a href="/category/fabric-crafts/" class="hover:text-[#3F5947]">Fabric Crafts</a>
        <a href="/category/floral-fabric-art/" class="hover:text-[#3F5947]">Floral Fabric Art</a>
        <a href="/about/" class="hover:text-[#3F5947]">About</a>
      </nav>
    </div>
  </header>
`;

const renderFooter = () => `
  <footer class="bg-[#261E1A] text-[#FAF7F2] py-12 px-6 mt-16 border-t border-[#3D312A]">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
      <div class="space-y-3">
        <p class="font-serif text-lg font-bold">Thread &amp; Petal</p>
        <p class="text-[#A8988C] text-xs">Practical sewing tutorials, step-by-step clothing repair guides, garment alterations, and creative fabric crafts.</p>
        <p class="text-[#8C7A6B] text-xs">Editor: Andres Martinez &bull; <a href="mailto:andresy1999f@gmail.com" class="underline text-[#C5D7C9]">andresy1999f@gmail.com</a></p>
      </div>
      <div>
        <p class="font-semibold mb-3">Categories</p>
        <ul class="space-y-1 text-xs text-[#A8988C]">
          <li><a href="/category/sewing-basics/" class="hover:underline">Sewing Basics</a></li>
          <li><a href="/category/clothing-repair/" class="hover:underline">Clothing Repair</a></li>
          <li><a href="/category/patterns-projects/" class="hover:underline">Patterns &amp; Projects</a></li>
          <li><a href="/category/fabric-crafts/" class="hover:underline">Fabric Crafts</a></li>
          <li><a href="/category/floral-fabric-art/" class="hover:underline">Floral Fabric Art</a></li>
        </ul>
      </div>
      <div>
        <p class="font-semibold mb-3">Editorial &amp; Contact</p>
        <ul class="space-y-1 text-xs text-[#A8988C]">
          <li><a href="/about/" class="hover:underline">About Us</a></li>
          <li><a href="/contact/" class="hover:underline">Contact</a></li>
          <li><a href="/editorial-policy/" class="hover:underline">Editorial Policy</a></li>
          <li><a href="/sitemap/" class="hover:underline">HTML Sitemap</a></li>
        </ul>
      </div>
      <div>
        <p class="font-semibold mb-3">Privacy &amp; Terms</p>
        <ul class="space-y-1 text-xs text-[#A8988C]">
          <li><a href="/privacy-policy/" class="hover:underline">Privacy Policy</a></li>
          <li><a href="/cookie-policy/" class="hover:underline">Cookie Policy</a></li>
        </ul>
      </div>
    </div>
  </footer>
`;

const pages: PageConfig[] = [];

// 1. Homepage
pages.push({
  relativePath: 'index.html',
  canonicalUrl: `${SITE_URL}/`,
  title: 'Thread & Petal — Practical Sewing, Clothing Repair & Fabric Crafts',
  description: 'Practical sewing tutorials, step-by-step clothing repair guides, garment alterations, and creative fabric crafts designed for makers of all skill levels.',
  ogImage: `${SITE_URL}/assets/images/hero-sewing-craft.jpg`,
  ogType: 'website',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Thread & Petal',
    url: `${SITE_URL}/`,
    description: 'Practical Sewing, Clothing Repair & Fabric Crafts',
    publisher: {
      '@type': 'Organization',
      name: 'Thread & Petal',
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/favicon.svg`,
      founder: {
        '@type': 'Person',
        name: 'Andres Martinez',
        email: 'andresy1999f@gmail.com'
      }
    }
  },
  prerenderHtml: `
    ${renderNavigation()}
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <section class="text-center space-y-4 max-w-3xl mx-auto">
        <h1 class="text-4xl sm:text-5xl font-serif font-bold text-[#261E1A]">Make, Mend &amp; Create Something Beautiful</h1>
        <p class="text-lg text-[#5C4D44] leading-relaxed">
          Welcome to Thread &amp; Petal, an independent publication dedicated to hands-on sewing education, mindful garment repair, and accessible textile crafts.
        </p>
      </section>
      <section class="space-y-6">
        <h2 class="text-2xl font-serif font-semibold text-[#261E1A] border-b pb-2">Latest Practical Tutorials</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${ARTICLES.map(a => `
            <article class="bg-white rounded-xl border border-[#EAE3D9] overflow-hidden p-4 space-y-3">
              <a href="/${a.slug}/">
                <img src="${a.image}" alt="${escapeHtml(a.imageAlt)}" class="w-full h-48 object-cover rounded-lg" loading="lazy" />
                <span class="text-xs font-bold uppercase tracking-wider text-[#3F5947] mt-2 block">${escapeHtml(a.categoryName)}</span>
                <h3 class="text-xl font-serif font-semibold text-[#261E1A] hover:text-[#3F5947]">${escapeHtml(a.title)}</h3>
                <p class="text-sm text-[#5C4D44] line-clamp-3">${escapeHtml(a.excerpt)}</p>
              </a>
            </article>
          `).join('')}
        </div>
      </section>
    </main>
    ${renderFooter()}
  `
});

// 2. About Page
pages.push({
  relativePath: 'about/index.html',
  canonicalUrl: `${SITE_URL}/about/`,
  title: 'About Us — Thread & Petal',
  description: 'Learn about Thread & Petal, our independent mission for practical sewing education, mindful garment mending, and textile crafts.',
  ogImage: `${SITE_URL}/assets/images/hero-sewing-craft.jpg`,
  ogType: 'website',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Thread & Petal',
    url: `${SITE_URL}/about/`,
    mainEntity: {
      '@type': 'Organization',
      name: 'Thread & Petal',
      founder: {
        '@type': 'Person',
        name: 'Andres Martinez',
        email: 'andresy1999f@gmail.com'
      }
    }
  },
  prerenderHtml: `
    ${renderNavigation()}
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <h1 class="text-4xl font-serif font-bold text-[#261E1A]">About Thread &amp; Petal</h1>
      <p class="text-lg text-[#5C4D44] leading-relaxed">
        Thread &amp; Petal is an independent digital magazine focused on practical sewing tutorials, clothing repair, garment alterations, and creative fabric crafts for everyday life.
      </p>
      <div class="bg-white p-6 rounded-xl border border-[#EAE3D9] space-y-4 text-sm text-[#382C26]">
        <h2 class="text-xl font-serif font-semibold text-[#261E1A]">Editorial Responsibility</h2>
        <p>Published and edited by <strong>Andres Martinez</strong>. Inquiries: <a href="mailto:andresy1999f@gmail.com" class="text-[#3F5947] underline">andresy1999f@gmail.com</a>.</p>
      </div>
    </main>
    ${renderFooter()}
  `
});

// 3. Contact Page
pages.push({
  relativePath: 'contact/index.html',
  canonicalUrl: `${SITE_URL}/contact/`,
  title: 'Contact Editorial Desk — Thread & Petal',
  description: 'Get in touch with the Thread & Petal editorial team. Send tutorial feedback, suggestions, or questions to editor Andres Martinez.',
  ogImage: `${SITE_URL}/assets/images/hero-sewing-craft.jpg`,
  ogType: 'website',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Thread & Petal',
    url: `${SITE_URL}/contact/`,
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'andresy1999f@gmail.com',
      contactType: 'editorial inquiries'
    }
  },
  prerenderHtml: `
    ${renderNavigation()}
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <h1 class="text-4xl font-serif font-bold text-[#261E1A]">Contact Editorial Desk</h1>
      <p class="text-base text-[#5C4D44]">We welcome reader feedback, tutorial clarification requests, and errata corrections.</p>
      <div class="bg-white p-6 rounded-xl border border-[#EAE3D9] space-y-2 text-sm text-[#382C26]">
        <p><strong>Responsible Editor:</strong> Andres Martinez</p>
        <p><strong>Email:</strong> <a href="mailto:andresy1999f@gmail.com" class="text-[#3F5947] underline font-semibold">andresy1999f@gmail.com</a></p>
        <p><strong>Website:</strong> https://4kt.lat/</p>
      </div>
    </main>
    ${renderFooter()}
  `
});

// 4. Editorial Policy
pages.push({
  relativePath: 'editorial-policy/index.html',
  canonicalUrl: `${SITE_URL}/editorial-policy/`,
  title: 'Editorial Policy & Standards — Thread & Petal',
  description: 'Our commitment to authentic sewing instruction, verifiable instructions, safety cautions, and transparent editorial corrections.',
  ogImage: `${SITE_URL}/assets/images/hero-sewing-craft.jpg`,
  ogType: 'website',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Editorial Policy & Standards',
    url: `${SITE_URL}/editorial-policy/`
  },
  prerenderHtml: `
    ${renderNavigation()}
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <h1 class="text-4xl font-serif font-bold text-[#261E1A]">Editorial Policy &amp; Standards</h1>
      <p class="text-base text-[#5C4D44] leading-relaxed">
        At Thread &amp; Petal, every tutorial and clothing repair guide is prepared with high standards of technical accuracy, safety precautions, and practical utility.
      </p>
    </main>
    ${renderFooter()}
  `
});

// 5. Privacy Policy
pages.push({
  relativePath: 'privacy-policy/index.html',
  canonicalUrl: `${SITE_URL}/privacy-policy/`,
  title: 'Privacy Policy — Thread & Petal',
  description: 'Comprehensive privacy policy detailing how Thread & Petal (4kt.lat) handles navigation data, cookies, and Google AdSense advertising.',
  ogImage: `${SITE_URL}/assets/images/hero-sewing-craft.jpg`,
  ogType: 'website',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy',
    url: `${SITE_URL}/privacy-policy/`
  },
  prerenderHtml: `
    ${renderNavigation()}
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <h1 class="text-4xl font-serif font-bold text-[#261E1A]">Privacy Policy</h1>
      <p class="text-base text-[#5C4D44]">Information on how data, server logs, and advertising cookies are processed.</p>
    </main>
    ${renderFooter()}
  `
});

// 6. Cookie Policy
pages.push({
  relativePath: 'cookie-policy/index.html',
  canonicalUrl: `${SITE_URL}/cookie-policy/`,
  title: 'Cookie Policy — Thread & Petal',
  description: 'Detailed explanation of cookies, local storage preferences, and Google AdSense advertising tags on Thread & Petal (4kt.lat).',
  ogImage: `${SITE_URL}/assets/images/hero-sewing-craft.jpg`,
  ogType: 'website',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Cookie Policy',
    url: `${SITE_URL}/cookie-policy/`
  },
  prerenderHtml: `
    ${renderNavigation()}
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <h1 class="text-4xl font-serif font-bold text-[#261E1A]">Cookie Policy</h1>
      <p class="text-base text-[#5C4D44]">Transparent details on essential cookies and third-party advertising cookies.</p>
    </main>
    ${renderFooter()}
  `
});

// 7. Sitemap HTML Page
pages.push({
  relativePath: 'sitemap/index.html',
  canonicalUrl: `${SITE_URL}/sitemap/`,
  title: 'HTML Sitemap & Complete Directory — Thread & Petal',
  description: 'Browse the complete index of sewing tutorials, clothing repair guides, fabric crafts, and institutional pages on Thread & Petal.',
  ogImage: `${SITE_URL}/assets/images/hero-sewing-craft.jpg`,
  ogType: 'website',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'ItemPage',
    name: 'HTML Sitemap & Directory',
    url: `${SITE_URL}/sitemap/`
  },
  prerenderHtml: `
    ${renderNavigation()}
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <h1 class="text-4xl font-serif font-bold text-[#261E1A]">HTML Sitemap &amp; Guide Directory</h1>
      <div class="space-y-4">
        <h2 class="text-xl font-serif font-semibold text-[#261E1A]">Articles &amp; Tutorials</h2>
        <ul class="space-y-2 list-disc pl-5 text-sm text-[#5C4D44]">
          ${ARTICLES.map(a => `<li><a href="/${a.slug}/" class="hover:underline">${escapeHtml(a.title)}</a></li>`).join('')}
        </ul>
      </div>
    </main>
    ${renderFooter()}
  `
});

// 8. 404 Page
pages.push({
  relativePath: '404.html',
  canonicalUrl: `${SITE_URL}/404`,
  title: 'Page Not Found (404) — Thread & Petal',
  description: 'The requested sewing guide or craft resource could not be found. Explore our complete directory of sewing tutorials.',
  ogImage: `${SITE_URL}/assets/images/hero-sewing-craft.jpg`,
  ogType: 'website',
  schema: null,
  prerenderHtml: `
    ${renderNavigation()}
    <main class="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
      <h1 class="text-5xl font-serif font-bold text-[#261E1A]">404 &mdash; Page Not Found</h1>
      <p class="text-base text-[#5C4D44]">We could not locate the sewing tutorial or page you requested.</p>
      <a href="/" class="inline-block px-6 py-3 bg-[#577861] text-white rounded-lg font-semibold">Return to Homepage</a>
    </main>
    ${renderFooter()}
  `
});

// 9. Categories
for (const cat of CATEGORIES) {
  const catArticles = ARTICLES.filter(a => a.categoryId === cat.id);
  const catCanonical = `${SITE_URL}/category/${cat.slug}/`;
  pages.push({
    relativePath: `category/${cat.slug}/index.html`,
    canonicalUrl: catCanonical,
    title: `${cat.name} Guides & Tutorials — Thread & Petal`,
    description: cat.description,
    ogImage: `${SITE_URL}${cat.image}`,
    ogType: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${cat.name} — Thread & Petal`,
      url: catCanonical,
      description: cat.description,
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: cat.name, item: catCanonical }
        ]
      }
    },
    prerenderHtml: `
      ${renderNavigation()}
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <header class="space-y-3">
          <nav class="text-xs text-[#8C7A6B]">
            <a href="/" class="hover:underline">Home</a> &rsaquo; <span>${escapeHtml(cat.name)}</span>
          </nav>
          <h1 class="text-4xl font-serif font-bold text-[#261E1A]">${escapeHtml(cat.name)}</h1>
          <p class="text-base text-[#5C4D44] max-w-2xl">${escapeHtml(cat.description)}</p>
        </header>
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${catArticles.map(a => `
            <article class="bg-white rounded-xl border border-[#EAE3D9] overflow-hidden p-4 space-y-3">
              <a href="/${a.slug}/">
                <img src="${a.image}" alt="${escapeHtml(a.imageAlt)}" class="w-full h-48 object-cover rounded-lg" loading="lazy" />
                <h2 class="text-xl font-serif font-semibold text-[#261E1A] mt-2">${escapeHtml(a.title)}</h2>
                <p class="text-sm text-[#5C4D44] line-clamp-3">${escapeHtml(a.excerpt)}</p>
              </a>
            </article>
          `).join('')}
        </section>
      </main>
      ${renderFooter()}
    `
  });
}

// 10. Articles
for (const art of ARTICLES) {
  const artCanonical = `${SITE_URL}/${art.slug}/`;
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${artCanonical}#article`,
        headline: art.title,
        description: art.excerpt,
        image: [`${SITE_URL}${art.image}`],
        datePublished: art.publishedDate,
        dateModified: art.updatedDate,
        inLanguage: 'en-US',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': artCanonical
        },
        author: {
          '@type': 'Person',
          name: art.author.name,
          email: art.author.email,
          url: `${SITE_URL}/about/`
        },
        publisher: {
          '@type': 'Organization',
          name: 'Thread & Petal',
          url: `${SITE_URL}/`,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/favicon.svg`
          }
        }
      },
      {
        '@type': 'HowTo',
        '@id': `${artCanonical}#howto`,
        name: art.title,
        description: art.excerpt,
        image: `${SITE_URL}${art.image}`,
        totalTime: 'PT45M',
        supply: art.materials.map(m => ({
          '@type': 'HowToSupply',
          name: `${m.name} (${m.detail})`
        })),
        tool: art.tools.map(t => ({
          '@type': 'HowToTool',
          name: `${t.name} (${t.detail})`
        })),
        step: art.steps.map(s => ({
          '@type': 'HowToStep',
          position: s.stepNumber,
          name: s.title,
          text: s.description,
          url: `${artCanonical}#step-${s.stepNumber}`
        }))
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${artCanonical}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: art.categoryName, item: `${SITE_URL}/category/${art.categoryId}/` },
          { '@type': 'ListItem', position: 3, name: art.title, item: artCanonical }
        ]
      }
    ]
  };

  pages.push({
    relativePath: `${art.slug}/index.html`,
    canonicalUrl: artCanonical,
    title: `${art.title} — Thread & Petal`,
    description: art.excerpt,
    ogImage: `${SITE_URL}${art.image}`,
    ogType: 'article',
    schema,
    prerenderHtml: `
      ${renderNavigation()}
      <article class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <header class="space-y-4">
          <nav class="text-xs text-[#8C7A6B]">
            <a href="/" class="hover:underline">Home</a> &rsaquo; 
            <a href="/category/${art.categoryId}/" class="hover:underline">${escapeHtml(art.categoryName)}</a> &rsaquo; 
            <span>${escapeHtml(art.title)}</span>
          </nav>
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#261E1A] leading-tight">
            ${escapeHtml(art.title)}
          </h1>
          <p class="text-lg text-[#5C4D44] leading-relaxed">${escapeHtml(art.excerpt)}</p>
          <div class="flex items-center space-x-4 text-xs text-[#8C7A6B] border-y border-[#EAE3D9] py-3">
            <span>Editor: <strong>${escapeHtml(art.author.name)}</strong></span>
            <span>&bull;</span>
            <span>Published: ${art.publishedDate}</span>
            <span>&bull;</span>
            <span>Est. Time: ${escapeHtml(art.estimatedTime)}</span>
          </div>
        </header>

        <figure class="rounded-2xl overflow-hidden border border-[#EAE3D9]">
          <img src="${art.image}" alt="${escapeHtml(art.imageAlt)}" class="w-full max-h-[500px] object-cover" />
          <figcaption class="p-3 bg-white text-xs text-[#8C7A6B] italic">${escapeHtml(art.imageAlt)}</figcaption>
        </figure>

        <section class="space-y-4 text-base text-[#382C26] leading-relaxed">
          ${art.introParagraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('')}
        </section>

        <section class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-[#EAE3D9]">
          <div>
            <h2 class="text-xl font-serif font-bold text-[#261E1A] mb-3">Materials Required</h2>
            <ul class="space-y-2 text-sm text-[#5C4D44] list-disc pl-5">
              ${art.materials.map(m => `<li><strong>${escapeHtml(m.name)}:</strong> ${escapeHtml(m.detail)}</li>`).join('')}
            </ul>
          </div>
          <div>
            <h2 class="text-xl font-serif font-bold text-[#261E1A] mb-3">Tools Needed</h2>
            <ul class="space-y-2 text-sm text-[#5C4D44] list-disc pl-5">
              ${art.tools.map(t => `<li><strong>${escapeHtml(t.name)}:</strong> ${escapeHtml(t.detail)}</li>`).join('')}
            </ul>
          </div>
        </section>

        <section class="space-y-8">
          <h2 class="text-2xl font-serif font-bold text-[#261E1A] border-b pb-2">Step-by-Step Instructions</h2>
          <div class="space-y-6">
            ${art.steps.map(s => `
              <div id="step-${s.stepNumber}" class="bg-white p-6 rounded-xl border border-[#EAE3D9] space-y-2">
                <span class="text-xs font-bold uppercase tracking-wider text-[#3F5947]">Step ${s.stepNumber}</span>
                <h3 class="text-xl font-serif font-semibold text-[#261E1A]">${escapeHtml(s.title)}</h3>
                <p class="text-sm text-[#382C26] leading-relaxed">${escapeHtml(s.description)}</p>
                ${s.proTip ? `<div class="p-3 bg-[#FAF7F2] border-l-4 border-[#577861] text-xs text-[#5C4D44] mt-2"><strong>Tip:</strong> ${escapeHtml(s.proTip)}</div>` : ''}
              </div>
            `).join('')}
          </div>
        </section>

        ${art.mistakes && art.mistakes.length > 0 ? `
          <section class="space-y-4">
            <h2 class="text-2xl font-serif font-bold text-[#261E1A] border-b pb-2">Common Mistakes &amp; Solutions</h2>
            <div class="space-y-3">
              ${art.mistakes.map(m => `
                <div class="bg-white p-5 rounded-xl border border-[#EAE3D9] text-sm">
                  <p class="font-bold text-[#964E4E]">${escapeHtml(m.mistake)}</p>
                  <p class="text-[#5C4D44] mt-1"><strong>Why it happens:</strong> ${escapeHtml(m.consequence)}</p>
                  <p class="text-[#3F5947] mt-1"><strong>Correction:</strong> ${escapeHtml(m.solution)}</p>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        ${art.faqs && art.faqs.length > 0 ? `
          <section class="space-y-4">
            <h2 class="text-2xl font-serif font-bold text-[#261E1A] border-b pb-2">Frequently Asked Questions</h2>
            <div class="space-y-3">
              ${art.faqs.map(f => `
                <div class="bg-white p-5 rounded-xl border border-[#EAE3D9] text-sm">
                  <h3 class="font-bold text-[#261E1A]">${escapeHtml(f.question)}</h3>
                  <p class="text-[#5C4D44] mt-2">${escapeHtml(f.answer)}</p>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}
      </article>
      ${renderFooter()}
    `
  });
}

// Generate files
console.log(`Writing ${pages.length} pre-rendered HTML files into dist/...`);

for (const page of pages) {
  const targetFile = path.join(DIST_DIR, page.relativePath);
  fs.mkdirSync(path.dirname(targetFile), { recursive: true });

  let html = baseHtml;

  // 1. Replace Title
  html = html.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(page.title)}</title>`);

  // 2. Replace Description
  html = html.replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/is, `<meta name="description" content="${escapeHtml(page.description)}" />`);

  // 3. Replace Canonical
  html = html.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/is, `<link rel="canonical" href="${page.canonicalUrl}" />`);

  // 4. Replace OpenGraph
  html = html.replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/is, `<meta property="og:title" content="${escapeHtml(page.title)}" />`);
  html = html.replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/is, `<meta property="og:description" content="${escapeHtml(page.description)}" />`);
  html = html.replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/is, `<meta property="og:url" content="${page.canonicalUrl}" />`);
  html = html.replace(/<meta\s+property="og:type"\s+content=".*?"\s*\/?>/is, `<meta property="og:type" content="${page.ogType}" />`);
  html = html.replace(/<meta\s+property="og:image"\s+content=".*?"\s*\/?>/is, `<meta property="og:image" content="${page.ogImage}" />`);

  // 5. Replace Twitter
  html = html.replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/is, `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`);
  html = html.replace(/<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/is, `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`);
  html = html.replace(/<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/is, `<meta name="twitter:image" content="${page.ogImage}" />`);

  // 6. Inject Schema if provided
  if (page.schema) {
    const schemaBlock = `\n    <!-- Page Specific Structured Data -->\n    <script type="application/ld+json" id="dynamic-jsonld-schema">\n${JSON.stringify(page.schema, null, 2)}\n    </script>\n  </head>`;
    html = html.replace('</head>', schemaBlock);
  }

  // 7. Inject Semantic Pre-rendered HTML inside <div id="root"></div>
  html = html.replace('<div id="root"></div>', `<div id="root">${page.prerenderHtml}</div>`);

  fs.writeFileSync(targetFile, html, 'utf-8');
}

console.log(`Successfully generated ${pages.length} pre-rendered HTML pages.`);

// Synchronize sitemap.xml to dist/ and public/
const today = new Date().toISOString().split('T')[0];
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Editorial Articles -->
${ARTICLES.map(a => `  <url>
    <loc>${SITE_URL}/${a.slug}/</loc>
    <lastmod>${a.updatedDate || today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`).join('\n')}

  <!-- Categories -->
${CATEGORIES.map(c => `  <url>
    <loc>${SITE_URL}/category/${c.slug}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}

  <!-- Institutional & Legal Pages -->
  <url>
    <loc>${SITE_URL}/about/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${SITE_URL}/contact/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${SITE_URL}/editorial-policy/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${SITE_URL}/privacy-policy/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${SITE_URL}/cookie-policy/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${SITE_URL}/sitemap/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
`;

fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');
fs.writeFileSync(path.resolve(__dirname, '../public/sitemap.xml'), sitemapXml, 'utf-8');
console.log('Synchronized sitemap.xml in dist/ and public/.');

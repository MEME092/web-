import React, { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  schema?: Record<string, unknown> | null;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalPath = '',
  ogType = 'website',
  publishedTime,
  modifiedTime,
  schema = null
}) => {
  useEffect(() => {
    // 1. Dynamic Title
    const siteTitle = 'Thread & Petal';
    const fullTitle = title.includes(siteTitle) ? title : `${title} — ${siteTitle}`;
    document.title = fullTitle;

    // 2. Meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // 3. Absolute Canonical URL pointing strictly to production domain https://4kt.lat
    const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
    const formattedPath = cleanPath === '/' ? 'https://4kt.lat/' : `https://4kt.lat${cleanPath.endsWith('/') ? cleanPath : cleanPath + '/'}`;
    
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', formattedPath);

    // 4. OpenGraph Tags
    const updateOrCreateMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateOrCreateMeta('og:title', fullTitle);
    updateOrCreateMeta('og:description', description);
    updateOrCreateMeta('og:url', formattedPath);
    updateOrCreateMeta('og:type', ogType);

    if (publishedTime) {
      updateOrCreateMeta('article:published_time', publishedTime);
    }
    if (modifiedTime) {
      updateOrCreateMeta('article:modified_time', modifiedTime);
    }

    // 5. JSON-LD Dynamic Schema
    const scriptId = 'dynamic-jsonld-schema';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    
    if (schema) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = scriptId;
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(schema, null, 2);
    } else if (scriptEl) {
      scriptEl.remove();
    }

    // Scroll window smoothly to top on route change
    window.scrollTo({ top: 0, behavior: 'instant' });

    return () => {
      // Clean up dynamic schema on unmount
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [title, description, canonicalPath, ogType, publishedTime, modifiedTime, schema]);

  return null;
};

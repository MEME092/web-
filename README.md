# Thread & Petal — Practical Sewing, Clothing Repair & Fabric Crafts

An independent digital magazine dedicated to slow fashion, durable clothing repair, foundational sewing techniques, and textile arts.

- **Production Domain:** [https://4kt.lat/](https://4kt.lat/)
- **Editorial Lead:** Andres Martinez (`andresy1999@gmail.com`)
- **Primary Language:** American English (`en-US`)
- **AdSense Publisher Account:** `ca-pub-5714100747253670`
- **Hosting Platform:** Netlify

---

## 1. Quick Start & Local Development

### Prerequisites
- Node.js 18+ or 20+
- npm 9+

### Installation
```bash
# Clone the repository
git clone https://github.com/<your-username>/thread-and-petal.git
cd thread-and-petal

# Install dependencies
npm install
```

### Running Locally
```bash
npm run dev
```
The development server will spin up on `http://localhost:3000`.

### Production Build
```bash
npm run build
```
This builds the production-ready assets into the `dist/` directory, including copying `ads.txt`, `robots.txt`, `sitemap.xml`, and `_redirects` to the root of `dist/`.

To test the production build locally:
```bash
npm run preview
```

---

## 2. Deploying to Netlify

The repository is pre-configured for automated continuous deployment on Netlify:

1. **Build Settings:**
   - **Base directory:** Leave blank (or root `/`)
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

2. **Direct Route Rewrites (No 404s on refresh):**
   - Configured via `netlify.toml` and `public/_redirects`:
     ```
     /*    /index.html   200
     ```
   - Any deep direct link (such as `https://4kt.lat/how-to-sew-a-button-by-hand/` or `https://4kt.lat/about/`) will resolve cleanly without server 404 errors.

3. **Custom Domain:**
   - Set custom domain to `4kt.lat` in Netlify Site Settings > Domain Management.
   - Netlify provisions an automatic Let's Encrypt SSL/TLS certificate.

---

## 3. Google AdSense & ads.txt Verification

### A. AdSense Code in `<head>`
The official snippet is implemented once in `index.html`:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5714100747253670"
     crossorigin="anonymous"></script>
```

### B. ads.txt File
Located at `public/ads.txt` and copied to the public web root during `npm run build`:
```
google.com, pub-5714100747253670, DIRECT, f08c47fec0942fa0
```

**Verification:**
After deployment to Netlify, open:
`https://4kt.lat/ads.txt` in your browser.
Confirm it displays the plain text line with no HTML or redirects.

*Note on AdSense status:* Adding the code and `ads.txt` is the required technical setup. Ad delivery commences once Google finishes domain review in your AdSense console.

---

## 4. Content Architecture & Adding New Articles

All editorial content is organized in `src/data/articles.ts`.

To add a new tutorial:
1. Open `src/data/articles.ts`.
2. Add a new object to the `ARTICLES` array conforming to the `Article` interface in `src/types/index.ts`:
   - `id` & `slug`: URL slug (e.g., `sew-elastic-waistband`)
   - `title`: Descriptive editorial title
   - `categoryId`: One of `'sewing-basics'`, `'clothing-repair'`, `'patterns-projects'`, `'fabric-crafts'`, or `'floral-fabric-art'`
   - `difficulty`: `'Beginner' | 'Easy' | 'Intermediate'`
   - `estimatedTime`: e.g. `'20–30 minutes'`
   - `materials` & `tools`: List of supplies with exact weights/specifications
   - `steps`: Step-by-step instructions with `proTip` and `checkpoint`
   - `mistakes`: Common errors and pro solutions
   - `faqs`: Real search-intent questions and answers
   - `illustrationType`: Diagram identifier
3. Add the new canonical URL to `public/sitemap.xml` and `sitemap.xml`.
4. Run `npm run build` to verify compilation.

---

## 5. Technical SEO & Schema.org Structured Data

- **Absolute Canonicals:** Configured via `src/components/SEOHead.tsx` to point to `https://4kt.lat/...`
- **Robots.txt:** Accessible at `https://4kt.lat/robots.txt` referencing `https://4kt.lat/sitemap.xml`.
- **JSON-LD Structured Data:**
  - `WebSite` & `Organization` on all pages
  - `HowTo` and `Article` schema with step supplies and tools on all tutorial articles
  - `BreadcrumbList` on category and article pages

---

## 6. Legal & Privacy Pages

- `/privacy-policy/`: GDPR & CCPA compliant disclosures covering navigation data, server logs, local storage, and Google AdSense cookies.
- `/cookie-policy/`: Comprehensive cookie details with interactive browser consent viewer and reset controls.
- `/editorial-policy/`: Step-by-step verification process, anti-filler policy, reader corrections, and advertising neutrality.
- `/about/`: Editorial responsibility (Andres Martinez) and craft manifesto.
- `/contact/`: Contact email (`andresy1999@gmail.com`) with mail composer.
- `/sitemap/`: HTML sitemap indexing all published resources.

---

## 7. Quality Checklist

- [x] TypeScript compiles without errors (`npm run lint` / `tsc --noEmit`)
- [x] Production build passes (`npm run build`)
- [x] All 8 complete original articles written with zero placeholder text
- [x] Single `<h1>` per page with clean semantic hierarchy
- [x] Netlify `_redirects` and `netlify.toml` tested for SPA direct deep linking
- [x] Clean responsive layout across mobile (360px+), tablet, and desktop (1920px)
- [x] Official AdSense tag implemented in `index.html`
- [x] `ads.txt` present in public root

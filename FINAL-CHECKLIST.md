# Thread & Petal (4kt.lat) — Production Deployment & Verification Checklist

**Brand:** Thread & Petal  
**Production URL:** `https://4kt.lat/`  
**Publisher / AdSense ID:** `ca-pub-5714100747253670`  
**Site Operator:** Andres Martinez (`andresy1999f@gmail.com`)  
**Hosting Provider:** Netlify  
**Publish Directory:** `dist`  
**Build Command:** `npm run build`

---

## Part 1. Netlify Deployment Steps

1. **Extract or Push Repository:**
   - Unzip `thread-and-petal-project.zip` to your clean local git workspace or commit all updated project files to your GitHub repository connected to Netlify.
2. **Confirm Netlify Build Settings:**
   - **Repository:** Connected to your GitHub repository.
   - **Base directory:** Leave empty (root).
   - **Build command:** `npm run build` (runs `vite build && tsx scripts/generate-static-html.ts`).
   - **Publish directory:** `dist`.
   - **Environment Variables:** Standard Node 20+ runtime (Netlify default).
3. **Trigger Deployment:**
   - Trigger a deploy via Git commit push (`git push origin main`) or manual deployment in Netlify UI.
4. **Inspect Build Logs:**
   - Confirm log line: `Successfully generated 21 pre-rendered HTML pages.`
   - Confirm log line: `Synchronized sitemap.xml in dist/ and public/.`
   - Confirm build finishes with status: `Site deploy was successfully published`.

---

## Part 2. Exact Public URLs to Verify on the Live Site

After deployment to `https://4kt.lat/`, inspect each of the following exact canonical URLs directly in your browser:

### A. Homepage & Institutional Pages
- [ ] `https://4kt.lat/` — Verify hero banner, featured guides, typography, and responsive layout.
- [ ] `https://4kt.lat/about/` — Verify editorial mission and publisher transparency.
- [ ] `https://4kt.lat/contact/` — Verify direct email contact link (`andresy1999f@gmail.com`).
- [ ] `https://4kt.lat/editorial-policy/` — Verify factual standards, needle safety cautions, and error reporting.
- [ ] `https://4kt.lat/privacy-policy/` — Verify transparency on hosting logs and AdSense advertising cookies.
- [ ] `https://4kt.lat/cookie-policy/` — Verify description of Google Consent Mode v2 and cookie controls.
- [ ] `https://4kt.lat/sitemap/` — Verify clean HTML directory of all published guides.

### B. All 8 Editorial Tutorials (Exact Canonical Routes)
- [ ] `https://4kt.lat/how-to-sew-a-button-by-hand/`
- [ ] `https://4kt.lat/repair-small-hole-t-shirt/`
- [ ] `https://4kt.lat/hem-pants-without-sewing-machine/`
- [ ] `https://4kt.lat/measure-yourself-sewing-patterns/`
- [ ] `https://4kt.lat/make-fabric-flowers/`
- [ ] `https://4kt.lat/repair-loose-seam/`
- [ ] `https://4kt.lat/choose-sewing-needle/`
- [ ] `https://4kt.lat/sew-fabric-tote-bag/`

*For each article, right click and select "View Page Source" to confirm that the `<title>`, `<meta name="description">`, `<link rel="canonical">`, OpenGraph tags, and article text exist directly in the initial server response.*

### C. All 5 Editorial Categories
- [ ] `https://4kt.lat/category/sewing-basics/`
- [ ] `https://4kt.lat/category/clothing-repair/`
- [ ] `https://4kt.lat/category/patterns-projects/`
- [ ] `https://4kt.lat/category/fabric-crafts/`
- [ ] `https://4kt.lat/category/floral-fabric-art/`

### D. Critical Technical Files
- [ ] `https://4kt.lat/robots.txt`
  - Must return plain text with `Sitemap: https://4kt.lat/sitemap.xml`.
- [ ] `https://4kt.lat/sitemap.xml`
  - Must return valid XML containing the 20 indexable canonical URLs.
- [ ] `https://4kt.lat/ads.txt`
  - Must return plain text without HTML tags:
    `google.com, pub-5714100747253670, DIRECT, f08c47fec0942fa0`
- [ ] `https://4kt.lat/non-existent-test-page/`
  - Must return true **HTTP 404** status code with the branded 404 page (no soft 404).

---

## Part 3. Three-Tier Audit Checklist

### Category A: Verified and Fixed in the Project Codebase
1. **Static HTML Pre-Rendering:** 21 standalone static HTML files generated into `dist/` with route-specific `<title>`, `<meta>`, canonical links, and semantic HTML snapshots.
2. **Elimination of Soft 404s:** Configured `public/_redirects` and `netlify.toml` with explicit route mappings and fallback `/* /404.html 404`.
3. **Editorial Inaccuracies Resolved:**
   - Button tutorial: removed textile glue on knots; added thread shank mechanics and backing buttons.
   - T-shirt hole tutorial: replaced unproven granite/moth claims with mechanical friction causes; detailed fusible knit interfacing vs darning.
   - Trouser hem tutorial: added shoe break measurements, blind catch stitching, and realistic hem allowances.
   - Pattern measuring: explained tape tension, ease of movement (wearing ease vs design ease), and size chart comparisons.
   - Fabric flowers: added safety warnings for synthetic heat sealing; outlined natural fiber gathering and felt backing disks.
   - Loose seam repair: differentiated broken threads from frayed seam allowances; demonstrated backstitching with 1/2" overlap.
   - Sewing needle guide: removed dangerous finger/nylon testing; detailed needle anatomy, point styles, and dual sizing.
   - Tote bag tutorial: verified cutting mathematics (15" × 16" panels with 2" corner cutouts yielding a finished ~14" top opening, ~11" base, ~12.5" height, and 3"-4" boxed depth).
4. **Visual Assets:** 9 studio photographs in `/public/assets/images/` active across cards, headers, and articles.
5. **AdSense Integration:** Single official script in `<head>` with publisher ID `ca-pub-5714100747253670`. Zero fake ads or mock slots.
6. **ads.txt:** Text file preserved in `public/ads.txt` and copied to `dist/ads.txt`.
7. **Privacy & Consent Engine:** Integrated Google Consent Mode v2 with `localStorage` storage and an interactive "Manage Cookie Preferences" trigger.
8. **Contact & Editorial Identity:** Standardized to Andres Martinez (`andresy1999f@gmail.com`).

### Category B: Requires Owner Configuration or Live-Site Verification
1. **Netlify Domain & SSL:** Verify in Netlify dashboard that `https://4kt.lat/` has an active Let's Encrypt SSL certificate and DNS points to Netlify (`dns.netlify.com` or CNAME).
2. **Google AdSense Dashboard:**
   - Log into [Google AdSense](https://www.google.com/adsense/).
   - Confirm site status under **Sites** for `4kt.lat`.
   - Ensure "Auto ads" is enabled if you want Google to automatically place ad units on your site once approved.
   - Confirm that AdSense detects your `ads.txt` file (typically takes 24–48 hours after DNS propagation).
3. **Google Search Console:**
   - Add property `https://4kt.lat/`.
   - Submit sitemap `https://4kt.lat/sitemap.xml`.
   - Run URL Inspection on `https://4kt.lat/` and `https://4kt.lat/how-to-sew-a-button-by-hand/` to verify Googlebot fetches the pre-rendered static HTML.
4. **EU/EEA & UK Consent Certification (if targeting EEA users):**
   - Google requires publishers serving ads to users in the EEA and UK to use a Google-certified Consent Management Platform (CMP) integrated with the IAB TCF framework.
   - If you plan to monetize heavily in European countries, you can enable Google's built-in CMP directly in your AdSense dashboard (**Privacy & messaging > European regulations > Create GDPR message**). This requires zero code changes in the site as the existing AdSense tag loads it automatically.

### Category C: Editorial or Legal Items Requiring Human Judgment
1. **Ongoing Editorial Updates:** As you create new tutorials, follow the structure established in `src/data/articles.ts` and run `npm run build` so static HTML pages and sitemaps update automatically.
2. **Editorial Authenticity:** The site transparently states that Andres Martinez is the editor and founder, providing clear educational tutorials without fabricating external credentials or test laboratories.
3. **Legal Compliance Review:** Review Privacy Policy and Cookie Policy against your specific local regulatory obligations.

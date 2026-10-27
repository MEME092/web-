import React, { useState, useEffect } from 'react';
import { Cookie, CheckCircle2, RefreshCw, Shield, AlertCircle } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const CookiePolicyPage: React.FC = () => {
  const [currentStatus, setCurrentStatus] = useState<string>('Loading...');

  const checkStatus = () => {
    try {
      const stored = localStorage.getItem('thread_petal_cookie_consent_v1');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.advertising && parsed.analytics) {
          setCurrentStatus('All Cookies Accepted');
        } else if (!parsed.advertising && !parsed.analytics) {
          setCurrentStatus('Essential Cookies Only');
        } else {
          setCurrentStatus('Custom Preferences Configured');
        }
      } else {
        setCurrentStatus('No Preference Stored (Banner Active)');
      }
    } catch {
      setCurrentStatus('Storage unavailable');
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const handleResetPreferences = () => {
    try {
      localStorage.removeItem('thread_petal_cookie_consent_v1');
      checkStatus();
      window.location.reload();
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <SEOHead
        title="Cookie Policy &amp; Consent Management — Thread &amp; Petal"
        description="Learn how Thread &amp; Petal uses cookies, manage your consent preferences, and understand third-party advertising cookies."
        canonicalPath="/cookie-policy/"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Breadcrumbs items={[{ label: 'Cookie Policy' }]} />

        <header className="space-y-4">
          <span className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-[#E3EBE5] text-[#3F5947]">
            Consent &amp; Tracking Controls
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#261E1A] leading-tight">
            Cookie Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#8C7A6B]">
            Last Updated: October 26, 2026 • Published at https://4kt.lat/
          </p>
        </header>

        <div className="bg-[#FFFFFF] rounded-2xl border border-[#EAE3D9] p-6 sm:p-10 space-y-8 text-sm text-[#382C26] leading-relaxed shadow-xs">
          {/* Interactive Consent Status Box */}
          <div className="bg-[#FAF7F2] p-6 rounded-xl border border-[#EAE3D9] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#577861] block">
                Your Current Browser Consent Status:
              </span>
              <p className="font-serif text-xl font-semibold text-[#261E1A]">
                {currentStatus}
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetPreferences}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#577861] hover:bg-[#44604C] text-white text-xs font-semibold uppercase tracking-wider transition-colors shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Cookie Choices</span>
            </button>
          </div>

          {/* Section 1: What Are Cookies */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#261E1A]">
              1. What Are Cookies?
            </h2>
            <p>
              Cookies are small text files placed on your device by websites you visit. They are widely used to make websites function efficiently, remember preferences, and provide analytical or advertising information to website operators.
            </p>
          </section>

          {/* Section 2: Types of Cookies We Use */}
          <section className="space-y-4">
            <h2 className="font-serif text-xl font-semibold text-[#261E1A]">
              2. Categories of Cookies Used on Thread &amp; Petal
            </h2>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EAE3D9]">
                <h3 className="font-semibold text-[#261E1A] text-base mb-1">
                  A. Strictly Essential Cookies &amp; Storage
                </h3>
                <p className="text-xs sm:text-sm text-[#5C4D44] mb-2">
                  These items are required for the basic operation of the website, such as remembering your consent preferences and ensuring correct routing.
                </p>
                <div className="text-xs text-[#577861] font-mono">
                  Key: thread_petal_cookie_consent_v1 (localStorage)
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EAE3D9]">
                <h3 className="font-semibold text-[#261E1A] text-base mb-1">
                  B. Advertising &amp; Commercial Measurement (Google AdSense)
                </h3>
                <p className="text-xs sm:text-sm text-[#5C4D44] mb-2">
                  Our publication is funded through Google AdSense (publisher <code>ca-pub-5714100747253670</code>). Google uses cookies (such as <code>__gads</code> and <code>__gpi</code>) to serve relevant advertisements, measure ad impressions, and combat fraudulent traffic.
                </p>
                <p className="text-xs text-[#5C4D44]">
                  You can opt out of personalized advertising by visiting{' '}
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3F5947] underline font-semibold"
                  >
                    Google Ads Settings
                  </a>.
                </p>
              </div>

              {/* Interactive Preference Control */}
              <div className="p-4 rounded-xl bg-[#E3EBE5] border border-[#C5D7C9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-[#261E1A] text-sm mb-1">
                    Your Current Consent Settings
                  </h3>
                  <p className="text-xs text-[#5C4D44]">
                    Our consent engine integrates Google Consent Mode v2. You can update or withdraw your advertising consent at any time.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('openCookieConsentBanner'))}
                  className="px-4 py-2 rounded-lg bg-[#577861] hover:bg-[#44604C] text-white text-xs font-semibold uppercase tracking-wider shrink-0 transition-colors shadow-xs cursor-pointer"
                >
                  Change Cookie Preferences
                </button>
              </div>
            </div>
          </section>

          {/* Section 3: Browser Controls */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#261E1A]">
              3. Managing Cookies in Your Web Browser
            </h2>
            <p>
              Most web browsers allow you to control cookies through their settings. You can set your browser to refuse all cookies or to indicate when a cookie is being sent:
            </p>
            <ul className="space-y-1.5 text-xs sm:text-sm text-[#5C4D44] pl-4 list-disc">
              <li><strong>Google Chrome:</strong> Settings &gt; Privacy and security &gt; Cookies and other site data.</li>
              <li><strong>Mozilla Firefox:</strong> Settings &gt; Privacy &amp; Security &gt; Enhanced Tracking Protection.</li>
              <li><strong>Apple Safari:</strong> Preferences &gt; Privacy &gt; Block all cookies.</li>
              <li><strong>Microsoft Edge:</strong> Settings &gt; Cookies and site permissions.</li>
            </ul>
          </section>

          {/* Contact */}
          <section className="space-y-2 border-t border-[#EAE3D9] pt-6 text-xs sm:text-sm text-[#5C4D44]">
            <h2 className="font-serif text-lg font-semibold text-[#261E1A]">
              Contact for Cookie Inquiries
            </h2>
            <p>
              If you have any questions regarding our cookie practices, please email{' '}
              <a href="mailto:andresy1999f@gmail.com" className="text-[#3F5947] underline font-semibold">
                andresy1999f@gmail.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

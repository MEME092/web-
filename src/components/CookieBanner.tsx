import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, Settings2 } from 'lucide-react';

interface ConsentSettings {
  essential: boolean;
  analytics: boolean;
  advertising: boolean;
  timestamp: string;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    adsbygoogle?: Array<Record<string, unknown>> & { requestNonPersonalizedAds?: number };
  }
}

const STORAGE_KEY = 'thread_petal_cookie_consent_v1';

export const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);

  useEffect(() => {
    try {
      const storedStr = localStorage.getItem(STORAGE_KEY);
      if (storedStr) {
        const stored: ConsentSettings = JSON.parse(storedStr);
        setAnalytics(stored.analytics);
        setAdvertising(stored.advertising);
      } else {
        // Small delay to prevent layout jump on load
        const timer = setTimeout(() => setVisible(true), 1000);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage may fail in restricted iframes
    }

    const handleOpenBanner = () => {
      setVisible(true);
      setShowCustomize(true);
    };

    window.addEventListener('openCookieConsentBanner', handleOpenBanner);
    return () => {
      window.removeEventListener('openCookieConsentBanner', handleOpenBanner);
    };
  }, []);

  const applyConsentToVendors = (settings: ConsentSettings) => {
    // 1. Google Consent Mode v2 update
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        ad_storage: settings.advertising ? 'granted' : 'denied',
        ad_user_data: settings.advertising ? 'granted' : 'denied',
        ad_personalization: settings.advertising ? 'granted' : 'denied',
        analytics_storage: settings.analytics ? 'granted' : 'denied',
      });
    }

    // 2. Google AdSense non-personalized ads control
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.requestNonPersonalizedAds = settings.advertising ? 0 : 1;
  };

  const saveConsent = (settings: ConsentSettings) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Ignore storage errors
    }
    applyConsentToVendors(settings);
    setVisible(false);
  };

  const handleAcceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      advertising: true,
      timestamp: new Date().toISOString()
    });
  };

  const handleDeclineNonEssential = () => {
    saveConsent({
      essential: true,
      analytics: false,
      advertising: false,
      timestamp: new Date().toISOString()
    });
  };

  const handleSaveCustom = () => {
    saveConsent({
      essential: true,
      analytics,
      advertising,
      timestamp: new Date().toISOString()
    });
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-banner-title"
      className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-[#261E1A] text-[#FAF7F2] border-t-2 border-[#577861] shadow-2xl cookie-banner"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center space-x-2">
            <Cookie className="w-5 h-5 text-[#C87878]" />
            <h2 id="cookie-banner-title" className="font-serif text-lg font-semibold text-[#FAF7F2]">
              Privacy &amp; Cookie Preferences
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#D6CCC0] leading-relaxed">
            Thread &amp; Petal uses cookies to deliver core site navigation, evaluate editorial performance, and support our independent craft tutorials through Google AdSense. You can accept all cookies, continue with strictly essential cookies, or configure your preferences. Learn more in our{' '}
            <Link to="/cookie-policy/" className="text-[#C5D7C9] underline hover:text-white">
              Cookie Policy
            </Link>{' '}
            and{' '}
            <Link to="/privacy-policy/" className="text-[#C5D7C9] underline hover:text-white">
              Privacy Policy
            </Link>.
          </p>

          {showCustomize && (
            <div className="pt-3 pb-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs border-t border-[#3D312A] mt-2">
              <div className="bg-[#1C1512] p-2.5 rounded-lg border border-[#332721]">
                <div className="font-semibold text-white flex items-center justify-between">
                  <span>Essential Cookies</span>
                  <span className="text-[#577861] text-[10px] uppercase font-bold">Always Active</span>
                </div>
                <p className="text-[#A8988C] mt-1 text-[11px]">Necessary for core site routing and security.</p>
              </div>

              <label className="bg-[#1C1512] p-2.5 rounded-lg border border-[#332721] flex flex-col justify-between cursor-pointer">
                <div className="font-semibold text-white flex items-center justify-between">
                  <span>Analytics</span>
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="accent-[#577861] w-4 h-4 rounded"
                  />
                </div>
                <p className="text-[#A8988C] mt-1 text-[11px]">Aggregated tutorial readership analysis.</p>
              </label>

              <label className="bg-[#1C1512] p-2.5 rounded-lg border border-[#332721] flex flex-col justify-between cursor-pointer">
                <div className="font-semibold text-white flex items-center justify-between">
                  <span>AdSense &amp; Ads</span>
                  <input
                    type="checkbox"
                    checked={advertising}
                    onChange={(e) => setAdvertising(e.target.checked)}
                    className="accent-[#577861] w-4 h-4 rounded"
                  />
                </div>
                <p className="text-[#A8988C] mt-1 text-[11px]">Google AdSense measurement and ad delivery.</p>
              </label>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto shrink-0">
          {!showCustomize ? (
            <>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-4 py-2 rounded-lg bg-[#577861] hover:bg-[#44604C] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={handleDeclineNonEssential}
                className="px-4 py-2 rounded-lg bg-[#3D312A] hover:bg-[#4D3F37] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Essential Only
              </button>
              <button
                type="button"
                onClick={() => setShowCustomize(true)}
                className="px-3 py-2 rounded-lg border border-[#5C4D44] hover:bg-[#3D312A] text-[#D6CCC0] text-xs font-medium transition-colors flex items-center space-x-1"
              >
                <Settings2 className="w-3.5 h-3.5" />
                <span>Customize</span>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleSaveCustom}
                className="px-4 py-2 rounded-lg bg-[#577861] hover:bg-[#44604C] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Save Preferences
              </button>
              <button
                type="button"
                onClick={() => setShowCustomize(false)}
                className="px-3 py-2 rounded-lg bg-[#3D312A] text-[#D6CCC0] text-xs hover:text-white"
              >
                Back
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ShieldCheck, HeartHandshake, Compass, CheckCircle } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#261E1A] text-[#FAF7F2] border-t-4 border-[#577861] mt-16 print:hidden">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-[#3D312A]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Editorial Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <svg className="w-7 h-7 text-[#C87878]" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="22" stroke="#577861" strokeWidth="2" fill="#FAF6F0" />
                <path d="M14 26 C12 18, 20 12, 28 14 C34 15, 37 21, 33 27 C29 33, 21 34, 18 30 C16 27, 18 22, 23 20" stroke="#C87878" strokeWidth="2" fill="none" />
                <path d="M35 11 L15 37" stroke="#261E1A" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <span className="font-serif text-2xl font-normal tracking-wide text-[#FAF7F2]">
                Thread &amp; Petal
              </span>
            </div>
            <p className="text-sm text-[#D6CCC0] leading-relaxed max-w-md">
              An independent digital publication dedicated to slow fashion, durable garment mending, beginner sewing foundations, and handmade textile decoration. Our mission is to provide clear, reliable instructions that help makers mend with confidence and create lasting garments.
            </p>
            <div className="pt-2 text-xs text-[#C5D7C9] flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-[#577861]" />
              <span>Edited by <strong>Andres Martinez</strong> • Published at <strong>4kt.lat</strong></span>
            </div>
          </div>

          {/* Column 2: Editorial Categories */}
          <div>
            <h2 className="text-xs font-semibold tracking-wider uppercase text-[#C5D7C9] mb-4">
              Explore Categories
            </h2>
            <ul className="space-y-2 text-sm text-[#D6CCC0]">
              {CATEGORIES.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/category/${category.slug}/`}
                    className="hover:text-[#FFFFFF] transition-colors hover:underline"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Institutional & Legal */}
          <div>
            <h2 className="text-xs font-semibold tracking-wider uppercase text-[#C5D7C9] mb-4">
              Magazine &amp; Legal
            </h2>
            <ul className="space-y-2 text-sm text-[#D6CCC0]">
              <li>
                <Link to="/about/" className="hover:text-[#FFFFFF] transition-colors hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/editorial-policy/" className="hover:text-[#FFFFFF] transition-colors hover:underline">
                  Editorial &amp; Verification Policy
                </Link>
              </li>
              <li>
                <Link to="/contact/" className="hover:text-[#FFFFFF] transition-colors hover:underline">
                  Contact Andres Martinez
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy/" className="hover:text-[#FFFFFF] transition-colors hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy/" className="hover:text-[#FFFFFF] transition-colors hover:underline">
                  Cookie Policy &amp; Consent
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('openCookieConsentBanner'))}
                  className="hover:text-[#FFFFFF] transition-colors hover:underline text-left text-xs text-[#C5D7C9] cursor-pointer"
                >
                  Manage Cookie Preferences
                </button>
              </li>
              <li>
                <Link to="/sitemap/" className="hover:text-[#FFFFFF] transition-colors hover:underline">
                  HTML Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact & Transparency Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-xs text-[#A8988C] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Mail className="w-4 h-4 text-[#C87878]" />
          <span>Editorial contact: </span>
          <a
            href="mailto:andresy1999f@gmail.com"
            className="text-[#E3EBE5] hover:text-white underline font-medium"
          >
            andresy1999f@gmail.com
          </a>
        </div>
        <div className="text-center sm:text-right">
          <span>&copy; {new Date().getFullYear()} Thread &amp; Petal (4kt.lat). All rights reserved.</span>
        </div>
      </div>

      {/* Editorial Disclaimer */}
      <div className="bg-[#1C1512] py-3 px-4 text-center text-[11px] text-[#8C7A6B] border-t border-[#332721]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>Official publisher identification: Google AdSense ID <code>ca-pub-5714100747253670</code>.</span>
          <span className="hidden sm:inline">•</span>
          <span>Verified text record accessible at <code>/ads.txt</code>.</span>
        </div>
      </div>
    </footer>
  );
};

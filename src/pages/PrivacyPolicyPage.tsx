import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, Mail, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <SEOHead
        title="Privacy Policy — Thread & Petal"
        description="Comprehensive privacy policy detailing how Thread & Petal (4kt.lat) handles navigation data, cookies, and Google AdSense advertising."
        canonicalPath="/privacy-policy/"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

        <header className="space-y-4">
          <span className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-[#E3EBE5] text-[#3F5947]">
            Legal Transparency
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#261E1A] leading-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#8C7A6B]">
            Last Updated: October 26, 2026 • Effective Date: October 26, 2026
          </p>
        </header>

        <div className="bg-[#FFFFFF] rounded-2xl border border-[#EAE3D9] p-6 sm:p-10 space-y-8 text-sm text-[#382C26] leading-relaxed shadow-xs">
          {/* Introduction */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#261E1A]">
              1. Overview &amp; Site Ownership
            </h2>
            <p>
              This Privacy Policy explains how <strong>Thread &amp; Petal</strong>, published at <strong>https://4kt.lat/</strong> and operated by <strong>Andres Martinez</strong> ("we", "our", or "us"), collects, uses, and safeguards information when you visit our website.
            </p>
            <p>
              We are committed to user privacy and practice data minimization: we do not require user accounts, we do not operate a paywall, and we do not collect personal financial data.
            </p>
          </section>

          {/* Information Collected */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#261E1A]">
              2. Information We Collect
            </h2>
            <p>
              When you browse Thread &amp; Petal, the following categories of information may be processed:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#5C4D44] pl-4 list-disc">
              <li>
                <strong>Server Log &amp; Technical Data:</strong> Standard HTTP request data including IP address, browser user-agent, operating system, referring URL, and pages visited. This data is collected automatically by hosting providers (such as Netlify) to deliver web assets and protect against cyberattacks.
              </li>
              <li>
                <strong>Correspondence Data:</strong> When you contact us directly via email at <code>andresy1999f@gmail.com</code>, we receive your email address, name, and any information provided in your message. We use this exclusively to reply to your inquiry.
              </li>
              <li>
                <strong>Local Storage Preferences:</strong> Your cookie preference settings (Accept, Essential Only, Custom) are stored locally in your browser under the key <code>thread_petal_cookie_consent_v1</code>.
              </li>
            </ul>
          </section>

          {/* Cookies & Third-Party Advertising */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#261E1A]">
              3. Google AdSense &amp; Third-Party Cookies
            </h2>
            <p>
              Thread &amp; Petal integrates <strong>Google AdSense</strong> (publisher client ID: <code>ca-pub-5714100747253670</code>) to serve advertisements.
            </p>
            <p>
              Google and third-party advertising vendors use cookies to serve ads based on a user's prior visits to this website or other websites on the internet.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#5C4D44] pl-4 list-disc">
              <li>
                Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to our site and/or other sites on the Internet.
              </li>
              <li>
                Users may opt out of personalized advertising by visiting{' '}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3F5947] underline font-semibold"
                >
                  Google Ads Settings
                </a>.
              </li>
              <li>
                Alternatively, users can opt out of a third-party vendor's use of cookies for personalized advertising by visiting{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3F5947] underline font-semibold"
                >
                  www.aboutads.info
                </a>.
              </li>
            </ul>
            <p>
              Detailed information on how Google uses data when you use our site can be reviewed at{' '}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3F5947] underline font-semibold"
              >
                Google’s Partner Sites Privacy Policy
              </a>.
            </p>
          </section>

          {/* Web Fonts & CDN */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#261E1A]">
              4. External Fonts &amp; CDNs
            </h2>
            <p>
              This website loads editorial typefaces from Google Fonts (Newsreader and Plus Jakarta Sans). In order to serve font files, Google servers may receive standard HTTP request headers, including your IP address.
            </p>
          </section>

          {/* User Rights */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#261E1A]">
              5. Your Privacy Rights (GDPR &amp; CCPA/CPRA)
            </h2>
            <p>
              Depending on your jurisdiction, you may have rights under applicable privacy legislation, including:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#5C4D44] pl-4 list-disc">
              <li>The right to know what personal data is processed about you.</li>
              <li>The right to request deletion of correspondence data you have emailed to us.</li>
              <li>The right to withdraw consent for non-essential cookies via our Cookie Policy &amp; Consent controls.</li>
              <li>The right to non-discrimination for exercising your privacy rights.</li>
            </ul>
          </section>

          {/* Data Security & Retention */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#261E1A]">
              6. Data Security &amp; Retention
            </h2>
            <p>
              We implement industry-standard HTTPS/TLS encryption across <code>https://4kt.lat/</code>. Email correspondence is retained only as long as necessary to answer editorial questions or resolve reported issues.
            </p>
          </section>

          {/* Contact Information */}
          <section className="space-y-3 border-t border-[#EAE3D9] pt-6">
            <h2 className="font-serif text-xl font-semibold text-[#261E1A]">
              7. Contacting the Site Operator
            </h2>
            <p>
              For any questions regarding this Privacy Policy, your rights, or data practices, please contact:
            </p>
            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#EAE3D9] text-xs sm:text-sm space-y-1">
              <p><strong>Site Operator:</strong> Andres Martinez</p>
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:andresy1999f@gmail.com" className="text-[#3F5947] underline font-semibold">
                  andresy1999f@gmail.com
                </a>
              </p>
              <p><strong>Website:</strong> https://4kt.lat/</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

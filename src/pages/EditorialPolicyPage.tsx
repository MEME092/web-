import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, FileText, AlertCircle, RefreshCw, Mail } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const EditorialPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <SEOHead
        title="Editorial & Verification Policy — Thread & Petal"
        description="Our editorial process, tutorial verification standards, corrections policy, and commitment to clear, reproducible sewing instructions."
        canonicalPath="/editorial-policy/"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <Breadcrumbs items={[{ label: 'Editorial Policy' }]} />

        <header className="space-y-4">
          <span className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-[#E3EBE5] text-[#3F5947]">
            Editorial Standards
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#261E1A] leading-tight">
            Editorial Guidelines &amp; Tutorial Verification Policy
          </h1>
          <p className="text-base sm:text-lg text-[#5C4D44] leading-relaxed">
            At Thread &amp; Petal, we believe that DIY and repair tutorials are only as valuable as their real-world reproducibility. If a reader cuts fabric according to our instructions, the pieces must fit; if they tie off a button thread according to our guide, the button must stay on.
          </p>
        </header>

        {/* Section 1: Content Creation Process */}
        <section className="bg-[#FFFFFF] rounded-2xl border border-[#EAE3D9] p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center space-x-2 text-[#577861]">
            <CheckCircle2 className="w-5 h-5" />
            <h2 className="font-serif text-2xl font-semibold text-[#261E1A]">
              1. Our Tutorial Testing &amp; Verification Methodology
            </h2>
          </div>
          <p className="text-sm text-[#382C26] leading-relaxed">
            Every tutorial published on Thread &amp; Petal follows a defined verification cycle prior to publication:
          </p>
          <ul className="space-y-3 text-xs sm:text-sm text-[#5C4D44]">
            <li className="flex items-start space-x-2">
              <strong className="text-[#261E1A] shrink-0">• Practical Execution:</strong>
              <span>Procedures are carried out by hand or sewing machine using the exact tools specified in the materials list.</span>
            </li>
            <li className="flex items-start space-x-2">
              <strong className="text-[#261E1A] shrink-0">• Measurement Verification:</strong>
              <span>All seam allowances, cutting dimensions, and fabric weight recommendations are double-checked against standard imperial and metric tailoring scales.</span>
            </li>
            <li className="flex items-start space-x-2">
              <strong className="text-[#261E1A] shrink-0">• Failure-Mode Documentation:</strong>
              <span>We deliberately analyze common failure points (e.g., sewing a button too tight, using sharp needles on knits) so readers know both what to do and what to avoid.</span>
            </li>
          </ul>
        </section>

        {/* Section 2: No AI Slop or Filler */}
        <section className="bg-[#FFFFFF] rounded-2xl border border-[#EAE3D9] p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center space-x-2 text-[#577861]">
            <FileText className="w-5 h-5" />
            <h2 className="font-serif text-2xl font-semibold text-[#261E1A]">
              2. Commitment Against Superficial &amp; Repetitive Content
            </h2>
          </div>
          <p className="text-sm text-[#382C26] leading-relaxed">
            We adhere to strict quality-first guidelines:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-[#5C4D44]">
            <li>• We do not mass-generate articles simply to target keywords.</li>
            <li>• We do not publish placeholder cards, empty categories, or hollow lists.</li>
            <li>• Every article has a defined search intent and provides a complete, standalone solution.</li>
            <li>• We maintain strict topical consistency centered entirely around sewing, mending, alterations, patterns, and fabric crafts.</li>
          </ul>
        </section>

        {/* Section 3: Corrections Policy */}
        <section className="bg-[#FFFFFF] rounded-2xl border border-[#EAE3D9] p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center space-x-2 text-[#577861]">
            <RefreshCw className="w-5 h-5" />
            <h2 className="font-serif text-2xl font-semibold text-[#261E1A]">
              3. Reader Corrections &amp; Update Cycle
            </h2>
          </div>
          <p className="text-sm text-[#382C26] leading-relaxed">
            If a reader identifies a typo, an ambiguous instruction, or a step that could be explained more clearly, we review and update the guide promptly. Each article displays its original publication date alongside its latest substantive revision date.
          </p>
          <p className="text-xs sm:text-sm text-[#5C4D44]">
            To report an error or suggest an improvement, please email Andres Martinez directly at{' '}
            <a href="mailto:andresy1999f@gmail.com" className="text-[#3F5947] underline font-semibold">
              andresy1999f@gmail.com
            </a>.
          </p>
        </section>

        {/* Section 4: Advertising Neutrality */}
        <section className="bg-[#FFFFFF] rounded-2xl border border-[#EAE3D9] p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center space-x-2 text-[#577861]">
            <ShieldCheck className="w-5 h-5" />
            <h2 className="font-serif text-2xl font-semibold text-[#261E1A]">
              4. Advertising Neutrality &amp; Publisher Identification
            </h2>
          </div>
          <p className="text-sm text-[#382C26] leading-relaxed">
            Thread &amp; Petal displays network advertising via Google AdSense (publisher account <code>ca-pub-5714100747253670</code>). Advertisers have zero influence over which techniques, tools, or fabrics we recommend. All recommendations are based purely on practical utility.
          </p>
        </section>
      </div>
    </div>
  );
};

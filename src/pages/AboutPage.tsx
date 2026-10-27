import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle2, ShieldCheck, HeartHandshake, BookOpen, Compass } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <SEOHead
        title="About Thread & Petal — Our Editorial Mission & Craft Principles"
        description="Learn about Thread & Petal, an independent digital publication edited by Andres Martinez focusing on practical sewing, garment mending, and textile crafts."
        canonicalPath="/about/"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <Breadcrumbs items={[{ label: 'About Us' }]} />

        {/* Header */}
        <header className="space-y-4">
          <span className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-[#E3EBE5] text-[#3F5947]">
            About the Publication
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#261E1A] leading-tight">
            Practical Sewing, Clothing Repair &amp; Everyday Textile Craft
          </h1>
          <p className="text-base sm:text-lg text-[#5C4D44] leading-relaxed">
            Thread &amp; Petal is an independent online magazine published at <strong>https://4kt.lat/</strong>. Our editorial purpose is to make sewing, garment repair, and fabric crafts accessible, approachable, and genuinely useful for everyday life.
          </p>
        </header>

        {/* Editorial Lead Card */}
        <section aria-labelledby="editorial-lead-heading" className="bg-[#FFFFFF] rounded-2xl border border-[#EAE3D9] p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-[#FAF7F2] border-2 border-[#577861] flex items-center justify-center font-serif text-2xl font-bold text-[#3F5947] shrink-0">
              AM
            </div>
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-wider text-[#577861]">
                Editorial Responsibility
              </span>
              <h2 id="editorial-lead-heading" className="font-serif text-2xl font-semibold text-[#261E1A]">
                Andres Martinez
              </h2>
              <p className="text-xs sm:text-sm text-[#5C4D44] leading-relaxed">
                Site Publisher &amp; Editorial Lead • Direct Contact:{' '}
                <a
                  href="mailto:andresy1999f@gmail.com"
                  className="text-[#3F5947] hover:underline font-semibold"
                >
                  andresy1999f@gmail.com
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Editorial Purpose */}
        <section className="space-y-6 text-sm sm:text-base text-[#382C26] leading-relaxed">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#261E1A]">
            Why We Publish Thread &amp; Petal
          </h2>
          <p>
            In an era of fast fashion where clothing is frequently treated as disposable, basic textile skills have become rare. A popped button, an unraveling hem, or a tiny moth hole often leads people to discard garments that still have years of wearable life left.
          </p>
          <p>
            We believe that repairing your own clothing and sewing simple everyday items is both economically smart and environmentally responsible. Our publication is dedicated strictly to this craft. You will not find sponsored lifestyle gossip, general news, or off-topic subjects here—every guide on this site is directly relevant to fabric, needles, patterns, and thread.
          </p>
        </section>

        {/* What You Can Expect From Our Tutorials */}
        <section className="bg-[#FFFFFF] rounded-2xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-xs">
          <h2 className="font-serif text-2xl font-semibold text-[#261E1A]">
            What You Can Expect From Our Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EAE3D9]">
              <div className="flex items-center space-x-2 text-[#3F5947] font-semibold text-sm mb-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#577861]" />
                <span>Step-by-Step Clarity</span>
              </div>
              <p className="text-xs text-[#5C4D44] leading-relaxed">
                Instructions broken down into manageable phases with clear checkpoints so you know when a step is executed correctly.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EAE3D9]">
              <div className="flex items-center space-x-2 text-[#3F5947] font-semibold text-sm mb-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#577861]" />
                <span>Specific Materials &amp; Tools</span>
              </div>
              <p className="text-xs text-[#5C4D44] leading-relaxed">
                Exact needle numbers, thread compositions, and fabric weights so you don't guess in the craft aisle.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EAE3D9]">
              <div className="flex items-center space-x-2 text-[#3F5947] font-semibold text-sm mb-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#577861]" />
                <span>Common Pitfalls &amp; Fixes</span>
              </div>
              <p className="text-xs text-[#5C4D44] leading-relaxed">
                Honest coverage of mistakes beginners make, why they happen, and how to recover without damaging your cloth.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EAE3D9]">
              <div className="flex items-center space-x-2 text-[#3F5947] font-semibold text-sm mb-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#577861]" />
                <span>Original Technical Diagrams</span>
              </div>
              <p className="text-xs text-[#5C4D44] leading-relaxed">
                Custom cross-sections and layout graphics that illustrate thread paths and mechanical stitch geometries.
              </p>
            </div>
          </div>
        </section>

        {/* Editorial Integrity & Advertising Transparency */}
        <section className="space-y-4 text-xs sm:text-sm text-[#5C4D44] leading-relaxed border-t border-[#EAE3D9] pt-6">
          <h2 className="font-serif text-xl font-semibold text-[#261E1A]">
            Editorial Standards &amp; Advertising
          </h2>
          <p>
            Thread &amp; Petal is supported through display advertising via Google AdSense (publisher ID: <code>ca-pub-5714100747253670</code>). All editorial content is independently planned and written. We do not accept paid product endorsements that compromise the integrity or accuracy of our instructions.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/editorial-policy/"
              className="text-xs font-semibold uppercase tracking-wider text-[#3F5947] hover:underline"
            >
              Read Full Editorial Policy
            </Link>
            <span className="text-[#D6CCC0]">•</span>
            <Link
              to="/contact/"
              className="text-xs font-semibold uppercase tracking-wider text-[#3F5947] hover:underline"
            >
              Contact the Editorial Desk
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

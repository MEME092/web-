import React, { useState } from 'react';
import { Mail, Send, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Editorial Question');
  const [message, setMessage] = useState('');

  const handleComposeEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:andresy1999f@gmail.com?subject=${encodeURIComponent(
      `[Thread & Petal] ${subject} - from ${name}`
    )}&body=${encodeURIComponent(
      `From: ${name} (${email})\n\nMessage:\n${message}\n\n---\nSent via Thread & Petal (https://4kt.lat/)`
    )}`;

    window.location.href = mailtoUrl;
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <SEOHead
        title="Contact Andres Martinez — Thread & Petal Editorial Desk"
        description="Contact the editor of Thread & Petal for tutorial questions, corrections, or suggestions. Email: andresy1999f@gmail.com."
        canonicalPath="/contact/"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <Breadcrumbs items={[{ label: 'Contact Us' }]} />

        <header className="space-y-4">
          <span className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-[#E3EBE5] text-[#3F5947]">
            Get In Touch
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#261E1A] leading-tight">
            Contact the Editorial Desk
          </h1>
          <p className="text-base sm:text-lg text-[#5C4D44] leading-relaxed">
            We value thoughtful feedback, tutorial step clarification requests, and practical suggestions from our readership.
          </p>
        </header>

        {/* Direct Contact Card */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#EAE3D9] p-6 sm:p-8 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-semibold text-[#261E1A]">
              Editorial Lead Details
            </h2>
            <div className="space-y-3 text-sm text-[#5C4D44]">
              <div>
                <span className="text-xs uppercase font-bold text-[#8C7A6B] block">Responsible Editor</span>
                <strong className="text-[#261E1A] text-base">Andres Martinez</strong>
              </div>

              <div>
                <span className="text-xs uppercase font-bold text-[#8C7A6B] block">Primary Email</span>
                <a
                  href="mailto:andresy1999f@gmail.com"
                  className="text-[#3F5947] hover:underline font-semibold text-base inline-flex items-center space-x-1.5"
                >
                  <Mail className="w-4 h-4 text-[#C87878]" />
                  <span>andresy1999f@gmail.com</span>
                </a>
              </div>

              <div>
                <span className="text-xs uppercase font-bold text-[#8C7A6B] block">Publication Website</span>
                <span className="text-[#261E1A]">https://4kt.lat/</span>
              </div>

              <div>
                <span className="text-xs uppercase font-bold text-[#8C7A6B] block">Response Timeframe</span>
                <span>We typically review reader messages within 2 to 3 business days.</span>
              </div>
            </div>

            <div className="pt-2 text-xs text-[#8C7A6B] bg-[#FAF7F2] p-3 rounded-xl border border-[#EAE3D9]">
              <p>
                <strong>Editorial Transparency Note:</strong> We handle all inquiries directly via secure email to protect your privacy and guarantee direct correspondence without third-party data tracking.
              </p>
            </div>
          </div>

          {/* Direct Email Compose Tool */}
          <div className="bg-[#FAF7F2] p-6 rounded-xl border border-[#EAE3D9]">
            <h3 className="font-serif text-lg font-semibold text-[#261E1A] mb-2 flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-[#577861]" />
              <span>Compose Message</span>
            </h3>
            <p className="text-xs text-[#5C4D44] mb-4">
              Fill in your details below to prepare an email directly in your preferred email client.
            </p>

            <form onSubmit={handleComposeEmail} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#261E1A] mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#D6CCC0] focus:outline-none focus:ring-1 focus:ring-[#577861]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#261E1A] mb-1">Your Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#D6CCC0] focus:outline-none focus:ring-1 focus:ring-[#577861]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#261E1A] mb-1">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#D6CCC0] focus:outline-none focus:ring-1 focus:ring-[#577861]"
                >
                  <option value="Tutorial Step Question">Tutorial Step Question</option>
                  <option value="Correction or Typo Report">Correction or Typo Report</option>
                  <option value="Topic Suggestion">Topic Suggestion</option>
                  <option value="Privacy or Cookie Inquiry">Privacy or Cookie Inquiry</option>
                  <option value="Other Editorial Inquiry">Other Editorial Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#261E1A] mb-1">Your Message</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your question or suggestion in detail..."
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#D6CCC0] focus:outline-none focus:ring-1 focus:ring-[#577861]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-lg bg-[#2D4A3E] hover:bg-[#1F382E] text-white font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center space-x-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send to andresy1999f@gmail.com</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

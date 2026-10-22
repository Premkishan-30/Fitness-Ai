import { Activity } from 'lucide-react';

export default function Footer({ onOpenAuth }) {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'Unified Overview', href: '#platform' },
        { name: 'Feature Rail', href: '#rail' },
        { name: 'Performance Dashboard', href: '#dashboard' },
        { name: 'AI Coach Engine', href: '#coach' },
        { name: 'Hardware Integrations', href: '#integrations' },
        { name: 'How It Works', href: '#how-it-works' },
      ],
    },
    {
      title: 'Biometric Modules',
      links: [
        { name: 'Sleep Architecture (Hypnograms)', href: '#rail' },
        { name: 'Autonomic HRV & Readiness', href: '#rail' },
        { name: 'Dynamic Cardio Strain', href: '#rail' },
        { name: 'Continuous Glucose & Fuel', href: '#rail' },
        { name: 'Clinical Lab OCR (ApoB, hs-CRP)', href: '#rail' },
        { name: 'Phenotypic Longevity Radar', href: '#rail' },
      ],
    },
    {
      title: 'Science & Trust',
      links: [
        { name: 'Methodology & Research', href: '#platform' },
        { name: 'Physiological Validation', href: '#platform' },
        { name: 'HIPAA & SOC-2 Compliance', href: '#platform' },
        { name: 'Zero Data Selling Charter', href: '#platform' },
        { name: 'Security Architecture', href: '#platform' },
      ],
    },
    {
      title: 'Company & Legal',
      links: [
        { name: 'Privacy Policy (Demo)', href: '#privacy' },
        { name: 'Terms of Service (Demo)', href: '#terms' },
        { name: 'Security Whitepaper (Demo)', href: '#security' },
        { name: 'Contact Support', href: '#contact' },
        { name: 'Media Inquiries', href: '#press' },
      ],
    },
  ];

  return (
    <footer className="bg-slate-50 text-slate-600 border-t border-slate-200 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-slate-200">
          {/* Brand Info (Col 2) */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="#"
              onClick={scrollToTop}
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-slate-900 flex items-center gap-1.5">
                Fitness
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  AI
                </span>
              </span>
            </a>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm font-normal">
              The multi-modal health platform that unifies sleep, autonomic recovery,
              cardiovascular strain, and metabolic biomarkers into one predictive daily picture.
            </p>

            {/* Pipeline Status Indicator */}
            <div className="flex flex-col gap-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Telemetry Ingestion: 99.99% Operational</span>
              </div>
              <button
                type="button"
                onClick={() => onOpenAuth('signup')}
                className="self-start text-xs font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4"
              >
                Request Developer API & Sandbox Access
              </button>
            </div>
          </div>

          {/* Links Columns (4 Cols) */}
          {footerSections.map((sec, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                {sec.title}
              </h4>
              <ul className="space-y-2 text-xs">
                {sec.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a
                      href={link.href}
                      className="text-slate-500 hover:text-blue-600 transition-colors block py-0.5"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Legal & Medical Disclaimers */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Fitness Inc. All rights reserved.</p>

          <p className="text-center md:text-right max-w-xl text-[11px] text-slate-400 leading-normal">
            <span className="font-bold text-slate-600">Medical Notice:</span> Fitness is a
            wellness intelligence platform. All telemetry data and AI conversations are for
            demonstration and informational guidance only and do not replace professional medical
            diagnosis, treatment, or consultation.
          </p>
        </div>
      </div>
    </footer>
  );
}

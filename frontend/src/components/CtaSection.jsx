import { useEffect, useRef, useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Activity, 
  Lock
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { resetPointerTilt, tiltOnPointerMove } from '../utils/tiltMotion';

gsap.registerPlugin(ScrollTrigger);

export default function CtaSection({ onOpenAuth }) {
  const sectionRef = useRef(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const ctx = gsap.context(() => {
      const entrance = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
      });
      entrance.fromTo('.cta-heading',
        { clipPath: 'inset(0 0 100% 0)', y: 24, opacity: 0 },
        { clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1, duration: 0.76, ease: 'power3.out' }
      );
      entrance.fromTo('.cta-reveal',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.52, stagger: 0.12, ease: 'power2.out' },
        '-=0.32'
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitted(true);
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-b from-white via-blue-50/40 to-blue-50/70 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Badge */}
        <div className="cta-reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>JOIN THE CONNECTED HEALTH PLATFORM</span>
        </div>

        {/* Large Headline */}
        <h2 className="cta-heading text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
          Your health is too important for{' '}
          <span className="text-blue-600 block sm:inline">
            fragmented data.
          </span>
        </h2>

        {/* Supporting Message */}
        <p className="cta-reveal text-base sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Connect your wearables, synchronize your lab biomarkers, and let the Fitness AI
          orchestrate your daily sleep, recovery, and training in one connected picture.
        </p>

        {/* Interactive Email Capture or Direct CTA */}
        {submitted ? (
          <div className="max-w-md mx-auto p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3 text-emerald-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">You're on the Priority List</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We sent a demonstration confirmation to <span className="font-bold text-slate-900">{email}</span>.
              Your account provisioning invitation will arrive shortly.
            </p>
          </div>
        ) : (
          <div className="cta-reveal cta-tilt-surface max-w-md mx-auto" onPointerMove={tiltOnPointerMove} onPointerLeave={resetPointerTilt}>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 px-5 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
              />
              <button
                type="submit"
                className="px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 group whitespace-nowrap"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>

            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="text-xs text-slate-500">Prefer full interactive onboarding?</span>
              <button
                onClick={() => onOpenAuth('signup')}
                type="button"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4"
              >
                Open Quick Setup Modal
              </button>
            </div>
          </div>
        )}

        {/* Guarantees */}
        <div className="cta-reveal flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 mt-12 pt-8 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>14-day risk-free evaluation</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-600" />
            <span>Encrypted zero-knowledge storage</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600" />
            <span>Compatible with all standard wearables</span>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useRef, useEffect } from 'react';
import { 
  Link2, 
  BrainCircuit, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Cpu 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { resetPointerTilt, tiltOnPointerMove } from '../utils/tiltMotion';

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks({ onOpenAuth }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const reveal = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
      reveal.fromTo('.steps-connector',
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.9, ease: 'power2.inOut' },
        0
      );
      reveal.fromTo('.step-card',
        { clipPath: 'inset(0 0 100% 0 round 24px)', opacity: 0, y: 30, rotateY: 7, scale: 0.96 },
        { clipPath: 'inset(0 0 0% 0 round 24px)', opacity: 1, y: 0, rotateY: 0, scale: 1, duration: 0.8, stagger: 0.16, ease: 'power3.out' },
        0.12
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      step: '01',
      title: 'Connect or enter your health information',
      subtitle: 'Zero friction ingestion in under 60 seconds.',
      desc: 'Seamlessly link your existing wearables (Apple Watch, Oura, Whoop, Garmin) with 1-tap OAuth. Upload historic lab test PDFs for automatic OCR extraction of metabolic and cardiovascular biomarkers.',
      icon: Link2,
      badge: 'INPUT & SYNC',
      bullets: [
        'Instant bidirectional API sync with 40+ hardware platforms',
        'Automatic clinical lab PDF parsing (ApoB, hs-CRP, HbA1c)',
        'Zero manual logging or tedious food diaries required',
      ],
    },
    {
      step: '02',
      title: 'Understand your patterns',
      subtitle: 'Multi-modal neural correlation across every system.',
      desc: 'Our proprietary physiological engine establishes your personal biological baseline, continuously cross-referencing your sleep stages, cardiovascular strain, glucose response, and recovery indices.',
      icon: BrainCircuit,
      badge: 'CROSS-DOMAIN AI',
      bullets: [
        'Maps hidden links between evening fuel and deep sleep duration',
        'Calculates real autonomic nervous system (ANS) reserve',
        'Projects phenotypic biological age vs chronological baseline',
      ],
    },
    {
      step: '03',
      title: 'Make informed daily fitness decisions',
      subtitle: 'Actionable, physician-grade daily protocols.',
      desc: 'Wake up to a tailored, dynamic gameplan: optimal training intensity, target cardio strain, precise recovery interventions, and chronobiology-aligned nutrition windows that dynamically adapt.',
      icon: Sparkles,
      badge: 'DAILY EXECUTION',
      bullets: [
        'Daily strain budget dynamically scaled to nocturnal recovery',
        'Real-time workout intensity recommendations (RPE guidance)',
        'Compounding long-term improvements in longevity and healthspan',
      ],
    },
  ];

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-20 md:py-32 relative overflow-hidden bg-white border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>HOW IT WORKS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            From raw biometrics to{' '}
            <span className="text-blue-600">confident daily decisions</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            Three simple steps to transition from guessing your daily health to operating
            with complete biological clarity.
          </p>
        </div>

        {/* 3 Step Connected Cards */}
        <div className="relative">
          <div className="steps-connector hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-12 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  onPointerMove={tiltOnPointerMove}
                  onPointerLeave={resetPointerTilt}
                  className="step-card p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all duration-300 flex flex-col justify-between group shadow-sm"
                >
                  <div>
                    {/* Step badge & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
                        <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <span className="text-4xl font-black font-mono text-slate-300 group-hover:text-blue-500/30 transition-colors">
                        {item.step}
                      </span>
                    </div>

                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block mb-3">
                      {item.badge}
                    </span>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold text-blue-600 mb-3">{item.subtitle}</p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-6">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200 space-y-2">
                    {item.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA trigger */}
        <div className="text-center mt-16">
          <button
            onClick={() => onOpenAuth('signup')}
            type="button"
            className="px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 hover:shadow-lg transition-all inline-flex items-center gap-2 group"
          >
            <span>Start Step 01 — Connect Your Devices</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}

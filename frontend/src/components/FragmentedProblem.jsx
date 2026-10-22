import { useRef, useEffect } from 'react';
import { 
  Unplug, 
  ArrowDown, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  Activity, 
  Moon, 
  Utensils, 
  Watch,
  AlertTriangle,
  Zap
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FragmentedProblem() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 30, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'center center',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const fragmentedApps = [
    {
      icon: Moon,
      name: 'Sleep Ring / Tracker',
      data: 'Deep sleep, HRV, Sleep debt',
      flaw: 'Blind to daytime carbohydrate intake, workouts, and inflammation.',
      badge: 'ISOLATED SILO',
    },
    {
      icon: Watch,
      name: 'Fitness Strap / Watch',
      data: 'Heart rate zones, strain, active calories',
      flaw: 'Blind to systemic lab biomarkers and hormone fluctuations.',
      badge: 'ISOLATED SILO',
    },
    {
      icon: Utensils,
      name: 'Diet & Calorie App',
      data: 'Macros, calories, meal timing',
      flaw: 'Manual entry with zero correlation to sleep architecture or recovery.',
      badge: 'ISOLATED SILO',
    },
    {
      icon: FileText,
      name: 'Annual Lab Work PDF',
      data: 'ApoB, hs-CRP, fasting insulin, lipids',
      flaw: 'Trapped in email attachments; never informs daily training decisions.',
      badge: 'ISOLATED SILO',
    },
  ];

  return (
    <section
      id="platform"
      ref={sectionRef}
      className="py-20 md:py-32 relative overflow-hidden bg-slate-50/70 border-y border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Unplug className="w-3.5 h-3.5" />
            <span>The Fragmented Health Problem</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            More health data than ever.{' '}
            <span className="text-slate-400 block sm:inline">
              Zero unified understanding.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            Your physiological systems don't operate in silos—so why does your health
            data live in four different apps, two wearables, and an unread PDF?
          </p>
        </div>

        {/* The Disconnected Silos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {fragmentedApps.map((app, index) => {
            const Icon = app.icon;
            return (
              <div
                key={app.name}
                ref={(el) => (cardsRef.current[index] = el)}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-red-300 transition-all duration-300 relative group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-red-50 text-red-600">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                    {app.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">{app.name}</h3>
                <p className="text-xs font-mono text-slate-500 mb-3">{app.data}</p>
                <div className="pt-3 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-600">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{app.flaw}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Convergence Animation Indicator */}
        <div className="flex flex-col items-center justify-center my-8">
          <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 animate-bounce shadow-sm">
            <ArrowDown className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mt-2">
            Synthesized by Fitness Engine
          </span>
        </div>

        {/* The Connected Fitness Result */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-white border-2 border-blue-600/30 shadow-xl overflow-hidden">
          <div className="p-6 sm:p-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ONE CONNECTED SYSTEM</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  The Multi-Dimensional Health Graph
                </h3>
              </div>
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-emerald-800">
                  Harmonizing 120+ Biometric Data Streams
                </span>
              </div>
            </div>

            {/* Cross-Domain Correlation Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase mb-2">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Sleep × Nutrition Link</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  "Eating carbohydrate-heavy meals within 2.5 hours of bed reduced your REM sleep
                  by 26% and elevated resting heart rate by 4 bpm."
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase mb-2">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Strain × Lab Biomarkers</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  "Your hs-CRP dropped from 1.4 to 0.4 mg/L after replacing 2 high-intensity
                  sessions with 45 minutes of strict Zone 2 aerobic base."
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Recovery × Performance</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  "With today's 88ms HRV and 1h 53m deep sleep, your central nervous system
                  has maximum capacity for strength progression."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Moon, 
  Heart, 
  Flame, 
  Droplets, 
  TrendingUp, 
  ShieldCheck, 
  ChevronRight, 
  Zap, 
  Activity 
} from 'lucide-react';
import gsap from 'gsap';
import SmartwatchHeroStage from './SmartwatchHeroStage';

export default function Hero({ onOpenAuth }) {
  const [activeTab, setActiveTab] = useState('morning'); // 'morning' | 'evening'
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const mockupRef = useRef(null);
  const metricPanelsRef = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 52, rotationX: -9, scale: 0.96, transformPerspective: 900, transformOrigin: 'center bottom' },
        { opacity: 1, y: 0, rotationX: 0, scale: 1, duration: 1, delay: 0.15 }
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.5'
      )
      .fromTo(
        mockupRef.current,
        { opacity: 0, y: 50, scale: 0.84, rotationX: 12, rotationY: -8, transformPerspective: 1200, transformOrigin: 'center center' },
        { opacity: 1, y: 0, scale: 1, rotationX: 0, rotationY: 0, duration: 1.35, ease: 'power3.out' },
        '-=0.5'
      );

      tl.fromTo(
        metricPanelsRef.current,
        { opacity: 0, y: 28, scale: 0.94, rotationY: -8 },
        { opacity: 1, y: 0, scale: 1, rotationY: 0, duration: 0.72, stagger: 0.12, ease: 'power3.out' },
        '-=0.8'
      );

      gsap.to('.hero-ambient__ring', {
        rotation: 360,
        duration: 32,
        repeat: -1,
        ease: 'none',
        transformOrigin: 'center center',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleExploreClick = (e) => {
    e.preventDefault();
    const rail = document.querySelector('#rail');
    if (rail) {
      rail.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="hero-landing relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-50/40 to-white"
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-100/60 blur-[120px] rounded-full pointer-events-none" />
      <div className="hero-ambient" aria-hidden="true">
        <div className="hero-ambient__ring hero-ambient__ring--outer"><i /><i /><i /><i /></div>
        <div className="hero-ambient__ring hero-ambient__ring--inner"><i /><i /><i /></div>
        <div className="hero-ambient__core" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="hero-opening">
          <div className="hero-opening__copy">
            <div className="hero-opening__eyebrow">
              <span className="hero-opening__pulse" />
              <Sparkles className="h-4 w-4" />
              <span>YOUR PERSONAL HEALTH INTELLIGENCE</span>
            </div>
            <h1 ref={headlineRef} className="hero-opening__title">
              Your Health.<br />
              <span>One Connected Picture.</span>
            </h1>
            <p ref={subtitleRef} className="hero-opening__description">
              Sleep, recovery, nutrition, and activity—understood together, so you can make better decisions about your day.
            </p>
            <div ref={ctaRef} className="hero-opening__actions">
              <button className="hero-opening__primary" onClick={() => onOpenAuth('signup')} type="button">
                Get Started <ArrowRight className="h-4 w-4" />
              </button>
              <a className="hero-opening__secondary" href="#rail" onClick={handleExploreClick}>
                Explore the Platform <ChevronRight className="h-4 w-4" />
              </a>
            </div>
            <div className="hero-opening__trust">
              <span><ShieldCheck /> Private by design</span>
              <i />
              <span><Activity /> Your health, in context</span>
            </div>
          </div>

          <SmartwatchHeroStage animationRef={mockupRef} panelRefs={metricPanelsRef} />
        </div>

        <div className="hidden" aria-hidden="true">
        {/* Top Tag matching Figma */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs sm:text-sm font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>The Multi-Modal AI Health & Longevity Platform</span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto mb-6">
          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08]"
          >
            Your health.{' '}
            <span className="text-blue-600 block sm:inline">
              One connected picture.
            </span>
          </h1>
        </div>

        {/* Supporting Message */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p
            className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal"
          >
            Sleep, recovery, nutrition and activity—understood together, so you can
            make better decisions about your day.
          </p>
        </div>

        {/* Primary and Secondary CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <button
            onClick={() => onOpenAuth('signup')}
            type="button"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/25 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
          <a
            href="#rail"
            onClick={handleExploreClick}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-base font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <span>Explore the Platform</span>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
          </a>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-500 mb-14">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>HIPAA Compliant & Encrypted</span>
          </div>
          <span className="hidden sm:inline text-slate-300">•</span>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600" />
            <span>Syncs with 40+ Wearables & Lab APIs</span>
          </div>
          <span className="hidden sm:inline text-slate-300">•</span>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Continuous Autonomous Synthesis</span>
          </div>
        </div>

        {/* HERO PRODUCT PREVIEW SHOWCASE (Clean Light Aesthetic) */}
        <div
          className="relative max-w-5xl mx-auto rounded-3xl p-1 bg-gradient-to-b from-blue-100/60 to-slate-200/40 shadow-xl"
        >
          <div className="rounded-[22px] bg-white border border-slate-200/80 p-5 sm:p-8 overflow-hidden relative shadow-sm">
            {/* Top Interactive Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-600 p-[2px] shadow-sm">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-bold text-sm text-blue-600">
                    AX
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">Alex Mercer</h3>
                    <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                      OPTIMAL READINESS
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Continuous Sync • Whoop 4.0 + Oura Ring Gen 3 + Dexcom G7
                  </p>
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex items-center self-start sm:self-auto bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab('morning')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === 'morning'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Morning Readiness
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('evening')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === 'evening'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Evening Load & Fuel
                </button>
              </div>
            </div>

            {/* Central Readiness & Metrics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center">
              {/* Circular Gauge Centerpiece (Col 5) */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 relative">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      className="text-slate-200"
                      strokeWidth="7"
                      stroke="currentColor"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      className="text-blue-600 transition-all duration-1000 ease-out"
                      strokeWidth="7"
                      strokeDasharray="264"
                      strokeDashoffset={activeTab === 'morning' ? '18' : '38'}
                      strokeLinecap="round"
                      stroke="url(#heroGaugeGradLight)"
                      fill="transparent"
                    />
                    <defs>
                      <linearGradient id="heroGaugeGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#1d4ed8" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Inside Gauge Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                      {activeTab === 'morning' ? 'Readiness Score' : 'Daily Strain'}
                    </span>
                    <span className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight my-1">
                      {activeTab === 'morning' ? '94' : '15.2'}
                      <span className="text-xl sm:text-2xl font-light text-blue-600">
                        {activeTab === 'morning' ? '%' : ''}
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <TrendingUp className="w-3 h-3" />
                      {activeTab === 'morning' ? '+8% vs 30-Day Avg' : 'Target Reached'}
                    </span>
                  </div>
                </div>

                <div className="w-full mt-4 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
                  <div className="text-center">
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">HRV Baseline</span>
                    <span className="font-bold text-slate-900 text-sm">88 ms</span>
                    <span className="text-emerald-600 text-[10px] block font-semibold">+12 ms</span>
                  </div>
                  <div className="h-6 w-[1px] bg-slate-200" />
                  <div className="text-center">
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">Resting HR</span>
                    <span className="font-bold text-slate-900 text-sm">48 bpm</span>
                    <span className="text-emerald-600 text-[10px] block font-semibold">-3 bpm</span>
                  </div>
                  <div className="h-6 w-[1px] bg-slate-200" />
                  <div className="text-center">
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">Parasympathetic</span>
                    <span className="font-bold text-blue-600 text-sm">Dominant</span>
                    <span className="text-slate-500 text-[10px] block">CNS Primed</span>
                  </div>
                </div>
              </div>

              {/* 4 Connected Health Dimensions (Col 7) */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Sleep */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-blue-400 transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                        <Moon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                        Sleep Quality
                      </span>
                    </div>
                    <span className="text-sm font-bold text-slate-900">91 / 100</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Duration</span>
                      <span className="font-semibold text-slate-800">7h 52m (102% target)</span>
                    </div>
                    {/* Hypnogram stages mini bar */}
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden flex my-2">
                      <div className="bg-indigo-600 h-full w-[24%]" title="Deep 24%" />
                      <div className="bg-blue-400 h-full w-[28%]" title="REM 28%" />
                      <div className="bg-sky-300 h-full w-[42%]" title="Light 42%" />
                      <div className="bg-amber-400 h-full w-[6%]" title="Awake 6%" />
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                      <span className="text-indigo-600">Deep: 1h 53m</span>
                      <span className="text-blue-600">REM: 2h 12m</span>
                    </div>
                  </div>
                </div>

                {/* 2. Recovery */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-emerald-400 transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                        <Heart className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                        Recovery Engine
                      </span>
                    </div>
                    <span className="text-sm font-bold text-emerald-600">94% Prime</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Physiological Cost</span>
                      <span className="font-semibold text-emerald-600">Very Low</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full w-[94%]" />
                    </div>
                    <p className="text-[11px] text-slate-500 leading-tight">
                      Autonomic recovery index exceeds your 14-day running baseline.
                    </p>
                  </div>
                </div>

                {/* 3. Strain & Activity */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-400 transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                        <Flame className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                        Activity & Strain
                      </span>
                    </div>
                    <span className="text-sm font-bold text-slate-900">14.8 / 21.0</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Cardio Output</span>
                      <span className="font-semibold text-slate-800">2,420 Active kcal</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full w-[72%]" />
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                      <span>Zone 2: 45 min</span>
                      <span className="text-orange-600">Zone 5: 12 min</span>
                    </div>
                  </div>
                </div>

                {/* 4. Nutrition & Hydration */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-blue-400 transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                        <Droplets className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                        Metabolic & Fuel
                      </span>
                    </div>
                    <span className="text-sm font-bold text-blue-600">Stable 92 mg/dL</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Hydration Progress</span>
                      <span className="font-semibold text-slate-800">2.8L / 3.2L Target</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full w-[88%]" />
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                      <span>Protein: 142g (96%)</span>
                      <span className="text-emerald-600">Glucose Spike: 0%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Synthesized Action Recommendation Banner */}
            <div className="mt-6 p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      AI Daily Synthesis
                    </span>
                    <span className="text-[10px] text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full font-mono font-bold">
                      CONFIDENCE: 98.4%
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 mt-0.5">
                    "Deep sleep reached 1h 53m and autonomic HRV is 88ms. Your central nervous
                    system is fully primed for high-threshold deadlifts or high-cadence intervals."
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onOpenAuth('signup')}
                className="shrink-0 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>View Daily Protocol</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Demo Notice */}
        <p className="text-center text-[11px] text-slate-500 mt-4 tracking-wide font-medium">
          Illustrative biometric telemetry data. Non-diagnostic wellness intelligence platform.
        </p>
        </div>
      </div>
    </section>
  );
}

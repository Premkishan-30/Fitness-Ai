import { useRef, useEffect, useState } from 'react';
import { 
  Moon, 
  Heart, 
  Flame, 
  Droplets, 
  TrendingUp, 
  Bot, 
  Watch, 
  FileText, 
  Clock, 
  Zap, 
  ArrowRight 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalRail({ onOpenAuth }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  const panels = [
    {
      id: 'sleep',
      step: '01',
      tag: 'SLEEP ARCHITECTURE',
      title: 'Sleep Intelligence',
      description:
        'Continuous sleep architecture tracking with real-time hypnogram stages, sleep debt calculation, and circadian phase alignment.',
      icon: Moon,
      color: 'from-indigo-500 to-blue-500',
      badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
      mockup: (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400">Sleep Score</span>
              <div className="text-3xl font-extrabold text-white">91 <span className="text-sm font-normal text-slate-400">/ 100</span></div>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-slate-400">Duration</span>
              <div className="text-lg font-bold text-indigo-400">7h 52m</div>
            </div>
          </div>

          {/* Hypnogram Stage Bars */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1.5 font-medium">
              <span>Sleep Stages</span>
              <span className="text-indigo-400">Efficiency: 94%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden flex gap-0.5 p-0.5">
              <div className="bg-indigo-600 h-full rounded-l-full w-[24%]" title="Deep 24%" />
              <div className="bg-cyan-400 h-full w-[28%]" title="REM 28%" />
              <div className="bg-blue-400 h-full w-[42%]" title="Light 42%" />
              <div className="bg-amber-400 h-full rounded-r-full w-[6%]" title="Awake 6%" />
            </div>
            <div className="grid grid-cols-4 gap-1 text-[10px] text-slate-400 mt-2 text-center">
              <div><span className="block font-bold text-indigo-400">1h 53m</span> Deep (24%)</div>
              <div><span className="block font-bold text-cyan-400">2h 12m</span> REM (28%)</div>
              <div><span className="block font-bold text-blue-400">3h 18m</span> Light (42%)</div>
              <div><span className="block font-bold text-amber-400">29m</span> Awake (6%)</div>
            </div>
          </div>

          {/* Circadian Window */}
          <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span className="text-slate-300">Circadian Window Alignment</span>
            </div>
            <span className="font-semibold text-emerald-400">98% In-Phase</span>
          </div>
        </div>
      ),
    },
    {
      id: 'recovery',
      step: '02',
      tag: 'CENTRAL NERVOUS SYSTEM',
      title: 'Recovery & Daily Readiness',
      description:
        'Autonomic nervous system balance calculated from high-frequency heart rate variability (HRV) and nocturnal resting pulse trends.',
      icon: Heart,
      color: 'from-emerald-500 to-teal-500',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      mockup: (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400">Readiness State</span>
              <div className="text-3xl font-extrabold text-emerald-400">94% <span className="text-xs text-white font-medium bg-emerald-500/20 px-2 py-0.5 rounded-full ml-1">PRIME</span></div>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-slate-400">Resting HR</span>
              <div className="text-lg font-bold text-white">48 bpm <span className="text-xs text-emerald-400">(-3)</span></div>
            </div>
          </div>

          {/* ANS Balance Meter */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1.5">
              <span>Autonomic Balance</span>
              <span className="text-emerald-400 font-medium">Parasympathetic Dominant</span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full w-[76%]" />
              <div className="bg-slate-700 h-full w-[24%]" />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>Rest & Repair: 76%</span>
              <span>Sympathetic Tone: 24%</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-between text-xs">
            <span className="text-slate-300">Baseline HRV (rMSSD)</span>
            <span className="font-bold text-white font-mono">88 ms <span className="text-emerald-400 text-[11px]">(+14% vs avg)</span></span>
          </div>
        </div>
      ),
    },
    {
      id: 'strain',
      step: '03',
      tag: 'DYNAMIC CARDIO LOAD',
      title: 'Activity & Dynamic Strain',
      description:
        'Quantify cardiovascular load and muscular fatigue in real-time, matching workout intensity to your actual recovery capacity.',
      icon: Flame,
      color: 'from-orange-500 to-amber-500',
      badgeColor: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
      mockup: (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400">Daily Strain</span>
              <div className="text-3xl font-extrabold text-white">15.2 <span className="text-sm font-normal text-slate-400">/ 21.0</span></div>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-slate-400">Active Output</span>
              <div className="text-lg font-bold text-amber-400">2,420 kcal</div>
            </div>
          </div>

          {/* Heart Rate Zones Distribution */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1.5">
              <span>Zone Minutes Distribution</span>
              <span className="text-slate-400">Target: 14.0 - 16.5</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 text-center">
              <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <span className="text-[10px] text-blue-400 block font-semibold">Zone 2</span>
                <span className="text-sm font-bold text-white">45m</span>
              </div>
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-[10px] text-emerald-400 block font-semibold">Zone 3</span>
                <span className="text-sm font-bold text-white">22m</span>
              </div>
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <span className="text-[10px] text-amber-400 block font-semibold">Zone 4</span>
                <span className="text-sm font-bold text-white">14m</span>
              </div>
              <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                <span className="text-[10px] text-red-400 block font-semibold">Zone 5</span>
                <span className="text-sm font-bold text-white">8m</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-between text-xs">
            <span className="text-slate-300">Remaining Day Strain Budget</span>
            <span className="font-semibold text-emerald-400">1.8 Score Remaining</span>
          </div>
        </div>
      ),
    },
    {
      id: 'nutrition',
      step: '04',
      tag: 'METABOLIC STABILITY',
      title: 'Nutrition & Hydration',
      description:
        'Continuous metabolic fuel tracking with continuous glucose stability curves, micronutrient density, and sweat-loss hydration targets.',
      icon: Droplets,
      color: 'from-cyan-500 to-blue-500',
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      mockup: (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400">Glycemic Stability</span>
              <div className="text-3xl font-extrabold text-cyan-400">92 <span className="text-sm font-normal text-white">mg/dL</span></div>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-slate-400">Hydration</span>
              <div className="text-lg font-bold text-white">2.8L <span className="text-xs text-slate-400">/ 3.2L</span></div>
            </div>
          </div>

          {/* Continuous Glucose Curve (SVG) */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>CGM Glucose Curve (Last 6 Hours)</span>
              <span className="text-emerald-400 text-[10px] font-semibold">● In Target 98%</span>
            </div>
            <svg className="w-full h-14" viewBox="0 0 280 60" fill="none">
              <path
                d="M 0 35 Q 40 28 80 32 T 140 18 T 200 30 T 280 24"
                stroke="#06B6D4"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                d="M 0 35 Q 40 28 80 32 T 140 18 T 200 30 T 280 24 L 280 60 L 0 60 Z"
                fill="url(#cgmGrad)"
                opacity="0.2"
              />
              <defs>
                <linearGradient id="cgmGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor="#06B6D4" />
                  <stop offset="1" stopColor="#06B6D4" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
              <span className="text-slate-400 text-[10px] block">Protein</span>
              <span className="font-bold text-white">145g / 150g</span>
            </div>
            <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
              <span className="text-slate-400 text-[10px] block">Complex Carbs</span>
              <span className="font-bold text-white">210g</span>
            </div>
            <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
              <span className="text-slate-400 text-[10px] block">Healthy Fats</span>
              <span className="font-bold text-white">62g</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'biomarkers',
      step: '05',
      tag: 'CLINICAL LAB OCR',
      title: 'Biomarkers & Health Reports',
      description:
        'Automatic ingestion and OCR parsing of clinical lab tests, translating cold numbers into longitudinal cardiovascular and metabolic trends.',
      icon: FileText,
      color: 'from-blue-600 to-indigo-600',
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      mockup: (
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400">Clinical Panel</span>
              <div className="text-xl font-bold text-white">Comprehensive Metabolic + Lipids</div>
            </div>
            <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              OPTIMAL TIERS
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
              <div>
                <span className="font-bold text-white block">ApoB (Atherogenic Lipids)</span>
                <span className="text-[10px] text-slate-400">Target: &lt;80 mg/dL</span>
              </div>
              <span className="font-mono font-bold text-emerald-400 text-sm">74 mg/dL</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
              <div>
                <span className="font-bold text-white block">hs-CRP (Inflammation)</span>
                <span className="text-[10px] text-slate-400">Target: &lt;0.5 mg/L</span>
              </div>
              <span className="font-mono font-bold text-emerald-400 text-sm">0.38 mg/L</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
              <div>
                <span className="font-bold text-white block">VO2 Max (Cardio Fitness)</span>
                <span className="text-[10px] text-slate-400">Top 5% for demographic</span>
              </div>
              <span className="font-mono font-bold text-cyan-400 text-sm">51.4 mL/kg/min</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'longevity',
      step: '06',
      tag: 'PHENOTYPIC PACE',
      title: 'Biological Age & Long-Term Trends',
      description:
        'Multi-system biological age estimation based on phenotypic biomarker decay rates and continuous physiological resilience.',
      icon: TrendingUp,
      color: 'from-violet-500 to-purple-600',
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      mockup: (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400">Biological Age</span>
              <div className="text-3xl font-extrabold text-purple-400">28.6 <span className="text-sm font-normal text-slate-400">Yrs</span></div>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-slate-400">Chronological</span>
              <div className="text-lg font-bold text-white">34.0 Yrs <span className="text-xs text-emerald-400 block font-semibold">-5.4 Yrs Younger</span></div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-semibold text-white">Pace of Aging</span>
              <span className="font-bold text-emerald-400 font-mono">0.81 yr / yr</span>
            </div>
            <p className="text-[11px] text-slate-400">
              For every 1 chronological year, your biological systems age 9.7 months.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
              <span className="text-slate-400 text-[10px] block">Cardiovascular Resilience</span>
              <span className="font-bold text-white">96% Optimal</span>
            </div>
            <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
              <span className="text-slate-400 text-[10px] block">Metabolic Resilience</span>
              <span className="font-bold text-white">92% Optimal</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'coach',
      step: '07',
      tag: 'CONTEXTUAL REASONING',
      title: 'AI Fitness & Health Coach',
      description:
        'A proactive intelligence partner that continuously reorganizes your training, recovery protocols, and nutrition based on real-time physiology.',
      icon: Bot,
      color: 'from-blue-500 to-cyan-500',
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      mockup: (
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold text-white">Fitness AI Engine v3.4</span>
            <span className="text-[10px] font-mono text-slate-400 ml-auto">ACTIVE AGENT</span>
          </div>

          {/* Chat Bubbles */}
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-2xl rounded-tl-sm bg-blue-600/20 border border-blue-500/30 text-slate-200">
              <span className="text-[10px] font-bold text-blue-400 block mb-1">FITNESS COACH</span>
              "Recovery is 94% with 1h 53m deep sleep. I shifted tomorrow's rest day to Friday and programmed heavy barbell deadlifts for today."
            </div>

            <div className="p-2.5 rounded-2xl rounded-tr-sm bg-white/[0.05] border border-white/10 text-slate-300 ml-6 text-right">
              "Can I add 30m easy swimming this afternoon?"
            </div>

            <div className="p-3 rounded-2xl rounded-tl-sm bg-blue-600/20 border border-blue-500/30 text-slate-200">
              <span className="text-[10px] font-bold text-blue-400 block mb-1">FITNESS COACH</span>
              "Yes, keep heart rate strictly under 122 bpm (Zone 1) to accelerate lymphatic drainage without tapping into muscle glycogen."
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'wearables',
      step: '08',
      tag: 'ZERO-LATENCY SYNC',
      title: 'Wearable & Device Connections',
      description:
        'Zero-friction bi-directional synchronization with leading medical-grade CGMs, smart rings, chest straps, and smart sleep pods.',
      icon: Watch,
      color: 'from-cyan-500 to-teal-500',
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      mockup: (
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-xs font-bold text-white">Synchronized Ecosystem</span>
            <span className="text-[10px] text-emerald-400 font-mono">1.2s LATENCY</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { name: 'Apple HealthKit', status: 'Connected • All Metrics' },
              { name: 'Whoop 4.0 Strap', status: 'Connected • Strain & Recovery' },
              { name: 'Oura Ring Gen 3', status: 'Connected • Sleep & Temp' },
              { name: 'Dexcom G7 CGM', status: 'Connected • Realtime Glucose' },
              { name: 'Withings Body Scan', status: 'Connected • Impedance & ECG' },
              { name: 'Eight Sleep Pod 4', status: 'Connected • Dynamic Temp' },
            ].map((device) => (
              <div
                key={device.name}
                className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between"
              >
                <div>
                  <span className="font-semibold text-white block text-[11px]">{device.name}</span>
                  <span className="text-[9px] text-slate-400">{device.status}</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0 ml-1" />
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
            <span>Security: AES-256 GCM End-to-End</span>
            <span className="text-blue-400">40+ Brands Supported</span>
          </div>
        </div>
      ),
    },
  ];

  // GSAP Horizontal Pinning Setup
  useEffect(() => {
    const checkWidth = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || window.innerWidth < 1024) {
      return () => window.removeEventListener('resize', checkWidth);
    }

    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return () => window.removeEventListener('resize', checkWidth);

    const ctx = gsap.context(() => {
      const getScrollAmount = () => {
        return track.scrollWidth - window.innerWidth + 80;
      };

      const scrollTween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${getScrollAmount() * 1.15}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const raw = self.progress * panels.length;
            const current = Math.min(Math.floor(raw), panels.length - 1);
            setActiveIndex(current);
          },
        },
      });

      return () => {
        if (scrollTween.scrollTrigger) scrollTween.scrollTrigger.kill();
      };
    }, container);

    return () => {
      window.removeEventListener('resize', checkWidth);
      ctx.revert();
    };
  }, [panels.length]);

  const scrollToPanel = (idx) => {
    setActiveIndex(idx);
    if (!isDesktop) {
      const el = document.getElementById(`rail-panel-${idx}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  return (
    <section
      id="rail"
      ref={containerRef}
      className="relative w-full bg-[#060a12] text-white overflow-hidden border-y border-white/5"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Header Bar inside the section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>THE HORIZONTAL FEATURE RAIL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Unified Intelligence in{' '}
              <span className="text-gradient-blue">Eight Core Dimensions</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl font-normal">
              Scroll through the full depth of the Fitness platform. Each dimension
              continuously feeds the central reasoning engine.
            </p>
          </div>

          {/* Progress Indicator & Counter */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-medium">
                Dimension
              </span>
              <span className="text-2xl font-black text-blue-400 font-mono">
                {String(activeIndex + 1).padStart(2, '0')}{' '}
                <span className="text-sm text-slate-500 font-normal">/ 08</span>
              </span>
            </div>

            {/* Quick jumps */}
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-full border border-white/10">
              {panels.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => scrollToPanel(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    activeIndex === idx
                      ? 'w-7 bg-blue-500 shadow-md shadow-blue-500/50'
                      : 'bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Jump to panel ${p.step}: ${p.title}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Horizontal Track / Mobile Touch Track */}
      <div className="w-full pb-16 lg:pb-24 overflow-x-auto lg:overflow-visible no-scrollbar">
        <div
          ref={trackRef}
          className="flex flex-row gap-6 sm:gap-8 px-4 sm:px-8 lg:px-16 w-max items-stretch"
        >
          {panels.map((panel, idx) => {
            const Icon = panel.icon;
            const isActive = activeIndex === idx;

            return (
              <div
                id={`rail-panel-${idx}`}
                key={panel.id}
                className={`w-[85vw] sm:w-[460px] lg:w-[500px] shrink-0 rounded-3xl p-6 sm:p-8 glass-panel border transition-all duration-500 flex flex-col justify-between ${
                  isActive
                    ? 'border-blue-500/40 shadow-2xl shadow-blue-900/20 bg-[#0c1426]'
                    : 'border-white/10 hover:border-white/20 bg-[#090e1b]'
                }`}
              >
                {/* Panel Top Header */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-3 rounded-2xl bg-gradient-to-tr ${panel.color} text-white shadow-lg`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 block">
                          MODULE {panel.step}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${panel.badgeColor}`}
                        >
                          {panel.tag}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                    {panel.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-6">
                    {panel.description}
                  </p>
                </div>

                {/* Realistic Product-Interface Preview */}
                <div className="rounded-2xl bg-[#070b14]/90 border border-white/10 p-5 shadow-inner">
                  {panel.mockup}
                </div>

                {/* Bottom CTA trigger */}
                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Illustrative biometric simulation
                  </span>
                  <button
                    onClick={() => onOpenAuth('signup')}
                    type="button"
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 group"
                  >
                    <span>Inspect module</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

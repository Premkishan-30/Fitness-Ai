import { useRef, useEffect, useState } from 'react';
import { 
  Activity, 
  Watch, 
  Moon, 
  Heart, 
  Flame, 
  Droplets, 
  FileText, 
  TrendingUp, 
  Bot, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ArrowUp
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────
   10 PHONE SCREEN MOCKUPS (MATCHING PRIMATE.HEALTH & FIT GRAPH)
───────────────────────────────────────────────────────── */

// 01. Capacity & Daily Readiness (Matching primate.health screenshot 2 teaser)
function ScreenDailyOverview() {
  return (
    <div className="flex flex-col h-full bg-[#f8fafc] text-slate-900 p-4 select-none">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#b5853a] font-bold block">
            DAILY CAPACITY
          </span>
          <span className="text-sm font-black text-[#143428]">Tuesday, 14 July</span>
        </div>
        <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          92 / 100 PRIME
        </span>
      </div>

      <div className="relative my-3 flex flex-col items-center justify-center">
        <svg className="w-36 h-36 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" stroke="#e2e8f0" strokeWidth="8" fill="none" />
          <circle 
            cx="50" cy="50" r="42" 
            stroke="url(#screenGrad1)" 
            strokeWidth="8" 
            fill="none"
            strokeDasharray="264" 
            strokeDashoffset="24" 
            strokeLinecap="round" 
          />
          <defs>
            <linearGradient id="screenGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Capacity</span>
          <span className="text-4xl font-black text-slate-900 tracking-tight">92</span>
          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-0.5 border border-emerald-200">
            OPTIMAL LOAD
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1.5 mb-3">
        {[
          { label: 'Sleep', score: '91', color: 'text-indigo-600', border: 'border-indigo-100 bg-indigo-50/50' },
          { label: 'Recovery', score: '94', color: 'text-emerald-600', border: 'border-emerald-100 bg-emerald-50/50' },
          { label: 'Strain', score: '15.2', color: 'text-amber-600', border: 'border-amber-100 bg-amber-50/50' },
          { label: 'Fuel', score: '92', color: 'text-blue-600', border: 'border-blue-100 bg-blue-50/50' },
        ].map((item) => (
          <div key={item.label} className={`p-1.5 rounded-xl border ${item.border} text-center`}>
            <span className="text-[9px] text-slate-500 block leading-tight font-medium">{item.label}</span>
            <span className={`text-xs font-bold ${item.color}`}>{item.score}</span>
          </div>
        ))}
      </div>

      <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/80 mt-auto">
        <div className="flex items-center gap-1.5 mb-1">
          <Sparkles className="w-3 h-3 text-[#b5853a]" />
          <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider">CAPACITY BRIEF</span>
        </div>
        <p className="text-[10px] text-slate-700 leading-relaxed font-normal">
          "Deep sleep cleared sleep debt by 22m. Autonomic nervous system is primed for peak output before 3:00 PM."
        </p>
      </div>
    </div>
  );
}

// 02. Wearables Sync (Exact match to Screenshot 3: primate.health/#rail 02 WEARABLES)
function ScreenWearables() {
  const devices = [
    { name: 'Apple Watch', metric: 'Sleep, HRV, workouts', status: 'SYNCED', dot: 'bg-emerald-500' },
    { name: 'Garmin', metric: 'Runs, HRV, training load', status: 'SYNCED', dot: 'bg-emerald-500' },
    { name: 'Mi Band', metric: 'Steps, heart rate', status: 'SYNCED', dot: 'bg-emerald-500' },
    { name: 'Whoop', metric: 'Recovery, strain', status: 'SYNCED', dot: 'bg-emerald-500' },
    { name: 'boAt', metric: 'Steps, sleep', status: 'SYNCED', dot: 'bg-emerald-500' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] text-slate-900 p-4 select-none">
      <div className="pb-2.5 border-b border-slate-200/80">
        <span className="text-[9px] uppercase tracking-wider text-[#b5853a] font-mono font-bold block">SOURCES</span>
        <span className="text-base font-black text-[#143428]">Wearables</span>
        <div className="text-[9px] text-amber-900 bg-amber-50 border border-amber-200 rounded px-2 py-0.5 inline-block mt-1 font-mono font-semibold">
          All streams synced · 06:40
        </div>
      </div>

      <div className="space-y-1.5 my-auto">
        {devices.map((d) => (
          <div key={d.name} className="p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold text-slate-900 leading-tight">{d.name}</div>
              <div className="text-[9px] text-slate-400 font-mono">{d.metric}</div>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <span className={`w-1.5 h-1.5 rounded-full ${d.dot}`} />
              <span>{d.status}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-center mt-auto">
        <span className="text-[8.5px] text-slate-500 font-mono block">
          Via Apple Health, Google Health Connect & Samsung Health
        </span>
      </div>
    </div>
  );
}

// 03. Stress Intelligence (Exact match to Screenshot 4: primate.health/#rail 03 STRESS)
function ScreenStress() {
  return (
    <div className="flex flex-col h-full bg-[#f8fafc] text-slate-900 p-4 select-none">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
        <div>
          <span className="text-[9px] uppercase tracking-wider text-[#b5853a] font-mono font-bold block">DAILY SIGNAL</span>
          <span className="text-base font-black text-[#143428]">Stress</span>
        </div>
        <span className="text-[10px] font-mono text-slate-500 font-medium">Tuesday, 14 July</span>
      </div>

      {/* Radial Semi-Circle Gauge */}
      <div className="relative my-2 flex flex-col items-center justify-center">
        <svg className="w-36 h-20" viewBox="0 0 100 55">
          <path
            d="M 12 50 A 38 38 0 0 1 88 50"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M 12 50 A 38 38 0 0 1 88 50"
            fill="none"
            stroke="url(#stressGrad2)"
            strokeWidth="7"
            strokeDasharray="120"
            strokeDashoffset="75"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="stressGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
        </svg>

        <div className="text-center -mt-4">
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            32 <span className="text-xs font-normal text-slate-400">/ 100</span>
          </div>
          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 block mt-0.5">
            LOW · Target: under 33
          </span>
        </div>
      </div>

      {/* 7-day avg and Best day cards */}
      <div className="grid grid-cols-2 gap-2 mb-2 text-center">
        <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-sm">
          <span className="text-[8px] text-slate-400 uppercase font-bold block">7-day avg</span>
          <span className="text-sm font-black text-slate-900">31</span>
          <span className="text-[7px] text-slate-400 block font-mono">vs last week -</span>
        </div>
        <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-sm">
          <span className="text-[8px] text-slate-400 uppercase font-bold block">Best day</span>
          <span className="text-sm font-black text-emerald-600">28</span>
          <span className="text-[7px] text-slate-400 block font-mono">lowest this week -</span>
        </div>
      </div>

      {/* Today's stress curve graph */}
      <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm mt-auto">
        <div className="flex justify-between items-center text-[9px] mb-1 font-semibold text-slate-700">
          <span className="text-[#b5853a] font-bold">| Today's stress</span>
          <span className="text-slate-400 font-mono text-[8px]">12AM - 10PM</span>
        </div>
        <svg className="w-full h-8" viewBox="0 0 200 35" fill="none">
          <path
            d="M 0 25 Q 30 26 50 20 T 100 24 T 130 8 T 160 12 T 200 22"
            stroke="#d97706"
            strokeWidth="2"
            fill="none"
          />
        </svg>
        <div className="grid grid-cols-3 gap-1 text-[8px] text-center pt-1 border-t border-slate-100 font-medium">
          <span className="text-emerald-700">Low 54% (13h)</span>
          <span className="text-amber-700">Mod 35% (8h)</span>
          <span className="text-rose-700">High 10% (2.5h)</span>
        </div>
      </div>
    </div>
  );
}

// 04. Sleep Architecture
function ScreenSleep() {
  return (
    <div className="flex flex-col h-full bg-[#f8fafc] text-slate-900 p-4 select-none">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">SLEEP EFFICIENCY</span>
          <div className="text-2xl font-black text-slate-900">91 <span className="text-xs font-normal text-slate-500">/ 100</span></div>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">DURATION</span>
          <div className="text-sm font-bold text-indigo-600">7h 52m</div>
        </div>
      </div>

      <div className="my-3">
        <div className="flex justify-between text-[10px] text-slate-700 mb-1.5 font-semibold">
          <span>Hypnogram Stages</span>
          <span className="text-indigo-600">Efficiency: 94%</span>
        </div>
        <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden flex gap-0.5 p-0.5">
          <div className="bg-indigo-600 h-full rounded-l-full w-[24%]" title="Deep" />
          <div className="bg-blue-400 h-full w-[28%]" title="REM" />
          <div className="bg-sky-300 h-full w-[42%]" title="Light" />
          <div className="bg-amber-400 h-full rounded-r-full w-[6%]" title="Awake" />
        </div>
        <div className="grid grid-cols-4 gap-1 text-[9px] text-slate-600 mt-2 text-center font-medium">
          <div><span className="block font-bold text-indigo-600">1h 53m</span> Deep (24%)</div>
          <div><span className="block font-bold text-blue-600">2h 12m</span> REM (28%)</div>
          <div><span className="block font-bold text-sky-600">3h 18m</span> Light (42%)</div>
          <div><span className="block font-bold text-amber-600">29m</span> Awake (6%)</div>
        </div>
      </div>

      <div className="space-y-2 mt-auto">
        <div className="p-2 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between text-[10px]">
          <span className="text-slate-600 font-medium">Circadian Phase Alignment</span>
          <span className="font-bold text-emerald-600">98% In-Phase</span>
        </div>
        <div className="p-2 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between text-[10px]">
          <span className="text-slate-600 font-medium">Cumulative Sleep Debt</span>
          <span className="font-bold text-indigo-600 font-mono">-12 min (Cleared)</span>
        </div>
      </div>
    </div>
  );
}

// 05. Autonomic Nervous System Recovery
function ScreenRecovery() {
  return (
    <div className="flex flex-col h-full bg-[#f8fafc] text-slate-900 p-4 select-none">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">READINESS STATE</span>
          <div className="text-2xl font-black text-emerald-600">94% <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-full ml-1 border border-emerald-200">PRIME</span></div>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">RESTING HR</span>
          <div className="text-sm font-bold text-slate-900">48 bpm <span className="text-[10px] text-emerald-600 font-bold">(-3)</span></div>
        </div>
      </div>

      <div className="my-3">
        <div className="flex justify-between text-[10px] text-slate-700 mb-1 font-semibold">
          <span>Autonomic Nervous System</span>
          <span className="text-emerald-600 font-bold">Parasympathetic Dominant</span>
        </div>
        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden flex">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full w-[76%]" />
          <div className="bg-slate-300 h-full w-[24%]" />
        </div>
        <div className="flex justify-between text-[8px] text-slate-500 mt-1 font-medium">
          <span>Rest & Repair: 76%</span>
          <span>Sympathetic Tone: 24%</span>
        </div>
      </div>

      <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-sm my-auto">
        <div className="flex justify-between items-center text-[10px] mb-2">
          <span className="text-slate-600 font-medium">Baseline HRV (rMSSD)</span>
          <span className="font-bold text-emerald-600 font-mono">88 ms (+14%)</span>
        </div>
        <div className="flex items-end gap-1.5 h-12 pt-2">
          {[68, 72, 70, 78, 82, 85, 88].map((val, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1">
              <div 
                className={`w-full rounded-t-sm transition-all ${idx === 6 ? 'bg-emerald-500 shadow-sm' : 'bg-slate-200'}`}
                style={{ height: `${(val / 95) * 100}%` }}
              />
              <span className="text-[7px] text-slate-400 font-medium">{['M','T','W','T','F','S','Su'][idx]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 06. Nutrition & CGM
function ScreenNutrition() {
  return (
    <div className="flex flex-col h-full bg-[#f8fafc] text-slate-900 p-4 select-none">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">GLYCEMIC STABILITY</span>
          <div className="text-2xl font-black text-blue-600">92 <span className="text-xs font-normal text-slate-500">mg/dL</span></div>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">HYDRATION</span>
          <div className="text-sm font-bold text-slate-900">2.8L <span className="text-[10px] text-slate-500">/ 3.2L</span></div>
        </div>
      </div>

      <div className="my-2">
        <div className="flex justify-between text-[10px] text-slate-700 mb-1 font-semibold">
          <span>CGM Glucose Curve (6h)</span>
          <span className="text-emerald-600 font-bold">● In Target 98%</span>
        </div>
        <svg className="w-full h-12" viewBox="0 0 260 50" fill="none">
          <path
            d="M 0 30 Q 35 24 70 28 T 130 15 T 190 26 T 260 21"
            stroke="#2563EB"
            strokeWidth="2.5"
            fill="none"
          />
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] mt-auto">
        <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-sm">
          <span className="text-slate-500 text-[8px] block font-medium">Protein</span>
          <span className="font-bold text-slate-900">145g / 150g</span>
        </div>
        <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-sm">
          <span className="text-slate-500 text-[8px] block font-medium">Carbs</span>
          <span className="font-bold text-slate-900">210g</span>
        </div>
        <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-sm">
          <span className="text-slate-500 text-[8px] block font-medium">Fats</span>
          <span className="font-bold text-slate-900">62g</span>
        </div>
      </div>
    </div>
  );
}

// 07. Clinical Blood Panel
function ScreenBiomarkers() {
  return (
    <div className="flex flex-col h-full bg-[#f8fafc] text-slate-900 p-4 select-none">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">CLINICAL PANEL OCR</span>
          <div className="text-base font-bold text-slate-900">Metabolic & Cardio Blood Panel</div>
        </div>
        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          ALL OPTIMAL
        </span>
      </div>

      <div className="space-y-1.5 my-auto text-[10px]">
        <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/80 shadow-sm">
          <div>
            <span className="font-bold text-slate-900 block text-[11px]">ApoB (Atherogenic Lipids)</span>
            <span className="text-[8px] text-slate-500">Target: &lt;80 mg/dL</span>
          </div>
          <span className="font-mono font-bold text-emerald-600 text-xs">74 mg/dL</span>
        </div>

        <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/80 shadow-sm">
          <div>
            <span className="font-bold text-slate-900 block text-[11px]">hs-CRP (Systemic Inflammation)</span>
            <span className="text-[8px] text-slate-500">Target: &lt;0.5 mg/L</span>
          </div>
          <span className="font-mono font-bold text-emerald-600 text-xs">0.38 mg/L</span>
        </div>

        <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/80 shadow-sm">
          <div>
            <span className="font-bold text-slate-900 block text-[11px]">VO2 Max (Cardiorespiratory)</span>
            <span className="text-[8px] text-slate-500">Top 5% of demographic</span>
          </div>
          <span className="font-mono font-bold text-blue-600 text-xs">51.4 mL/kg/min</span>
        </div>
      </div>

      <div className="p-2 rounded-xl bg-blue-50 border border-blue-200 text-center text-[9px] text-blue-800 font-medium mt-auto">
        PDF parsed automatically via Clinical OCR
      </div>
    </div>
  );
}

// 08. Activity Strain
function ScreenActivity() {
  return (
    <div className="flex flex-col h-full bg-[#f8fafc] text-slate-900 p-4 select-none">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">CARDIO STRAIN</span>
          <div className="text-2xl font-black text-slate-900">15.2 <span className="text-xs font-normal text-slate-500">/ 21.0</span></div>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">ENERGY</span>
          <div className="text-sm font-bold text-amber-600">2,420 kcal</div>
        </div>
      </div>

      <div className="my-3">
        <div className="flex justify-between text-[10px] text-slate-700 mb-1.5 font-semibold">
          <span>Target Strain Budget</span>
          <span className="text-amber-600">Target: 14.0 - 16.5</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5 text-center">
          <div className="p-1.5 rounded-lg bg-blue-50 border border-blue-200">
            <span className="text-[8px] text-blue-700 block font-bold">Zone 2</span>
            <span className="text-xs font-bold text-slate-900">45m</span>
          </div>
          <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
            <span className="text-[8px] text-emerald-700 block font-bold">Zone 3</span>
            <span className="text-xs font-bold text-slate-900">22m</span>
          </div>
          <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-200">
            <span className="text-[8px] text-amber-700 block font-bold">Zone 4</span>
            <span className="text-xs font-bold text-slate-900">14m</span>
          </div>
          <div className="p-1.5 rounded-lg bg-red-50 border border-red-200">
            <span className="text-[8px] text-red-700 block font-bold">Zone 5</span>
            <span className="text-xs font-bold text-slate-900">8m</span>
          </div>
        </div>
      </div>

      <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 mt-auto text-[10px] flex items-center justify-between">
        <span className="text-slate-700 font-medium">Remaining Safe Day Strain</span>
        <span className="font-bold text-amber-700">1.8 Score Remaining</span>
      </div>
    </div>
  );
}

// 09. AI Context Coach
function ScreenAiCoach() {
  return (
    <div className="flex flex-col h-full bg-[#f8fafc] text-slate-900 p-3 select-none">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-200/80">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        <span className="text-[10px] font-bold text-slate-900">Fitness AI Engine v3.4</span>
        <span className="text-[9px] font-mono text-slate-500 ml-auto font-semibold">CONTEXT REASONER</span>
      </div>

      <div className="space-y-2 my-auto text-[10px]">
        <div className="p-2.5 rounded-2xl rounded-tl-sm bg-blue-50 border border-blue-200/80 text-slate-800">
          <span className="text-[8px] font-bold text-blue-600 block mb-0.5">FITNESS REASONER</span>
          "Recovery is 94% with 1h 53m deep sleep. I shifted tomorrow's rest day to Friday and programmed heavy barbell deadlifts for today."
        </div>

        <div className="p-2 rounded-2xl rounded-tr-sm bg-white border border-slate-200 text-slate-700 ml-4 text-right shadow-sm">
          "Can I add 30m easy swimming this afternoon?"
        </div>

        <div className="p-2.5 rounded-2xl rounded-tl-sm bg-blue-50 border border-blue-200/80 text-slate-800">
          "Yes, keep heart rate strictly under 122 bpm (Zone 1) to accelerate lymphatic drainage without depleting glycogen."
        </div>
      </div>

      <div className="p-2 rounded-full bg-white border border-slate-200 flex items-center justify-between text-[9px] text-slate-400 px-3 mt-auto shadow-sm">
        <span>Ask anything about today's capacity...</span>
        <span className="text-blue-600 font-bold">↵</span>
      </div>
    </div>
  );
}

// 10. Connected Dashboard / Operating System
function ScreenConnectedDashboard() {
  return (
    <div className="flex flex-col h-full bg-[#f8fafc] text-slate-900 p-3.5 select-none">
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/80">
        <span className="text-[10px] font-bold text-slate-900">THE CONNECTED PICTURE</span>
        <span className="text-[9px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          100% UNIFIED
        </span>
      </div>

      <div className="relative my-3 flex items-center justify-center">
        <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" stroke="#e2e8f0" strokeWidth="6" fill="none" />
          <circle cx="50" cy="50" r="42" stroke="#10b981" strokeWidth="6" fill="none"
            strokeDasharray="264" strokeDashoffset="24" strokeLinecap="round" />
          
          <circle cx="50" cy="50" r="32" stroke="#e2e8f0" strokeWidth="6" fill="none" />
          <circle cx="50" cy="50" r="32" stroke="#3b82f6" strokeWidth="6" fill="none"
            strokeDasharray="201" strokeDashoffset="12" strokeLinecap="round" />

          <circle cx="50" cy="50" r="22" stroke="#e2e8f0" strokeWidth="6" fill="none" />
          <circle cx="50" cy="50" r="22" stroke="#f59e0b" strokeWidth="6" fill="none"
            strokeDasharray="138" strokeDashoffset="38" strokeLinecap="round" />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[8px] text-slate-400 font-bold uppercase">SYNCS</span>
          <span className="text-xl font-black text-slate-900">100%</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1 text-center text-[9px] mb-2 font-bold">
        <div className="p-1 rounded bg-indigo-50 border border-indigo-200 text-indigo-700">Sleep 91</div>
        <div className="p-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-700">Recov 94</div>
        <div className="p-1 rounded bg-amber-50 border border-amber-200 text-amber-700">Strain 15.2</div>
      </div>

      <div className="p-2 rounded-xl bg-blue-50 border border-blue-200 text-[9px] text-slate-700 leading-tight mt-auto font-medium">
        "One synchronized operating system. Sleep, strain, glucose, and longevity moving in continuous concert."
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   10 FEATURE DEFINITIONS WITH ALTERNATING CALLOUTS
───────────────────────────────────────────────────────── */
const PANELS = [
  {
    id: 'overview',
    step: '01',
    category: 'SYNTHESIS ENGINE',
    title: 'Capacity, not willpower.',
    headline: 'Know before breakfast what your body can take today.',
    description:
      'Fitness continuously weighs sleep architecture, nocturnal HRV, dynamic cardiovascular strain, and metabolic fuel into a single operational directive for today.',
    icon: Activity,
    badgeColor: 'text-[#b5853a] bg-amber-50 border-amber-200',
    mockupComponent: ScreenDailyOverview,
    floatingBadges: [
      { text: 'Composite Readiness', value: '92 / 100', sub: 'Optimal capacity for heavy strain', color: 'border-emerald-300 text-emerald-800' },
      { text: 'Circadian Delta', value: '+1.4 hrs optimal', sub: 'Cortisol dip window verified', color: 'border-blue-300 text-blue-800' },
    ],
  },
  {
    id: 'wearables',
    step: '02',
    category: 'WEARABLES',
    title: 'Reads every wearable.',
    headline: 'Apple Watch is ~5% of India. PRIMATE reads the other 95% too.',
    description:
      'Synced seamlessly through Apple Health, Google Health Connect, and Samsung Health. We read raw physiological telemetry and calculate unified biometrics with zero duplication.',
    icon: Watch,
    badgeColor: 'text-[#b5853a] bg-amber-50 border-amber-200',
    mockupComponent: ScreenWearables,
    floatingBadges: [
      { text: 'ALL STREAMS', value: '06:40', sub: 'Synced via Apple Health, Health Connect', color: 'border-slate-200 text-slate-900' },
      { text: 'COVERAGE', value: '95%', sub: "of wrists aren't Apple Watch - read anyway", color: 'border-amber-300 text-amber-900' },
    ],
  },
  {
    id: 'stress',
    step: '03',
    category: 'STRESS',
    title: 'Stress, with names attached.',
    headline: 'Not a mood ring. Spot patterns across your day.',
    description:
      'Fitness shows when stress rises across the day so you can pinpoint routines, meals, and meetings that trigger acute nervous system spikes.',
    icon: Heart,
    badgeColor: 'text-[#b5853a] bg-amber-50 border-amber-200',
    mockupComponent: ScreenStress,
    floatingBadges: [
      { text: '7-DAY AVERAGE', value: '31 / 100', sub: 'Best day this week: 28', color: 'border-slate-200 text-slate-900' },
      { text: 'TIME AT HIGH', value: '2 h 30 m', sub: '10% of the day - mostly 2-6 pm', color: 'border-amber-300 text-amber-900' },
    ],
  },
  {
    id: 'sleep',
    step: '04',
    category: 'SLEEP ARCHITECTURE',
    title: 'Sleep, deeply deciphered.',
    headline: 'Continuous hypnograms and real-time circadian phase alignment.',
    description:
      'Track REM, deep, light, and micro-wake periods. Fitness calculates cumulative sleep debt down to the minute and prescribes optimal bedtime windows based on evening cortisol dips.',
    icon: Moon,
    badgeColor: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    mockupComponent: ScreenSleep,
    floatingBadges: [
      { text: 'DEEP SLEEP RATIO', value: '24% (1h 53m)', sub: '+22m vs weekly average', color: 'border-indigo-300 text-indigo-800' },
      { text: 'SLEEP EFFICIENCY', value: '94% Restorative', sub: 'Zero micro-arousals detected', color: 'border-emerald-300 text-emerald-800' },
    ],
  },
  {
    id: 'recovery',
    step: '05',
    category: 'AUTONOMIC RECOVERY',
    title: 'Central Nervous System Tone.',
    headline: 'Parasympathetic balance calculated from continuous HRV trends.',
    description:
      'Quantify autonomic nervous system recovery through rMSSD high-frequency heart rate variability. Know immediately whether your body is primed for record strain or active recovery.',
    icon: Heart,
    badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    mockupComponent: ScreenRecovery,
    floatingBadges: [
      { text: 'BASELINE RMSSD', value: '88 ms (+14%)', sub: 'Parasympathetic dominant', color: 'border-emerald-300 text-emerald-800' },
      { text: 'RESTING PULSE', value: '48 bpm', sub: '-3 bpm nocturnal drop', color: 'border-blue-300 text-blue-800' },
    ],
  },
  {
    id: 'nutrition',
    step: '06',
    category: 'GLYCEMIC FUEL',
    title: 'Continuous Metabolic Control.',
    headline: 'Real-time interstitial glucose telemetry with meal correlation.',
    description:
      'Pair continuous glucose monitors (CGM) to uncover how food, meal timing, and post-prandial walks impact your glycemic curve and next-morning recovery scores.',
    icon: Droplets,
    badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
    mockupComponent: ScreenNutrition,
    floatingBadges: [
      { text: 'TIME IN RANGE', value: '98% (70-120 mg/dL)', sub: 'Zero reactive hypoglycemia', color: 'border-blue-300 text-blue-800' },
      { text: 'GLYCEMIC VARIABILITY', value: '11.4% CV', sub: 'Optimal metabolic stability', color: 'border-emerald-300 text-emerald-800' },
    ],
  },
  {
    id: 'biomarkers',
    step: '07',
    category: 'LAB OCR',
    title: 'Lab Work, Instantly Connected.',
    headline: 'Turn static annual PDF lab reports into active daily parameters.',
    description:
      'Upload blood test PDFs from any diagnostic lab. Our OCR engine extracts ApoB, hs-CRP, fasting insulin, HbA1c, and lipid panels into longitudinal trend graphs.',
    icon: FileText,
    badgeColor: 'text-amber-700 bg-amber-50 border-amber-200',
    mockupComponent: ScreenBiomarkers,
    floatingBadges: [
      { text: 'ATHEROGENIC APOB', value: '74 mg/dL', sub: 'Cardiovascular risk: Low', color: 'border-emerald-300 text-emerald-800' },
      { text: 'SYSTEMIC HS-CRP', value: '0.38 mg/L', sub: 'Ultra-low chronic inflammation', color: 'border-blue-300 text-blue-800' },
    ],
  },
  {
    id: 'activity',
    step: '08',
    category: 'CARDIO STRAIN',
    title: 'Dynamic Strain Prescription.',
    headline: 'Cardiovascular load calibrated to today’s recovery headroom.',
    description:
      'Stop blindly chasing 10,000 steps. Fitness dynamically scales your daily cardiovascular strain budget so you accumulate progressive overload without autonomic burnout.',
    icon: Flame,
    badgeColor: 'text-rose-700 bg-rose-50 border-rose-200',
    mockupComponent: ScreenActivity,
    floatingBadges: [
      { text: 'TARGET STRAIN', value: '15.2 / 16.5', sub: 'Zone 2 base: 45 min completed', color: 'border-rose-300 text-rose-800' },
      { text: 'CALORIC EXPENDITURE', value: '2,420 kcal', sub: 'Basal 1,740 + Active 680', color: 'border-amber-300 text-amber-800' },
    ],
  },
  {
    id: 'aicoach',
    step: '09',
    category: 'CONTEXTUAL REASONING',
    title: 'AI Health & Fitness Coach.',
    headline: 'Proactive intelligence partner that understands all 10 dimensions.',
    description:
      'Ask real questions, get precise physiological answers. The coach recalculates training intensity, rest periods, and macro timing on the fly based on your latest HRV, sleep, and glucose readings.',
    icon: Bot,
    badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
    mockupComponent: ScreenAiCoach,
    floatingBadges: [
      { text: 'CONTEXT WINDOW', value: 'All 10 Dimensions', sub: 'Continuous cross-domain reasoning', color: 'border-blue-300 text-blue-800' },
      { text: 'GUIDANCE TYPE', value: 'Evidence-Based', sub: 'Peer-reviewed human physiology', color: 'border-indigo-300 text-indigo-800' },
    ],
  },
  {
    id: 'dashboard',
    step: '10',
    category: 'CONNECTED OS',
    title: 'Your Connected Health Picture.',
    headline: 'One screen that unites all fragments of human biology.',
    description:
      'Three interlocking telemetry rings—Sleep, Capacity, and Strain—accompanied by real-time metabolic and autonomic telemetry. Open the app, absorb your biological status, and attack the day.',
    icon: Layers,
    badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    mockupComponent: ScreenConnectedDashboard,
    floatingBadges: [
      { text: 'UNIFIED PICTURE', value: '1 Screen / 100% Data', sub: 'All 9 isolated silos harmonized', color: 'border-emerald-300 text-emerald-800' },
      { text: 'DAILY FRICTION', value: 'Zero Manual Logging', sub: 'Automated continuous telemetry', color: 'border-blue-300 text-blue-800' },
    ],
  },
];

/* ─────────────────────────────────────────────────────────
   MOBILE ALTERNATING LEFT / RIGHT SCROLL REVEAL COMPONENT
───────────────────────────────────────────────────────── */
function MobileAlternatingCards({ panels, onOpenAuth }) {
  return (
    <div className="px-4 sm:px-6 pb-8 space-y-6">
      {panels.map((panel, idx) => {
        const ScreenComponent = panel.mockupComponent;
        const Icon = panel.icon;
        const isMockupRight = idx % 2 === 1;

        return (
          <div
            id={`mobile-feature-card-${idx}`}
            key={panel.id}
            className="rounded-3xl bg-white border border-slate-200/90 shadow-md p-5 flex flex-col gap-4 overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#b5853a]">
                MODULE {panel.step}
              </span>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${panel.badgeColor}`}>
                {panel.category}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-black text-[#143428] tracking-tight mb-1">
                {panel.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                {panel.headline}
              </p>
            </div>

            {/* Mockup Preview Inside Card */}
            <div className="w-full max-w-[280px] h-[360px] mx-auto rounded-[36px] bg-slate-900 p-2 shadow-xl border-2 border-slate-300 relative overflow-hidden">
              <div className="w-full h-full rounded-[28px] overflow-hidden bg-[#f8fafc]">
                <ScreenComponent />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="text-[10px] font-mono text-slate-400">Position: {isMockupRight ? 'Right Frame' : 'Left Frame'}</span>
              <button
                onClick={() => onOpenAuth('signup')}
                type="button"
                className="text-blue-600 font-bold flex items-center gap-1 hover:text-blue-700"
              >
                <span>Learn more</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN PINNED SHOWCASE WITH ALTERNATING MOCKUP & NAVIGATION
───────────────────────────────────────────────────────── */
export default function PinnedShowcase({ onOpenAuth }) {
  const containerRef = useRef(null);
  const pinTargetRef = useRef(null);
  const phoneContainerRef = useRef(null);
  const verticalProgressRef = useRef(null);
  const progressBarRef = useRef(null);
  const scrollTriggerInstanceRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  // References for all 10 panel elements
  const textElementsRef = useRef([]);
  const screenElementsRef = useRef([]);
  const badgeElementsRef = useRef([]);

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
    const pinTarget = pinTargetRef.current;
    if (!container || !pinTarget) return () => window.removeEventListener('resize', checkWidth);

    const ctx = gsap.context(() => {
      // Offset from center for the phone: 
      // Negative (-270px) = Mockup on LEFT (Screenshot 4)
      // Positive (+270px) = Mockup on RIGHT (Screenshot 3)
      const phoneOffset = 270;

      // Set initial states for all 10 slides
      PANELS.forEach((_, idx) => {
        const textEl = textElementsRef.current[idx];
        const screenEl = screenElementsRef.current[idx];
        const badgeEl = badgeElementsRef.current[idx];

        if (idx === 0) {
          gsap.set(textEl, { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto' });
          gsap.set(screenEl, { opacity: 1, scale: 1, pointerEvents: 'auto', zIndex: 10 });
          if (badgeEl) gsap.set(badgeEl, { opacity: 1, scale: 1, y: 0, pointerEvents: 'auto' });
        } else {
          gsap.set(textEl, { opacity: 0, y: 30, scale: 0.96, pointerEvents: 'none' });
          gsap.set(screenEl, { opacity: 0, scale: 1.02, pointerEvents: 'none', zIndex: 1 });
          if (badgeEl) gsap.set(badgeEl, { opacity: 0, scale: 0.9, y: 15, pointerEvents: 'none' });
        }
      });

      // Step 0 starts with mockup on LEFT (x = -phoneOffset)
      gsap.set(phoneContainerRef.current, { x: -phoneOffset });

      // Master Scrubbed Timeline
      const totalSteps = PANELS.length - 1;
      const stepDuration = 1.0;

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinTarget,
          start: 'top top',
          end: () => `+=${PANELS.length * 800}`,
          pin: pinTarget,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const raw = self.progress * (PANELS.length - 0.001);
            const current = Math.min(Math.floor(raw), PANELS.length - 1);
            setActiveIndex(current);

            // Update top-right vertical progress bar
            if (verticalProgressRef.current) {
              verticalProgressRef.current.style.height = `${self.progress * 100}%`;
            }

            // Update bottom horizontal progress bar
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      scrollTriggerInstanceRef.current = masterTl.scrollTrigger;

      // Construct sequential transitions:
      // Seamless overlapping cross-fade ensures NO BLANK FRAMES mid-scroll
      for (let i = 0; i < totalSteps; i++) {
        const currentText = textElementsRef.current[i];
        const nextText = textElementsRef.current[i + 1];
        const currentScreen = screenElementsRef.current[i];
        const nextScreen = screenElementsRef.current[i + 1];
        const currentBadges = badgeElementsRef.current[i];
        const nextBadges = badgeElementsRef.current[i + 1];

        const stepTime = i * stepDuration;

        const nextIsRight = (i + 1) % 2 === 1;
        const nextX = nextIsRight ? phoneOffset : -phoneOffset;

        // 1. Phone smoothly glides across the stage between left and right
        masterTl.to(
          phoneContainerRef.current,
          {
            x: nextX,
            duration: stepDuration * 0.85,
            ease: 'power2.inOut',
          },
          stepTime + stepDuration * 0.08
        );

        // 2. Animate current text out
        masterTl.to(
          currentText,
          {
            opacity: 0,
            y: -25,
            scale: 0.96,
            duration: stepDuration * 0.45,
            ease: 'power2.inOut',
            onStart: () => {
              if (currentText) currentText.style.pointerEvents = 'none';
            },
          },
          stepTime + stepDuration * 0.05
        );

        // 3. Current screen cross-fade OUT with overlap:
        // Stays visible and only fades out as next screen is already well underway
        masterTl.to(
          currentScreen,
          {
            opacity: 0,
            scale: 0.98,
            duration: stepDuration * 0.5,
            ease: 'power2.inOut',
            onStart: () => {
              if (currentScreen) currentScreen.style.zIndex = '5';
            },
            onComplete: () => {
              if (currentScreen) {
                currentScreen.style.pointerEvents = 'none';
                currentScreen.style.zIndex = '1';
              }
            },
          },
          stepTime + stepDuration * 0.35
        );

        // 4. Current badges fade out
        if (currentBadges) {
          masterTl.to(
            currentBadges,
            {
              opacity: 0,
              y: -15,
              scale: 0.9,
              duration: stepDuration * 0.4,
              ease: 'power2.inOut',
            },
            stepTime + stepDuration * 0.1
          );
        }

        // 5. Next screen cross-fade IN with overlap:
        // Starts early (at 0.18) so at mid-scroll (0.45) both screens overlap seamlessly! Never blank!
        masterTl.fromTo(
          nextScreen,
          { opacity: 0, scale: 1.02, y: 15 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: stepDuration * 0.52,
            ease: 'power2.inOut',
            onStart: () => {
              if (nextScreen) nextScreen.style.zIndex = '10';
            },
            onComplete: () => {
              if (nextScreen) {
                nextScreen.style.pointerEvents = 'auto';
                nextScreen.style.zIndex = '10';
              }
            },
          },
          stepTime + stepDuration * 0.18
        );

        // 6. Animate next text in on its opposite side
        masterTl.fromTo(
          nextText,
          { opacity: 0, y: 25, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: stepDuration * 0.5,
            ease: 'power2.inOut',
            onComplete: () => {
              if (nextText) nextText.style.pointerEvents = 'auto';
            },
          },
          stepTime + stepDuration * 0.38
        );

        // 7. Floating badges pop in around the phone
        if (nextBadges) {
          masterTl.fromTo(
            nextBadges,
            { opacity: 0, y: 15, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: stepDuration * 0.45,
              ease: 'back.out(1.4)',
            },
            stepTime + stepDuration * 0.42
          );
        }
      }
    }, container);

    return () => {
      window.removeEventListener('resize', checkWidth);
      ctx.revert();
    };
  }, []);

  // Quick navigation jump when clicking a step number
  const handleJumpToStep = (index) => {
    setActiveIndex(index);
    if (isDesktop && scrollTriggerInstanceRef.current) {
      const st = scrollTriggerInstanceRef.current;
      const targetScroll = st.start + (index / (PANELS.length - 1)) * (st.end - st.start) + 2;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    } else {
      const el = document.getElementById(`mobile-feature-card-${index}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section
      id="rail"
      ref={containerRef}
      className="relative w-full bg-[#fbfaf7] text-slate-900 border-y border-slate-200/80"
    >
      {/* ── DESKTOP INTRO HEADER (Moved upwards before pinning so it scrolls naturally) ── */}
      <div className="hidden lg:block max-w-7xl mx-auto px-8 lg:px-12 pt-28 pb-14 text-center">
        <div className="inline-flex items-center gap-2 text-[#b5853a] text-xs font-mono font-bold uppercase tracking-widest mb-3 px-3.5 py-1.5 bg-amber-50 rounded-full border border-amber-200/60 shadow-xs">
          <span>02 · THE PINNED SHOWCASE</span>
        </div>
        <h2 className="text-4xl xl:text-5xl font-black text-[#143428] tracking-tight mb-4">
          Unified Human Intelligence in <span className="text-[#b5853a]">Ten Dimensions</span>
        </h2>
        <p className="text-base text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
          Scroll through to explore every dimension of physiological, metabolic, and cognitive telemetry.
        </p>
      </div>

      {/* ── DESKTOP PINNED VIEWPORT (1024px+) — Full screen mobile view ── */}
      <div 
        ref={pinTargetRef}
        className="hidden lg:flex flex-col justify-between h-screen w-full max-w-7xl mx-auto px-8 lg:px-12 pt-20 pb-6 relative z-10 select-none"
      >
        {/* Sleek Top Status Bar — flips sides based on phone position */}
        <div className={`flex items-center pb-3 border-b border-slate-200/60 shrink-0 transition-all duration-300 ${
          activeIndex % 2 === 0 ? 'justify-end' : 'justify-start'
        }`}>
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
              Dimension {PANELS[activeIndex]?.step} / {PANELS.length} · {PANELS[activeIndex]?.category}
            </span>
            <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/90 shadow-sm ml-4">
              <div className="w-1 h-7 bg-slate-200 rounded-full overflow-hidden flex flex-col justify-start">
                <div 
                  ref={verticalProgressRef}
                  className="w-full bg-[#b5853a] rounded-full transition-all duration-75"
                  style={{ height: `${((activeIndex + 1) / PANELS.length) * 100}%` }}
                />
              </div>
              <span className="text-xs font-mono font-bold text-slate-700 tracking-tight">
                {activeIndex + 1}/{PANELS.length}
              </span>
            </div>
          </div>
        </div>

        {/* Middle Stage: Alternating Phone (Left / Right) & Text Storytelling — Full Height Stage */}
        <div className="flex-1 relative w-full overflow-visible my-auto flex items-center justify-center">
          {/* The 10 Text panels positioned on opposite sides */}
          {PANELS.map((panel, idx) => {
            // When mockup is on Right (idx 1, 3, 5, 7, 9) -> Text is on LEFT
            // When mockup is on Left (idx 0, 2, 4, 6, 8) -> Text is on RIGHT
            const isMockupRight = idx % 2 === 1;
            const isTextOnLeft = isMockupRight;
            const PanelIcon = panel.icon;

            return (
              <div
                key={panel.id}
                ref={(el) => (textElementsRef.current[idx] = el)}
                className={`absolute top-1/2 -translate-y-1/2 w-[46%] max-w-xl z-20 transition-all ${
                  isTextOnLeft ? 'left-0 pr-8 text-left' : 'right-0 pl-8 text-left'
                }`}
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-2 rounded-xl bg-[#143428] text-white shadow-sm">
                    <PanelIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#b5853a] uppercase block">
                      {panel.step} · {panel.category}
                    </span>
                  </div>
                </div>

                <h3 className="text-3xl xl:text-4xl font-extrabold text-[#143428] tracking-tight leading-tight mb-3">
                  {panel.title}
                </h3>

                <p className="text-base font-semibold text-slate-800 mb-3 leading-snug">
                  {panel.headline}
                </p>

                <p className="text-sm text-slate-500 leading-relaxed font-normal mb-6 max-w-lg">
                  {panel.description}
                </p>

                <div className="flex items-center gap-4 pt-1">
                  <button
                    onClick={() => onOpenAuth('signup')}
                    type="button"
                    className="px-6 py-2.5 rounded-xl font-semibold text-xs text-white bg-[#143428] hover:bg-[#1a4435] shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2"
                  >
                    <span>Request Early Access</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Synchronous multi-sensor telemetry</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* The Single Realistic iPhone Frame that glides Left and Right */}
          <div
            ref={phoneContainerRef}
            className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-30 select-none will-change-transform pointer-events-auto"
          >
            <div className="relative w-[280px] sm:w-[300px] h-[520px]">
              {/* Outer Titanium Bezel */}
              <div className="absolute -inset-[3px] rounded-[50px] bg-gradient-to-b from-slate-200 via-slate-400 to-slate-300 shadow-2xl shadow-slate-900/10" />

              {/* Chassis — seamless: background matches the inner screen */}
              <div className="absolute inset-0 rounded-[48px] bg-[#f8fafc] overflow-hidden flex flex-col">
                {/* Dynamic Island Speaker Pill */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-950 rounded-full z-40 flex items-center justify-between px-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-800 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500/70" />
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                {/* Inner Screen Display Area */}
                <div className="relative w-full h-full pt-7 pb-4 flex-1 overflow-hidden bg-[#f8fafc]">
                  {PANELS.map((panel, idx) => {
                    const ScreenComponent = panel.mockupComponent;
                    return (
                      <div
                        key={panel.id}
                        ref={(el) => (screenElementsRef.current[idx] = el)}
                        className="absolute inset-0 pt-6 pb-2"
                      >
                        <ScreenComponent />
                      </div>
                    );
                  })}
                </div>

                {/* Home Indicator Bar */}
                <div className="w-full h-4 bg-[#f8fafc] flex items-center justify-center pb-1">
                  <div className="w-28 h-1 bg-slate-300 rounded-full" />
                </div>
              </div>

              {/* Dynamic Floating Badges surrounding the phone */}
              {PANELS.map((panel, idx) => (
                <div
                  key={`badges-${panel.id}`}
                  ref={(el) => (badgeElementsRef.current[idx] = el)}
                  className="absolute inset-0 pointer-events-none"
                >
                  {panel.floatingBadges.map((badge, bIdx) => {
                    const isMockupRight = idx % 2 === 1;
                    // Badges positioned safely away from the text column:
                    const positionClass = isMockupRight
                      ? bIdx === 0 ? '-left-20 top-12 -rotate-2' : '-right-10 bottom-24 rotate-2'
                      : bIdx === 0 ? '-left-10 top-12 -rotate-2' : '-right-20 bottom-24 rotate-2';

                    return (
                      <div
                        key={badge.text}
                        className={`absolute z-40 px-3.5 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border ${badge.color} shadow-xl pointer-events-none ${positionClass}`}
                      >
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#b5853a]" />
                          <span className="text-[9px] uppercase tracking-wider text-slate-500 block font-bold font-mono">
                            {badge.text}
                          </span>
                        </div>
                        <span className="text-xs font-black tracking-tight text-slate-900 block">
                          {badge.value}
                        </span>
                        {badge.sub && (
                          <span className="text-[8.5px] text-slate-500 font-normal block leading-tight mt-0.5">
                            {badge.sub}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vertical Step Numbers Rail — Right Side */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-0.5 py-3 px-1.5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-lg shadow-slate-900/5">
          {PANELS.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => handleJumpToStep(idx)}
              type="button"
              className={`font-mono text-[11px] w-8 h-7 flex items-center justify-center rounded-lg transition-all duration-200 ${
                activeIndex === idx
                  ? 'text-white bg-[#b5853a] font-black shadow-sm'
                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100/80 font-semibold'
              }`}
              aria-label={`Jump to step ${p.step}`}
            >
              {p.step}
            </button>
          ))}
        </div>


      </div>

      {/* ── TABLET & MOBILE: ALTERNATING CARDS ── */}
      <div className="lg:hidden relative overflow-hidden">
        {/* Section Header */}
        <div className="text-center px-4 pt-12 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#b5853a] text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>PRODUCT SHOWCASE</span>
          </div>
          <h2 className="text-3xl font-black text-[#143428] tracking-tight leading-tight">
            Unified Health in <span className="text-[#b5853a]">Ten Dimensions</span>
          </h2>
          <p className="text-xs text-slate-500 mt-2 max-w-xs mx-auto leading-relaxed">
            Scroll to scrub through every dimension with alternating telemetry views.
          </p>
        </div>

        {/* Alternating Cards for Mobile */}
        <MobileAlternatingCards panels={PANELS} onOpenAuth={onOpenAuth} />

        {/* Bottom CTA strip */}
        <div className="px-6 pb-12 pt-4 text-center">
          <button
            onClick={() => onOpenAuth('signup')}
            type="button"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs text-white bg-[#143428] hover:bg-[#1a4435] shadow-md transition-all duration-200"
          >
            <span>Request Early Access</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

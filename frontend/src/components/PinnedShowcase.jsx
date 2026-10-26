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
  ChevronRight,
  CheckCircle2, 
  Zap, 
  Sparkles,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────
   10 PHONE SCREEN MOCKUPS (MATCHING FIGMA HEALTH GRAPH)
───────────────────────────────────────────────────────── */

// 01. Capacity & Daily Readiness
function ScreenDailyOverview() {
  return (
    <div className="flex flex-col h-full bg-[#f8fafc] text-slate-900 p-4 select-none">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-blue-600 font-bold block">
            DAILY CAPACITY
          </span>
          <span className="text-sm font-black text-slate-900">Tuesday, 14 July</span>
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
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#10b981" />
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

      <div className="p-2.5 rounded-xl bg-blue-50/80 border border-blue-200/80 mt-auto">
        <div className="flex items-center gap-1.5 mb-1">
          <Sparkles className="w-3 h-3 text-blue-600" />
          <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider">CAPACITY BRIEF</span>
        </div>
        <p className="text-[10px] text-slate-700 leading-relaxed font-normal">
          "Deep sleep cleared sleep debt by 22m. Autonomic nervous system is primed for peak output before 3:00 PM."
        </p>
      </div>
    </div>
  );
}

// 02. Wearables Sync
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
        <span className="text-[9px] uppercase tracking-wider text-blue-600 font-mono font-bold block">SOURCES</span>
        <span className="text-base font-black text-slate-900">Wearables</span>
        <div className="text-[9px] text-blue-700 bg-blue-50 border border-blue-200 rounded px-2 py-0.5 inline-block mt-1 font-mono font-semibold">
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

// Biological age
function ScreenBiologicalAge() {
  return (
    <div className="flex flex-col h-full bg-[#f8fafc] text-slate-900 p-4 select-none">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
        <div>
          <span className="text-[9px] uppercase tracking-wider text-blue-600 font-mono font-bold block">LONGEVITY INSIGHT</span>
          <span className="text-base font-black text-slate-900">Biological age</span>
        </div>
        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-1">IMPROVING</span>
      </div>

      <div className="my-auto flex flex-col items-center text-center">
        <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-[10px] border-blue-100">
          <div className="absolute inset-[-10px] rounded-full border-[10px] border-transparent border-t-blue-600 border-r-emerald-500 rotate-[28deg]" />
          <div>
            <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">YOUR AGE</span>
            <span className="block text-4xl font-black tracking-tight text-slate-900">32</span>
            <span className="text-[9px] font-semibold text-slate-500">years</span>
          </div>
        </div>
        <p className="mt-3 text-[10px] font-semibold text-emerald-700">−4.2 years vs. calendar age</p>
      </div>

      <div className="space-y-1.5 text-[9px]">
        {[
          ['Cardiovascular', '−5.1 yr', 'bg-blue-500'],
          ['Metabolic health', '−3.8 yr', 'bg-emerald-500'],
          ['Recovery trend', '−2.4 yr', 'bg-indigo-500'],
        ].map(([label, value, bar]) => (
          <div key={label} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 py-2 shadow-sm">
            <span className={`h-2 w-2 rounded-full ${bar}`} />
            <span className="flex-1 font-medium text-slate-600">{label}</span>
            <span className="font-bold text-emerald-700">{value}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 rounded-xl border border-blue-200 bg-blue-50 p-2.5 text-[9px] leading-relaxed text-slate-700">
        Your sleep consistency and cardiovascular fitness are moving your long-term trend in a positive direction.
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
    badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
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
    headline: 'Apple Watch, Garmin, Whoop, Oura, and WearOS unified seamlessly.',
    description:
      'Synced seamlessly through Apple Health, Google Health Connect, and Samsung Health. We read raw physiological telemetry and calculate unified biometrics with zero duplication.',
    icon: Watch,
    badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
    mockupComponent: ScreenWearables,
    floatingBadges: [
      { text: 'ALL STREAMS', value: '06:40 Realtime', sub: 'Synced via Apple Health & Health Connect', color: 'border-slate-200 text-slate-900' },
      { text: 'INTEGRATIONS', value: '40+ Devices', sub: 'Unified biometrics without duplication', color: 'border-blue-200 text-blue-900' },
    ],
  },
  {
    id: 'sleep',
    step: '03',
    category: 'SLEEP INTELLIGENCE',
    title: 'Sleep, deeply deciphered.',
    headline: 'See the patterns behind a truly restorative night.',
    description:
      'Track REM, deep, light, and wake periods while Fitness connects sleep debt and circadian timing to the choices that shape tomorrow.',
    icon: Moon,
    badgeColor: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    mockupComponent: ScreenSleep,
    floatingBadges: [
      { text: 'DEEP SLEEP', value: '1h 53m', sub: '+22m vs weekly average', color: 'border-indigo-300 text-indigo-800' },
      { text: 'SLEEP EFFICIENCY', value: '94%', sub: 'A restorative night, in context', color: 'border-emerald-300 text-emerald-800' },
    ],
  },
  {
    id: 'recovery',
    step: '04',
    category: 'RECOVERY',
    title: 'Know when you’re ready.',
    headline: 'Recovery built from your own changing baseline.',
    description:
      'Follow HRV, resting heart rate, and autonomic balance together to understand whether today calls for a hard push or a lighter touch.',
    icon: Heart,
    badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    mockupComponent: ScreenRecovery,
    floatingBadges: [
      { text: 'BASELINE HRV', value: '88 ms · +14%', sub: 'Above your personal baseline', color: 'border-emerald-300 text-emerald-800' },
      { text: 'RESTING HEART RATE', value: '48 bpm', sub: 'A steady overnight recovery trend', color: 'border-blue-300 text-blue-800' },
    ],
  },
  {
    id: 'activity',
    step: '05',
    category: 'ACTIVITY & STRAIN',
    title: 'Train with the day you have.',
    headline: 'A strain target shaped by your recovery headroom.',
    description:
      'Balance cardiovascular load and daily movement with a responsive training budget—without treating every day like the same day.',
    icon: Flame,
    badgeColor: 'text-amber-700 bg-amber-50 border-amber-200',
    mockupComponent: ScreenActivity,
    floatingBadges: [
      { text: 'TODAY’S STRAIN', value: '15.2 / 16.5', sub: 'Zone 2 base: 45 min completed', color: 'border-amber-300 text-amber-800' },
      { text: 'ENERGY BURNED', value: '2,420 kcal', sub: 'Daily activity, made visible', color: 'border-blue-300 text-blue-800' },
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
    badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
    mockupComponent: ScreenBiomarkers,
    floatingBadges: [
      { text: 'ATHEROGENIC APOB', value: '74 mg/dL', sub: 'Cardiovascular risk: Low', color: 'border-emerald-300 text-emerald-800' },
      { text: 'SYSTEMIC HS-CRP', value: '0.38 mg/L', sub: 'Ultra-low chronic inflammation', color: 'border-blue-300 text-blue-800' },
    ],
  },
  {
    id: 'biological-age',
    step: '08',
    category: 'BIOLOGICAL AGE',
    title: 'A longer view of your health.',
    headline: 'Understand how your daily signals shape the bigger picture.',
    description:
      'Bring long-term cardiovascular, metabolic, sleep, and recovery trends together for a thoughtful estimate of biological age—not just a snapshot of today.',
    icon: TrendingUp,
    badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
    mockupComponent: ScreenBiologicalAge,
    floatingBadges: [
      { text: 'BIOLOGICAL AGE', value: '−4.2 years', sub: 'Compared with calendar age', color: 'border-emerald-300 text-emerald-800' },
      { text: 'LONG-TERM VIEW', value: '3 key systems', sub: 'Cardio · metabolic · recovery', color: 'border-blue-300 text-blue-800' },
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

const FEATURE_USE_CASES = {
  overview: 'Choose whether today is best for a demanding workout or a lighter recovery session.',
  wearables: 'Bring overnight sleep and today’s movement together without switching between apps.',
  sleep: 'Spot a short night early and adjust your training or bedtime before the pattern repeats.',
  recovery: 'Use your HRV and resting-heart-rate trends to decide when to push and when to recover.',
  activity: 'Set a realistic movement target that reflects your current recovery headroom.',
  nutrition: 'Connect meals, hydration, and glucose patterns with how you feel and perform.',
  biomarkers: 'Review lab markers alongside everyday wellness trends, with report ranges kept in context.',
  'biological-age': 'See how long-term sleep, cardio, and recovery trends change your overall health picture.',
  aicoach: 'Ask a practical training or recovery question using the context already in your connected data.',
  dashboard: 'Start the day with sleep, recovery, activity, and nutrition signals in one place.',
};

function animateScreenGraphics(timeline, screen, position) {
  screen.querySelectorAll('svg path[d]').forEach((path) => {
    const length = path.getTotalLength();
    timeline.fromTo(path,
      { strokeDasharray: length, strokeDashoffset: length },
      { strokeDasharray: length, strokeDashoffset: 0, duration: 0.62, ease: 'power1.out' },
      position
    );
  });

  screen.querySelectorAll('svg circle[stroke-dasharray]').forEach((circle) => {
    const length = circle.getTotalLength();
    const targetOffset = Number(circle.getAttribute('stroke-dashoffset')) || 0;
    timeline.fromTo(circle,
      { strokeDashoffset: length },
      { strokeDashoffset: targetOffset, duration: 0.7, ease: 'power1.out' },
      position
    );
  });
}

function animateBenefitCounters(timeline, story, position) {
  story.querySelectorAll('.feature-benefit__value').forEach((element) => {
    const originalText = element.textContent.trim();
    const match = originalText.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
    if (!match) return;
    const target = Number(match[2].replace(/,/g, ''));
    const counter = { value: 0 };
    timeline.fromTo(counter,
      { value: 0 },
      {
        value: target,
        duration: 0.62,
        ease: 'power1.out',
        onUpdate: () => {
          const formatted = Number.isInteger(target)
            ? Math.round(counter.value).toLocaleString('en-US')
            : counter.value.toFixed(1);
          element.textContent = `${match[1]}${formatted}${match[3]}`;
        },
      },
      position
    );
  });
}

const PHONE_SCREEN_CONTEXT = {
  overview: { caption: 'READINESS TREND', detail: 'A balanced day starts with sleep, recovery, and movement in context.', path: 'M0 32 C18 29 22 12 42 19 S66 43 84 28 S112 8 132 19 S160 38 182 20 S214 12 240 8', color: '#3b82f6' },
  wearables: { caption: 'SYNC HEALTH', detail: 'Your connected sources are organized into one readable timeline.', path: 'M0 26 C25 26 18 17 42 17 S63 22 82 22 S109 10 130 14 S159 28 180 20 S213 17 240 9', color: '#10b981' },
  sleep: { caption: 'SLEEP QUALITY · 7 DAYS', detail: 'Sleep stages and consistency help explain how restored you feel.', path: 'M0 34 C17 32 17 18 37 22 S60 38 78 28 S98 14 118 18 S149 37 167 24 S202 16 240 7', color: '#6366f1' },
  recovery: { caption: 'RECOVERY BASELINE', detail: 'Compare today’s recovery signals with your own recent baseline.', path: 'M0 29 C22 26 28 30 43 20 S71 13 88 21 S111 33 131 20 S161 12 180 19 S213 24 240 8', color: '#10b981' },
  activity: { caption: 'ACTIVITY LOAD · TODAY', detail: 'Movement and strain are paced against your available headroom.', path: 'M0 34 C18 30 24 22 41 27 S59 14 77 19 S99 31 118 20 S143 9 162 17 S202 24 220 14 S232 12 240 8', color: '#f59e0b' },
  nutrition: { caption: 'FUEL & HYDRATION', detail: 'See how meals, hydration, and energy fit into the whole day.', path: 'M0 27 C18 25 23 17 40 19 S60 29 78 26 S99 11 119 15 S141 29 160 20 S185 12 206 15 S226 17 240 8', color: '#3b82f6' },
  biomarkers: { caption: 'MARKER HISTORY', detail: 'Review the values from uploaded reports alongside their stated ranges.', path: 'M0 29 C18 27 25 22 42 24 S65 21 81 22 S104 14 121 17 S142 21 160 16 S192 18 211 10 S230 12 240 8', color: '#10b981' },
  'biological-age': { caption: 'LONG-TERM TREND', detail: 'Long-term patterns add context; this estimate is informational, not a diagnosis.', path: 'M0 35 C21 32 22 25 43 27 S64 31 82 23 S107 23 124 20 S150 23 169 15 S198 17 216 11 S232 13 240 6', color: '#3b82f6' },
  aicoach: { caption: 'PERSONAL CONTEXT', detail: 'Explore your own signals with reflective, non-diagnostic guidance.', path: 'M0 30 C18 30 20 20 40 20 S61 26 80 19 S101 14 120 22 S143 29 161 20 S185 12 204 16 S226 12 240 7', color: '#6366f1' },
  dashboard: { caption: 'CONNECTED HEALTH · 7 DAYS', detail: 'Your overview brings daily and long-term signals together.', path: 'M0 31 C18 26 23 19 42 23 S60 27 79 20 S100 12 120 17 S142 25 161 19 S183 10 203 15 S226 10 240 6', color: '#10b981' },
};

function FeaturePhoneAppScreen({ panel, ScreenComponent }) {
  const [activeTab, setActiveTab] = useState('Today');
  const [selectedInsight, setSelectedInsight] = useState(null);
  const context = PHONE_SCREEN_CONTEXT[panel.id] || PHONE_SCREEN_CONTEXT.overview;

  return (
    <div className="feature-phone-ui">
      <div className="feature-phone-ui__status" data-phone-reveal>
        <span className="feature-phone-ui__brand"><Activity /> FITNESS</span>
        <span className="feature-phone-ui__date">TUE · 9:41</span>
        <span className="feature-phone-ui__live"><i /> LIVE</span>
      </div>

      <div className="feature-phone-ui__legacy" data-phone-reveal>
        <ScreenComponent />
      </div>

      <section className="feature-phone-ui__trend">
        <div className="feature-phone-ui__trend-heading" data-phone-reveal>
          <span>{context.caption}</span>
          <strong>THIS WEEK <ChevronRight /></strong>
        </div>
        <p className="feature-phone-ui__trend-description" data-phone-reveal>{context.detail}</p>
        <svg className="feature-phone-ui__chart" data-phone-reveal viewBox="0 0 240 44" role="img" aria-label={`${context.caption} trend chart`}>
          <path className="feature-phone-ui__chart-grid" d="M0 10H240 M0 22H240 M0 34H240" />
          <path className="feature-phone-ui__chart-line" d={context.path} stroke={context.color} />
          <circle cx="240" cy="8" r="3" fill={context.color} />
        </svg>
        <div className="feature-phone-ui__insights">
          {panel.floatingBadges.map((item, index) => (
            <button
              className={`feature-phone-ui__insight ${selectedInsight === index ? 'is-selected' : ''}`}
              data-phone-reveal
              type="button"
              key={item.text}
              onClick={() => setSelectedInsight(selectedInsight === index ? null : index)}
            >
              <span>{item.text}</span>
              <strong data-phone-count>{item.value}</strong>
            </button>
          ))}
        </div>
        {selectedInsight !== null && (
          <p className="feature-phone-ui__detail" role="status">{panel.floatingBadges[selectedInsight].sub}</p>
        )}
      </section>

      <nav className="feature-phone-ui__nav" aria-label="Fitness app navigation" data-phone-reveal>
        {[
          { label: 'Today', icon: Activity },
          { label: 'Sleep', icon: Moon },
          { label: 'Coach', icon: Bot },
          { label: 'Health', icon: Heart },
        ].map(({ label, icon: Icon }) => (
          <button
            className={activeTab === label ? 'is-active' : ''}
            key={label}
            type="button"
            aria-pressed={activeTab === label}
            onClick={() => setActiveTab(label)}
          >
            <Icon />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

function animateScreenCounters(timeline, screen, position) {
  screen.querySelectorAll('[data-phone-count]').forEach((element) => {
    const originalText = element.textContent.trim();
    const match = originalText.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
    if (!match) return;
    const target = Number(match[2].replace(/,/g, ''));
    const counter = { value: 0 };
    timeline.fromTo(counter,
      { value: 0 },
      {
        value: target,
        duration: 0.72,
        ease: 'power1.out',
        onUpdate: () => {
          const formatted = Number.isInteger(target)
            ? Math.round(counter.value).toLocaleString('en-US')
            : counter.value.toFixed(1);
          element.textContent = `${match[1]}${formatted}${match[3]}`;
        },
      },
      position
    );
  });
}

/* ─────────────────────────────────────────────────────────
  RESPONSIVE SCROLL-LINKED FEATURE DECK
───────────────────────────────────────────────────────── */
function FeatureStackCards({ panels, onOpenAuth }) {
  const stackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return undefined;

    const media = gsap.matchMedia();
    media.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.feature-stack-card', stack);

      cards.forEach((card, index) => {
        const surface = card.querySelector('.feature-stack-card__surface');
        const eyebrow = card.querySelector('.feature-stack-card__eyebrow');
        const heading = card.querySelector('.feature-stack-card__title');
        const supportingCopy = card.querySelectorAll(
          '.feature-stack-card__headline, .feature-stack-card__description'
        );
        const action = card.querySelector('.feature-stack-card__copy > button');
        const phone = card.querySelector('.feature-phone');
        const screenItems = card.querySelectorAll('[data-phone-reveal]');
        const metrics = card.querySelectorAll('.feature-metric');
        const badges = card.querySelectorAll('.feature-float');

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'top top+=8%',
            scrub: 0.7,
            invalidateOnRefresh: true,
            onEnter: () => setActiveIndex(index),
            onEnterBack: () => setActiveIndex(index),
          },
        });

        timeline.fromTo(
          surface,
          { y: 76, scale: 0.985, opacity: 0.84 },
          { y: 0, scale: 1, opacity: 1, duration: 0.7, ease: 'none' },
          0
        );
        timeline.fromTo(
          eyebrow,
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.34, ease: 'power2.out' },
          0.08
        );
        timeline.fromTo(
          heading,
          { y: 64, scale: 0.88, rotationX: 8, opacity: 0, transformOrigin: 'left bottom' },
          { y: 0, scale: 1, rotationX: 0, opacity: 1, duration: 0.56, ease: 'power3.out' },
          0.16
        );
        timeline.fromTo(
          supportingCopy,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.42, stagger: 0.15, ease: 'power2.out' },
          0.29
        );
        timeline.fromTo(
          phone,
          { y: 34, scale: 0.94, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.52, ease: 'power3.out' },
          0.22
        );
        timeline.fromTo(
          screenItems,
          { y: 9, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.28, stagger: 0.045, ease: 'power2.out' },
          0.34
        );
        animateScreenCounters(timeline, card, 0.42);
        timeline.fromTo(
          metrics,
          { y: 12, scale: 0.97, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.34, stagger: 0.12, ease: 'power2.out' },
          0.46
        );
        timeline.fromTo(
          action,
          { y: 34, scale: 0.78, rotation: -3, opacity: 0, transformOrigin: 'left center' },
          { y: 0, scale: 1, rotation: 0, opacity: 1, duration: 0.42, ease: 'power3.out' },
          0.58
        );
        timeline.fromTo(
          badges,
          {
            x: (badgeIndex) => (badgeIndex === 0 ? -62 : 62),
            y: 30,
            scale: 0.72,
            rotation: (badgeIndex) => (badgeIndex === 0 ? -6 : 6),
            opacity: 0,
          },
          { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1, duration: 0.42, stagger: 0.16, ease: 'power3.out' },
          0.46
        );

        if (index > 0) {
          const previousCard = cards[index - 1];
          const previousHeading = previousCard.querySelector('.feature-stack-card__title');
          const previousCopy = previousCard.querySelectorAll(
            '.feature-stack-card__eyebrow, .feature-stack-card__headline, .feature-stack-card__description, .feature-stack-card__metrics, .feature-stack-card__copy > button'
          );
          const previousPhone = previousCard.querySelector('.feature-phone');
          const previousBadges = previousCard.querySelectorAll('.feature-float');

          gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'top top+=8%',
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          })
            .to(previousHeading, { y: -42, scale: 0.9, rotationX: -5, opacity: 0, duration: 0.56, ease: 'power2.in' }, 0.04)
            .to(previousCopy, { y: -24, opacity: 0, duration: 0.46, stagger: 0.065, ease: 'power1.in' }, 0.12)
            .to(previousPhone, { y: -34, scale: 0.91, opacity: 0, duration: 0.62, ease: 'power2.in' }, 0.08)
            .to(
              previousBadges,
              {
                x: (badgeIndex) => (badgeIndex === 0 ? -52 : 52),
                y: -24,
                scale: 0.78,
                rotation: (badgeIndex) => (badgeIndex === 0 ? -5 : 5),
                opacity: 0,
                duration: 0.48,
                stagger: 0.11,
                ease: 'power2.in',
              },
              0.18
            );
        }
      });
      }, stack);

      return () => ctx.revert();
    });

    return () => media.revert();
  }, []);

  return (
    <div className="feature-deck-content">
      <header className="feature-deck-heading">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
          <Sparkles className="h-3.5 w-3.5 text-blue-600" />
          <span>YOUR HEALTH, IN CONTEXT</span>
        </div>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              One connected picture. <span className="text-blue-600">Ten ways to feel it.</span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
              Scroll through the signals that help make every training, recovery, and health decision feel more personal.
            </p>
          </div>
          <span className="shrink-0 font-mono text-xs font-bold tracking-wider text-slate-500" aria-live="polite">
            {String(activeIndex + 1).padStart(2, '0')} <span className="text-slate-300">/ 10</span>
          </span>
        </div>
      </header>

      <div className="feature-stack" ref={stackRef}>
        {panels.map((panel, idx) => {
          const ScreenComponent = panel.mockupComponent;
          const Icon = panel.icon;

          return (
            <article
              className={`feature-stack-card ${idx % 2 === 0 ? 'feature-stack-card--phone-left' : 'feature-stack-card--phone-right'}`}
              id={`feature-${panel.id}`}
              key={panel.id}
              style={{ '--stack-index': idx, zIndex: idx + 1 }}
              aria-label={`${panel.step}: ${panel.category}`}
            >
              <div className="feature-stack-card__surface">
                <div className="feature-stack-card__copy">
                  <div className="feature-stack-card__eyebrow">
                    <span className={`feature-stack-card__icon ${panel.badgeColor}`}>
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>{panel.step} <span className="text-slate-300">/</span> {panel.category}</span>
                  </div>
                  <h3 className="feature-stack-card__title">{panel.title}</h3>
                  <p className="feature-stack-card__headline">{panel.headline}</p>
                  <p className="feature-stack-card__description">{panel.description}</p>

                  <div className="feature-stack-card__metrics">
                    {panel.floatingBadges.map((badge) => (
                      <div className="feature-metric" key={badge.text}>
                        <span className="feature-metric__label">{badge.text}</span>
                        <span className="feature-metric__value">{badge.value}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => onOpenAuth('signup')}
                    type="button"
                    className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Explore Fitness <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>

                <div className="feature-stack-card__visual">
                  <div className="feature-phone">
                    <div className="feature-phone__bezel" />
                    <div className="feature-phone__screen">
                      <div className="feature-phone__island"><span /></div>
                      <div className="feature-phone__app"><FeaturePhoneAppScreen panel={panel} ScreenComponent={ScreenComponent} /></div>
                      <div className="feature-phone__home"><span /></div>
                    </div>
                  </div>

                  {panel.floatingBadges.map((badge, badgeIndex) => (
                    <div className={`feature-float feature-float--${badgeIndex + 1}`} key={badge.text}>
                      <span className="feature-float__label">{badge.text}</span>
                      <strong>{badge.value}</strong>
                      <span className="feature-float__sub">{badge.sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function PinnedDesktopShowcase({ panels, onOpenAuth }) {
  const stageRef = useRef(null);
  const storyRefs = useRef([]);
  const screenRefs = useRef([]);
  const progressRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const media = gsap.matchMedia();
    media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
      const stories = storyRefs.current;
      const screens = screenRefs.current;
      gsap.set(screens, { autoAlpha: 0, scale: 0.97, y: 18 });

      let lastActiveIndex = -1;
      const stepDuration = 1;
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: () => `+=${(panels.length - 1) * 900}`,
          pin: stage,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (trigger) => {
            const index = Math.min(Math.floor(trigger.progress * (panels.length - 0.001)), panels.length - 1);
            if (index !== lastActiveIndex) {
              lastActiveIndex = index;
              setActiveIndex(index);
            }
            if (progressRef.current) progressRef.current.style.transform = `scaleX(${trigger.progress})`;
          },
        },
      });

      const firstScreen = screens[0];
      timeline.fromTo(firstScreen,
        { autoAlpha: 0, scale: 0.95, y: 26 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 0.58, ease: 'power3.out' },
        0.08
      );
      const firstScreenItems = firstScreen.querySelectorAll('[data-phone-reveal]');
      timeline.fromTo(firstScreenItems,
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.28, stagger: 0.055, ease: 'power2.out' },
        0.2
      );
      animateScreenGraphics(timeline, firstScreen, 0.24);
      animateScreenCounters(timeline, firstScreen, 0.26);
      animateBenefitCounters(timeline, stories[0], 0.28);

      for (let index = 1; index < panels.length; index += 1) {
        const position = (index - 1) * stepDuration;
        const nextStory = stories[index];
        const previousScreen = screens[index - 1];
        const nextScreen = screens[index];
        const screenItems = nextScreen.querySelectorAll('[data-phone-reveal]');

        timeline.to(previousScreen, {
          autoAlpha: 0,
          scale: 0.96,
          y: -10,
          duration: 0.3,
          ease: 'power2.inOut',
        }, position + 0.08);
        timeline.fromTo(nextScreen,
          { autoAlpha: 0, scale: 1.035, y: 22 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.42, ease: 'power3.out' },
          position + 0.2
        );
        timeline.fromTo(screenItems,
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.28, stagger: 0.055, ease: 'power2.out' },
          position + 0.34
        );

        // Draw chart traces and progress rings as each app screen arrives.
        animateScreenGraphics(timeline, nextScreen, position + 0.36);
        animateScreenCounters(timeline, nextScreen, position + 0.38);
        animateBenefitCounters(timeline, nextStory, position + 0.38);
      }
      }, stage);

      return () => ctx.revert();
    });

    return () => media.revert();
  }, [panels]);

  return (
    <div className="feature-pinned-showcase">
      <header className="feature-pinned-intro">
        <span className="feature-pinned-kicker"><Sparkles className="h-4 w-4" /> HEALTH, CONNECTED</span>
        <h2>One health picture. <span>Ten dimensions.</span></h2>
        <p>Move through your day with the signals that help you understand what your body needs.</p>
      </header>

      <div className="feature-pinned-stage" ref={stageRef}>
        <div className="feature-pinned-status">
          <span className="feature-pinned-live"><i /> FITNESS INTELLIGENCE</span>
          <span className="feature-pinned-count">{String(activeIndex + 1).padStart(2, '0')} <em>/ {panels.length}</em></span>
        </div>
        <div className="feature-pinned-progress"><span ref={progressRef} /></div>

        <div className="feature-pinned-layout">
          {panels.map((panel, index) => {
            const Icon = panel.icon;
            return (
              <article
                className={`feature-pinned-story ${activeIndex === index ? 'is-active' : ''}`}
                key={panel.id}
                ref={(element) => { storyRefs.current[index] = element; }}
                aria-label={`${panel.title}: ${panel.headline}`}
                aria-hidden={activeIndex !== index}
              >
                <div className="feature-pinned-story__panel feature-pinned-story__panel--left">
                  <div className="feature-pinned-story__eyebrow">
                    <span className={`feature-pinned-story__icon ${panel.badgeColor}`}><Icon className="h-4 w-4" /></span>
                    <span>{panel.step} <b>/</b> {panel.category}</span>
                  </div>
                  <h3 className="feature-pinned-story__title">{panel.title}</h3>
                  <p className="feature-pinned-story__definition">{panel.headline}</p>
                </div>

                <div className="feature-pinned-story__panel feature-pinned-story__panel--right">
                  <p className="feature-pinned-story__description">{panel.description}</p>
                  <div className="feature-pinned-benefits">
                    {panel.floatingBadges.map((benefit) => (
                      <div className="feature-pinned-benefit" key={benefit.text}>
                        <span>{benefit.text}</span>
                        <strong className="feature-benefit__value">{benefit.value}</strong>
                      </div>
                    ))}
                  </div>
                  <div className="feature-pinned-usecase">
                    <span>IN PRACTICE</span>
                    <p>{FEATURE_USE_CASES[panel.id]}</p>
                  </div>
                  <button className="feature-pinned-cta" type="button" onClick={() => onOpenAuth('signup')}>
                    Explore Fitness <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            );
          })}

          <div className="feature-center-phone" aria-label="Fitness mobile app preview">
            <div className="feature-phone">
              <div className="feature-phone__bezel" />
              <div className="feature-phone__screen">
                <div className="feature-phone__island"><span /></div>
                <div className="feature-phone__app">
                  {panels.map((panel, index) => {
                    const ScreenComponent = panel.mockupComponent;
                    return (
                      <div
                        className={`feature-pinned-screen ${activeIndex === index ? 'is-active' : ''}`}
                        key={panel.id}
                        ref={(element) => { screenRefs.current[index] = element; }}
                        aria-hidden={activeIndex !== index}
                      >
                        <FeaturePhoneAppScreen panel={panel} ScreenComponent={ScreenComponent} />
                      </div>
                    );
                  })}
                </div>
                <div className="feature-phone__home"><span /></div>
              </div>
            </div>
          </div>
        </div>

        <div className="feature-pinned-footer">
          <span>SCROLL TO EXPLORE</span>
          <div>{panels.map((panel, index) => <i className={activeIndex === index ? 'is-active' : ''} key={panel.id} />)}</div>
          <span>{String(panels.length).padStart(2, '0')} FEATURES</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
  MAIN STACKED FEATURE SHOWCASE
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
    if (!container || !pinTarget || pinTarget.offsetParent === null) {
      return () => window.removeEventListener('resize', checkWidth);
    }

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
      className="relative w-full bg-slate-50/40 text-slate-900 border-y border-slate-200/80"
    >
      {/* ── DESKTOP INTRO HEADER (Moved upwards before pinning so it scrolls naturally) ── */}
      <div className="hidden max-w-7xl mx-auto px-8 lg:px-12 pt-28 pb-14 text-center">
        <div className="inline-flex items-center gap-2 text-blue-700 text-xs font-mono font-bold uppercase tracking-widest mb-3 px-3.5 py-1.5 bg-blue-50 rounded-full border border-blue-200/80 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>02 · THE PINNED SHOWCASE</span>
        </div>
        <h2 className="text-4xl xl:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Unified Human Intelligence in <span className="text-blue-600">Ten Dimensions</span>
        </h2>
        <p className="text-base text-slate-500 max-w-2xl mx-auto font-normal leading-relaxed">
          Scroll through to explore every dimension of physiological, metabolic, and cognitive telemetry.
        </p>
      </div>

      {/* ── DESKTOP PINNED VIEWPORT (1024px+) — Full screen mobile view ── */}
      <div 
        ref={pinTargetRef}
        className="hidden"
      >
        {/* Sleek Top Status Bar — flips sides based on phone position */}
        <div className={`flex items-center pb-3 border-b border-slate-200/60 shrink-0 transition-all duration-300 ${
          activeIndex % 2 === 0 ? 'justify-end' : 'justify-start'
        }`}>
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-xs font-mono font-bold text-slate-600 uppercase tracking-widest">
              Dimension {PANELS[activeIndex]?.step} / {PANELS.length} · {PANELS[activeIndex]?.category}
            </span>
            <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/90 shadow-sm ml-4">
              <div className="w-1 h-7 bg-slate-200 rounded-full overflow-hidden flex flex-col justify-start">
                <div 
                  ref={verticalProgressRef}
                  className="w-full bg-blue-600 rounded-full transition-all duration-75"
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
                  <div className="p-2 rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-500/20">
                    <PanelIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-blue-600 uppercase block">
                      {panel.step} · {panel.category}
                    </span>
                  </div>
                </div>

                <h3 className="text-3xl xl:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
                  {panel.title}
                </h3>

                <p className="text-base font-semibold text-slate-700 mb-3 leading-snug">
                  {panel.headline}
                </p>

                <p className="text-sm text-slate-500 leading-relaxed font-normal mb-6 max-w-lg">
                  {panel.description}
                </p>

                <div className="flex items-center gap-4 pt-1">
                  <button
                    onClick={() => onOpenAuth('signup')}
                    type="button"
                    className="px-6 py-2.5 rounded-xl font-semibold text-xs text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-600/25 hover:shadow-md transition-all duration-200 flex items-center gap-2"
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
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
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
                  ? 'text-white bg-blue-600 font-black shadow-md shadow-blue-600/25'
                  : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50 font-semibold'
              }`}
              aria-label={`Jump to step ${p.step}`}
            >
              {p.step}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive feature-card deck */}
      <div className="relative">
        <div className="hidden lg:block">
          <PinnedDesktopShowcase panels={PANELS} onOpenAuth={onOpenAuth} />
        </div>

        <div className="lg:hidden">
          <FeatureStackCards panels={PANELS} onOpenAuth={onOpenAuth} />
        </div>

        {/* Bottom CTA strip */}
        <div className="px-6 pb-12 pt-4 text-center">
          <button
            onClick={() => onOpenAuth('signup')}
            type="button"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/25 transition-all duration-200"
          >
            <span>Request Early Access</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

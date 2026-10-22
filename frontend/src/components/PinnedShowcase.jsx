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
  ChevronRight
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────
   10 PHONE SCREEN MOCKUPS (FIGMA CLEAN LIGHT THEME)
   Clean white cards, slate-900 typography, royal blue accents,
   soft borders, emerald prime indicators.
───────────────────────────────────────────────────────── */

// 01. Daily Health Overview
function ScreenDailyOverview() {
  return (
    <div className="flex flex-col h-full bg-[#f8fafc] text-slate-900 p-4 select-none">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">DAILY CAPACITY</span>
        </div>
        <span className="text-[10px] font-mono text-blue-600 font-semibold">TODAY · 08:30 AM</span>
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
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Readiness</span>
          <span className="text-4xl font-black text-slate-900 tracking-tight">92</span>
          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-0.5 border border-emerald-200">
            PRIME STATE
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

      <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200/80 mt-auto">
        <div className="flex items-center gap-1.5 mb-1">
          <Sparkles className="w-3 h-3 text-blue-600" />
          <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider">TODAY'S BRIEF</span>
        </div>
        <p className="text-[10px] text-slate-700 leading-relaxed font-normal">
          "Deep sleep was 1h 53m (+22m vs avg). Your nervous system is primed for high-intensity power output until 2:00 PM."
        </p>
      </div>
    </div>
  );
}

// 02. Wearable Connections
function ScreenWearables() {
  const devices = [
    { name: 'Apple Watch Ultra 2', metric: 'HRV, SpO2 & ECG', status: 'Live Sync', latency: '0.4s' },
    { name: 'Oura Ring Gen 3', metric: 'Sleep & Temp Deviation', status: 'Live Sync', latency: '1.2s' },
    { name: 'Whoop 4.0 Strap', metric: 'Strain & Recovery', status: 'Live Sync', latency: '0.8s' },
    { name: 'Dexcom G7 CGM', metric: 'Interstitial Glucose', status: 'Continuous', latency: 'Real-time' },
    { name: 'Garmin Epix Pro', metric: 'VO2 Max & GPS Dynamics', status: 'Connected', latency: '2.1s' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] text-slate-900 p-4 select-none">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">DEVICE MESH</span>
        </div>
        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          5 CONNECTED
        </span>
      </div>

      <div className="mt-3 mb-2 flex items-center justify-between text-[11px] text-slate-600">
        <span className="font-bold text-slate-900">Aggregated Pipeline</span>
        <span className="text-blue-600 font-mono text-[10px] font-semibold">AES-256 E2EE</span>
      </div>

      <div className="space-y-2 flex-1">
        {devices.map((d) => (
          <div key={d.name} className="p-2 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold text-slate-900 leading-tight">{d.name}</div>
              <div className="text-[9px] text-slate-500">{d.metric}</div>
            </div>
            <div className="text-right">
              <span className="text-[9px] font-semibold text-blue-600 block">{d.status}</span>
              <span className="text-[8px] text-slate-400 font-mono">{d.latency}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-center mt-auto">
        <span className="text-[9px] text-slate-600 font-medium">Zero duplicate counts · Single consolidated timeline</span>
      </div>
    </div>
  );
}

// 03. Sleep Intelligence
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

// 04. Recovery — HRV & Readiness
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

// 05. Activity & Strain
function ScreenActivity() {
  return (
    <div className="flex flex-col h-full bg-[#f8fafc] text-slate-900 p-4 select-none">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">CARDIO STRAIN</span>
          <div className="text-2xl font-black text-slate-900">15.2 <span className="text-xs font-normal text-slate-500">/ 21.0</span></div>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">ENERGY EXPENDITURE</span>
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

// 06. Nutrition & Hydration
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
          <path
            d="M 0 30 Q 35 24 70 28 T 130 15 T 190 26 T 260 21 L 260 50 L 0 50 Z"
            fill="url(#cgmLightGrad)"
            opacity="0.15"
          />
          <defs>
            <linearGradient id="cgmLightGrad" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#2563EB" />
              <stop offset="1" stopColor="#2563EB" stopOpacity="0" />
            </linearGradient>
          </defs>
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

// 07. Biomarkers & Health Reports
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

// 08. Biological Age
function ScreenBiologicalAge() {
  return (
    <div className="flex flex-col h-full bg-[#f8fafc] text-slate-900 p-4 select-none">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">BIOLOGICAL AGE</span>
          <div className="text-2xl font-black text-purple-600">28.6 <span className="text-xs font-normal text-slate-500">Yrs</span></div>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">CHRONOLOGICAL</span>
          <div className="text-sm font-bold text-slate-900">34.0 Yrs <span className="text-[9px] text-emerald-600 block font-bold">-5.4 Yrs Younger</span></div>
        </div>
      </div>

      <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200 my-3">
        <div className="flex justify-between items-center text-[10px] mb-1">
          <span className="font-bold text-slate-900">Phenotypic Pace of Aging</span>
          <span className="font-bold text-emerald-600 font-mono">0.81 yr / yr</span>
        </div>
        <p className="text-[9px] text-slate-600 leading-relaxed font-normal">
          For every 1 calendar year, your cardiovascular and metabolic systems age just 9.7 months.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-1.5 text-[10px] mt-auto">
        <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-sm">
          <span className="text-slate-500 text-[8px] block font-medium">Cardio Resilience</span>
          <span className="font-bold text-slate-900">96% Optimal</span>
        </div>
        <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-sm">
          <span className="text-slate-500 text-[8px] block font-medium">Metabolic Resilience</span>
          <span className="font-bold text-slate-900">92% Optimal</span>
        </div>
      </div>
    </div>
  );
}

// 09. AI Health Coach
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
          <span className="text-[8px] font-bold text-blue-600 block mb-0.5">FITNESS REASONER</span>
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

// 10. Connected Health Dashboard / Picture
function ScreenConnectedDashboard() {
  return (
    <div className="flex flex-col h-full bg-[#f8fafc] text-slate-900 p-3.5 select-none">
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/80">
        <span className="text-[10px] font-bold text-slate-900">THE CONNECTED PICTURE</span>
        <span className="text-[9px] font-mono text-blue-600 font-bold">UNIFIED TELEMETRY</span>
      </div>

      <div className="relative my-3 flex items-center justify-center">
        <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" stroke="#e2e8f0" strokeWidth="6" fill="none" />
          <circle cx="50" cy="50" r="42" stroke="#6366f1" strokeWidth="6" fill="none"
            strokeDasharray="264" strokeDashoffset="24" strokeLinecap="round" />
          
          <circle cx="50" cy="50" r="32" stroke="#e2e8f0" strokeWidth="6" fill="none" />
          <circle cx="50" cy="50" r="32" stroke="#10b981" strokeWidth="6" fill="none"
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
   10 FEATURE DEFINITIONS
───────────────────────────────────────────────────────── */
const PANELS = [
  {
    id: 'overview',
    step: '01',
    category: 'SYNTHESIS ENGINE',
    title: 'Daily Health Overview',
    headline: 'Your entire body scored in one composite daily signal.',
    description:
      'Fitness continuously weighs sleep architecture (35%), nocturnal HRV (25%), dynamic cardiovascular strain (25%), and metabolic fuel (15%) into a single operational directive for today.',
    icon: Activity,
    badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
    mockupComponent: ScreenDailyOverview,
    floatingBadges: [
      { text: 'Composite Readiness', value: '92 / 100', color: 'border-blue-300 text-blue-700' },
      { text: 'Circadian Delta', value: '+1.4 hrs optimal', color: 'border-emerald-300 text-emerald-700' },
    ],
  },
  {
    id: 'wearables',
    step: '02',
    category: 'TELEMETRY MESH',
    title: 'Wearable Connections',
    headline: 'Bi-directional zero-latency sync with 40+ devices.',
    description:
      'Aggregates Apple HealthKit, Oura Ring, Whoop 4.0, Dexcom CGM, Garmin, and Withings into a single consolidated biometrics stream with zero double-counting.',
    icon: Watch,
    badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
    mockupComponent: ScreenWearables,
    floatingBadges: [
      { text: 'Sync Latency', value: '1.2s Real-Time', color: 'border-blue-300 text-blue-700' },
      { text: 'Encryption', value: 'AES-256 GCM', color: 'border-emerald-300 text-emerald-700' },
    ],
  },
  {
    id: 'sleep',
    step: '03',
    category: 'NEUROLOGICAL REST',
    title: 'Sleep Intelligence',
    headline: 'Continuous hypnograms and real-time circadian phase alignment.',
    description:
      'Track REM, deep, light, and micro-wake periods. Fitness calculates cumulative sleep debt down to the minute and prescribes optimal bedtime windows based on evening cortisol dips.',
    icon: Moon,
    badgeColor: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    mockupComponent: ScreenSleep,
    floatingBadges: [
      { text: 'Deep Sleep Ratio', value: '24% (1h 53m)', color: 'border-indigo-300 text-indigo-700' },
      { text: 'Sleep Efficiency', value: '94% Restorative', color: 'border-blue-300 text-blue-700' },
    ],
  },
  {
    id: 'recovery',
    step: '04',
    category: 'CENTRAL NERVOUS SYSTEM',
    title: 'Recovery & Daily Readiness',
    headline: 'Parasympathetic tone calculated from continuous HRV trends.',
    description:
      'Quantify autonomic nervous system recovery through rMSSD high-frequency heart rate variability. Know immediately whether your body is primed for record strain or active recovery.',
    icon: Heart,
    badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    mockupComponent: ScreenRecovery,
    floatingBadges: [
      { text: 'Baseline rMSSD', value: '88 ms (+14%)', color: 'border-emerald-300 text-emerald-700' },
      { text: 'Nocturnal Pulse', value: '48 bpm resting', color: 'border-teal-300 text-teal-700' },
    ],
  },
  {
    id: 'activity',
    step: '05',
    category: 'DYNAMIC LOAD CAPACITY',
    title: 'Activity & Dynamic Strain',
    headline: 'Match training intensity directly to physiological capacity.',
    description:
      'Quantifies cardiovascular strain and muscular exertion on a 0–21 scale. Dynamically computes your remaining safe daily strain budget so you build resilience without overtraining.',
    icon: Flame,
    badgeColor: 'text-amber-700 bg-amber-50 border-amber-200',
    mockupComponent: ScreenActivity,
    floatingBadges: [
      { text: 'Daily Strain', value: '15.2 / 21.0', color: 'border-amber-300 text-amber-700' },
      { text: 'Zone 2 Cardio', value: '45 min base', color: 'border-orange-300 text-orange-700' },
    ],
  },
  {
    id: 'nutrition',
    step: '06',
    category: 'METABOLIC STABILITY',
    title: 'Nutrition & Hydration',
    headline: 'Continuous glucose monitoring curves and sweat-loss hydration.',
    description:
      'Seamless CGM curve analysis reveals glycemic spikes and crashes in real time. Dynamic hydration formulas adjust water and sodium targets according to ambient temperature and sweat loss.',
    icon: Droplets,
    badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
    mockupComponent: ScreenNutrition,
    floatingBadges: [
      { text: 'CGM Stability', value: '92 mg/dL in-range', color: 'border-blue-300 text-blue-700' },
      { text: 'Target Hydration', value: '2.8L / 3.2L', color: 'border-sky-300 text-sky-700' },
    ],
  },
  {
    id: 'biomarkers',
    step: '07',
    category: 'CLINICAL LAB OCR',
    title: 'Biomarkers & Health Reports',
    headline: 'Instant OCR extraction of clinical blood tests into trend lines.',
    description:
      'Simply drop your standard lab PDF. Fitness extracts ApoB, hs-CRP, fasting insulin, testosterone, and lipid panels, tracking each marker across reference ranges and longevity baselines.',
    icon: FileText,
    badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
    mockupComponent: ScreenBiomarkers,
    floatingBadges: [
      { text: 'Atherogenic ApoB', value: '74 mg/dL (Optimal)', color: 'border-blue-300 text-blue-700' },
      { text: 'hs-CRP Inflammation', value: '0.38 mg/L (Low)', color: 'border-emerald-300 text-emerald-700' },
    ],
  },
  {
    id: 'bioage',
    step: '08',
    category: 'PHENOTYPIC LONGEVITY',
    title: 'Biological Age & Trends',
    headline: 'Phenotypic aging pace calculated from systemic biomarkers.',
    description:
      'Calculates your biological age versus chronological years using composite biological models. Shows exact factors adding or subtracting vitality across your cardiovascular and metabolic systems.',
    icon: TrendingUp,
    badgeColor: 'text-purple-700 bg-purple-50 border-purple-200',
    mockupComponent: ScreenBiologicalAge,
    floatingBadges: [
      { text: 'Biological Age', value: '28.6 vs 34.0 yrs', color: 'border-purple-300 text-purple-700' },
      { text: 'Pace of Aging', value: '0.81 yr / yr', color: 'border-emerald-300 text-emerald-700' },
    ],
  },
  {
    id: 'coach',
    step: '09',
    category: 'CONTEXTUAL REASONING',
    title: 'AI Health & Fitness Coach',
    headline: 'Proactive intelligence partner that understands your data.',
    description:
      'Ask real questions, get precise physiological answers. The coach recalculates training intensity, rest periods, and macro timing on the fly based on your latest HRV, sleep, and glucose readings.',
    icon: Bot,
    badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
    mockupComponent: ScreenAiCoach,
    floatingBadges: [
      { text: 'Context Window', value: 'All 10 Dimensions', color: 'border-blue-300 text-blue-700' },
      { text: 'Guidance Type', value: 'Evidence-Based', color: 'border-indigo-300 text-indigo-700' },
    ],
  },
  {
    id: 'dashboard',
    step: '10',
    category: 'CONNECTED OS',
    title: 'Your Connected Health Picture',
    headline: 'One screen that unites all fragments of human biology.',
    description:
      'Three interlocking telemetry rings—Sleep, Capacity, and Strain—accompanied by real-time metabolic and autonomic telemetry. Open the app, absorb your biological status, and attack the day.',
    icon: Layers,
    badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
    mockupComponent: ScreenConnectedDashboard,
    floatingBadges: [
      { text: 'Unified Picture', value: '1 Screen / 100% Data', color: 'border-blue-300 text-blue-700' },
      { text: 'Daily Friction', value: 'Zero Manual Logging', color: 'border-emerald-300 text-emerald-700' },
    ],
  },
];

/* ─────────────────────────────────────────────────────────
   MOBILE ALTERNATING LEFT / RIGHT SCROLL REVEAL COMPONENT
   Even index → slides from left (phone left, text right)
   Odd index  → slides from right (text left, phone right)
───────────────────────────────────────────────────────── */
function MobileAlternatingCards({ panels, onOpenAuth }) {
  const cardRefs = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observers = cardRefs.current.map((el, idx) => {
      if (!el) return null;

      // Set initial class — no transform yet, just the CSS transition classes
      el.classList.add(idx % 2 === 0 ? 'mobile-card-from-left' : 'mobile-card-from-right');

      if (prefersReducedMotion) {
        el.classList.add('mobile-card-visible');
        return null;
      }

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // stagger by index within viewport
            const delay = 80;
            setTimeout(() => {
              el.classList.add('mobile-card-visible');
            }, delay);
            obs.disconnect();
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
      );

      obs.observe(el);
      return obs;
    });

    return () => {
      observers.forEach((obs) => obs && obs.disconnect());
    };
  }, []);

  return (
    <div className="px-4 sm:px-5 pb-6 space-y-6">
      {panels.map((panel, idx) => {
        const ScreenComponent = panel.mockupComponent;
        const Icon = panel.icon;
        const isEven = idx % 2 === 0;
        const badge1 = panel.floatingBadges[0];
        const badge2 = panel.floatingBadges[1];

        return (
          <div
            key={panel.id}
            ref={(el) => (cardRefs.current[idx] = el)}
            className="relative"
          >
            {/* Journey dot on the center line */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-3 w-6 h-6 rounded-full bg-white border-2 border-blue-400 flex items-center justify-center z-20 shadow-sm">
              <span className="text-[8px] font-black text-blue-600 font-mono">{panel.step}</span>
            </div>

            {/* Card Shell */}
            <div
              className={`rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-md flex ${
                isEven ? 'flex-row' : 'flex-row-reverse'
              } min-h-[220px]`}
            >
              {/* ── Phone Mockup Column ── */}
              <div
                className={`relative flex-shrink-0 w-[130px] flex items-center justify-center py-4 px-2 ${
                  isEven
                    ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-r border-slate-200'
                    : 'bg-gradient-to-bl from-emerald-50 to-teal-50 border-l border-slate-200'
                }`}
              >
                {/* Mini phone frame */}
                <div className="relative w-[96px] h-[172px]">
                  {/* Metallic bezel */}
                  <div className="absolute -inset-[2px] rounded-[22px] bg-gradient-to-b from-slate-200 via-slate-400 to-slate-300 shadow-lg" />
                  {/* Screen body */}
                  <div className="absolute inset-0 rounded-[20px] bg-white border-[2.5px] border-slate-300 overflow-hidden flex flex-col">
                    {/* Dynamic island */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-slate-900 rounded-full z-10 flex items-center justify-between px-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-700 flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-blue-400/60" />
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                    {/* App screen content — scaled down */}
                    <div className="flex-1 pt-5 overflow-hidden" style={{ transform: 'scale(0.6)', transformOrigin: 'top center', height: '240px', marginBottom: '-80px' }}>
                      <ScreenComponent />
                    </div>
                    {/* Home bar */}
                    <div className="h-3 flex items-center justify-center pb-1">
                      <div className="w-10 h-0.5 bg-slate-300 rounded-full" />
                    </div>
                  </div>

                  {/* Floating metric badge 1 */}
                  <div
                    className={`absolute z-20 px-2 py-1 rounded-lg bg-white shadow-md border pointer-events-none mobile-badge-float ${
                      isEven ? '-right-8 top-4 rotate-2' : '-left-8 top-4 -rotate-2'
                    } ${badge1.color}`}
                    style={{ minWidth: '72px' }}
                  >
                    <span className="text-[7px] uppercase tracking-wide text-slate-400 block font-bold leading-tight">{badge1.text.split(' ').slice(0,2).join(' ')}</span>
                    <span className="text-[9px] font-black leading-tight">{badge1.value.split(' ').slice(0,2).join(' ')}</span>
                  </div>

                  {/* Floating metric badge 2 */}
                  <div
                    className={`absolute z-20 px-2 py-1 rounded-lg bg-white shadow-md border pointer-events-none mobile-badge-float-alt ${
                      isEven ? '-right-8 bottom-6 -rotate-1' : '-left-8 bottom-6 rotate-1'
                    } ${badge2.color}`}
                    style={{ minWidth: '72px' }}
                  >
                    <span className="text-[7px] uppercase tracking-wide text-slate-400 block font-bold leading-tight">{badge2.text.split(' ').slice(0,2).join(' ')}</span>
                    <span className="text-[9px] font-black leading-tight">{badge2.value.split(' ').slice(0,2).join(' ')}</span>
                  </div>
                </div>
              </div>

              {/* ── Text Content Column ── */}
              <div className="flex-1 flex flex-col justify-between p-4 min-w-0">
                {/* Top: category + icon */}
                <div className="flex items-start gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-blue-600 text-white flex-shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[8px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                      {panel.step} / 10
                    </span>
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full border leading-tight ${panel.badgeColor}`}>
                      {panel.category}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-black text-slate-900 leading-tight mb-1.5">
                  {panel.title}
                </h3>

                {/* Headline */}
                <p className="text-[11px] font-semibold text-slate-600 leading-snug mb-2">
                  {panel.headline}
                </p>

                {/* Metric pills */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {panel.floatingBadges.map((b) => (
                    <span
                      key={b.text}
                      className={`text-[8px] font-bold px-2 py-0.5 rounded-full border ${b.color} bg-white`}
                    >
                      {b.value}
                    </span>
                  ))}
                </div>

                {/* CTA link */}
                <button
                  onClick={() => onOpenAuth('signup')}
                  type="button"
                  className={`text-[10px] font-bold flex items-center gap-1 mt-auto ${
                    isEven ? 'text-blue-600 hover:text-blue-700' : 'text-emerald-600 hover:text-emerald-700'
                  } transition-colors`}
                >
                  <span>Explore</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN PINNED SHOWCASE COMPONENT
───────────────────────────────────────────────────────── */
export default function PinnedShowcase({ onOpenAuth }) {
  const containerRef = useRef(null);
  const pinTargetRef = useRef(null);
  const progressBarRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  // References for all 10 panel elements to animate via GSAP scrubbed timeline
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
      // Set initial states for all 10 slides
      PANELS.forEach((_, idx) => {
        const textEl = textElementsRef.current[idx];
        const screenEl = screenElementsRef.current[idx];
        const badgeEl = badgeElementsRef.current[idx];

        if (idx === 0) {
          gsap.set(textEl, { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto' });
          gsap.set(screenEl, { opacity: 1, scale: 1, filter: 'blur(0px)', pointerEvents: 'auto' });
          if (badgeEl) gsap.set(badgeEl, { opacity: 1, scale: 1, y: 0 });
        } else {
          gsap.set(textEl, { opacity: 0, y: 40, scale: 0.96, pointerEvents: 'none' });
          gsap.set(screenEl, { opacity: 0, scale: 1.04, filter: 'blur(4px)', pointerEvents: 'none' });
          if (badgeEl) gsap.set(badgeEl, { opacity: 0, scale: 0.9, y: 20 });
        }
      });

      // Master Scrubbed Timeline
      const totalSteps = PANELS.length - 1;
      const stepDuration = 1.0;
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${PANELS.length * 750}`,
          pin: pinTarget,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const raw = self.progress * (PANELS.length - 0.001);
            const current = Math.min(Math.floor(raw), PANELS.length - 1);
            setActiveIndex(current);

            // Update progress bar width
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      // Construct sequential scrubbed cross-fades for steps 0 -> 1 -> 2 -> ... -> 9
      for (let i = 0; i < totalSteps; i++) {
        const currentText = textElementsRef.current[i];
        const nextText = textElementsRef.current[i + 1];
        const currentScreen = screenElementsRef.current[i];
        const nextScreen = screenElementsRef.current[i + 1];
        const currentBadges = badgeElementsRef.current[i];
        const nextBadges = badgeElementsRef.current[i + 1];

        const stepTime = i * stepDuration;

        // Animate current out
        masterTl.to(
          currentText,
          {
            opacity: 0,
            y: -35,
            scale: 0.96,
            duration: stepDuration * 0.5,
            ease: 'power2.inOut',
            onStart: () => {
              if (currentText) currentText.style.pointerEvents = 'none';
            },
          },
          stepTime
        );

        masterTl.to(
          currentScreen,
          {
            opacity: 0,
            scale: 0.96,
            filter: 'blur(4px)',
            duration: stepDuration * 0.5,
            ease: 'power2.inOut',
            onStart: () => {
              if (currentScreen) currentScreen.style.pointerEvents = 'none';
            },
          },
          stepTime
        );

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
            stepTime
          );
        }

        // Animate next in
        masterTl.fromTo(
          nextText,
          { opacity: 0, y: 35, scale: 0.96 },
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
          stepTime + stepDuration * 0.4
        );

        masterTl.fromTo(
          nextScreen,
          { opacity: 0, scale: 1.04, filter: 'blur(4px)' },
          {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: stepDuration * 0.5,
            ease: 'power2.inOut',
            onComplete: () => {
              if (nextScreen) nextScreen.style.pointerEvents = 'auto';
            },
          },
          stepTime + stepDuration * 0.4
        );

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
            stepTime + stepDuration * 0.45
          );
        }
      }
    }, container);

    return () => {
      window.removeEventListener('resize', checkWidth);
      ctx.revert();
    };
  }, []);

  const handleJumpToStep = (index) => {
    setActiveIndex(index);
    if (!isDesktop) {
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
      className="relative w-full bg-[#f8fafc] text-slate-900 border-y border-slate-200"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-50" />

      {/* ── DESKTOP PINNED VIEWPORT (1024px+) ── */}
      <div 
        ref={pinTargetRef}
        className="hidden lg:flex flex-col justify-between h-screen w-full max-w-7xl mx-auto px-8 lg:px-12 py-8 relative z-10 overflow-hidden"
      >
        {/* Top Header Rail Bar */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-200 shrink-0">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span>THE PINNED PRODUCT SHOWCASE</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Unified Human Intelligence in <span className="text-blue-600">Ten Dimensions</span>
            </h2>
          </div>

          {/* Dimension Counter & Step Selector */}
          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">Dimension</span>
              <span className="text-2xl font-black font-mono text-blue-600">
                {String(activeIndex + 1).padStart(2, '0')}{' '}
                <span className="text-xs text-slate-400 font-normal">/ 10</span>
              </span>
            </div>

            {/* Clickable Quick Jump Indicator Dots */}
            <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-full border border-slate-200 shadow-sm">
              {PANELS.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => handleJumpToStep(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeIndex === idx
                      ? 'w-7 bg-blue-600 shadow-sm'
                      : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                  }`}
                  aria-label={`Jump to dimension ${p.step}: ${p.title}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Middle Stage: Left Text Storytelling & Right Realistic Mockup */}
        <div className="flex-1 grid grid-cols-12 gap-12 items-center my-auto py-4 relative">
          {/* Left Column: Stacked Text Panels that cross-fade with GSAP scrub */}
          <div className="col-span-6 relative h-[380px] flex items-center pr-4">
            {PANELS.map((panel, idx) => {
              const PanelIcon = panel.icon;
              return (
                <div
                  key={panel.id}
                  ref={(el) => (textElementsRef.current[idx] = el)}
                  className="absolute inset-x-0 flex flex-col justify-center"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-sm">
                      <PanelIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold tracking-widest text-slate-400 block">
                        MODULE {panel.step}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${panel.badgeColor}`}>
                        {panel.category}
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
                      className="px-6 py-3 rounded-xl font-semibold text-xs text-white bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2"
                    >
                      <span>Request Early Access</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Synchronous multi-sensor telemetry</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Realistic Silver Phone Frame with Stacked Screens */}
          <div className="col-span-6 flex items-center justify-center relative">
            <div className="relative w-[310px] sm:w-[330px] h-[600px] select-none mx-auto">
              {/* Silver Metallic Bezel Outer Layer */}
              <div 
                className="absolute -inset-[3px] rounded-[50px] bg-gradient-to-b from-slate-200 via-slate-400 to-slate-300 shadow-2xl shadow-slate-900/10"
              />

              {/* Chassis Layer */}
              <div className="absolute inset-0 rounded-[48px] bg-white border-[4px] border-slate-300 overflow-hidden flex flex-col shadow-inner">
                {/* Dynamic Island Speaker Pill */}
                <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-950 rounded-full z-40 flex items-center justify-between px-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-800 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500/70" />
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                {/* Inner Screen Display Area */}
                <div className="relative w-full h-full pt-8 pb-4 flex-1 overflow-hidden bg-[#f8fafc]">
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

              {/* Floating Dynamic Badges that animate with GSAP */}
              {PANELS.map((panel, idx) => (
                <div
                  key={`badges-${panel.id}`}
                  ref={(el) => (badgeElementsRef.current[idx] = el)}
                  className="absolute inset-0 pointer-events-none"
                >
                  {panel.floatingBadges.map((badge, bIdx) => (
                    <div
                      key={badge.text}
                      className={`absolute z-30 px-3.5 py-2 rounded-xl bg-white border ${badge.color} shadow-lg pointer-events-none ${
                        bIdx === 0 
                          ? '-left-12 top-16 -rotate-2' 
                          : '-right-10 bottom-24 rotate-3'
                      }`}
                    >
                      <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-bold">{badge.text}</span>
                      <span className="text-xs font-black tracking-tight">{badge.value}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Status Ticker Bar with Continuous Progress Fill */}
        <div className="pt-4 border-t border-slate-200 flex flex-col gap-3 shrink-0">
          <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
            <div 
              ref={progressBarRef}
              className="bg-blue-600 h-full transition-all duration-100 ease-out"
              style={{ width: `${((activeIndex + 1) / PANELS.length) * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-3 font-mono text-[11px]">
              <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" /> HIPAA COMPLIANT PIPELINE
              </span>
              <span className="text-slate-300">|</span>
              <span>Illustrative biometric simulation</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-500 font-medium">Scroll to scrub through 10 dimensions</span>
              <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center animate-bounce">
                <span className="text-[9px] text-slate-500">↓</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── TABLET & MOBILE: ALTERNATING LEFT / RIGHT SCROLL REVEAL ── */}
      <div className="lg:hidden relative overflow-hidden">
        {/* Section Header */}
        <div className="text-center px-4 pt-14 pb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>PRODUCT SHOWCASE</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
            Unified Health in{' '}
            <span className="text-blue-600">Ten Dimensions</span>
          </h2>
          <p className="text-sm text-slate-500 mt-3 max-w-xs mx-auto leading-relaxed">
            Scroll to explore every dimension of your biology, intelligently connected.
          </p>
        </div>

        {/* Vertical Journey Line */}
        <div className="absolute left-1/2 top-48 bottom-24 -translate-x-1/2 w-px bg-gradient-to-b from-blue-200 via-blue-400 to-transparent opacity-40 pointer-events-none" />

        {/* Alternating Cards */}
        <MobileAlternatingCards panels={PANELS} onOpenAuth={onOpenAuth} />

        {/* Bottom CTA strip */}
        <div className="px-6 pb-14 pt-6 text-center">
          <button
            onClick={() => onOpenAuth('signup')}
            type="button"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <span>Request Early Access</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-xs text-slate-400 mt-3">No credit card required · Free beta access</p>
        </div>
      </div>
    </section>
  );
}

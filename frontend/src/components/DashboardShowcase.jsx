import { useState, useRef, useEffect } from 'react';
import { 
  Activity, 
  Moon, 
  Heart, 
  Flame, 
  Droplets, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  Info
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DashboardShowcase({ onOpenAuth }) {
  const [selectedDay, setSelectedDay] = useState('Thu');
  const [activeMetricTab, setActiveMetricTab] = useState('all');
  const sectionRef = useRef(null);

  const weeklyData = [
    { day: 'Mon', strain: 12.4, recovery: 78, sleep: 7.2, hrv: 74 },
    { day: 'Tue', strain: 16.8, recovery: 64, sleep: 6.8, hrv: 69 },
    { day: 'Wed', strain: 11.2, recovery: 85, sleep: 7.9, hrv: 82 },
    { day: 'Thu', strain: 15.2, recovery: 94, sleep: 7.8, hrv: 88, current: true },
    { day: 'Fri', strain: 14.0, recovery: 89, sleep: 7.5, hrv: 84 },
    { day: 'Sat', strain: 17.5, recovery: 72, sleep: 7.0, hrv: 76 },
    { day: 'Sun', strain: 9.8, recovery: 96, sleep: 8.4, hrv: 91 },
  ];

  const habits = [
    {
      time: '07:15 AM',
      title: 'Natural Light & Hydration',
      detail: '500ml water + electrolytes within 20m of waking',
      status: 'completed',
    },
    {
      time: '11:00 AM',
      title: 'Peak CNS Strength Session',
      detail: 'Optimal autonomic window for heavy compound lifts',
      status: 'current',
    },
    {
      time: '03:30 PM',
      title: 'Zone 2 Aerobic Base Flush',
      detail: '35m steady cadence ride under 134 bpm',
      status: 'upcoming',
    },
    {
      time: '09:45 PM',
      title: 'Circadian Dimming & Wind-down',
      detail: 'Blue-light block + 200mg Magnesium Glycinate',
      status: 'upcoming',
    },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.dashboard-card',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activeDayStats = weeklyData.find((d) => d.day === selectedDay) || weeklyData[3];

  return (
    <section
      id="dashboard"
      ref={sectionRef}
      className="py-20 md:py-32 relative overflow-hidden bg-white border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Activity className="w-3.5 h-3.5" />
            <span>PRODUCT DASHBOARD SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Every vital metric,{' '}
            <span className="text-blue-600">intelligently synthesized</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            No fragmented charts or disconnected spreadsheets. Experience a responsive,
            real-time cockpit for human performance and cellular recovery.
          </p>
        </div>

        {/* Dashboard Shell Container */}
        <div className="rounded-3xl bg-slate-50 border border-slate-200/90 p-5 sm:p-8 shadow-sm">
          {/* Top Bar Navigation */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  Autonomous Performance Cockpit
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                    SYNC: LIVE
                  </span>
                </h3>
                <p className="text-xs text-slate-500">
                  Aggregating Oura Gen 3 • Whoop 4.0 • Dexcom CGM • Apple HealthKit
                </p>
              </div>
            </div>

            {/* Metric filter pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {[
                { id: 'all', label: 'Complete Overview' },
                { id: 'cardio', label: 'Cardiovascular' },
                { id: 'sleep', label: 'Sleep & CNS' },
                { id: 'fuel', label: 'Fuel & Glucose' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveMetricTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    activeMetricTab === tab.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Core Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
            {/* 1. Recovery Score */}
            <div className="dashboard-card p-5 rounded-2xl bg-white border border-slate-200 shadow-sm relative group hover:border-emerald-300 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Recovery Score
                </span>
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                  <Heart className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-black text-slate-900">94</span>
                <span className="text-sm font-semibold text-emerald-600">%</span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full ml-auto border border-emerald-200">
                  +8% Baseline
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
                <div className="bg-emerald-500 h-full w-[94%]" />
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Parasympathetic dominant. Prime CNS capacity for maximal training stimulus.
              </p>
            </div>

            {/* 2. Sleep Score & Duration */}
            <div className="dashboard-card p-5 rounded-2xl bg-white border border-slate-200 shadow-sm relative group hover:border-indigo-300 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Sleep Architecture
                </span>
                <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                  <Moon className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-black text-slate-900">91</span>
                <span className="text-xs text-slate-400 font-medium">Score</span>
                <span className="text-sm font-bold text-indigo-600 ml-auto">7h 52m</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2 flex">
                <div className="bg-indigo-600 h-full w-[24%]" title="Deep 24%" />
                <div className="bg-blue-400 h-full w-[28%]" title="REM 28%" />
                <div className="bg-sky-300 h-full w-[42%]" title="Light 42%" />
                <div className="bg-amber-400 h-full w-[6%]" title="Awake 6%" />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                <span>Deep: 1h 53m (24%)</span>
                <span>REM: 2h 12m</span>
              </div>
            </div>

            {/* 3. HRV & Resting Heart Rate */}
            <div className="dashboard-card p-5 rounded-2xl bg-white border border-slate-200 shadow-sm relative group hover:border-blue-300 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  HRV & Resting HR
                </span>
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <Activity className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between mb-2">
                <div>
                  <span className="text-3xl font-black text-slate-900">88</span>
                  <span className="text-xs text-slate-500 ml-1 font-medium">ms (HRV)</span>
                </div>
                <div>
                  <span className="text-2xl font-black text-blue-600">48</span>
                  <span className="text-xs text-slate-500 ml-1 font-medium">bpm</span>
                </div>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
                <div className="bg-blue-600 h-full w-[86%]" />
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Autonomic balance indicates negligible systemic inflammation.
              </p>
            </div>

            {/* 4. Activity & Strain */}
            <div className="dashboard-card p-5 rounded-2xl bg-white border border-slate-200 shadow-sm relative group hover:border-amber-300 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Dynamic Strain
                </span>
                <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                  <Flame className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-black text-slate-900">15.2</span>
                <span className="text-xs text-slate-400 font-medium">/ 21.0</span>
                <span className="text-xs font-bold text-amber-600 ml-auto">
                  2,420 Active kcal
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
                <div className="bg-amber-500 h-full w-[72%]" />
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Target strain budget: 14.0 - 16.5 based on 94% recovery.
              </p>
            </div>
          </div>

          {/* Middle Section: Weekly Trend Visualization & Habits */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
            {/* Weekly Trend Chart (Col 8) */}
            <div className="lg:col-span-8 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    Weekly Strain vs. Recovery Correlation
                    <Info className="w-4 h-4 text-slate-400" />
                  </h4>
                  <p className="text-xs text-slate-500">
                    Hover over any day to inspect autonomic response to training volume.
                  </p>
                </div>

                {/* Day Picker */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                  {weeklyData.map((d) => (
                    <button
                      key={d.day}
                      onClick={() => setSelectedDay(d.day)}
                      className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                        selectedDay === d.day
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {d.day}
                    </button>
                  ))}
                </div>
              </div>

              {/* SVG Visual Chart */}
              <div className="w-full h-48 sm:h-56 relative flex items-end justify-between px-2 sm:px-6 pt-4 pb-2 border-b border-slate-100">
                {weeklyData.map((d) => {
                  const isSelected = selectedDay === d.day;
                  const strainHeight = (d.strain / 21) * 100;
                  const recoveryHeight = (d.recovery / 100) * 100;

                  return (
                    <div
                      key={d.day}
                      onClick={() => setSelectedDay(d.day)}
                      className="flex flex-col items-center gap-2 group cursor-pointer h-full justify-end"
                    >
                      <div
                        className={`text-[10px] font-mono px-2 py-0.5 rounded shadow-sm border transition-opacity ${
                          isSelected ? 'opacity-100 bg-blue-600 text-white font-bold border-blue-600' : 'opacity-0 group-hover:opacity-100 bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        {d.recovery}%
                      </div>

                      {/* Dual Bar Representation */}
                      <div className="flex items-end gap-1.5 h-36">
                        <div
                          style={{ height: `${recoveryHeight}%` }}
                          className={`w-3.5 sm:w-5 rounded-t-md transition-all duration-500 ${
                            isSelected
                              ? 'bg-emerald-500 shadow-sm'
                              : 'bg-emerald-200 group-hover:bg-emerald-300'
                          }`}
                        />
                        <div
                          style={{ height: `${strainHeight}%` }}
                          className={`w-3.5 sm:w-5 rounded-t-md transition-all duration-500 ${
                            isSelected
                              ? 'bg-amber-500 shadow-sm'
                              : 'bg-amber-200 group-hover:bg-amber-300'
                          }`}
                        />
                      </div>

                      <span
                        className={`text-xs font-bold transition-colors ${
                          isSelected ? 'text-blue-600 font-black' : 'text-slate-500'
                        }`}
                      >
                        {d.day}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Chart Legend & Selected Day Summary */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-600 gap-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-emerald-500" />
                    <span>Recovery Score %</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-amber-500" />
                    <span>Day Strain Score</span>
                  </div>
                </div>

                <div className="text-slate-700 font-mono">
                  <span className="font-bold text-slate-900">{activeDayStats.day}: </span>
                  Recovery <span className="text-emerald-600 font-bold">{activeDayStats.recovery}%</span> •
                  Strain <span className="text-amber-600 font-bold">{activeDayStats.strain}</span> •
                  HRV <span className="text-blue-600 font-bold">{activeDayStats.hrv}ms</span>
                </div>
              </div>
            </div>

            {/* Upcoming Chronobiology Habits (Col 4) */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    Adaptive Daily Protocol
                  </h4>
                  <span className="text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full font-bold border border-blue-200">
                    CHRONO-TUNED
                  </span>
                </div>

                <div className="space-y-3">
                  {habits.map((habit, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-xl border text-xs transition-all ${
                        habit.status === 'completed'
                          ? 'bg-slate-50 border-slate-200 opacity-70'
                          : habit.status === 'current'
                          ? 'bg-blue-50/70 border-blue-200 shadow-sm'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-bold text-blue-600">{habit.time}</span>
                        {habit.status === 'completed' && (
                          <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold">
                            <CheckCircle2 className="w-3 h-3" /> Done
                          </span>
                        )}
                        {habit.status === 'current' && (
                          <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded font-bold">
                            NOW
                          </span>
                        )}
                      </div>
                      <div className="font-bold text-slate-900 text-xs">{habit.title}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{habit.detail}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <button
                  onClick={() => onOpenAuth('signup')}
                  type="button"
                  className="w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Customize Your Protocol</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Fuel & Hydration Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {/* Daily Calories & Macros */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-900">Daily Macronutrient Targets</span>
                <span className="text-xs font-mono text-slate-500">2,350 / 2,420 kcal burned</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block font-medium">Protein</span>
                  <span className="font-bold text-slate-900">145g <span className="text-slate-400 font-normal">/ 150g</span></span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block font-medium">Complex Carbs</span>
                  <span className="font-bold text-slate-900">210g <span className="text-slate-400 font-normal">/ 220g</span></span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block font-medium">Healthy Fats</span>
                  <span className="font-bold text-slate-900">62g <span className="text-slate-400 font-normal">/ 65g</span></span>
                </div>
              </div>
            </div>

            {/* Dynamic Hydration */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-blue-600" />
                  Hydration & Electrolyte Status
                </span>
                <span className="text-xs font-mono text-blue-600 font-bold">2.8L / 3.2L</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-2">
                <div className="bg-blue-600 h-full w-[87%]" />
              </div>
              <p className="text-[11px] text-slate-500">
                Remaining 400ml water + 300mg sodium recommended before 8:00 PM based on 45m sweat loss.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

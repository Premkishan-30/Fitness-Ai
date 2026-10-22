import { useState, useRef, useEffect } from 'react';
import { 
  CheckCircle2, 
  Zap, 
  RefreshCw 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Integrations({ onOpenAuth }) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncedCount, setSyncedCount] = useState(120);
  const sectionRef = useRef(null);

  const integrations = [
    {
      name: 'Apple HealthKit',
      type: 'Mobile Ecosystem',
      data: 'Steps, Resting HR, Sleep Analysis, Respiration',
      badge: 'Continuous 1s Telemetry',
      highlight: true,
    },
    {
      name: 'Whoop 4.0 Strap',
      type: 'Performance Sensor',
      data: 'Dynamic Strain, Recovery, Skin Temp, Heart Rate',
      badge: 'High Frequency',
      highlight: true,
    },
    {
      name: 'Oura Ring Gen 3',
      type: 'Sleep & Temperature',
      data: 'Nocturnal HRV, Readiness, Sleep Stages, Circadian',
      badge: 'Thermal Accuracy',
      highlight: true,
    },
    {
      name: 'Garmin Connect',
      type: 'Endurance GPS',
      data: 'VO2 Max, Training Status, Elevation, Power Output',
      badge: 'Athlete Metrics',
      highlight: false,
    },
    {
      name: 'Dexcom G7 / Abbott',
      type: 'Continuous Glucose',
      data: 'Real-time Interstitial Glucose, Glycemic Volatility',
      badge: 'Metabolic Curve',
      highlight: true,
    },
    {
      name: 'Withings Body Scan',
      type: 'Clinical Scale & ECG',
      data: 'Segmental Body Composition, Vascular Age, 6-Lead ECG',
      badge: 'Clinical Grade',
      highlight: false,
    },
    {
      name: 'Eight Sleep Pod 4',
      type: 'Dynamic Sleep Surface',
      data: 'Bi-thermal Temperature Regulation, Sleep Stage HR',
      badge: 'Autonomic Tuning',
      highlight: false,
    },
    {
      name: 'Clinical Lab Blood Work',
      type: 'Direct PDF & HL7 OCR',
      data: 'Comprehensive Metabolic Panel, ApoB, hs-CRP, Hormones',
      badge: 'Cellular Baselines',
      highlight: true,
    },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.integration-card',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSimulateSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncedCount((prev) => prev + 14);
    }, 1200);
  };

  return (
    <section
      id="integrations"
      ref={sectionRef}
      className="py-20 md:py-32 relative overflow-hidden bg-slate-50/70 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>WEARABLE & DEVICE CONNECTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Engineered to connect with{' '}
            <span className="text-blue-600">your existing hardware</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            No proprietary lock-in. Fitness brings together the world's most advanced consumer
            and clinical sensors into one synchronized, encrypted telemetry pipeline.
          </p>
        </div>

        {/* Live Synchronized Pipeline Telemetry Ribbon */}
        <div className="max-w-4xl mx-auto mb-12 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping absolute" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                Biometric Ingestion Pipeline Status
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                {syncedCount} telemetry streams harmonized • Average pipeline latency: 0.84s
              </span>
            </div>
          </div>

          <button
            onClick={handleSimulateSync}
            disabled={isSyncing}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all flex items-center gap-2 shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-blue-600' : ''}`} />
            <span>{isSyncing ? 'Syncing Ecosystem...' : 'Simulate Device Sync'}</span>
          </button>
        </div>

        {/* Integration Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {integrations.map((item) => (
            <div
              key={item.name}
              className={`integration-card p-5 rounded-2xl bg-white border transition-all duration-300 relative group shadow-sm hover:shadow-md ${
                item.highlight
                  ? 'border-blue-300 hover:border-blue-500'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                  {item.type}
                </span>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                {item.name}
              </h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed font-normal">
                {item.data}
              </p>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified API Pipeline</span>
                </span>
                <span className="text-slate-400 font-mono text-[10px]">AES-256</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Hardware CTA */}
        <div className="text-center max-w-xl mx-auto">
          <p className="text-xs sm:text-sm text-slate-500 mb-4 font-normal">
            Don't see your continuous monitor or smart device? We add new integrations monthly.
          </p>
          <button
            onClick={() => onOpenAuth('signup')}
            type="button"
            className="px-6 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition-all"
          >
            Request Device Integration
          </button>
        </div>
      </div>
    </section>
  );
}

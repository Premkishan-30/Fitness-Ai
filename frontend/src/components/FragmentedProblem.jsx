import { useRef, useEffect, useState } from 'react';
import {
  Activity,
  Bot,
  BookOpen,
  Calendar,
  Dumbbell,
  FileText,
  HeartPulse,
  Sparkles,
  Utensils,
  UserRound,
  Watch,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HEALTH_SOURCES = [
  {
    id: 'wearables',
    name: 'Wearables',
    category: 'SENSORS',
    icon: Watch,
    x: 50,
    y: 9,
    measures: 'Sleep, heart rate, HRV, and daily movement.',
    contributes: 'Adds an ongoing view of activity and recovery patterns.',
  },
  {
    id: 'calorie',
    name: 'Calorie tracking',
    category: 'FOOD LOG',
    icon: Utensils,
    x: 76,
    y: 16,
    measures: 'Meals, portions, energy, and estimated macros.',
    contributes: 'Connects meal timing and food choices with daily routines.',
  },
  {
    id: 'nutritionist',
    name: 'Nutritionists',
    category: 'EXPERT NOTES',
    icon: UserRound,
    x: 89,
    y: 40,
    measures: 'Plans, preferences, and notes you choose to share.',
    contributes: 'Keeps nutrition guidance alongside your broader health context.',
  },
  {
    id: 'trainer',
    name: 'Trainers',
    category: 'COACHING',
    icon: Dumbbell,
    x: 84,
    y: 72,
    measures: 'Training plans, session goals, and coaching notes.',
    contributes: 'Adds the intent behind a workout to activity trends.',
  },
  {
    id: 'lab',
    name: 'Lab reports',
    category: 'HEALTH RECORDS',
    icon: FileText,
    x: 62,
    y: 90,
    measures: 'Values and reference ranges from reports you upload.',
    contributes: 'Makes report results easier to review over time; it does not diagnose.',
  },
  {
    id: 'cycle',
    name: 'Cycle tracking',
    category: 'OPTIONAL CONTEXT',
    icon: Calendar,
    x: 38,
    y: 90,
    measures: 'Cycle dates, phase estimates, and symptoms you record.',
    contributes: 'Adds optional personal context to your own health journal.',
  },
  {
    id: 'journal',
    name: 'Health journals',
    category: 'PERSONAL NOTES',
    icon: BookOpen,
    x: 16,
    y: 72,
    measures: 'Energy, mood, symptoms, and notes you enter.',
    contributes: 'Provides subjective context for patterns you want to explore.',
  },
  {
    id: 'workout',
    name: 'Workout apps',
    category: 'ACTIVITY',
    icon: Activity,
    x: 11,
    y: 40,
    measures: 'Sessions, duration, exercise, and effort you record.',
    contributes: 'Places training activity beside rest and recovery trends.',
  },
  {
    id: 'chatbot',
    name: 'AI chatbots',
    category: 'USER-SHARED',
    icon: Bot,
    x: 24,
    y: 16,
    measures: 'Health conversations or guidance notes you choose to add.',
    contributes: 'Keeps shared advice with your information without claiming a live integration.',
  },
];

export default function FragmentedProblem() {
  const sectionRef = useRef(null);
  const networkRef = useRef(null);
  const [activeSourceId, setActiveSourceId] = useState(HEALTH_SOURCES[0].id);
  const activeSource = HEALTH_SOURCES.find((source) => source.id === activeSourceId) || HEALTH_SOURCES[0];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const network = networkRef.current;
    if (prefersReducedMotion || !network) return undefined;

    const ctx = gsap.context(() => {
      const nodes = gsap.utils.toArray('.health-network-node', network);
      const lines = gsap.utils.toArray('.health-network-line', network);

      gsap.fromTo(nodes,
        { autoAlpha: 0, y: 24, scale: 0.94 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          stagger: 0.055,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: network,
            start: 'top 78%',
            end: 'center 42%',
            scrub: 0.75,
            invalidateOnRefresh: true,
          },
        }
      );

      gsap.fromTo(lines,
        { autoAlpha: 0.08, strokeDashoffset: 48 },
        {
          autoAlpha: 0.76,
          strokeDashoffset: 0,
          stagger: 0.045,
          ease: 'none',
          scrollTrigger: {
            trigger: network,
            start: 'top 76%',
            end: 'center 38%',
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        }
      );

      HEALTH_SOURCES.forEach((source, index) => {
        const node = nodes[index];
        if (!node) return;
        ScrollTrigger.create({
          trigger: node,
          start: 'top 64%',
          end: 'bottom 36%',
          onEnter: () => setActiveSourceId(source.id),
          onEnterBack: () => setActiveSourceId(source.id),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="platform"
      ref={sectionRef}
      className="health-network-section relative w-full border-b border-slate-200/80 bg-slate-50/70 text-slate-900"
    >
      <div className="health-network-content">
        <header className="health-network-heading">
          <span className="health-network-kicker"><HeartPulse className="h-4 w-4" /> THE FRAGMENTED HEALTH PROBLEM</span>
          <h2>Right now, your health lives in <span>nine places that don’t talk to each other.</span></h2>
          <p>Each source sees one part of you. Fitness connects the signals so your health makes more sense together.</p>
        </header>

        <div className="health-network-orbit" ref={networkRef}>
          <svg className="health-network-lines" viewBox="0 0 1000 680" preserveAspectRatio="none" aria-hidden="true">
            {HEALTH_SOURCES.map((source) => {
              const x = source.x * 10;
              const y = source.y * 6.8;
              const curve = source.x < 50 ? -28 : 28;
              const controlX = 500 + ((x - 500) / 2) + curve;
              const controlY = 340 + ((y - 340) / 2);
              return (
                <path
                  className={`health-network-line ${activeSourceId === source.id ? 'is-active' : ''}`}
                  d={`M 500 340 Q ${controlX} ${controlY} ${x} ${y}`}
                  key={source.id}
                />
              );
            })}
          </svg>

          <div className="health-network-hub" aria-label="Fitness intelligence hub">
            <div className="health-network-hub__orbit health-network-hub__orbit--outer" />
            <div className="health-network-hub__orbit health-network-hub__orbit--inner" />
            <span className="health-network-hub__icon"><Sparkles className="h-6 w-6" /></span>
            <strong>FITNESS</strong>
            <small>HEALTH INTELLIGENCE</small>
          </div>

          {HEALTH_SOURCES.map((source, index) => {
            const Icon = source.icon;
            const isActive = activeSourceId === source.id;
            return (
              <button
                className={`health-network-node ${isActive ? 'is-active' : ''}`}
                key={source.id}
                type="button"
                style={{ '--node-x': `${source.x}%`, '--node-y': `${source.y}%`, '--node-order': index }}
                aria-pressed={isActive}
                onMouseEnter={() => setActiveSourceId(source.id)}
                onFocus={() => setActiveSourceId(source.id)}
                onClick={() => setActiveSourceId(source.id)}
              >
                <span className="health-network-node__icon"><Icon className="h-4 w-4" /></span>
                <span className="health-network-node__copy">
                  <small>{source.category}</small>
                  <strong>{source.name}</strong>
                </span>
                <span className="health-network-node__dot" />
              </button>
            );
          })}
        </div>

        <aside className="health-network-insight" aria-live="polite">
          <div className="health-network-insight__source">
            <span>CONNECTED SOURCE</span>
            <strong>{activeSource.name}</strong>
          </div>
          <p><b>Measures</b>{activeSource.measures}</p>
          <p><b>Contributes</b>{activeSource.contributes}</p>
        </aside>

        <p className="health-network-conclusion">
          <span>ONE CONNECTED PICTURE</span>
          Fitness brings your health information together—so the whole story is easier to see.
        </p>
      </div>
    </section>
  );
}

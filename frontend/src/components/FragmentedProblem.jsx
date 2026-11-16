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
    measures: 'Sleep, heart rate, HRV, and daily movement.',
    contributes: 'Adds an ongoing view of activity and recovery patterns.',
  },
  {
    id: 'calorie',
    name: 'Calorie tracking',
    category: 'FOOD LOG',
    icon: Utensils,
    measures: 'Meals, portions, energy, and estimated macros.',
    contributes: 'Connects meal timing and food choices with daily routines.',
  },
  {
    id: 'nutritionist',
    name: 'Nutritionists',
    category: 'EXPERT NOTES',
    icon: UserRound,
    measures: 'Plans, preferences, and notes you choose to share.',
    contributes: 'Keeps nutrition guidance alongside your broader health context.',
  },
  {
    id: 'trainer',
    name: 'Trainers',
    category: 'COACHING',
    icon: Dumbbell,
    measures: 'Training plans, session goals, and coaching notes.',
    contributes: 'Adds the intent behind a workout to activity trends.',
  },
  {
    id: 'lab',
    name: 'Lab reports',
    category: 'HEALTH RECORDS',
    icon: FileText,
    measures: 'Values and reference ranges from reports you upload.',
    contributes: 'Makes report results easier to review over time; it does not diagnose.',
  },
  {
    id: 'cycle',
    name: 'Cycle tracking',
    category: 'OPTIONAL CONTEXT',
    icon: Calendar,
    measures: 'Cycle dates, phase estimates, and symptoms you record.',
    contributes: 'Adds optional personal context to your own health journal.',
  },
  {
    id: 'journal',
    name: 'Health journals',
    category: 'PERSONAL NOTES',
    icon: BookOpen,
    measures: 'Energy, mood, symptoms, and notes you enter.',
    contributes: 'Provides subjective context for patterns you want to explore.',
  },
  {
    id: 'workout',
    name: 'Workout apps',
    category: 'ACTIVITY',
    icon: Activity,
    measures: 'Sessions, duration, exercise, and effort you record.',
    contributes: 'Places training activity beside rest and recovery trends.',
  },
  {
    id: 'chatbot',
    name: 'AI chatbots',
    category: 'USER-SHARED',
    icon: Bot,
    measures: 'Health conversations or guidance notes you choose to add.',
    contributes: 'Keeps shared advice with your information without claiming a live integration.',
  },
];

const ORBIT_CONFIG = {
  center: { x: 500, y: 340 },
  viewBox: { width: 1000, height: 680 },
  orbits: [
    { radiusX: 0.38, radiusY: 0.39, duration: 54, direction: 1, phases: [-90, 45, 180] },
    { radiusX: 0.32, radiusY: 0.32, duration: 54, direction: 1, phases: [-25, 100, 215] },
    { radiusX: 0.24, radiusY: 0.24, duration: 54, direction: 1, phases: [30, 155, 280] },
  ],
};

function positionOrbit(network, nodeRefs, lineRefs, elapsedMs) {
  const { width, height } = network.getBoundingClientRect();
  if (!width || !height) return;

  const { center, viewBox, orbits } = ORBIT_CONFIG;
  HEALTH_SOURCES.forEach((source, index) => {
    const orbitIndex = index % orbits.length;
    const positionIndex = Math.floor(index / orbits.length);
    const orbit = orbits[orbitIndex];
    const phase = orbit.phases[positionIndex] + ((elapsedMs / 1000) / orbit.duration) * 360 * orbit.direction;
    const angle = (phase * Math.PI) / 180;
    const x = center.x + Math.cos(angle) * orbit.radiusX * viewBox.width;
    const y = center.y + Math.sin(angle) * orbit.radiusY * viewBox.height;
    const node = nodeRefs.current.get(source.id);
    const line = lineRefs.current.get(source.id);

    if (node) {
      node.style.setProperty('--orbit-x', `${((x / viewBox.width) - 0.5) * width}px`);
      node.style.setProperty('--orbit-y', `${((y / viewBox.height) - 0.5) * height}px`);
      node.dataset.tooltipPlacement = y / viewBox.height > 0.54 ? 'above' : 'below';
      node.dataset.tooltipAlignment = x / viewBox.width < 0.34 ? 'left' : x / viewBox.width > 0.66 ? 'right' : 'center';
    }

    if (line) {
      const curve = x < center.x ? -26 : 26;
      const controlX = center.x + ((x - center.x) / 2) + curve;
      const controlY = center.y + ((y - center.y) / 2);
      line.setAttribute('d', `M ${center.x} ${center.y} Q ${controlX} ${controlY} ${x} ${y}`);
    }
  });
}

export default function FragmentedProblem() {
  const sectionRef = useRef(null);
  const networkRef = useRef(null);
  const nodeRefs = useRef(new Map());
  const lineRefs = useRef(new Map());
  const [activeSourceId, setActiveSourceId] = useState(HEALTH_SOURCES[0].id);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 767px)').matches);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const activeSource = HEALTH_SOURCES.find((source) => source.id === activeSourceId) || HEALTH_SOURCES[0];

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileLayout = window.matchMedia('(max-width: 767px)');
    const onReducedMotionChange = (event) => setPrefersReducedMotion(event.matches);
    const onMobileLayoutChange = (event) => setIsMobile(event.matches);

    reducedMotion.addEventListener('change', onReducedMotionChange);
    mobileLayout.addEventListener('change', onMobileLayoutChange);
    return () => {
      reducedMotion.removeEventListener('change', onReducedMotionChange);
      mobileLayout.removeEventListener('change', onMobileLayoutChange);
    };
  }, []);

  useEffect(() => {
    const network = networkRef.current;
    if (!network || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.01 },
    );
    observer.observe(network);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const network = networkRef.current;
    if (!network) return undefined;

    const shouldAnimate = isInView && !isMobile && !prefersReducedMotion;
    let startTime = null;
    let frameId;
    let elapsedMs = 0;
    const update = (time) => positionOrbit(network, nodeRefs, lineRefs, time);

    update(0);
    if (shouldAnimate) {
      const tick = (time) => {
        if (startTime === null) startTime = time;
        elapsedMs = time - startTime;
        update(elapsedMs);
        frameId = window.requestAnimationFrame(tick);
      };
      frameId = window.requestAnimationFrame(tick);
    }

    let resizeObserver;
    const onResize = () => update(shouldAnimate ? elapsedMs : 0);
    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(onResize);
      resizeObserver.observe(network);
    } else {
      window.addEventListener('resize', onResize);
    }

    return () => {
      window.cancelAnimationFrame(frameId);
      if (resizeObserver) resizeObserver.disconnect();
      else window.removeEventListener('resize', onResize);
    };
  }, [isInView, isMobile, prefersReducedMotion]);

  useEffect(() => {
    const network = networkRef.current;
    if (prefersReducedMotion || !network) return undefined;

    const ctx = gsap.context(() => {
      const nodes = gsap.utils.toArray('.health-network-node', network);
      const lines = gsap.utils.toArray('.health-network-line', network);

      gsap.fromTo(nodes,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
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
        { autoAlpha: 0.08 },
        {
          autoAlpha: 0.76,
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
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="platform"
      ref={sectionRef}
      className={`health-network-section relative w-full border-b border-slate-200/80 bg-primary-tint text-dark${isInView ? ' is-in-view' : ''}`}
    >
      <div className="health-network-content">
        <header className="health-network-heading">
          <span className="health-network-kicker"><HeartPulse className="h-4 w-4" /> THE FRAGMENTED HEALTH PROBLEM</span>
          <h2>Right now, your health lives in <span>nine places that don’t talk to each other.</span></h2>
          <p>Each source sees one part of you. Fitness connects the signals so your health makes more sense together.</p>
        </header>

        <div className="health-network-orbit" ref={networkRef}>
          <svg className="health-network-lines" viewBox="0 0 1000 680" preserveAspectRatio="none" aria-hidden="true">
            {ORBIT_CONFIG.orbits.map((orbit, index) => (
              <ellipse
                className="health-network-orbit__ring"
                cx={ORBIT_CONFIG.center.x}
                cy={ORBIT_CONFIG.center.y}
                rx={orbit.radiusX * ORBIT_CONFIG.viewBox.width}
                ry={orbit.radiusY * ORBIT_CONFIG.viewBox.height}
                key={`orbit-${index}`}
              />
            ))}
            {HEALTH_SOURCES.map((source) => {
              return (
                <path
                  className={`health-network-line ${activeSourceId === source.id ? 'is-active' : ''}`}
                  d={`M ${ORBIT_CONFIG.center.x} ${ORBIT_CONFIG.center.y} L ${ORBIT_CONFIG.center.x} ${ORBIT_CONFIG.center.y}`}
                  ref={(element) => {
                    if (element) lineRefs.current.set(source.id, element);
                    else lineRefs.current.delete(source.id);
                  }}
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

          {HEALTH_SOURCES.map((source) => {
            const Icon = source.icon;
            const isActive = activeSourceId === source.id;
            return (
              <button
                className={`health-network-node ${isActive ? 'is-active' : ''}`}
                key={source.id}
                ref={(element) => {
                  if (element) nodeRefs.current.set(source.id, element);
                  else nodeRefs.current.delete(source.id);
                }}
                type="button"
                aria-label={`${source.category}: ${source.name}`}
                aria-pressed={isActive}
                aria-describedby={`health-network-tooltip-${source.id}`}
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
                <span
                  className="health-network-tooltip"
                  id={`health-network-tooltip-${source.id}`}
                  role="tooltip"
                >
                  <strong>{source.name}</strong>
                  <span><b>Measures</b>{source.measures}</span>
                  <span><b>Contributes</b>{source.contributes}</span>
                </span>
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

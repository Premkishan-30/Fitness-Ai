import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 9 Isolated Silos matching the Fragmented Health problem
const FRAGMENTED_CARDS = [
  {
    id: 'wearable',
    category: 'WEARABLE',
    dotColor: 'bg-blue-500',
    headline: 'Knows your sleep. Not your food.',
    sub: 'Tracks recovery without context of dietary fuel or inflammation.',
    scatter: { rotate: -4.2, x: -14, y: -10 },
  },
  {
    id: 'calorie',
    category: 'CALORIE TRACKER',
    dotColor: 'bg-amber-500',
    headline: 'Counts calories. Guesses at meals.',
    sub: 'Manual estimate silos disconnected from sleep architecture.',
    scatter: { rotate: 3.2, x: 10, y: 12 },
  },
  {
    id: 'nutritionist',
    category: 'NUTRITIONIST',
    dotColor: 'bg-emerald-600',
    headline: 'Writes a plan. Never sees your sleep.',
    sub: 'Prescribes macros in a vacuum unaware of nightly HRV or cortisol dips.',
    scatter: { rotate: -3.5, x: 16, y: -8 },
  },
  {
    id: 'trainer',
    category: 'TRAINER',
    dotColor: 'bg-orange-500',
    headline: "Programs Monday. Can't see Sunday night.",
    sub: 'Demands max effort when your central nervous system is depleted.',
    scatter: { rotate: 4.0, x: -18, y: 10 },
  },
  {
    id: 'lab',
    category: 'LAB REPORT',
    dotColor: 'bg-indigo-500',
    headline: 'A PDF from January, unread since January.',
    sub: 'Critical biomarker blood metrics locked in an unindexed email attachment.',
    scatter: { rotate: -2.2, x: 8, y: -12 },
  },
  {
    id: 'cycle',
    category: 'CYCLE TRACKER',
    dotColor: 'bg-purple-500',
    headline: 'Predicts your phase. Tells your trainer nothing.',
    sub: 'Hormonal fluctuations hidden from strength programming algorithms.',
    scatter: { rotate: 4.4, x: 14, y: 14 },
  },
  {
    id: 'journal',
    category: 'HEALTH JOURNAL',
    dotColor: 'bg-teal-500',
    headline: 'Notes everything. Connects nothing.',
    sub: 'Subjective notes with zero automated cross-correlation to biometric trends.',
    scatter: { rotate: -4.0, x: -12, y: 8 },
  },
  {
    id: 'workout',
    category: 'WORKOUT APP',
    dotColor: 'bg-rose-500',
    headline: 'Counts your reps. Not your recovery.',
    sub: 'Pushes volume milestones while recovery indices are plummeting.',
    scatter: { rotate: 2.8, x: 12, y: -14 },
  },
  {
    id: 'chatbot',
    category: 'AI CHATBOT',
    dotColor: 'bg-blue-600',
    headline: 'Smart about everything. Blind to you.',
    sub: 'Generic wellness advice with zero access to your actual telemetry history.',
    scatter: { rotate: -2.8, x: -8, y: 10 },
  },
];

export default function FragmentedProblem() {
  const sectionRef = useRef(null);
  const pinContainerRef = useRef(null);
  const cardsRef = useRef([]);
  const [isArranged, setIsArranged] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Set initial scattered positions
      cardsRef.current.forEach((el, index) => {
        if (!el) return;
        const config = FRAGMENTED_CARDS[index].scatter;
        gsap.set(el, {
          rotation: config.rotate,
          x: config.x,
          y: config.y,
          transformOrigin: 'center center',
        });
      });

      // Pin the section while scrolling: first scattered -> then neatly arranged
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=900',
          pin: pinContainerRef.current,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            setIsArranged(self.progress > 0.45);
          },
        },
      });

      // Phase 1: Straighten and arrange all 9 cards into a pristine systematic grid
      tl.to(cardsRef.current, {
        rotation: 0,
        x: 0,
        y: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: 'power2.inOut',
      }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Quick manual toggle for user to test transition
  const toggleArrangement = () => {
    const nextArranged = !isArranged;
    setIsArranged(nextArranged);
    cardsRef.current.forEach((el, index) => {
      if (!el) return;
      if (nextArranged) {
        gsap.to(el, { rotation: 0, x: 0, y: 0, duration: 0.6, ease: 'power2.out' });
      } else {
        const config = FRAGMENTED_CARDS[index].scatter;
        gsap.to(el, { rotation: config.rotate, x: config.x, y: config.y, duration: 0.6, ease: 'power2.out' });
      }
    });
  };

  return (
    <section
      id="platform"
      ref={sectionRef}
      className="relative w-full bg-slate-50/70 text-slate-900 border-b border-slate-200/80 overflow-hidden"
    >
      <div 
        ref={pinContainerRef}
        className="w-full min-h-screen flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative select-none"
      >
        {/* Section Header matching Figma Design */}
        <div className="text-left mb-8 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span>THE FRAGMENTED HEALTH PROBLEM</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Right now, your health lives in nine places that{' '}
            <span className="text-blue-600">don't talk to each other.</span>
          </h2>

          <div className="flex items-center gap-4 mt-4">
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${isArranged ? 'bg-blue-600' : 'bg-amber-500'}`} />
              {isArranged ? 'Arranged systematically into 1 unified system' : 'Scattered across 9 disjointed silos — scroll down to organize'}
            </span>

            <button
              onClick={toggleArrangement}
              type="button"
              className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-700 bg-white hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 border border-slate-200 px-3.5 py-1 rounded-full shadow-xs transition-all"
            >
              <span>{isArranged ? 'Preview Scattered State' : 'Preview Systematic Grid'}</span>
            </button>
          </div>
        </div>

        {/* 3x3 Cards Grid matching Figma Light Theme: First Scattered, then Arranged Systematically */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 my-auto relative z-10">
          {FRAGMENTED_CARDS.map((card, idx) => (
            <div
              key={card.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 relative will-change-transform group"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-2.5 h-2.5 rounded-full ${card.dotColor}`} />
                <span className="text-[11px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                  {card.category}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug mb-1.5 group-hover:text-blue-600 transition-colors">
                {card.headline}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                {card.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

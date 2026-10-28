import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, ArrowRight, Brain, Check, Flame, HeartPulse, Moon, Sparkles, Waves } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  { title: 'Your health, in one view', label: 'OVERVIEW', description: 'See connected signals that matter today, together and without the noise.', icon: Activity, color: '#2563eb', metric: '82', unit: 'health score', benefits: ['One clear daily snapshot', 'Signals connected in context'], useCase: 'Start every morning with a calm, useful read on your body.' },
  { title: 'Sleep and recovery, together', label: 'SLEEP + RECOVERY', description: 'Understand sleep quality, HRV, readiness, and patterns across the week.', icon: Moon, color: '#7c3aed', metric: '84', unit: 'sleep score', benefits: ['Stage-by-stage detail', 'Readiness-led decisions'], useCase: 'Choose the right intensity for how you actually feel.' },
  { title: 'Move, fuel, and progress', label: 'ACTIVITY + NUTRITION', description: 'Turn movement, exercise, calories, hydration, and goals into one plan.', icon: Flame, color: '#ea580c', metric: '8,420', unit: 'steps today', benefits: ['Adaptive daily goals', 'Simple nutrition context'], useCase: 'Build consistency without chasing disconnected numbers.' },
  { title: 'A coach that understands context', label: 'AI COACH', description: 'Ask questions and get practical guidance grounded in your own patterns.', icon: Brain, color: '#4f46e5', metric: '24/7', unit: 'contextual support', benefits: ['Answers from your trends', 'Small steps that stick'], useCase: 'Turn a confusing signal into a practical next action.' },
  { title: 'Everything, connected', label: 'DEVICES + INSIGHTS', description: 'Bring wearables and health data together in one private, useful picture.', icon: Sparkles, color: '#0f766e', metric: '360°', unit: 'health context', benefits: ['One connected system', 'Private by design'], useCase: 'Finish the day knowing what your body is telling you.' },
];

function MiniChart({ color, type = 'line' }) {
  if (type === 'bars') return <div className="mobile-phone__bars">{[38, 58, 42, 76, 52, 88, 66].map((height, i) => <i key={i} style={{ height: `${height}%`, background: i === 5 ? color : `${color}55` }} />)}</div>;
  return <svg className="mobile-phone__chart" viewBox="0 0 240 74" role="img" aria-label="Illustrative trend chart"><path d="M4 62 C 35 56, 42 34, 70 43 S 105 58, 128 33 S 166 40, 188 22 S 220 22, 236 9" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" /><path d="M4 62 C 35 56, 42 34, 70 43 S 105 58, 128 33 S 166 40, 188 22 S 220 22, 236 9 V74 H4Z" fill={`${color}14`} /></svg>;
}

function PhoneScreen({ feature, index }) {
  const Icon = feature.icon;
  return <div className="mobile-phone__screen-ui" style={{ '--feature-color': feature.color }}>
    <div className="mobile-phone__top"><span className="mobile-phone__brand"><span>F</span> FITNESS AI</span><span className="mobile-phone__time">09:41</span><Waves size={14} /></div>
    <div className="mobile-phone__welcome"><span>GOOD MORNING</span><strong>{feature.label.toLowerCase()}</strong></div>
    <div className="mobile-phone__hero-card">
      <div className="mobile-phone__hero-icon"><Icon size={20} /></div>
      <span>{feature.unit}</span>
      <strong>{feature.metric}</strong>
      <small>{index === 0 ? '↑ 8% from last week' : 'Illustrative sample data'}</small>
    </div>
    <div className="mobile-phone__section-title"><span>YOUR INSIGHT</span><Check size={14} /></div>
    <div className="mobile-phone__insight-card"><strong>{feature.title}</strong><p>{feature.description}</p><MiniChart color={feature.color} type={index === 3 || index === 8 ? 'bars' : 'line'} /></div>
    <div className="mobile-phone__tiles"><span><b>{index % 2 ? '7h 42m' : '94%'}</b><small>today</small></span><span><b>{index % 3 ? '+12' : '3'}</b><small>signals</small></span></div>
    <div className="mobile-phone__nav"><Activity size={16} /><HeartPulse size={16} className="is-active" /><Brain size={16} /><Sparkles size={16} /></div>
  </div>;
}

export default function MobileShowcase({ onOpenAuth }) {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const progressRef = useRef({ value: 0 });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return undefined;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 761px) and (prefers-reduced-motion: no-preference)', () => {
      const state = progressRef.current;
      const setFeature = () => {
        const nextIndex = Math.min(FEATURES.length - 1, Math.floor(state.value * FEATURES.length));
        setActiveIndex((current) => current === nextIndex ? current : nextIndex);
      };
      const context = gsap.context(() => {
        gsap.to(state, {
          value: 0.999,
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => `+=${window.innerHeight * FEATURES.length}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.55,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: setFeature,
          },
        });
      }, section);
      return () => context.revert();
    });
    return () => mm.revert();
  }, []);

  const feature = FEATURES[activeIndex];
  const ActiveIcon = feature.icon;
  return <section className="mobile-showcase" id="showcase" ref={sectionRef} aria-label="Fitness AI mobile app showcase">
    <div className="mobile-showcase__intro"><span className="mobile-showcase__kicker"><Sparkles size={13} /> THE COMPLETE FITNESS AI APP</span><h2>One app. <span>Every signal.</span></h2><p>From your first step to your last insight, Fitness AI makes health data easier to use.</p></div>
    <div className="mobile-showcase__pin" ref={pinRef}>
      <div className="mobile-showcase__status"><span><i /> LIVE PRODUCT TOUR</span><b>{String(activeIndex + 1).padStart(2, '0')} <em>/ 05</em></b></div>
      <div className="mobile-showcase__progress"><span style={{ transform: `scaleX(${(activeIndex + 1) / FEATURES.length})` }} /></div>
      <div className="mobile-showcase__layout">
        <div className="mobile-showcase__copy"><span className="mobile-showcase__eyebrow"><ActiveIcon size={16} /> {feature.label}</span><h3>{feature.title}</h3><p>{feature.description}</p><div className="mobile-showcase__benefits">{feature.benefits.map((benefit) => <span key={benefit}><Check size={14} /> {benefit}</span>)}</div><div className="mobile-showcase__usecase"><small>WHY IT MATTERS</small><p>{feature.useCase}</p></div><button type="button" onClick={() => onOpenAuth('signup')}>Build your health picture <ArrowRight size={16} /></button></div>
        <div className="mobile-showcase__phone-wrap"><div className="mobile-showcase__glow" /><div className="mobile-phone"><div className="mobile-phone__bezel" /><div className="mobile-phone__island" /><PhoneScreen key={activeIndex} feature={feature} index={activeIndex} /><div className="mobile-phone__home" /></div></div>
        <div className="mobile-showcase__side"><div className="mobile-showcase__side-card"><span>CONNECTED HEALTH</span><strong>Designed around your day.</strong><p>Clearer signals, better decisions, and a plan that adapts as you do.</p></div><div className="mobile-showcase__steps">{FEATURES.map((item, index) => <button key={item.label} type="button" className={index === activeIndex ? 'is-active' : ''} onClick={() => setActiveIndex(index)} aria-label={`Show ${item.label}`}><i /><span>{String(index + 1).padStart(2, '0')}</span></button>)}</div></div>
      </div>
      <div className="mobile-showcase__footer"><span>SCROLL TO EXPLORE</span><span>PERSONALIZED · PRIVATE · PRACTICAL</span></div>
    </div>
  </section>;
}

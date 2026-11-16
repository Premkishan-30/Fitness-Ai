import { useRef, useState } from 'react';
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { useSmoothScroll } from '../smoothScrollContext';
import MobilePhoneMockup from './MobilePhoneMockup';
import { FEATURES } from './MobileShowcaseData';
import './MobileShowcase.css';

const HYSTERESIS = 0.012;
const MOTION_EASE = [0.22, 1, 0.36, 1];

function StepPill({ index, activeIndex, progress, onSelect }) {
  const fill = useTransform(progress, (value) => (
    Math.min(1, Math.max(0, value * FEATURES.length - index))
  ));

  return (
    <button
      type="button"
      className={index === activeIndex ? 'is-active' : ''}
      onClick={() => onSelect(index)}
      aria-label={`Show step ${String(index + 1).padStart(2, '0')}: ${FEATURES[index].label}`}
      aria-pressed={index === activeIndex}
      aria-current={index === activeIndex ? 'step' : undefined}
    >
      <span>{String(index + 1).padStart(2, '0')}</span>
      <m.i style={{ scaleX: fill }} />
    </button>
  );
}

export default function MobileShowcase({ onOpenAuth }) {
  const scrollRef = useRef(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const { getLenis, scrollTo } = useSmoothScroll();
  const reducedMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
  });
  const phoneRotateY = useTransform(progress, [0, 1], [-4, 4]);
  const phoneY = useTransform(progress, [0, 0.5, 1], [12, -12, 12]);

  useMotionValueEvent(progress, 'change', (value) => {
    const current = activeIndexRef.current;
    const next = Math.min(FEATURES.length - 1, Math.floor(value * FEATURES.length));
    if (next > current && value < (current + 1) / FEATURES.length + HYSTERESIS) return;
    if (next < current && value > current / FEATURES.length - HYSTERESIS) return;
    if (next === current) return;
    activeIndexRef.current = next;
    setActiveIndex(next);
  });

  const selectStep = (index) => {
    const wrapper = scrollRef.current;
    if (!wrapper) return;
    const top = wrapper.getBoundingClientRect().top + window.scrollY;
    const scrollRange = Math.max(0, wrapper.offsetHeight - window.innerHeight);
    const target = top + (scrollRange * (index + 0.5)) / FEATURES.length;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target, { duration: 0.85 });
    else scrollTo(target);
  };

  const feature = FEATURES[activeIndex];
  const ActiveIcon = feature.icon;
  const transition = {
    duration: reducedMotion ? 0.22 : 0.6,
    ease: MOTION_EASE,
  };

  return (
    <LazyMotion features={domAnimation}>
    <section className="mobile-showcase" id="showcase" aria-label="Fitness AI mobile app showcase">
      <div className="mobile-showcase__intro">
        <span className="mobile-showcase__kicker"><Sparkles size={13} /> THE COMPLETE FITNESS AI APP</span>
        <h2>One app. <span>Every signal.</span></h2>
        <p>From your first step to your last insight, Fitness AI makes health data easier to use.</p>
      </div>

      <div className="mobile-showcase__scroll" ref={scrollRef}>
        <div className="mobile-showcase__pin">
          <div className="mobile-showcase__status">
            <span><i /> LIVE PRODUCT TOUR</span>
            <b>{String(activeIndex + 1).padStart(2, '0')} <em>/ 05</em></b>
          </div>
          <div className="mobile-showcase__progress">
            <m.span style={{ scaleX: progress }} />
          </div>

          <div className="mobile-showcase__layout">
            <div className="mobile-showcase__copy">
              <AnimatePresence mode="sync" initial={false}>
                <m.div
                  key={feature.label}
                  className="mobile-showcase__copy-scene"
                  initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reducedMotion ? 0 : -16 }}
                  transition={transition}
                >
                  <span className="mobile-showcase__eyebrow"><ActiveIcon size={16} /> {feature.label}</span>
                  <h3 className="mobile-showcase__copy-title">
                    <span>
                      <m.span
                        initial={{ opacity: 0, y: reducedMotion ? 0 : '100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: reducedMotion ? 0 : '-100%' }}
                        transition={transition}
                      >
                        {feature.title}
                      </m.span>
                    </span>
                  </h3>
                  <p>{feature.description}</p>
                  <div className="mobile-showcase__benefits">
                    {feature.benefits.map((benefit, index) => (
                      <m.span
                        key={benefit}
                        initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          ...transition,
                          delay: reducedMotion ? 0 : index * 0.06,
                        }}
                      >
                        <Check size={14} /> {benefit}
                      </m.span>
                    ))}
                  </div>
                  <div className="mobile-showcase__usecase">
                    <small>WHY IT MATTERS</small>
                    <p>{feature.useCase}</p>
                  </div>
                  <button type="button" onClick={() => onOpenAuth('signup')}>
                    Build your health picture <ArrowRight size={16} />
                  </button>
                </m.div>
              </AnimatePresence>
            </div>

            <m.div
              className="mobile-showcase__phone-wrap"
              style={reducedMotion ? undefined : { rotateY: phoneRotateY, y: phoneY }}
            >
              <div className="mobile-showcase__phone-shadow" aria-hidden="true" />
              <MobilePhoneMockup feature={feature} index={activeIndex} reducedMotion={reducedMotion} />
            </m.div>

            <div className="mobile-showcase__side">
              <AnimatePresence mode="sync" initial={false}>
                <m.div
                  key={feature.useCase}
                  className="mobile-showcase__side-card"
                  initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reducedMotion ? 0 : -12 }}
                  transition={transition}
                >
                  <span>CONNECTED HEALTH</span>
                  <strong>Designed around your day.</strong>
                  <p>{feature.useCase}</p>
                </m.div>
              </AnimatePresence>
              <div className="mobile-showcase__steps" role="group" aria-label="Choose an app feature">
                {FEATURES.map((item, index) => (
                  <StepPill
                    key={item.label}
                    index={index}
                    activeIndex={activeIndex}
                    progress={progress}
                    onSelect={selectStep}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mobile-showcase__footer">
            <span>SCROLL TO EXPLORE</span>
            <span>PERSONALIZED · PRIVATE · PRACTICAL</span>
          </div>
        </div>
      </div>
    </section>
    </LazyMotion>
  );
}

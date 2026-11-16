import { Activity, Brain, Check, HeartPulse, Sparkles, Waves } from 'lucide-react';
import { AnimatePresence, m } from 'framer-motion';
import MiniChart from './MiniChart';
import { OVERVIEW_FEATURE } from './MobileShowcaseData';

function PhoneScreen({ feature, index, reducedMotion }) {
  const Icon = feature.icon;
  const transition = {
    duration: reducedMotion ? 0.2 : 0.5,
    ease: [0.22, 1, 0.36, 1],
  };
  return <m.div
    className="mobile-phone__screen-ui"
    style={{ '--feature-color': feature.color }}
    initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: reducedMotion ? 0 : -16 }}
    transition={transition}
  >
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
  </m.div>;
}

export default function MobilePhoneMockup({
  feature = OVERVIEW_FEATURE,
  index = 0,
  reducedMotion = false,
}) {
  return <div className="mobile-phone">
    <div className="mobile-phone__bezel" />
    <div className="mobile-phone__island" />
    <div className="mobile-phone__screen-stack">
      <AnimatePresence initial={false} mode="sync">
        <PhoneScreen key={index} feature={feature} index={index} reducedMotion={reducedMotion} />
      </AnimatePresence>
    </div>
    <div className="mobile-phone__home" />
  </div>;
}

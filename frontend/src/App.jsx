import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, HeartPulse, Sparkles } from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FragmentedProblem from './components/FragmentedProblem';
import MobileShowcase from './components/MobileShowcase';
import Integrations from './components/Integrations';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import EarlyAccessModal from './components/EarlyAccessModal';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [authModal, setAuthModal] = useState({ open: false, mode: 'signup' });
  const [showIntro, setShowIntro] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const introTimelineRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const timeline = gsap.timeline({
      onComplete: () => setShowIntro(false),
    });
    introTimelineRef.current = timeline;

    timeline
      .fromTo('.site-loader__orbit--outer',
        { scale: 0.55, rotation: -42, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        0
      )
      .fromTo('.site-loader__orbit--inner',
        { scale: 0.7, rotation: 60, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 0.85, ease: 'power3.out' },
        0.08
      )
      .fromTo('.site-loader__mark',
        { scale: 0.6, rotation: -18, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 0.68, ease: 'back.out(1.7)' },
        0.2
      )
      .fromTo('.site-loader__wordmark',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        0.52
      )
      .fromTo('.site-loader__message',
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.42, ease: 'power2.out' },
        0.68
      )
      .to('.site-loader__progress span',
        { scaleX: 1, duration: 0.8, ease: 'power2.inOut' },
        0.65
      )
      .to('.site-loader',
        { autoAlpha: 0, y: -14, duration: 0.58, ease: 'power2.in' },
        1.55
      );

    return () => {
      timeline.kill();
      introTimelineRef.current = null;
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Initialize smooth scrolling with Lenis
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.8,
    });

    // Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after initial paint
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 350);

    return () => {
      clearTimeout(timer);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleOpenAuth = (mode = 'signup') => {
    setAuthModal({ open: true, mode });
  };

  const handleCloseAuth = () => {
    setAuthModal({ open: false, mode: 'signup' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white relative">
      {showIntro && (
        <div className="site-loader" role="status" aria-live="polite" aria-label="Loading Fitness health intelligence">
          <div className="site-loader__glow site-loader__glow--one" />
          <div className="site-loader__glow site-loader__glow--two" />
          <div className="site-loader__content">
            <div className="site-loader__symbol">
              <div className="site-loader__orbit site-loader__orbit--outer"><i /><i /><i /></div>
              <div className="site-loader__orbit site-loader__orbit--inner"><i /><i /></div>
              <div className="site-loader__mark"><HeartPulse className="h-8 w-8" strokeWidth={1.8} /></div>
              <Sparkles className="site-loader__spark site-loader__spark--one" />
              <Activity className="site-loader__spark site-loader__spark--two" />
            </div>
            <div className="site-loader__wordmark">Fitness<span>AI</span></div>
            <p className="site-loader__message">Bringing your health into focus.</p>
            <div className="site-loader__progress"><span /></div>
            <span className="site-loader__caption">CONNECTED HEALTH INTELLIGENCE</span>
          </div>
        </div>
      )}

      <Navbar onOpenAuth={handleOpenAuth} />

      <main className="flex-1 w-full overflow-x-clip">
        <Hero onOpenAuth={handleOpenAuth} />
        <FragmentedProblem />
        <MobileShowcase onOpenAuth={handleOpenAuth} />
        <Integrations onOpenAuth={handleOpenAuth} />
        <CtaSection onOpenAuth={handleOpenAuth} />
      </main>

      <Footer onOpenAuth={handleOpenAuth} />

      <EarlyAccessModal
        isOpen={authModal.open}
        mode={authModal.mode}
        onClose={handleCloseAuth}
      />
    </div>
  );
}

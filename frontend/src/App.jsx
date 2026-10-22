import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FragmentedProblem from './components/FragmentedProblem';
import PinnedShowcase from './components/PinnedShowcase';
import DashboardShowcase from './components/DashboardShowcase';
import AiCoach from './components/AiCoach';
import Integrations from './components/Integrations';
import HowItWorks from './components/HowItWorks';
import ScienceSection from './components/ScienceSection';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import EarlyAccessModal from './components/EarlyAccessModal';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [authModal, setAuthModal] = useState({ open: false, mode: 'signup' });

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
      <Navbar onOpenAuth={handleOpenAuth} />

      <main className="flex-1 w-full overflow-x-hidden">
        <Hero onOpenAuth={handleOpenAuth} />
        <FragmentedProblem />
        <PinnedShowcase onOpenAuth={handleOpenAuth} />
        <DashboardShowcase onOpenAuth={handleOpenAuth} />
        <AiCoach onOpenAuth={handleOpenAuth} />
        <Integrations onOpenAuth={handleOpenAuth} />
        <HowItWorks onOpenAuth={handleOpenAuth} />
        <ScienceSection />
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

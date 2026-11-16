import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

import { useSmoothScroll } from './smoothScrollContext';
import { IntroContext } from './introContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FragmentedProblem from './components/FragmentedProblem';
import MobileShowcase from './components/MobileShowcase';
import Integrations from './components/Integrations';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import EarlyAccessModal from './components/EarlyAccessModal';
import AppWorkspace from './app/AppWorkspace';

gsap.registerPlugin(CustomEase);
CustomEase.create('fitnessIntroWipe', 'M0,0 C0.76,0 0.24,1 1,1');

const INTRO_SESSION_KEY = 'fitness-ai-intro-shown';

function shouldPlayIntro(pathname) {
  if (pathname.startsWith('/app')) return false;
  const forceIntro = new URLSearchParams(window.location.search).get('intro') === '1';
  return forceIntro || import.meta.env.DEV || window.sessionStorage.getItem(INTRO_SESSION_KEY) !== 'true';
}

export default function App() {
  const { scrollTo, setEnabled, startLenis, stopLenis } = useSmoothScroll();
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const [authModal, setAuthModal] = useState({ open: false, mode: 'signup' });
  const [introRequested] = useState(() => shouldPlayIntro(window.location.pathname));
  const [introDone, setIntroDone] = useState(() => !introRequested);
  const [introRevealReady, setIntroRevealReady] = useState(() => !introRequested);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const forceFullMotion = new URLSearchParams(window.location.search).get('motion') === '1';
  const showIntro = introRequested && !introDone && !pathname.startsWith('/app');
  const introCompletionRef = useRef(false);
  const pageRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = (event) => setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    setEnabled(!pathname.startsWith('/app'));
  }, [pathname, setEnabled]);

  const navigate = (path, replace = false) => {
    if (window.location.pathname === path) return;
    if (replace) window.history.replaceState({}, '', path);
    else window.history.pushState({}, '', path);
    setPathname(path);
    scrollTo(0, { immediate: true });
  };

  useEffect(() => {
    if (!showIntro) return undefined;
    stopLenis();
    let revealReady = false;
    const markRevealReady = () => {
      if (revealReady) return;
      revealReady = true;
      setIntroRevealReady(true);
    };
    const completeIntro = () => {
      if (introCompletionRef.current) return;
      introCompletionRef.current = true;
      window.sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
      markRevealReady();
      setIntroDone(true);
      startLenis();
    };
    const timeline = gsap.timeline({ onComplete: completeIntro });
    const revealOnWipe = function revealOnWipe() {
      if (this.progress() >= 0.7) markRevealReady();
    };

    if (prefersReducedMotion && !forceFullMotion) {
      timeline
        .fromTo('.site-loader__mark, .site-loader__wordmark, .site-loader__message',
          { y: 8, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.04 },
          0
        )
        .to('.site-loader', {
          opacity: 0,
          duration: 0.36,
          ease: 'power1.out',
          onUpdate: revealOnWipe,
        }, 0.6);
    } else {
      timeline
        .to('.site-loader__mark path', {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power1.inOut',
        }, 0)
        .fromTo('.site-loader__mark',
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.58, ease: 'power2.out' },
          0.24
        )
        .fromTo('.site-loader__wordmark, .site-loader__message',
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.54, ease: 'power2.out', stagger: 0.08 },
          0.4
        )
        .to('.site-loader', {
          yPercent: -100,
          duration: 0.9,
          ease: 'fitnessIntroWipe',
          onUpdate: revealOnWipe,
        }, 1.2);
    }
    return () => {
      timeline.kill();
      startLenis();
    };
  }, [forceFullMotion, pathname, prefersReducedMotion, showIntro, startLenis, stopLenis]);

  useEffect(() => {
    if (pathname.startsWith('/app') || !introRevealReady) {
      return undefined;
    }
    const reducedMotion = prefersReducedMotion && !forceFullMotion;

    const main = mainRef.current;
    if (!main) return undefined;

    const context = gsap.context(() => {
      const entrance = gsap.timeline();
      entrance
        .fromTo('.site-navbar',
          { autoAlpha: 0, y: reducedMotion ? 0 : -18 },
          { autoAlpha: 1, y: 0, duration: reducedMotion ? 0.35 : 0.64, ease: 'power2.out' },
          0
        )
        .fromTo('.watch-story__title-line-inner',
          { autoAlpha: 0, yPercent: reducedMotion ? 0 : 105 },
          { autoAlpha: 1, yPercent: 0, duration: reducedMotion ? 0.35 : 0.6, stagger: reducedMotion ? 0 : 0.06, ease: 'power3.out' },
          0.06
        )
        .fromTo('.watch-story__eyebrow, .watch-story__description, .watch-story__actions, .watch-story__trust, .watch-story__feature',
          { autoAlpha: 0, y: reducedMotion ? 0 : 16 },
          { autoAlpha: 1, y: 0, duration: reducedMotion ? 0.35 : 0.52, stagger: reducedMotion ? 0 : 0.07, ease: 'power2.out' },
          0.12
        )
        .fromTo('.watch-product',
          { autoAlpha: 0, y: reducedMotion ? 0 : 18 },
          { autoAlpha: 1, y: 0, duration: reducedMotion ? 0.35 : 0.7, ease: 'power2.out' },
          0.26
        );

      gsap.utils.toArray('.health-network-heading, .mobile-showcase__intro, .integrations-minimal__heading')
        .forEach((target) => {
          gsap.fromTo(target,
            { autoAlpha: 0, y: reducedMotion ? 0 : 28 },
            {
              autoAlpha: 1,
              y: 0,
              duration: reducedMotion ? 0.35 : 0.72,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: target,
                start: 'top 86%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });

      gsap.fromTo('.site-footer > div > div',
        { autoAlpha: 0, y: reducedMotion ? 0 : 26 },
        {
          autoAlpha: 1,
          y: 0,
          duration: reducedMotion ? 0.35 : 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.site-footer',
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      if (!reducedMotion) {
        gsap.to('.site-scroll-sheet__wave',
          {
            yPercent: 34,
            scaleY: 1.12,
            rotate: 2,
            ease: 'none',
            scrollTrigger: {
              trigger: main,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    }, pageRef);

    return () => context.revert();
  }, [forceFullMotion, introRevealReady, pathname, prefersReducedMotion]);

  if (pathname.startsWith('/app')) {
    return <AppWorkspace pathname={pathname} onNavigate={navigate} />;
  }

  const handleOpenAuth = (mode = 'signup') => {
    setAuthModal({ open: true, mode });
  };

  const handleCloseAuth = () => {
    setAuthModal({ open: false, mode: 'signup' });
  };

  return (
    <IntroContext.Provider value={{ introDone, introRevealReady }}>
    <div ref={pageRef} className="min-h-screen bg-light-bg text-dark flex flex-col font-sans selection:bg-blue-600 selection:text-white relative">
      {showIntro && (
        <div className="site-loader" role="status" aria-live="polite" aria-label="Loading Fitness health intelligence">
          <div className="site-loader__content">
            <div className="site-loader__mark">
              <svg className="site-loader__pulse-mark" viewBox="0 0 32 32" aria-hidden="true">
                <path pathLength="1" d="M2 16h6l4-9 6 18 4-9h8" />
              </svg>
            </div>
            <div className="site-loader__wordmark">Fitness<span>AI</span></div>
            <p className="site-loader__message">Bringing your health into focus.</p>
          </div>
        </div>
      )}

      <Navbar onOpenAuth={handleOpenAuth} />
      <div className="site-scroll-sheet" aria-hidden="true">
        <svg viewBox="0 0 1440 900" preserveAspectRatio="none">
          <defs>
            <linearGradient id="site-scroll-sheet-gradient" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--btn)" />
            </linearGradient>
          </defs>
          <path
            className="site-scroll-sheet__wave"
            d="M-120 510C180 360 350 680 650 520S1120 360 1560 560L1560 760C1130 600 970 800 650 700S180 560-120 760Z"
          />
        </svg>
      </div>

      <main ref={mainRef} className="flex-1 w-full overflow-x-clip">
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
        onContinue={() => navigate('/app')}
      />
    </div>
    </IntroContext.Provider>
  );
}

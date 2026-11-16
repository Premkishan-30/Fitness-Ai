import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SmoothScrollContext } from './smoothScrollContext';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProvider({ children }) {
  const lenisRef = useRef(null);
  const isStoppedRef = useRef(false);
  const [enabled, setEnabled] = useState(() => !window.location.pathname.startsWith('/app'));
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = (event) => setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (!enabled || prefersReducedMotion) return undefined;

    const lenis = new Lenis({
      lerp: 0.09,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.8,
      prevent: (node) => node.closest('[data-lenis-prevent]') !== null,
    });
    const updateScrollTrigger = () => ScrollTrigger.update();
    const updateLenis = (time) => lenis.raf(time * 1000);

    lenisRef.current = lenis;
    if (isStoppedRef.current) lenis.stop();
    lenis.on('scroll', updateScrollTrigger);
    gsap.ticker.add(updateLenis);

    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 350);
    return () => {
      window.clearTimeout(timer);
      gsap.ticker.remove(updateLenis);
      lenis.off('scroll', updateScrollTrigger);
      if (lenisRef.current === lenis) {
        lenisRef.current = null;
      }
      lenis.destroy();
    };
  }, [enabled, prefersReducedMotion]);

  const stopLenis = useCallback(() => {
    isStoppedRef.current = true;
    lenisRef.current?.stop();
  }, []);

  const startLenis = useCallback(() => {
    isStoppedRef.current = false;
    lenisRef.current?.start();
  }, []);

  const getLenis = useCallback(() => lenisRef.current, []);

  const scrollTo = useCallback((target, options = {}) => {
    const { offset = 0, immediate = false, ...lenisOptions } = options;
    const lenis = lenisRef.current;
    if (lenis && enabled && !prefersReducedMotion) {
      lenis.scrollTo(target, { ...lenisOptions, offset, immediate });
      return;
    }

    const element = typeof target === 'string'
      ? document.querySelector(target)
      : target instanceof Element ? target : null;
    const scrollMarginTop = element
      ? Number.parseFloat(window.getComputedStyle(element).scrollMarginTop) || 0
      : 0;
    const scrollPaddingTop = Number.parseFloat(
      window.getComputedStyle(document.documentElement).scrollPaddingTop
    ) || 0;
    const top = typeof target === 'number'
      ? target
      : element
        ? window.scrollY + element.getBoundingClientRect().top - scrollMarginTop - scrollPaddingTop + offset
        : null;
    if (top === null) return;

    window.scrollTo({
      top: Math.max(0, top),
      behavior: immediate || prefersReducedMotion ? 'auto' : 'smooth',
    });
  }, [enabled, prefersReducedMotion]);

  const value = useMemo(
    () => ({ getLenis, lenisRef, scrollTo, setEnabled, startLenis, stopLenis }),
    [getLenis, scrollTo, setEnabled, startLenis, stopLenis]
  );
  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

import { useEffect, useRef, useState } from 'react';
import { animate } from 'framer-motion';
import { useIntro } from '../introContext';
import './HeroDeviceCarousel.css';

const CAROUSEL_CONFIG = {
  cycleDuration: 8,
  phases: {
    throwEnd: 0.7,
    landingEnd: 2.4,
    floatPeak: 3,
    holdEnd: 3.6,
    tiltLeft: 4.87,
    tiltRight: 6.13,
    tiltEnd: 7.4,
  },
  perspective: 1400,
  layout: {
    compactBreakpoint: 900,
    compactScale: 0.7,
    infoRowHeight: 150,
    cardWidth: 380,
  },
  shadowHeight: 18,
  shadowBlur: 16,
  shadowInsetPercent: 12,
  images: {
    phone: '/devices/phone-mockup.png',
    tablet: '/devices/tablet-mockup.png',
    watch: '/devices/watch-mockup.png',
    laptop: '/devices/laptop-mockup.png',
  },
  deviceCaps: {
    phone: { maxWidth: 330, maxHeightVh: 74, maxHeight: 620, maxWidthPercent: 100, maxHeightPercent: 100 },
    tablet: { maxWidth: 640, maxHeight: 900, maxWidthPercent: 92, maxHeightPercent: 100 },
    watch: { maxWidth: 320, maxHeightVh: 70, maxHeight: 560, maxWidthPercent: 100, maxHeightPercent: 92 },
    laptop: { maxWidth: 720, maxHeight: 500, maxWidthPercent: 100, maxHeightPercent: 100 },
  },
  motion: {
    throwScale: 0.2,
    landingScale: 1.05,
    exitScale: 0.2,
    throwRotateX: 360,
    throwRotateY: 24,
    throwRotateZ: -32,
    exitRotateZ: -12,
    throwDepth: -850,
    exitDepth: -250,
    throwY: 80,
    floatY: 6,
    exitY: 30,
    tiltY: 8,
    shadowScale: 1.08,
    shadowLift: 24,
  },
};

const DEVICE_DETAILS = [
  {
    id: 'phone',
    name: 'Phone',
    eyebrow: 'CONNECTED HEALTH',
    title: 'Your health, in one view',
    description: 'One clear daily snapshot of the signals that matter today.',
  },
  {
    id: 'tablet',
    name: 'Tablet',
    eyebrow: 'WEEKLY TRENDS',
    title: 'See the bigger picture',
    description: 'Sleep, recovery and activity trends side by side.',
  },
  {
    id: 'watch',
    name: 'Watch',
    eyebrow: 'ALL DAY SIGNALS',
    title: 'Always on your wrist',
    description: 'Heart rate, HRV and readiness, updated through your day.',
  },
  {
    id: 'laptop',
    name: 'Laptop',
    eyebrow: 'FULL DASHBOARD',
    title: 'Everything in one place',
    description: 'Connect your apps and export clear reports.',
  },
];

const FRAME_TIMES = [
  0,
  CAROUSEL_CONFIG.phases.throwEnd / CAROUSEL_CONFIG.cycleDuration,
  CAROUSEL_CONFIG.phases.landingEnd / CAROUSEL_CONFIG.cycleDuration,
  CAROUSEL_CONFIG.phases.floatPeak / CAROUSEL_CONFIG.cycleDuration,
  CAROUSEL_CONFIG.phases.holdEnd / CAROUSEL_CONFIG.cycleDuration,
  CAROUSEL_CONFIG.phases.tiltLeft / CAROUSEL_CONFIG.cycleDuration,
  CAROUSEL_CONFIG.phases.tiltRight / CAROUSEL_CONFIG.cycleDuration,
  CAROUSEL_CONFIG.phases.tiltEnd / CAROUSEL_CONFIG.cycleDuration,
  1,
];

const DEVICE_IMAGES = DEVICE_DETAILS.map((device) => ({
  ...device,
  src: CAROUSEL_CONFIG.images[device.id],
}));

function preloadImages() {
  DEVICE_IMAGES.forEach(({ src }) => {
    const image = new Image();
    image.src = src;
  });
}

export default function HeroDeviceCarousel({ heroRef }) {
  const { introDone } = useIntro();
  const [activeIndex, setActiveIndex] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(() => !document.hidden);
  const [isCompact, setIsCompact] = useState(
    () => window.matchMedia(`(max-width: ${CAROUSEL_CONFIG.layout.compactBreakpoint - 1}px)`).matches,
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const deviceRef = useRef(null);
  const shadowRef = useRef(null);
  const copyRef = useRef(null);
  const playbackRef = useRef([]);
  const timerRef = useRef(null);
  const cycleStartedAtRef = useRef(null);
  const remainingMsRef = useRef(CAROUSEL_CONFIG.cycleDuration * 1000);
  const isPlaying = introDone && isInView && !isHovered && !hasFocus && isTabVisible;
  const isPlayingRef = useRef(isPlaying);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    preloadImages();
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.01 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [heroRef]);

  useEffect(() => {
    const onVisibilityChange = () => setIsTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionPreferenceChange = (event) => setPrefersReducedMotion(event.matches);
    motionPreference.addEventListener('change', onMotionPreferenceChange);
    return () => motionPreference.removeEventListener('change', onMotionPreferenceChange);
  }, []);

  useEffect(() => {
    const compactLayout = window.matchMedia(`(max-width: ${CAROUSEL_CONFIG.layout.compactBreakpoint - 1}px)`);
    const onCompactLayoutChange = (event) => setIsCompact(event.matches);
    compactLayout.addEventListener('change', onCompactLayoutChange);
    return () => compactLayout.removeEventListener('change', onCompactLayoutChange);
  }, []);

  useEffect(() => {
    const duration = CAROUSEL_CONFIG.cycleDuration;
    const values = CAROUSEL_CONFIG.motion;
    const baseScale = isCompact ? CAROUSEL_CONFIG.layout.compactScale : 1;
    const noTransform = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const deviceMotion = animate(deviceRef.current, {
      scale: prefersReducedMotion
        ? Array(9).fill(baseScale)
        : [values.throwScale * baseScale, values.landingScale * baseScale, baseScale, baseScale, baseScale, baseScale, baseScale, baseScale, values.exitScale * baseScale],
      rotateX: prefersReducedMotion
        ? noTransform
        : [values.throwRotateX, 0, 0, 0, 0, 0, 0, 0, 0],
      rotateY: prefersReducedMotion
        ? noTransform
        : [values.throwRotateY, 0, 0, 0, 0, -values.tiltY, values.tiltY, 0, 0],
      rotateZ: prefersReducedMotion
        ? noTransform
        : [values.throwRotateZ, 0, 0, 0, 0, 0, 0, 0, values.exitRotateZ],
      z: prefersReducedMotion
        ? noTransform
        : [values.throwDepth, 0, 0, 0, 0, 0, 0, 0, values.exitDepth],
      y: prefersReducedMotion
        ? noTransform
        : [values.throwY, 0, 0, -values.floatY, 0, -values.floatY, values.floatY, 0, values.exitY],
      opacity: prefersReducedMotion
        ? [0, 1, 1, 1, 1, 1, 1, 0, 0]
        : [0, 1, 1, 1, 1, 1, 1, 1, 0],
    }, {
      duration,
      times: FRAME_TIMES,
      ease: prefersReducedMotion
        ? 'linear'
        : ['easeIn', 'easeOut', 'easeInOut', 'easeInOut', 'linear', 'linear', 'easeInOut', 'easeIn'],
      repeat: Infinity,
      repeatType: 'loop',
    });
    const shadowMotion = animate(shadowRef.current, {
      scale: prefersReducedMotion
        ? [1, 1, 1, 1, 1, 1, 1, 1, 1]
        : [values.shadowScale, values.shadowScale, 1, 1, 1, 1, 1, 1, values.shadowScale],
      y: prefersReducedMotion
        ? noTransform
        : [values.shadowLift, 0, 0, 0, 0, 0, 0, 0, values.shadowLift],
      opacity: [0, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0],
    }, {
      duration,
      times: FRAME_TIMES,
      ease: prefersReducedMotion
        ? 'linear'
        : ['easeIn', 'easeOut', 'easeInOut', 'easeInOut', 'linear', 'linear', 'easeInOut', 'easeIn'],
      repeat: Infinity,
      repeatType: 'loop',
    });
    const copyMotion = animate(copyRef.current, {
      opacity: prefersReducedMotion
        ? [0, 1, 1, 1, 1, 1, 0, 0, 0]
        : [0, 0, 0, 1, 1, 1, 1, 0, 0],
    }, {
      duration,
      times: FRAME_TIMES,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop',
    });
    playbackRef.current = [deviceMotion, shadowMotion, copyMotion];

    if (!isPlayingRef.current) playbackRef.current.forEach((playback) => playback.pause());
    return () => playbackRef.current.forEach((playback) => playback.stop());
  }, [activeIndex, cycleKey, isCompact, prefersReducedMotion]);

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current !== null) {
        const elapsed = Date.now() - cycleStartedAtRef.current;
        remainingMsRef.current = Math.max(0, remainingMsRef.current - elapsed);
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
        cycleStartedAtRef.current = null;
      }
      playbackRef.current.forEach((playback) => playback.pause());
      return undefined;
    }

    playbackRef.current.forEach((playback) => playback.play());
    if (timerRef.current === null) {
      cycleStartedAtRef.current = Date.now();
      timerRef.current = window.setTimeout(() => {
        timerRef.current = null;
        cycleStartedAtRef.current = null;
        remainingMsRef.current = CAROUSEL_CONFIG.cycleDuration * 1000;
        setActiveIndex((index) => (index + 1) % DEVICE_IMAGES.length);
      }, Math.max(16, remainingMsRef.current));
    }

    return undefined;
  }, [activeIndex, cycleKey, isPlaying]);

  useEffect(() => () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
  }, []);

  const handleSelect = (index) => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = null;
    cycleStartedAtRef.current = null;
    remainingMsRef.current = CAROUSEL_CONFIG.cycleDuration * 1000;
    setActiveIndex(index);
    setCycleKey((key) => key + 1);
  };

  const device = DEVICE_IMAGES[activeIndex];
  const deviceCaps = CAROUSEL_CONFIG.deviceCaps[device.id];
  const configStyle = {
    '--stage-perspective': `${CAROUSEL_CONFIG.perspective}px`,
    '--stage-info-height': `${CAROUSEL_CONFIG.layout.infoRowHeight}px`,
    '--stage-card-width': `${CAROUSEL_CONFIG.layout.cardWidth}px`,
    '--stage-shadow-height': `${CAROUSEL_CONFIG.shadowHeight}px`,
    '--stage-shadow-blur': `${CAROUSEL_CONFIG.shadowBlur}px`,
    '--stage-shadow-inset': `${CAROUSEL_CONFIG.shadowInsetPercent}%`,
    '--stage-cycle-duration': `${CAROUSEL_CONFIG.cycleDuration}s`,
    '--device-max-width': `${deviceCaps.maxWidthPercent}%`,
    '--device-max-height': `${deviceCaps.maxHeightPercent}%`,
    '--device-max-width-px': `${deviceCaps.maxWidth}px`,
    '--device-max-height-px': `${deviceCaps.maxHeight}px`,
    '--device-max-height-vh': `${deviceCaps.maxHeightVh || 100}svh`,
  };

  return (
    <div
      className={`device-carousel${isPlaying ? '' : ' is-paused'}${isCompact ? ' is-compact' : ''}`}
      style={configStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setHasFocus(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false);
      }}
      aria-label="Fitness AI device carousel"
    >
      <div className={`device-carousel__stage device-carousel__stage--${device.id}`}>
        <div className="device-carousel__scene">
          <div className="device-carousel__shadow" ref={shadowRef} aria-hidden="true" />
          <div className="device-carousel__device" ref={deviceRef}>
            <img
              className={`device-carousel__image device-carousel__image--${device.id}`}
              src={device.src}
              alt={`${device.name} displaying the Fitness AI app`}
              draggable={false}
            />
          </div>
        </div>
        <div className="device-carousel__copy" ref={copyRef}>
          <div className="device-carousel__card">
            <span>{device.eyebrow}</span>
            <strong>{device.title}</strong>
            <p>{device.description}</p>
          </div>
          <div className="device-carousel__steps" aria-label="Choose a device">
            {DEVICE_IMAGES.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={index === activeIndex ? 'is-active' : ''}
                onClick={() => handleSelect(index)}
                aria-label={`Show ${item.name}`}
                aria-pressed={index === activeIndex}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <i key={`${activeIndex}-${cycleKey}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

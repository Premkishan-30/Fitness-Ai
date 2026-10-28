import { Component, lazy, Suspense, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Activity, ArrowRight, Check, ChevronRight, CircleHelp, Heart, ShieldCheck, Sparkles, Watch, X } from 'lucide-react';
import './Hero.css';

const WatchScene = lazy(() => import('./WatchScene'));

const FEATURES = [
  { title: 'Health overview', kicker: 'HEALTH OVERVIEW' },
  { title: 'Sleep intelligence', kicker: 'SLEEP INTELLIGENCE' },
  { title: 'Recovery & activity', kicker: 'RECOVERY & ACTIVITY' },
  { title: 'Nutrition & biomarkers', kicker: 'NUTRITION & BIOMARKERS' },
  { title: 'AI health coach & connect', kicker: 'AI HEALTH COACH' },
];

const FEATURE_STORIES = [
  'Bring sleep, recovery, and activity together in one clear health snapshot.',
  'Explore your sleep score, nightly stages, and trends across the week.',
  'See readiness, HRV, resting heart rate, and movement in the same view.',
  'Keep nutrition and illustrative biomarker trends connected to your daily habits.',
  'Get contextual sample guidance and preview how wearable pairing could work.',
];

const DEVICE_OPTIONS = ['Apple Watch', 'Garmin', 'Fitbit', 'Oura', 'Wear OS'];
const SCREEN_WIDTH = 512;
const SCREEN_HEIGHT = 640;
const DEFAULT_ROTATION = { x: -0.04, y: 0.04 };

function roundedRect(ctx, x, y, width, height, radius, color, stroke) {
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
  ctx.fillStyle = color;
  ctx.fill();
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

function text(ctx, value, x, y, size, color, weight = 500, align = 'left') {
  const readableSize = size * 1.16;
  ctx.font = `${weight} ${readableSize}px "Plus Jakarta Sans", system-ui, sans-serif`;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(value, x, y);
}

function line(ctx, points, color, width = 3) {
  ctx.beginPath();
  points.forEach(([x, y], index) => {
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();
}

function drawHeader(ctx, title, label, time) {
  text(ctx, 'F', 35, 44, 21, '#8ab9ff', 800);
  text(ctx, 'FITNESS AI', 65, 43, 12, '#dce9f8', 700);
  text(ctx, '09:41', 477, 43, 11, '#8999ad', 600, 'right');
  line(ctx, [[35, 62], [477, 62]], 'rgba(177, 201, 230, .13)', 1);
  text(ctx, label.toUpperCase(), 37, 91, 10, '#76aaff', 700);
  text(ctx, title, 37, 126, 23, '#f4f8ff', 700);
  if (time > 0) {
    ctx.beginPath();
    ctx.arc(463, 83, 4 + Math.sin(time * 2) * 1.1, 0, Math.PI * 2);
    ctx.fillStyle = '#50d7ad';
    ctx.fill();
  }
}

function drawMiniChart(ctx, x, y, width, height, color, points, progress = 1) {
  for (let index = 0; index < 3; index += 1) {
    const guideY = y + (height / 2) * index;
    line(ctx, [[x, guideY], [x + width, guideY]], 'rgba(191, 212, 240, .09)', 1);
  }
  const visible = Math.max(2, Math.ceil(points.length * progress));
  const coordinates = points.slice(0, visible).map((value, index) => [
    x + (index / (points.length - 1)) * width,
    y + height - value * height,
  ]);
  if (coordinates.length > 1) line(ctx, coordinates, color, 3);
  const [lastX, lastY] = coordinates[coordinates.length - 1];
  ctx.beginPath();
  ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawRing(ctx, x, y, radius, progress, color, width = 11, reveal = 1) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(191, 212, 240, .13)';
  ctx.lineWidth = width;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x, y, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress * Math.min(1, reveal));
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.stroke();
}

function drawFeatureScreen(ctx, index, transition, time, isScanning) {
  ctx.fillStyle = '#081321';
  ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  const reveal = 1 - ((1 - transition) ** 3);
  ctx.save();
  ctx.globalAlpha = reveal;
  ctx.translate(0, (1 - reveal) * 12);

  if (index === 0) {
    drawHeader(ctx, 'Health overview', 'YOUR HEALTH, CONNECTED', time);
    drawRing(ctx, 256, 245, 76, 0.82, '#63a6ff', 12, reveal);
    drawRing(ctx, 256, 245, 57, 0.73, '#4ed6ae', 9, reveal);
    drawRing(ctx, 256, 245, 38, 0.68, '#efbc70', 8, reveal);
    text(ctx, '82', 256, 251, 38, '#f4f8ff', 800, 'center');
    text(ctx, 'OVERALL HEALTH', 256, 360, 11, '#b8c8dc', 700, 'center');
    const tiles = [
      ['SLEEP', '84', '#a58aff'],
      ['RECOVERY', '86', '#50d7ad'],
      ['ACTIVITY', '74%', '#63a6ff'],
    ];
    tiles.forEach(([label, value, color], tileIndex) => {
      const x = 35 + tileIndex * 150;
      roundedRect(ctx, x, 394, 138, 72, 14, '#101f30', '#1b3046');
      text(ctx, label, x + 12, 418, 9, '#93a7bd', 700);
      text(ctx, value, x + 12, 450, 22, color, 700);
    });
    roundedRect(ctx, 35, 484, 442, 76, 15, '#102139', '#213b58');
    text(ctx, 'Your health, seen as a whole.', 53, 515, 14, '#e1ecf8', 650);
    text(ctx, 'Sleep + recovery + activity', 53, 539, 10, '#8fa4ba', 500);
    text(ctx, 'Illustrative sample data', 256, 590, 9, '#71849a', 500, 'center');
  } else if (index === 1) {
    drawHeader(ctx, 'Sleep intelligence', 'SAMPLE · REST & RECOVERY', time);
    drawRing(ctx, 130, 219, 54, 0.84, '#a58aff', 9, reveal);
    text(ctx, '84', 130, 225, 28, '#f4f8ff', 800, 'center');
    text(ctx, 'SCORE', 130, 245, 9, '#aebed0', 700, 'center');
    text(ctx, '7h 42m', 307, 218, 27, '#e8f0fc', 700);
    text(ctx, 'TOTAL SLEEP', 309, 241, 9, '#92a7bf', 700);
    roundedRect(ctx, 36, 286, 440, 150, 16, '#101f30', '#1c3045');
    text(ctx, 'SLEEP STAGES', 53, 311, 10, '#c6d5e8', 700);
    const stages = [
      { name: 'Awake', mins: 24, color: '#f0b765' },
      { name: 'REM', mins: 96, color: '#987ef4' },
      { name: 'Light', mins: 218, color: '#63a6ff' },
      { name: 'Deep', mins: 124, color: '#43d0aa' },
    ];
    let stageX = 53;
    stages.forEach((stage) => {
      const width = (stage.mins / 462) * 405 * reveal;
      roundedRect(ctx, stageX, 329, width, 11, 5, stage.color);
      stageX += (stage.mins / 462) * 405;
    });
    stages.forEach((stage, stageIndex) => {
      const y = 365 + stageIndex * 15;
      ctx.beginPath();
      ctx.arc(58, y - 4, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = stage.color;
      ctx.fill();
      text(ctx, stage.name, 71, y, 9, '#aebed0', 500);
      text(ctx, `${stage.mins} min`, 456, y, 9, '#e6eff9', 600, 'right');
    });
    roundedRect(ctx, 36, 452, 440, 134, 16, '#101f30', '#1c3045');
    text(ctx, '7-NIGHT SLEEP TREND', 53, 477, 10, '#c6d5e8', 700);
    drawMiniChart(ctx, 55, 489, 399, 62, '#a58aff', [0.42, 0.59, 0.53, 0.75, 0.63, 0.84, 0.77], reveal);
    ['M', 'T', 'W', 'T', 'F', 'S', 'S'].forEach((day, dayIndex) => text(ctx, day, 58 + dayIndex * 65, 573, 8, '#8194aa', 500, 'center'));
  } else if (index === 2) {
    drawHeader(ctx, 'Recovery & activity', 'SAMPLE · DAILY READINESS', time);
    drawRing(ctx, 117, 230, 55, 0.86, '#50d7ad', 10, reveal);
    text(ctx, '86', 117, 236, 29, '#f4f8ff', 800, 'center');
    text(ctx, 'READY', 117, 256, 9, '#aebed0', 700, 'center');
    roundedRect(ctx, 211, 176, 125, 99, 14, '#101f30', '#1c3045');
    text(ctx, 'HRV', 226, 200, 9, '#9bacc0', 700);
    text(ctx, '68', 226, 234, 25, '#65aaff', 700);
    text(ctx, 'ms', 226, 252, 9, '#8194aa', 500);
    roundedRect(ctx, 346, 176, 129, 99, 14, '#101f30', '#1c3045');
    text(ctx, 'RESTING HR', 359, 200, 8, '#9bacc0', 700);
    text(ctx, '54', 359, 234, 25, '#50d7ad', 700);
    text(ctx, 'bpm', 359, 252, 9, '#8194aa', 500);
    roundedRect(ctx, 37, 296, 438, 129, 15, '#101f30', '#1c3045');
    text(ctx, 'MOVEMENT', 54, 323, 10, '#c6d5e8', 700);
    text(ctx, '8,420', 54, 366, 29, '#f4f8ff', 700);
    text(ctx, 'steps', 149, 365, 10, '#91a5bc', 500);
    roundedRect(ctx, 54, 382, 402, 7, 4, '#24354a');
    roundedRect(ctx, 54, 382, 402 * 0.84 * reveal, 7, 4, '#63a6ff');
    text(ctx, '84% of daily movement goal', 54, 409, 9, '#9eafc2', 500);
    roundedRect(ctx, 37, 442, 438, 143, 15, '#101f30', '#1c3045');
    text(ctx, 'EXERCISE · LAST 7 DAYS', 54, 469, 10, '#c6d5e8', 700);
    const columns = [30, 45, 37, 62, 46, 73, 56];
    columns.forEach((height, columnIndex) => {
      const x = 67 + columnIndex * 54;
      roundedRect(ctx, x, 556 - height * reveal, 19, height * reveal, 7, columnIndex === 5 ? '#50d7ad' : '#355879');
      text(ctx, 'MTWTFSS'[columnIndex], x + 9, 573, 8, '#8194aa', 500, 'center');
    });
    text(ctx, 'Illustrative readiness and activity metrics', 256, 603, 8, '#71849a', 500, 'center');
  } else if (index === 3) {
    drawHeader(ctx, 'Nutrition & biomarkers', 'DAILY FUEL · SAMPLE DATA', time);
    roundedRect(ctx, 37, 153, 438, 76, 14, '#101f30', '#1c3045');
    text(ctx, 'ENERGY', 54, 179, 9, '#aebed0', 700);
    text(ctx, '1,840', 54, 211, 25, '#f4f8ff', 700);
    text(ctx, 'kcal', 131, 211, 10, '#91a5bc', 500);
    const nutrients = [
      ['PROTEIN', '82 g', 0.68, '#63a6ff'],
      ['CARBS', '164 g', 0.59, '#a58aff'],
      ['FATS', '61 g', 0.74, '#efbc70'],
    ];
    nutrients.forEach(([label, value, amount, color], nutrientIndex) => {
      const y = 262 + nutrientIndex * 45;
      text(ctx, label, 46, y, 9, '#aebed0', 700);
      text(ctx, value, 465, y, 10, '#eef4fc', 700, 'right');
      roundedRect(ctx, 46, y + 9, 419, 7, 4, '#22344a');
      roundedRect(ctx, 46, y + 9, 419 * amount * reveal, 7, 4, color);
    });
    roundedRect(ctx, 37, 405, 438, 60, 14, '#101f30', '#1c3045');
    text(ctx, 'HYDRATION', 53, 429, 9, '#aebed0', 700);
    text(ctx, '1.8 L', 53, 452, 17, '#d9edff', 700);
    for (let drop = 0; drop < 8; drop += 1) {
      roundedRect(ctx, 201 + drop * 31, 433, 21, 12, 6, drop < 6 ? '#3287d4' : '#203348');
    }
    roundedRect(ctx, 37, 479, 438, 112, 14, '#101f30', '#1c3045');
    text(ctx, 'BIOMARKER TRENDS', 53, 504, 9, '#c6d5e8', 700);
    text(ctx, 'Illustrative · not a diagnosis', 457, 504, 8, '#9bacc0', 500, 'right');
    drawMiniChart(ctx, 55, 517, 400, 48, '#63a6ff', [0.37, 0.49, 0.44, 0.64, 0.57, 0.73, 0.7], reveal);
    ['M', 'T', 'W', 'T', 'F', 'S', 'S'].forEach((day, dayIndex) => text(ctx, day, 58 + dayIndex * 65, 580, 8, '#8194aa', 500, 'center'));
    text(ctx, 'Example wellness visualization · consult a clinician for results', 256, 611, 7, '#71849a', 500, 'center');
  } else {
    drawHeader(ctx, 'AI health coach', 'A SAMPLE CONVERSATION', time);
    roundedRect(ctx, 42, 157, 347, 65, 15, '#13253a', '#213b57');
    text(ctx, 'YOU', 58, 181, 8, '#83b7ff', 700);
    text(ctx, 'How should I approach today?', 58, 205, 11, '#e5eef9', 500);
    roundedRect(ctx, 82, 239, 389, 148, 15, '#10283a', '#21483f');
    text(ctx, 'FITNESS AI · SAMPLE', 99, 264, 8, '#63d2b1', 700);
    text(ctx, 'Your sleep was steadier, and', 99, 294, 11, '#ecf4fb', 500);
    text(ctx, 'you have kept up a consistent', 99, 316, 11, '#ecf4fb', 500);
    text(ctx, 'routine. A comfortable walk', 99, 338, 11, '#ecf4fb', 500);
    text(ctx, 'could fit well today. Listen to', 99, 360, 11, '#ecf4fb', 500);
    text(ctx, 'how you feel, too.', 99, 378, 11, '#ecf4fb', 500);
    roundedRect(ctx, 43, 406, 426, 49, 12, '#101f30', '#1c3045');
    text(ctx, 'PERSONALIZED TO YOUR SAMPLE HEALTH CONTEXT', 59, 435, 8, '#c3d0df', 700);
    roundedRect(ctx, 80, 477, 352, 62, 16, '#2866dc');
    text(ctx, 'CONNECT A DEVICE', 256, 515, 13, '#ffffff', 800, 'center');
    text(ctx, 'DEMO ONLY · NO LIVE DEVICE CONNECTION', 256, 564, 8, '#a9bbd0', 700, 'center');
    text(ctx, 'Choose a wearable in the pairing preview.', 256, 585, 9, '#8194aa', 500, 'center');
  }
  ctx.restore();

  if (isScanning) {
    ctx.fillStyle = 'rgba(5, 14, 26, .92)';
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    ctx.beginPath();
    ctx.arc(256, 249, 57 + Math.sin(time * 3) * 5, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(99, 166, 255, .3)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(256, 249, 37, -Math.PI / 2, -Math.PI / 2 + time % (Math.PI * 2));
    ctx.strokeStyle = '#63a6ff';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.stroke();
    text(ctx, 'DEMO MODE', 256, 349, 10, '#7fb4ff', 700, 'center');
    text(ctx, 'Preparing your', 256, 384, 16, '#eef4fc', 650, 'center');
    text(ctx, 'connection preview…', 256, 410, 16, '#eef4fc', 650, 'center');
    text(ctx, 'No device is being scanned', 256, 455, 10, '#91a5bc', 500, 'center');
  }
}

class WatchErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.error('The 3D watch renderer could not be initialized.', error);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function WatchFallback() {
  return (
    <div className="watch-fallback" role="img" aria-label="Watch screen preview. 3D rendering is unavailable in this browser.">
      <div className="watch-fallback__bezel">
        <div className="watch-fallback__display">
          <span>FITNESS AI</span>
          <strong>HEALTH</strong>
          <i><Watch size={22} /></i>
          <small>3D preview unavailable<br />Please try another browser.</small>
        </div>
      </div>
    </div>
  );
}

function ConnectionModal({ onClose }) {
  const [selectedDevice, setSelectedDevice] = useState('');
  const [pairingState, setPairingState] = useState('idle');
  const [status, setStatus] = useState('Select a device to preview the demo.');
  const timer = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.clearTimeout(timer.current);
    };
  }, [onClose]);

  const startDemo = () => {
    if (!selectedDevice || pairingState === 'scanning') return;
    setPairingState('scanning');
    setStatus(`Previewing a ${selectedDevice} pairing. No device is being scanned.`);
    timer.current = window.setTimeout(() => {
      setPairingState('complete');
      setStatus('Demo complete. No device has been connected.');
    }, 1400);
  };

  return (
    <div className="device-modal-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section
        className="device-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="device-modal-title"
        aria-describedby="device-modal-description"
      >
        <button className="device-modal__close" type="button" onClick={onClose} aria-label="Close device connection demo">
          <X size={19} />
        </button>
        <span className="device-modal__eyebrow"><span /> INTERACTIVE DEMO</span>
        <h2 id="device-modal-title">Your devices, together.</h2>
        <p id="device-modal-description">
          Choose a device to preview the experience. This demo does not connect to a real device or health account.
        </p>
        <div className="device-modal__status" role="status" aria-live="polite">
          {pairingState === 'scanning' ? <span className="device-modal__spinner" /> : <CircleHelp size={17} />}
          <span>{status}</span>
        </div>
        <div className="device-modal__devices" aria-label="Illustrative device options">
          {DEVICE_OPTIONS.map((device, index) => (
            <button
              className={`device-option ${selectedDevice === device ? 'is-selected' : ''}`}
              key={device}
              type="button"
              onClick={() => {
                window.clearTimeout(timer.current);
                setSelectedDevice(device);
                setPairingState('idle');
                setStatus(`${device} selected for the demo. No live connection will be made.`);
              }}
              aria-pressed={selectedDevice === device}
            >
              <span className="device-option__icon">{index === 3 ? <Heart size={20} /> : <Watch size={20} />}</span>
              <span>{device}</span>
              {selectedDevice === device && <Check size={15} />}
            </button>
          ))}
        </div>
        <div className="device-modal__actions">
          <button type="button" className="device-modal__cancel" onClick={onClose}>Cancel</button>
          <button
            type="button"
            className="device-modal__primary"
            onClick={pairingState === 'complete' ? onClose : startDemo}
            disabled={!selectedDevice || pairingState === 'scanning'}
          >
            {pairingState === 'scanning' ? 'Previewing…' : pairingState === 'complete' ? 'Close demo' : 'Preview pairing'}
            {pairingState === 'idle' && <ArrowRight size={16} />}
          </button>
        </div>
        <span className="device-modal__disclaimer">DEMO ONLY · NO DEVICE CONNECTED · NO DATA SHARED</span>
      </section>
    </div>
  );
}

export default function Hero({ onOpenAuth }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isConnectionOpen, setIsConnectionOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const pointer = useRef({
    x: DEFAULT_ROTATION.x,
    y: DEFAULT_ROTATION.y,
    targetX: DEFAULT_ROTATION.x,
    targetY: DEFAULT_ROTATION.y,
    velocityX: 0,
    velocityY: 0,
    isDragging: false,
  });
  const drag = useRef(null);
  const sectionRef = useRef(null);
  const scanTimer = useRef(null);
  const autoTimer = useRef(null);
  const scheduleAutoRef = useRef(() => {});
  const watchVisibleRef = useRef(true);
  const activeRef = useRef(0);
  const stageRef = useRef(null);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener?.('change', updatePreference);
    return () => preference.removeEventListener?.('change', updatePreference);
  }, []);

  // The watch carousel is intentionally independent from page scrolling. It
  // pauses while the document is hidden and is restarted after manual input.
  useEffect(() => {
    const schedule = () => {
      window.clearTimeout(autoTimer.current);
      if (reducedMotion || document.hidden || !watchVisibleRef.current) return;
      autoTimer.current = window.setTimeout(() => {
        if (!document.hidden && watchVisibleRef.current) {
          setActiveIndex((current) => {
            const next = (current + 1) % FEATURES.length;
            activeRef.current = next;
            return next;
          });
        }
        schedule();
      }, 4500);
    };
    scheduleAutoRef.current = schedule;
    const handleVisibility = () => schedule();
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      watchVisibleRef.current = entry.isIntersecting;
      schedule();
    }, { threshold: 0.05 });
    if (sectionRef.current) visibilityObserver.observe(sectionRef.current);
    document.addEventListener('visibilitychange', handleVisibility);
    schedule();
    return () => {
      window.clearTimeout(autoTimer.current);
      visibilityObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      scheduleAutoRef.current = () => {};
    };
  }, [reducedMotion]);

  useEffect(() => () => window.clearTimeout(scanTimer.current), []);

  const selectScreen = (index) => {
    const nextIndex = Math.max(0, Math.min(FEATURES.length - 1, index));
    activeRef.current = nextIndex;
    setActiveIndex(nextIndex);
    scheduleAutoRef.current();
    const section = sectionRef.current;
    if (section) {
      section.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  };

  const openConnectionDemo = () => {
    if (isScanning || isConnectionOpen) return;
    setIsScanning(true);
    scanTimer.current = window.setTimeout(() => {
      setIsScanning(false);
      setIsConnectionOpen(true);
    }, reducedMotion ? 180 : 1450);
  };

  const closeConnectionDemo = () => {
    window.clearTimeout(scanTimer.current);
    setIsConnectionOpen(false);
    setIsScanning(false);
  };

  const handlePointerDown = (event) => {
    if (event.target.closest('button')) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    drag.current = {
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastY: event.clientY,
      moved: 0,
      lastTime: event.timeStamp,
      captureTarget: event.target.closest('canvas') || event.currentTarget,
    };
    pointer.current.isDragging = true;
    pointer.current.velocityX = 0;
    pointer.current.velocityY = 0;
    setIsDragging(true);
    drag.current.captureTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!drag.current) return;
    const state = drag.current;
    const dx = event.clientX - state.lastX;
    const dy = event.clientY - state.lastY;
    const elapsed = Math.max(1, event.timeStamp - state.lastTime);
    state.lastX = event.clientX;
    state.lastY = event.clientY;
    state.lastTime = event.timeStamp;
    state.moved = Math.max(state.moved, Math.hypot(event.clientX - state.startX, event.clientY - state.startY));
    pointer.current.targetY = Math.max(-0.88, Math.min(0.88, pointer.current.targetY + dx * 0.009));
    pointer.current.targetX = Math.max(-0.55, Math.min(0.48, pointer.current.targetX - dy * 0.007));
    pointer.current.velocityY = Math.max(-0.045, Math.min(0.045, (dx * 0.009) / elapsed * 16));
    pointer.current.velocityX = Math.max(-0.035, Math.min(0.035, (-dy * 0.007) / elapsed * 16));
  };

  const handlePointerUp = (event) => {
    if (!drag.current) return;
    const { captureTarget, moved } = drag.current;
    drag.current = null;
    pointer.current.isDragging = false;
    setIsDragging(false);
    if (captureTarget.hasPointerCapture?.(event.pointerId)) {
      captureTarget.releasePointerCapture(event.pointerId);
    }
    if (moved < 8 && captureTarget.tagName !== 'CANVAS' && activeRef.current === FEATURES.length - 1) {
      const bounds = stageRef.current?.getBoundingClientRect();
      if (bounds) {
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;
        if (x >= 0.36 && x <= 0.64 && y >= 0.53 && y <= 0.7) openConnectionDemo();
      }
    }
  };

  const resetRotation = () => {
    pointer.current.targetX = DEFAULT_ROTATION.x;
    pointer.current.targetY = DEFAULT_ROTATION.y;
    pointer.current.velocityX = 0;
    pointer.current.velocityY = 0;
  };

  const handleConnect = () => {
    if (activeRef.current === FEATURES.length - 1) openConnectionDemo();
  };

  const handleExploreClick = () => selectScreen(0);

  const handleKeyboard = (event) => {
    if (event.target.closest('button')) return;
    if (event.key === 'Enter' && activeRef.current === FEATURES.length - 1) {
      event.preventDefault();
      openConnectionDemo();
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      selectScreen(activeRef.current + 1);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      selectScreen(activeRef.current - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      resetRotation();
      selectScreen(0);
    }
  };

  return (
    <section className="watch-experience" id="rail" ref={sectionRef} onKeyDown={handleKeyboard}>
      <div className="watch-experience__ambient" aria-hidden="true" />
      <div className="watch-experience__track">
        <div className="watch-console">
          <div className="watch-story">
            <div className="watch-story__eyebrow">
              <span className="watch-story__pulse" />
              <Sparkles size={15} />
              <span>YOUR PERSONAL HEALTH INTELLIGENCE</span>
            </div>
            <h1 className="watch-story__title">
              Your Health.<br />
              <span>One Connected Picture.</span>
            </h1>
            <p className="watch-story__description">
              Sleep, recovery, nutrition, and activity—understood together, so you can make better decisions about your day.
            </p>
            <div className="watch-story__actions">
              <button type="button" className="watch-story__primary" onClick={() => onOpenAuth('signup')}>
                Get Started <ArrowRight size={16} />
              </button>
              <button type="button" className="watch-story__secondary" onClick={handleExploreClick}>
                Explore the watch <ChevronRight size={16} />
              </button>
            </div>
            <div className="watch-story__trust">
              <span><ShieldCheck size={15} /> Private by design</span>
              <i />
              <span><Activity size={15} /> Your health, in context</span>
            </div>
            <div className="watch-story__feature" key={activeIndex} aria-live="polite">
              <span>{String(activeIndex + 1).padStart(2, '0')} / {FEATURES[activeIndex].kicker}</span>
              <p>{FEATURE_STORIES[activeIndex]}</p>
            </div>
          </div>

          <div className="watch-product">
            <div
              className={`watch-stage ${isDragging ? 'is-dragging' : ''}`}
              ref={stageRef}
              tabIndex={0}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onPointerLeave={handlePointerUp}
              role="region"
              aria-label={`Interactive three-dimensional smartwatch, ${FEATURES[activeIndex].title} screen.${isScanning ? ' Preparing connection demo; no device is being scanned.' : ' Drag to rotate. Press Enter to connect on the final screen.'}`}
            >
              <div className="watch-stage__halo" aria-hidden="true" />
              <WatchErrorBoundary fallback={<div className="watch-stage__fallback"><WatchFallback /></div>}>
                <Suspense fallback={<div className="watch-stage__loading" role="status">Preparing your 3D watch…</div>}>
                  <WatchScene
                    activeIndex={activeIndex}
                    rotation={pointer}
                    reducedMotion={reducedMotion}
                    isScanning={isScanning}
                    drawScreen={drawFeatureScreen}
                    onConnect={handleConnect}
                    fallback={<div className="watch-stage__fallback"><WatchFallback /></div>}
                  />
                </Suspense>
              </WatchErrorBoundary>
              <span className="watch-stage__live-status" role="status" aria-live="polite">
                {isScanning ? 'Preparing your connection demonstration. No device is being scanned.' : ''}
              </span>
            </div>
          </div>
        </div>
      </div>
      {isConnectionOpen && createPortal(<ConnectionModal onClose={closeConnectionDemo} />, document.body)}
    </section>
  );
}

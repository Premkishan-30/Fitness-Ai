import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Activity, ArrowRight, Check, ChevronRight, CircleHelp, Heart, ShieldCheck, Sparkles, Watch, X } from 'lucide-react';
import './Hero.css';

const DEVICE_OPTIONS = ['Apple Watch', 'Garmin', 'Fitbit', 'Oura', 'Wear OS'];
const HeroDeviceCarousel = lazy(() => import('./HeroDeviceCarousel'));

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
    <div className="device-modal-backdrop" data-lenis-prevent onMouseDown={(event) => {
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
  const [isConnectionOpen, setIsConnectionOpen] = useState(false);
  const heroRef = useRef(null);

  return (
    <section className="watch-experience" id="rail" ref={heroRef}>
      <div className="watch-console">
        <div className="watch-story">
          <div className="watch-story__eyebrow">
            <span className="watch-story__pulse" />
            <Sparkles size={15} />
            <span>YOUR PERSONAL HEALTH INTELLIGENCE</span>
          </div>
          <h1 className="watch-story__title">
            <span className="watch-story__title-line"><span className="watch-story__title-line-inner">Every device.</span></span>
            <span className="watch-story__title-line"><span className="watch-story__title-line-inner">One health picture.</span></span>
          </h1>
          <p className="watch-story__description">
            Watches, phones, rings, and tablets, understood together by one AI.
          </p>
          <div className="watch-story__actions">
            <button type="button" className="watch-story__primary" onClick={() => onOpenAuth('signup')}>
              Get Started <ArrowRight size={16} />
            </button>
            <button type="button" className="watch-story__secondary" onClick={() => setIsConnectionOpen(true)}>
              See how it works <ChevronRight size={16} />
            </button>
          </div>
          <div className="watch-story__trust">
            <span><ShieldCheck size={15} /> Private by design</span>
            <i />
            <span><Activity size={15} /> Your health, in context</span>
          </div>
          <div className="watch-story__feature">
            <span>01 / HEALTH OVERVIEW</span>
            <p>Bring sleep, recovery, and activity together in one clear health snapshot.</p>
          </div>
        </div>
        <div className="watch-product">
          <Suspense fallback={<div className="device-stage__fallback" role="img" aria-label="Loading device carousel" />}>
            <HeroDeviceCarousel heroRef={heroRef} />
          </Suspense>
        </div>
      </div>
      {isConnectionOpen && createPortal(
        <ConnectionModal onClose={() => setIsConnectionOpen(false)} />,
        document.body,
      )}
    </section>
  );
}

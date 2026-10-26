import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Activity, Heart, Moon, Watch } from 'lucide-react';

const SmartwatchCanvas = lazy(() => import('./SmartwatchCanvas'));

const WATCH_DETAILS = {
  heart: { title: 'Heart rate', text: 'A resting trend of 58 bpm, shown here as an illustrative wellness metric.' },
  recovery: { title: 'Recovery', text: 'Your recovery view brings sleep and overnight signals together for daily context.' },
  sleep: { title: 'Sleep score', text: 'Review duration and restorative sleep patterns alongside your other health signals.' },
  activity: { title: 'Activity', text: 'See daily movement progress without treating one target as right for everyone.' },
};

function WatchFallback({ onScreenClick, onScreenKeyDown, onPointerDown, onPointerMove, onPointerUp, rotation }) {
  return (
    <div className="watch-fallback" style={{ '--fallback-rotate-x': `${rotation.x}deg`, '--fallback-rotate-y': `${rotation.y}deg` }}>
      <div className="watch-fallback__strap watch-fallback__strap--top" />
      <div className="watch-fallback__strap watch-fallback__strap--bottom" />
      <div className="watch-fallback__case">
        <div
          className="watch-fallback__screen"
          role="button"
          tabIndex={0}
          aria-label="Fitness watch screen. Select to view health metric details."
          onClick={onScreenClick}
          onKeyDown={onScreenKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div className="watch-fallback__status"><span /> FITNESS <span>09:41</span></div>
          <div className="watch-fallback__rings"><i /><i /><i /><b>92</b></div>
          <div className="watch-fallback__trace">⌁⌁⌁⌁⌁⌁</div>
          <div className="watch-fallback__mini"><span>HRV<strong>88</strong></span><span>MOVE<strong>76%</strong></span></div>
        </div>
      </div>
    </div>
  );
}

export default function SmartwatchHeroStage({ animationRef, panelRefs }) {
  const pointer = useRef({ x: 0, y: 0, inertiaX: 0, inertiaY: 0, hover: false, drag: null, lastDragMoved: 0, modelRotation: null });
  const fallbackDrag = useRef(null);
  const skipFallbackClick = useRef(false);
  const fallbackRotation = useRef({ x: 0, y: 0 });
  const [canRender3D, setCanRender3D] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState(null);

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateRenderer = () => {
      const lowPowerDevice = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2)
        || (navigator.deviceMemory && navigator.deviceMemory <= 2);
      setCanRender3D(window.innerWidth > 760 && !motionPreference.matches && !lowPowerDevice);
    };
    updateRenderer();
    window.addEventListener('resize', updateRenderer);
    motionPreference.addEventListener?.('change', updateRenderer);
    return () => {
      window.removeEventListener('resize', updateRenderer);
      motionPreference.removeEventListener?.('change', updateRenderer);
    };
  }, []);

  const handlePointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointer.current.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    pointer.current.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    const drag = pointer.current.drag;
    if (drag) {
      const deltaX = event.clientX - drag.lastX;
      const deltaY = event.clientY - drag.lastY;
      const now = performance.now();
      const elapsed = Math.max(1, now - drag.lastTime);
      drag.velocityX = deltaX / elapsed;
      drag.velocityY = deltaY / elapsed;
      drag.lastX = event.clientX;
      drag.lastY = event.clientY;
      drag.lastTime = now;
      drag.moved = Math.max(drag.moved, Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY));
      pointer.current.lastDragMoved = drag.moved;
      drag.rotationY = Math.max(-0.78, Math.min(0.78, drag.rotationY + deltaX * 0.009));
      drag.rotationX = Math.max(-0.62, Math.min(0.42, drag.rotationX - deltaY * 0.007));
    }
    panelRefs.current.forEach((panel, index) => {
      if (!panel) return;
      const direction = index % 2 === 0 ? 1 : -1;
      panel.style.setProperty('--watch-panel-x', `${pointer.current.x * direction * 7}px`);
      panel.style.setProperty('--watch-panel-y', `${pointer.current.y * direction * 5}px`);
    });
  };

  const resetPointer = () => {
    if (pointer.current.drag) return;
    pointer.current.x = 0;
    pointer.current.y = 0;
    pointer.current.hover = false;
    panelRefs.current.forEach((panel) => {
      panel?.style.setProperty('--watch-panel-x', '0px');
      panel?.style.setProperty('--watch-panel-y', '0px');
    });
  };

  const handleWatchPointerDown = (event) => {
    if (!canRender3D || !event.target.closest('.smartwatch-canvas canvas, .watch-interaction-hitbox')) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    if (x < 0.2 || x > 0.8 || y < 0.18 || y > 0.82) return;
    const rotation = pointer.current.modelRotation || { x: -0.12, y: 0.18 };
    pointer.current.drag = {
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastY: event.clientY,
      rotationX: rotation.x,
      rotationY: rotation.y,
      velocityX: 0,
      velocityY: 0,
      moved: 0,
      lastTime: performance.now(),
    };
    pointer.current.lastDragMoved = 0;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setIsDragging(true);
  };

  const handleWatchPointerUp = (event) => {
    const drag = pointer.current.drag;
    if (!drag) return;
    const wasTap = drag.moved <= 8;
    pointer.current.inertiaY = Math.max(-0.62, Math.min(0.62, (drag.rotationY - 0.18) + drag.velocityX * 0.42));
    pointer.current.inertiaX = Math.max(-0.45, Math.min(0.45, (drag.rotationX + 0.12) - drag.velocityY * 0.34));
    pointer.current.drag = null;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (wasTap) {
      const bounds = event.currentTarget.getBoundingClientRect();
      const y = (event.clientY - bounds.top) / bounds.height;
      if (y >= 0.18 && y <= 0.82) {
        setSelectedMetric(y < 0.37 ? 'sleep' : y < 0.58 ? 'recovery' : y < 0.72 ? 'heart' : 'activity');
      }
    }
  };

  const handleWatchFaceClick = (event) => {
    if (pointer.current.lastDragMoved > 8) {
      pointer.current.lastDragMoved = 0;
      return;
    }
    const bounds = event.currentTarget.closest('.smartwatch-hero-visual').getBoundingClientRect();
    const y = (event.clientY - bounds.top) / bounds.height;
    if (y < 0.18 || y > 0.82) return;
    setSelectedMetric(y < 0.37 ? 'sleep' : y < 0.58 ? 'recovery' : y < 0.72 ? 'heart' : 'activity');
  };

  const handleFallbackPointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    fallbackDrag.current = {
      x: event.clientX,
      y: event.clientY,
      startX: event.clientX,
      startY: event.clientY,
      rotationX: fallbackRotation.current.x,
      rotationY: fallbackRotation.current.y,
      moved: 0,
    };
    setIsDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handleFallbackPointerMove = (event) => {
    if (!fallbackDrag.current) return;
    const drag = fallbackDrag.current;
    drag.moved = Math.max(drag.moved, Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY));
    fallbackRotation.current = {
      x: Math.max(-24, Math.min(24, drag.rotationX - (event.clientY - drag.y) * 0.24)),
      y: Math.max(-28, Math.min(28, drag.rotationY + (event.clientX - drag.x) * 0.24)),
    };
    const watch = event.currentTarget.closest('.smartwatch-hero-visual')?.querySelector('.watch-fallback');
    watch?.style.setProperty('--fallback-rotate-x', `${fallbackRotation.current.x}deg`);
    watch?.style.setProperty('--fallback-rotate-y', `${fallbackRotation.current.y}deg`);
  };

  const handleFallbackPointerUp = (event) => {
    if (!fallbackDrag.current) return;
    skipFallbackClick.current = fallbackDrag.current.moved > 8;
    fallbackDrag.current = null;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    setIsDragging(false);
    fallbackRotation.current = { x: 0, y: 0 };
    const watch = event.currentTarget.closest('.smartwatch-hero-visual')?.querySelector('.watch-fallback');
    watch?.style.setProperty('--fallback-rotate-x', '0deg');
    watch?.style.setProperty('--fallback-rotate-y', '0deg');
  };

  const handleScreenClick = (event) => {
    if (skipFallbackClick.current) {
      skipFallbackClick.current = false;
      return;
    }
    const bounds = event.currentTarget.getBoundingClientRect();
    const y = (event.clientY - bounds.top) / bounds.height;
    setSelectedMetric(y < 0.34 ? 'heart' : y < 0.72 ? 'recovery' : 'activity');
  };

  const handleFallbackKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setSelectedMetric((current) => current === 'recovery' ? 'sleep' : 'recovery');
    }
  };

  const details = {
    heart: ['Heart rate', 'A resting trend of 58 bpm, shown as an illustrative wellness metric.'],
    recovery: ['Recovery', 'Your recovery view brings sleep and overnight signals together for daily context.'],
    sleep: ['Sleep score', 'Review duration and restorative sleep patterns alongside your other health signals.'],
    activity: ['Activity', 'See daily movement progress without treating one target as right for everyone.'],
  };
  const selectedDetail = selectedMetric ? details[selectedMetric] : null;

  const metrics = [
    { id: 'recovery', className: 'watch-metric--recovery', icon: Heart, label: 'RECOVERY', value: <>94<span>%</span></>, note: 'Ready for today' },
    { id: 'sleep', className: 'watch-metric--sleep', icon: Moon, label: 'SLEEP SCORE', value: <>91<span>/100</span></>, note: '7h 52m · restorative' },
    { id: 'heart', className: 'watch-metric--heart', icon: Activity, label: 'HEART RATE', value: <>58<span> bpm</span></>, note: 'Steady resting trend' },
    { id: 'activity', className: 'watch-metric--activity', icon: Watch, label: 'ACTIVITY', value: <>76<span>%</span></>, note: 'Daily rings progressing' },
  ];

  return (
    <div
      className={`smartwatch-hero-visual ${isDragging ? 'is-dragging' : ''}`}
      ref={animationRef}
      data-dragging={isDragging}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => { pointer.current.hover = true; }}
      onPointerLeave={resetPointer}
      onPointerDownCapture={handleWatchPointerDown}
      onPointerUpCapture={handleWatchPointerUp}
      onPointerCancelCapture={handleWatchPointerUp}
    >
      <div className="smartwatch-hero-visual__halo" />
      {canRender3D ? (
        <Suspense fallback={<WatchFallback onScreenClick={handleScreenClick} onScreenKeyDown={handleFallbackKeyDown} onPointerDown={handleFallbackPointerDown} onPointerMove={handleFallbackPointerMove} onPointerUp={handleFallbackPointerUp} rotation={fallbackRotation.current} />}>
          <SmartwatchCanvas pointer={pointer} />
        </Suspense>
      ) : (
        <WatchFallback
          onScreenClick={handleScreenClick}
          onScreenKeyDown={handleFallbackKeyDown}
          onPointerDown={handleFallbackPointerDown}
          onPointerMove={handleFallbackPointerMove}
          onPointerUp={handleFallbackPointerUp}
          rotation={fallbackRotation.current}
        />
      )}

      {canRender3D && (
        <button
          className="watch-interaction-hitbox"
          type="button"
          aria-label="Interactive smartwatch screen. Drag to rotate or tap to inspect a health metric."
          onClick={handleWatchFaceClick}
        />
      )}

      {metrics.map(({ id, className, icon: Icon, label, value, note }, index) => (
        <button
          className={`watch-metric ${className} ${selectedMetric === id ? 'is-selected' : ''}`}
          key={id}
          type="button"
          aria-label={`Show ${label.toLowerCase()} details`}
          onClick={() => setSelectedMetric(id)}
          ref={(element) => { panelRefs.current[index] = element; }}
        >
          <span className="watch-metric__icon"><Icon /></span>
          <span className="watch-metric__label">{label}</span>
          <strong>{value}</strong>
          <small>{note}</small>
        </button>
      ))}

      {selectedDetail && (
        <div className="watch-interaction-detail" role="status" aria-live="polite">
          <div><span>HEALTH SNAPSHOT</span><strong>{selectedDetail[0]}</strong></div>
          <p>{selectedDetail[1]}</p>
          <button type="button" onClick={() => setSelectedMetric(null)} aria-label="Close metric details">×</button>
        </div>
      )}
    </div>
  );
}

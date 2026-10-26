import gsap from 'gsap';

const quickSetters = new WeakMap();

function getSetters(element) {
  let setters = quickSetters.get(element);
  if (!setters) {
    const options = { duration: 0.36, ease: 'power3.out', overwrite: 'auto' };
    setters = {
      rotateX: gsap.quickTo(element, 'rotationX', options),
      rotateY: gsap.quickTo(element, 'rotationY', options),
      z: gsap.quickTo(element, 'z', { ...options, duration: 0.42 }),
    };
    quickSetters.set(element, setters);
  }
  return setters;
}

export function tiltOnPointerMove(event) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (event.pointerType === 'touch') return;

  const element = event.currentTarget;
  const bounds = element.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;
  const setters = getSetters(element);
  setters.rotateX(-y * 5.5);
  setters.rotateY(x * 6.5);
  setters.z(5);
}

export function resetPointerTilt(event) {
  const setters = quickSetters.get(event.currentTarget);
  if (!setters) return;
  setters.rotateX(0);
  setters.rotateY(0);
  setters.z(0);
}

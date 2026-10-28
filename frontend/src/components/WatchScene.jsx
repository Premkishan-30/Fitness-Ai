import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import * as THREE from 'three';

const INITIAL_ROTATION = { x: -0.04, y: 0.04 };
const SCREEN_WIDTH = 512;
const SCREEN_HEIGHT = 640;

function WatchModel({ activeIndex, rotation, reducedMotion, isScanning, drawScreen, onConnect }) {
  const assembly = useRef(null);
  const screen = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    return { texture, context: canvas.getContext('2d') };
  }, []);
  const geometry = useMemo(() => ({
    case: new RoundedBoxGeometry(1.95, 2.22, 0.34, 8, 0.23),
    glass: new RoundedBoxGeometry(1.68, 1.94, 0.035, 8, 0.19),
    strap: new RoundedBoxGeometry(0.94, 1.12, 0.19, 6, 0.18),
    screen: new RoundedBoxGeometry(1.63, 1.9, 0.04, 8, 0.18),
  }), []);
  const transition = useRef({ index: activeIndex, start: 0 });
  const lastDraw = useRef(0);
  const elapsed = useRef(0);

  useEffect(() => () => screen.texture.dispose(), [screen]);

  // The R3F frame loop owns these Three.js mutations; they stay outside React renders.
  // eslint-disable-next-line react-hooks/immutability
  useFrame((_, delta) => {
    if (!assembly.current) return;
    const now = elapsed.current + delta;
    elapsed.current = now;
    if (transition.current.index !== activeIndex) {
      transition.current = { index: activeIndex, start: now };
    }

    if (!rotation.current.isDragging && !reducedMotion) {
      const inertia = Math.exp(-5 * delta);
      // The Three.js frame loop advances the shared pointer target after the drag ends.
      // eslint-disable-next-line react-hooks/immutability
      rotation.current.targetX = THREE.MathUtils.clamp(rotation.current.targetX + rotation.current.velocityX * delta * 60, -0.55, 0.48);
      rotation.current.targetY = THREE.MathUtils.clamp(rotation.current.targetY + rotation.current.velocityY * delta * 60, -0.88, 0.88);
      rotation.current.velocityX *= inertia;
      rotation.current.velocityY *= inertia;
    }
    const targetX = rotation.current.targetX;
    const targetY = rotation.current.targetY;
    if (reducedMotion) {
      assembly.current.rotation.set(targetX, targetY, 0);
    } else {
      assembly.current.rotation.x = THREE.MathUtils.damp(assembly.current.rotation.x, targetX, 6, delta);
      assembly.current.rotation.y = THREE.MathUtils.damp(assembly.current.rotation.y, targetY, 6, delta);
      assembly.current.rotation.z = THREE.MathUtils.damp(
        assembly.current.rotation.z,
        rotation.current.isDragging ? 0 : Math.sin(now * 0.45) * 0.025,
        3,
        delta,
      );
    }
    const drawingProgress = reducedMotion ? 1 : Math.min(1, (now - transition.current.start) / 0.72);
    if (isScanning || drawingProgress < 1 || now - lastDraw.current > 0.075) {
      drawScreen(screen.context, activeIndex, drawingProgress, reducedMotion ? 0 : now, isScanning);
      // Three.js uploads the changed canvas to the GPU on the next render.
      // eslint-disable-next-line react-hooks/immutability
      screen.texture.needsUpdate = true;
      lastDraw.current = now;
    }
  });

  return (
    <group ref={assembly} scale={1.2} rotation={[INITIAL_ROTATION.x, INITIAL_ROTATION.y, -0.01]}>
      <mesh geometry={geometry.strap} position={[0, 1.52, -0.085]} castShadow>
        <meshStandardMaterial color="#26364a" roughness={0.78} metalness={0.12} />
      </mesh>
      <mesh geometry={geometry.strap} position={[0, -1.52, -0.085]} castShadow>
        <meshStandardMaterial color="#26364a" roughness={0.78} metalness={0.12} />
      </mesh>
      {[-1.95, -1.79, -1.63, 1.63, 1.79, 1.95].map((y) => (
        <mesh key={y} position={[0, y, 0.018]}>
          <boxGeometry args={[0.77, 0.018, 0.022]} />
          <meshStandardMaterial color="#56677d" roughness={0.55} metalness={0.28} />
        </mesh>
      ))}
      <mesh position={[0, 1.12, 0.02]} castShadow>
        <torusGeometry args={[0.46, 0.065, 12, 40]} />
        <meshStandardMaterial color="#9aaabd" metalness={0.88} roughness={0.22} />
      </mesh>
      <mesh position={[0, 2.12, -0.025]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.28, 0.035, 10, 36]} />
        <meshStandardMaterial color="#8698ac" metalness={0.82} roughness={0.27} />
      </mesh>

      <mesh geometry={geometry.case} castShadow receiveShadow>
        <meshStandardMaterial color="#aebdcd" metalness={0.91} roughness={0.2} />
      </mesh>
      <mesh position={[1.035, 0.45, -0.015]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.16, 0.16, 0.16, 32]} />
        <meshStandardMaterial color="#9aaabd" metalness={0.95} roughness={0.2} />
      </mesh>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
        <mesh
          key={index}
          position={[1.116, 0.45, -0.11 + index * 0.031]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.164, 0.164, 0.008, 32]} />
          <meshStandardMaterial color="#74869a" metalness={0.88} roughness={0.28} />
        </mesh>
      ))}
      <mesh position={[1.025, -0.14, 0.005]} castShadow>
        <boxGeometry args={[0.12, 0.23, 0.2]} />
        <meshStandardMaterial color="#899bad" metalness={0.89} roughness={0.23} />
      </mesh>
      <mesh geometry={geometry.screen} position={[0, 0, 0.194]}>
        <meshStandardMaterial color="#07111d" roughness={0.18} metalness={0.16} />
      </mesh>
      <mesh
        position={[0, 0, 0.22]}
        onClick={(event) => {
          if (activeIndex !== 4 || isScanning || !event.uv) return;
          const x = event.uv.x * SCREEN_WIDTH;
          const y = (1 - event.uv.y) * SCREEN_HEIGHT;
          if (x >= 80 && x <= 432 && y >= 477 && y <= 539) {
            event.stopPropagation();
            onConnect();
          }
        }}
      >
        <planeGeometry args={[1.58, 1.86]} />
        <meshStandardMaterial
          map={screen.texture}
          emissive="#ffffff"
          emissiveMap={screen.texture}
          emissiveIntensity={0.28}
          roughness={0.22}
          metalness={0.02}
        />
      </mesh>
      <mesh geometry={geometry.glass} position={[0, 0, 0.243]}>
        <meshPhysicalMaterial
          color="#c6e0ff"
          transparent
          opacity={0.13}
          roughness={0.08}
          metalness={0.08}
          clearcoat={1}
          clearcoatRoughness={0.035}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[-0.59, 0.91, 0.254]}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshBasicMaterial color="#63d2b1" />
      </mesh>
    </group>
  );
}

export default function WatchScene({ activeIndex, rotation, reducedMotion, isScanning, drawScreen, onConnect, fallback }) {
  return (
    <Canvas
      className="watch-stage__canvas"
      camera={{ position: [0, 0.03, 5.45], fov: 52 }}
      dpr={[1, 1.4]}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      fallback={fallback}
      aria-label="Three-dimensional Fitness AI smartwatch. Drag to rotate."
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 4, 5]} intensity={2.25} color="#ffffff" />
      <pointLight position={[-3, 1.5, 2.4]} intensity={30} color="#73aaff" />
      <pointLight position={[3, -2, 2]} intensity={18} color="#7be5cb" />
      <spotLight position={[0, 4, 4]} intensity={22} angle={0.58} penumbra={0.72} color="#dceaff" />
      <WatchModel
        activeIndex={activeIndex}
        rotation={rotation}
        reducedMotion={reducedMotion}
        isScanning={isScanning}
        drawScreen={drawScreen}
        onConnect={onConnect}
      />
    </Canvas>
  );
}

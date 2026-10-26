import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import * as THREE from 'three';

function WatchModel({ pointer }) {
  const assembly = useRef(null);
  const pulse = useRef(null);
  const rings = useRef([]);
  const geometry = useMemo(() => ({
    case: new RoundedBoxGeometry(1.9, 2.28, 0.34, 5, 0.25),
    glass: new RoundedBoxGeometry(1.64, 2.0, 0.045, 5, 0.2),
    strap: new RoundedBoxGeometry(1.05, 0.95, 0.18, 4, 0.18),
    strapLoop: new RoundedBoxGeometry(1.1, 0.17, 0.22, 4, 0.075),
    screen: new RoundedBoxGeometry(1.55, 1.9, 0.035, 5, 0.17),
  }), []);
  const traceGeometry = useMemo(() => {
    const segments = 64;
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array((segments + 1) * 3), 3));
    lineGeometry.userData.segments = segments;
    lineGeometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, -0.54, 0.255), 0.8);
    return lineGeometry;
  }, []);

  useFrame((state, delta) => {
    if (!assembly.current) return;
    const drag = pointer.current.drag;
    if (!drag) {
      const decay = Math.exp(-2.4 * delta);
      pointer.current.inertiaX *= decay;
      pointer.current.inertiaY *= decay;
    }

    const rotationY = drag
      ? drag.rotationY
      : 0.18 + pointer.current.x * 0.18 + pointer.current.inertiaY;
    const rotationX = drag
      ? drag.rotationX
      : -0.12 + pointer.current.y * 0.13 + pointer.current.inertiaX;
    assembly.current.rotation.y = THREE.MathUtils.damp(assembly.current.rotation.y, rotationY, 5, delta);
    assembly.current.rotation.x = THREE.MathUtils.damp(assembly.current.rotation.x, rotationX, 5, delta);
    assembly.current.rotation.z = THREE.MathUtils.damp(assembly.current.rotation.z, pointer.current.x * -0.035, 4, delta);
    pointer.current.modelRotation = { x: assembly.current.rotation.x, y: assembly.current.rotation.y };
    const hoverScale = pointer.current.hover ? 1.035 : 1;
    assembly.current.scale.setScalar(THREE.MathUtils.damp(assembly.current.scale.x, hoverScale, 5, delta));
    if (pulse.current) pulse.current.material.opacity = 0.62 + Math.sin(state.clock.elapsedTime * 3.4) * 0.24;

    const position = traceGeometry.attributes.position;
    const segments = traceGeometry.userData.segments;
    const time = state.clock.elapsedTime * 0.76;
    for (let index = 0; index <= segments; index += 1) {
      const progress = index / segments;
      const phase = (progress + time) % 1;
      const spike = Math.exp(-((phase - 0.55) ** 2) / 0.00042) * 0.2
        - Math.exp(-((phase - 0.49) ** 2) / 0.0012) * 0.055;
      const ripple = Math.sin(progress * Math.PI * 12 + time * 8) * 0.012;
      position.setXYZ(index, -0.53 + progress * 1.06, -0.54 + spike + ripple, 0.255);
    }
    position.needsUpdate = true;
    rings.current.forEach((ring, index) => {
      if (ring) ring.rotation.z = Math.sin(state.clock.elapsedTime * 0.45 + index) * 0.035;
    });
  });

  return (
    <group ref={assembly} rotation={[-0.12, 0.18, -0.04]}>
      <mesh geometry={geometry.strap} position={[0, 1.42, -0.07]} castShadow>
        <meshStandardMaterial color="#172235" roughness={0.72} metalness={0.12} />
      </mesh>
      <mesh geometry={geometry.strap} position={[0, -1.42, -0.07]} castShadow>
        <meshStandardMaterial color="#172235" roughness={0.72} metalness={0.12} />
      </mesh>
      {[-1.7, -1.52, 1.52, 1.7].map((y) => (
        <mesh key={y} position={[0, y, 0.025]}>
          <boxGeometry args={[0.86, 0.012, 0.012]} />
          <meshStandardMaterial color="#64748b" roughness={0.65} />
        </mesh>
      ))}
      <mesh geometry={geometry.strapLoop} position={[0, 1.05, 0.06]}>
        <meshStandardMaterial color="#718096" metalness={0.82} roughness={0.24} />
      </mesh>

      <mesh geometry={geometry.case} castShadow receiveShadow>
        <meshStandardMaterial color="#bcc8d7" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0.99, 0.46, -0.015]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.12, 32]} />
        <meshStandardMaterial color="#8795a8" metalness={0.94} roughness={0.18} />
      </mesh>
      <mesh position={[0.99, -0.08, 0.01]}>
        <boxGeometry args={[0.13, 0.22, 0.16]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.86} roughness={0.2} />
      </mesh>

      <mesh geometry={geometry.screen} position={[0, 0, 0.192]}>
        <meshStandardMaterial color="#091321" roughness={0.22} metalness={0.16} />
      </mesh>
      <mesh geometry={geometry.glass} position={[0, 0, 0.222]}>
        <meshPhysicalMaterial color="#9bc5ff" transparent opacity={0.075} roughness={0.08} metalness={0.05} clearcoat={1} clearcoatRoughness={0.04} />
      </mesh>
      <mesh position={[-0.5, 0.77, 0.244]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshBasicMaterial color="#73e3c2" />
      </mesh>
      <mesh position={[0.42, 0.77, 0.244]}>
        <sphereGeometry args={[0.028, 16, 16]} />
        <meshBasicMaterial color="#93c5fd" />
      </mesh>

      <group position={[0, 0.27, 0.245]}>
        <mesh ref={pulse} position={[0, 0.53, 0]}>
          <planeGeometry args={[0.9, 0.04]} />
          <meshBasicMaterial color="#68ddbd" transparent opacity={0.8} />
        </mesh>
        <mesh ref={(element) => { rings.current[0] = element; }} position={[0, 0.15, 0]}>
          <torusGeometry args={[0.45, 0.035, 12, 72]} />
          <meshBasicMaterial color="#223247" />
        </mesh>
        <mesh ref={(element) => { rings.current[1] = element; }} position={[0, 0.15, 0.018]} rotation={[0, 0, Math.PI * 0.1]}>
          <torusGeometry args={[0.45, 0.035, 12, 72, Math.PI * 1.48]} />
          <meshBasicMaterial color="#55a4ff" />
        </mesh>
        <mesh ref={(element) => { rings.current[2] = element; }} position={[0, 0.15, 0.036]} rotation={[0, 0, -Math.PI * 0.36]}>
          <torusGeometry args={[0.33, 0.026, 10, 64, Math.PI * 1.36]} />
          <meshBasicMaterial color="#50d6ad" />
        </mesh>
        <mesh position={[0, 0.15, 0.054]} rotation={[0, 0, Math.PI * 0.48]}>
          <torusGeometry args={[0.21, 0.022, 10, 56, Math.PI * 1.3]} />
          <meshBasicMaterial color="#f4b95e" />
        </mesh>
        <mesh position={[0, 0.15, 0.075]}>
          <sphereGeometry args={[0.055, 20, 20]} />
          <meshBasicMaterial color="#f7fbff" />
        </mesh>
      </group>

      <line geometry={traceGeometry}>
        <lineBasicMaterial color="#57d8b5" linewidth={2} transparent opacity={0.95} />
      </line>
      {[-0.45, 0, 0.45].map((x, index) => (
        <group key={x} position={[x, -0.84, 0.25]}>
          <mesh>
            <boxGeometry args={[0.3, 0.04, 0.012]} />
            <meshBasicMaterial color={index === 0 ? '#58a6ff' : index === 1 ? '#53d7b3' : '#f2bd65'} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function SmartwatchCanvas({ pointer }) {
  return (
    <Canvas
      className="smartwatch-canvas"
      camera={{ position: [0, 0, 6.4], fov: 33 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      shadows
    >
      <ambientLight intensity={1.05} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} color="#ffffff" castShadow />
      <pointLight position={[-3, 1.5, 2.4]} intensity={42} color="#68aaff" />
      <pointLight position={[3, -2, 2]} intensity={22} color="#80e7cf" />
      <spotLight position={[0, 4, 4]} intensity={26} angle={0.55} penumbra={0.7} color="#dceaff" />
      <WatchModel pointer={pointer} />
    </Canvas>
  );
}

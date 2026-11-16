import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer, RoundedBox } from '@react-three/drei';
import { easing } from 'maath';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  Brain,
  FileText,
  HeartPulse,
  LayoutDashboard,
  Link2,
  Moon,
  Share2,
  Sparkles,
  Target,
  TrendingUp,
  Utensils,
} from 'lucide-react';
import * as THREE from 'three';
import './DeviceStage3D.css';

const STAGE_CONFIG = Object.freeze({
  cycleSeconds: 6,
  introSeconds: 1.2,
  featuresAtSeconds: 1.45,
  transitionAtSeconds: 4.75,
  transitionSeconds: 1.25,
  featureStaggerSeconds: 0.25,
  featureEntranceSeconds: 0.42,
  connectorDrawSeconds: 0.45,
  landingPulseSeconds: 0.72,
  landingPulseMaxScale: 2.55,
  landingPulseOpacity: 0.58,
  phoneIntroScale: 1.6,
  incomingStartScale: 0.82,
  outgoingScaleLoss: 0.18,
  introBounceAmplitude: 0.13,
  introBounceCycles: 3,
  introBounceDecay: 5,
  opacityDampingSeconds: 0.16,
  floatPeriodSeconds: 1.9,
  rotationPeriodSeconds: 1.3,
  rotationAmplitude: 0.12,
  devices: ['phone', 'watch', 'tablet', 'laptop'],
  deviceScales: [0.92, 0.9, 0.9, 0.72],
  frontPosition: [0.48, 0.03, 0],
  orbitCenter: [0, 0, -2.5],
  orbitRadiusX: 3,
  orbitRadiusZ: 3.5,
  introPosition: [3.6, -3.1, 6],
  introRotation: [-0.32, 1.22, -0.35],
  damping: 0.24,
  floatAmplitude: 0.08,
  pointerTilt: 0.1,
  shadowY: -1.35,
});

const DEVICE_DETAILS = [
  {
    label: 'Phone',
    features: [
      { icon: HeartPulse, title: 'Daily health score', copy: 'See your signals at a glance.' },
      { icon: Brain, title: 'AI insights in plain words', copy: 'Understand what your patterns mean.' },
      { icon: Target, title: 'Goals and streaks', copy: 'Build momentum with small steps.' },
    ],
  },
  {
    label: 'Watch',
    features: [
      { icon: Activity, title: 'Live heart rate and HRV', copy: 'Keep recovery in view.' },
      { icon: Moon, title: 'Sleep tracking', copy: 'Follow rest across every night.' },
      { icon: Sparkles, title: 'Workout detection', copy: 'Bring movement into context.' },
    ],
  },
  {
    label: 'Tablet',
    features: [
      { icon: TrendingUp, title: 'Weekly trends', copy: 'Spot patterns across your week.' },
      { icon: Utensils, title: 'Nutrition and biomarkers', copy: 'See daily habits side by side.' },
      { icon: FileText, title: 'Coach-ready reports', copy: 'Share a clear health snapshot.' },
    ],
  },
  {
    label: 'Laptop',
    features: [
      { icon: LayoutDashboard, title: 'Full health dashboard', copy: 'Everything in one connected view.' },
      { icon: Link2, title: 'Connect your apps', copy: 'Bring your health tools together.' },
      { icon: Share2, title: 'Export and share', copy: 'Keep your data ready to use.' },
    ],
  },
];

function getPalette() {
  const styles = getComputedStyle(document.documentElement);
  return {
    primary: styles.getPropertyValue('--primary').trim(),
    btn: styles.getPropertyValue('--btn').trim(),
    ink: styles.getPropertyValue('--ink').trim(),
    bg: styles.getPropertyValue('--bg').trim(),
    borderLight: styles.getPropertyValue('--border-light').trim(),
    onDark: styles.getPropertyValue('--on-dark').trim(),
  };
}

function drawRoundedRect(ctx, x, y, width, height, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
  ctx.fill();
}

function drawLabel(ctx, value, x, y, size, color, weight = 600) {
  ctx.fillStyle = color;
  ctx.font = `${weight} ${size}px system-ui, sans-serif`;
  ctx.fillText(value, x, y);
}

function drawScoreRing(ctx, x, y, radius, value, palette, lineWidth = 13) {
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.strokeStyle = palette.borderLight;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = palette.primary;
  ctx.beginPath();
  ctx.arc(x, y, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * value);
  ctx.stroke();
}

function drawChart(ctx, x, y, width, height, palette, values) {
  ctx.lineWidth = 2;
  ctx.strokeStyle = palette.borderLight;
  for (let index = 0; index < 3; index += 1) {
    const guideY = y + (height / 2) * index;
    ctx.beginPath();
    ctx.moveTo(x, guideY);
    ctx.lineTo(x + width, guideY);
    ctx.stroke();
  }
  ctx.beginPath();
  values.forEach((value, index) => {
    const pointX = x + (index / (values.length - 1)) * width;
    const pointY = y + height - value * height;
    if (index === 0) ctx.moveTo(pointX, pointY);
    else ctx.lineTo(pointX, pointY);
  });
  ctx.strokeStyle = palette.primary;
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();
}

function createScreenTexture(device, palette) {
  const dimensions = {
    phone: [512, 1024],
    watch: [512, 600],
    tablet: [1024, 716],
    laptop: [1200, 760],
  }[device];
  const canvas = document.createElement('canvas');
  [canvas.width, canvas.height] = dimensions;
  const context = canvas.getContext('2d');
  if (!context) throw new Error(`Could not create the ${device} screen texture.`);

  context.fillStyle = palette.bg;
  context.fillRect(0, 0, canvas.width, canvas.height);

  if (device === 'phone') {
    drawRoundedRect(context, 180, 34, 152, 34, 17, palette.ink);
    drawLabel(context, 'YOUR HEALTH', 42, 138, 19, palette.btn, 800);
    drawLabel(context, 'Health score', 42, 183, 28, palette.ink, 800);
    drawScoreRing(context, 256, 397, 111, 0.82, palette, 17);
    drawLabel(context, '82', 223, 409, 63, palette.btn, 800);
    drawLabel(context, 'TODAY', 230, 445, 17, palette.ink, 700);
    [
      ['Sleep', 0.84],
      ['Recovery', 0.72],
      ['Activity', 0.91],
    ].forEach(([label, amount], index) => {
      const top = 590 + index * 111;
      drawLabel(context, label, 42, top, 19, palette.ink, 700);
      drawRoundedRect(context, 42, top + 23, 428, 15, 8, palette.borderLight);
      drawRoundedRect(context, 42, top + 23, 428 * amount, 15, 8, palette.primary);
    });
  } else if (device === 'watch') {
    drawLabel(context, 'HEALTH SCORE', 52, 94, 24, palette.btn, 800);
    drawScoreRing(context, 256, 292, 132, 0.82, palette, 24);
    drawLabel(context, '82', 214, 309, 76, palette.btn, 800);
    drawLabel(context, 'TODAY', 218, 350, 21, palette.ink, 700);
    drawRoundedRect(context, 66, 450, 380, 78, 20, palette.onDark);
    drawLabel(context, 'HRV', 92, 497, 20, palette.btn, 700);
    drawLabel(context, '62 ms', 281, 499, 28, palette.ink, 800);
  } else if (device === 'tablet') {
    drawLabel(context, 'WEEKLY HEALTH TRENDS', 64, 96, 27, palette.btn, 800);
    drawLabel(context, 'Your week at a glance', 64, 144, 21, palette.ink, 600);
    drawRoundedRect(context, 56, 184, 912, 426, 26, palette.onDark);
    drawChart(context, 110, 269, 806, 225, palette, [0.26, 0.43, 0.37, 0.62, 0.54, 0.81, 0.73]);
    ['M', 'T', 'W', 'T', 'F', 'S', 'S'].forEach((day, index) => {
      drawLabel(context, day, 105 + index * 132, 548, 17, palette.ink, 600);
    });
  } else {
    drawLabel(context, 'HEALTH DASHBOARD', 54, 74, 24, palette.btn, 800);
    drawLabel(context, 'Your health, connected', 54, 112, 17, palette.ink, 600);
    [
      ['SLEEP', '84'],
      ['RECOVERY', '82'],
      ['ACTIVITY', '76'],
    ].forEach(([label, value], index) => {
      const left = 54 + index * 365;
      drawRoundedRect(context, left, 144, 332, 132, 20, palette.onDark);
      drawLabel(context, label, left + 22, 185, 15, palette.btn, 800);
      drawLabel(context, value, left + 22, 244, 36, palette.ink, 800);
    });
    drawRoundedRect(context, 54, 304, 1092, 382, 22, palette.onDark);
    drawLabel(context, 'WEEKLY SIGNALS', 82, 354, 18, palette.btn, 800);
    drawChart(context, 94, 406, 1008, 205, palette, [0.31, 0.42, 0.39, 0.68, 0.57, 0.84, 0.78]);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function useDeviceMaterials(device) {
  const palette = useMemo(() => getPalette(), []);
  const texture = useMemo(() => createScreenTexture(device, palette), [device, palette]);
  const materials = useMemo(() => ({
    bezel: new THREE.MeshPhysicalMaterial({
      color: palette.ink,
      metalness: 0.8,
      roughness: 0.25,
      clearcoat: 0.42,
      transparent: true,
      depthWrite: false,
    }),
    strap: new THREE.MeshPhysicalMaterial({
      color: palette.btn,
      metalness: 0.32,
      roughness: 0.36,
      transparent: true,
      depthWrite: false,
    }),
    accent: new THREE.MeshPhysicalMaterial({
      color: palette.primary,
      metalness: 0.35,
      roughness: 0.24,
      transparent: true,
      depthWrite: false,
    }),
    screen: new THREE.MeshBasicMaterial({
      map: texture,
      toneMapped: false,
      transparent: true,
      depthWrite: false,
    }),
  }), [palette, texture]);

  useEffect(() => () => {
    Object.values(materials).forEach((material) => material.dispose());
    texture.dispose();
  }, [materials, texture]);

  return materials;
}

function DeviceBody({ device, groupRef }) {
  const materials = useDeviceMaterials(device);
  const strapGeometries = useMemo(() => {
    if (device !== 'watch') return null;
    const upperCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.34, 0),
      new THREE.Vector3(0, 0.5, -0.04),
      new THREE.Vector3(0, 0.72, -0.1),
      new THREE.Vector3(0, 0.89, -0.08),
    ]);
    const lowerCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -0.34, 0),
      new THREE.Vector3(0, -0.5, -0.04),
      new THREE.Vector3(0, -0.72, -0.1),
      new THREE.Vector3(0, -0.89, -0.08),
    ]);
    return [
      new THREE.TubeGeometry(upperCurve, 24, 0.085, 10, false),
      new THREE.TubeGeometry(lowerCurve, 24, 0.085, 10, false),
    ];
  }, [device]);

  const laptopLid = useRef();

  useEffect(() => () => {
    strapGeometries?.forEach((geometry) => geometry.dispose());
  }, [strapGeometries]);

  if (device === 'phone') {
    return (
      <group ref={groupRef}>
        <RoundedBox args={[0.78, 1.6, 0.08]} radius={0.1} smoothness={5} material={materials.bezel} castShadow receiveShadow />
        <mesh position={[0, 0, 0.044]} material={materials.screen}>
          <planeGeometry args={[0.66, 1.44]} />
        </mesh>
        <RoundedBox args={[0.035, 0.19, 0.045]} radius={0.015} smoothness={3} position={[0.405, 0.38, 0]} material={materials.bezel} />
        <RoundedBox args={[0.035, 0.27, 0.045]} radius={0.015} smoothness={3} position={[-0.405, 0.28, 0]} material={materials.bezel} />
        <RoundedBox args={[0.035, 0.16, 0.045]} radius={0.015} smoothness={3} position={[-0.405, -0.05, 0]} material={materials.bezel} />
      </group>
    );
  }

  if (device === 'watch') {
    return (
      <group ref={groupRef}>
        {strapGeometries.map((geometry, index) => (
          <mesh key={index} geometry={geometry} material={materials.strap} castShadow receiveShadow />
        ))}
        <RoundedBox args={[0.7, 0.82, 0.12]} radius={0.15} smoothness={5} material={materials.bezel} castShadow receiveShadow />
        <mesh position={[0, 0, 0.066]} material={materials.screen}>
          <planeGeometry args={[0.57, 0.67]} />
        </mesh>
        <mesh position={[0.39, 0.02, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.accent}>
          <cylinderGeometry args={[0.07, 0.07, 0.13, 20]} />
        </mesh>
      </group>
    );
  }

  if (device === 'tablet') {
    return (
      <group ref={groupRef}>
        <RoundedBox args={[1.5, 1.05, 0.07]} radius={0.08} smoothness={5} material={materials.bezel} castShadow receiveShadow />
        <mesh position={[0, 0, 0.039]} material={materials.screen}>
          <planeGeometry args={[1.37, 0.92]} />
        </mesh>
      </group>
    );
  }

  return (
    <group ref={groupRef}>
      <RoundedBox args={[1.65, 0.08, 1.05]} radius={0.04} smoothness={4} position={[0, -0.53, 0]} material={materials.bezel} castShadow receiveShadow />
      <RoundedBox args={[0.88, 0.018, 0.55]} radius={0.025} smoothness={3} position={[0, -0.478, 0.04]} material={materials.strap} />
      <RoundedBox args={[0.4, 0.018, 0.27]} radius={0.03} smoothness={3} position={[0, -0.477, -0.3]} material={materials.bezel} />
      <group ref={laptopLid} position={[0, -0.48, -0.49]} rotation={[Math.PI / 12, 0, 0]}>
        <RoundedBox args={[1.58, 1.02, 0.07]} radius={0.06} smoothness={5} position={[0, 0.51, 0]} material={materials.bezel} castShadow receiveShadow />
        <mesh position={[0, 0.51, 0.039]} material={materials.screen}>
          <planeGeometry args={[1.43, 0.87]} />
        </mesh>
      </group>
    </group>
  );
}

function setGroupOpacity(group, opacity) {
  group.traverse((object) => {
    if (!object.material) return;
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    materials.forEach((material) => {
      material.opacity = opacity;
    });
  });
}

function StageScene({ activeIndex, cycleKey, reducedMotion, paused, onFeaturesChange, onCycleComplete }) {
  const phoneRef = useRef();
  const watchRef = useRef();
  const tabletRef = useRef();
  const laptopRef = useRef();
  const deviceRefs = [phoneRef, watchRef, tabletRef, laptopRef];
  const elapsedRef = useRef(0);
  const firstIntroRef = useRef(true);
  const introStartedRef = useRef(false);
  const transitionInitializedRef = useRef(false);
  const cycleEndedRef = useRef(false);
  const featuresVisibleRef = useRef(false);
  const pulseRef = useRef();
  const pulseMaterialRef = useRef();
  const invalidate = useThree((state) => state.invalidate);
  const palette = useMemo(() => getPalette(), []);

  const orbitGeometry = useMemo(() => {
    const points = [];
    for (let index = 0; index <= 128; index += 1) {
      const angle = (index / 128) * Math.PI * 2;
      points.push(new THREE.Vector3(
        STAGE_CONFIG.orbitCenter[0] + Math.cos(angle) * STAGE_CONFIG.orbitRadiusX,
        STAGE_CONFIG.shadowY + 0.015,
        STAGE_CONFIG.orbitCenter[2] + Math.sin(angle) * STAGE_CONFIG.orbitRadiusZ,
      ));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  useEffect(() => () => orbitGeometry.dispose(), [orbitGeometry]);

  useEffect(() => {
    elapsedRef.current = 0;
    cycleEndedRef.current = false;
    transitionInitializedRef.current = false;
    featuresVisibleRef.current = false;
    onFeaturesChange(false);
    if (activeIndex !== 0 || cycleKey > 0) firstIntroRef.current = false;
  }, [activeIndex, cycleKey, onFeaturesChange]);

  useEffect(() => {
    if (paused) return undefined;
    invalidate();
    return undefined;
  }, [invalidate, paused]);

  useFrame((state, delta) => {
    const frameDelta = Math.min(delta, 0.05);
    if (!paused) elapsedRef.current += frameDelta;
    const elapsed = elapsedRef.current;
    const transitionProgress = THREE.MathUtils.clamp(
      (elapsed - STAGE_CONFIG.transitionAtSeconds) / STAGE_CONFIG.transitionSeconds,
      0,
      1,
    );
    const transitioning = elapsed >= STAGE_CONFIG.transitionAtSeconds;
    const nextIndex = (activeIndex + 1) % STAGE_CONFIG.devices.length;
    const initialIntro = firstIntroRef.current && activeIndex === 0 && !reducedMotion && elapsed < STAGE_CONFIG.introSeconds;
    const featuresVisible = elapsed >= STAGE_CONFIG.featuresAtSeconds && !transitioning;

    if (featuresVisible !== featuresVisibleRef.current) {
      featuresVisibleRef.current = featuresVisible;
      onFeaturesChange(featuresVisible);
    }

    deviceRefs.forEach((deviceRef, index) => {
      const group = deviceRef.current;
      if (!group) return;
      const outgoing = transitioning && index === activeIndex;
      const incoming = transitioning && index === nextIndex;
      const current = index === activeIndex;
      const visible = current || incoming;
      group.visible = visible;
      if (!visible) return;

      const scale = STAGE_CONFIG.deviceScales[index];
      let position = [...STAGE_CONFIG.frontPosition];
      let rotation = [
        reducedMotion ? 0 : -state.pointer.y * STAGE_CONFIG.pointerTilt,
        reducedMotion ? 0 : state.pointer.x * STAGE_CONFIG.pointerTilt,
        0,
      ];
      let opacity = 1;
      let targetScale = scale;

      if (initialIntro && current) {
        if (!introStartedRef.current) {
          group.position.set(...STAGE_CONFIG.introPosition);
          group.rotation.set(...STAGE_CONFIG.introRotation);
          group.scale.setScalar(scale * STAGE_CONFIG.phoneIntroScale);
          introStartedRef.current = true;
        }
        const progress = THREE.MathUtils.clamp(elapsed / STAGE_CONFIG.introSeconds, 0, 1);
        const bounce = Math.sin(progress * Math.PI * STAGE_CONFIG.introBounceCycles)
          * Math.exp(-progress * STAGE_CONFIG.introBounceDecay)
          * STAGE_CONFIG.introBounceAmplitude;
        position = [STAGE_CONFIG.frontPosition[0] + bounce, STAGE_CONFIG.frontPosition[1] + Math.abs(bounce), 0];
        targetScale = scale * (STAGE_CONFIG.phoneIntroScale - progress * (STAGE_CONFIG.phoneIntroScale - 1));
        rotation = [
          -0.32 * (1 - progress),
          1.22 * (1 - progress) + (reducedMotion ? 0 : state.pointer.x * STAGE_CONFIG.pointerTilt),
          -0.35 * (1 - progress),
        ];
      } else if (outgoing) {
        const angle = (Math.PI / 2) + transitionProgress * (Math.PI / 2);
        position = reducedMotion
          ? [...STAGE_CONFIG.frontPosition]
          : [
            STAGE_CONFIG.orbitCenter[0] + Math.cos(angle) * STAGE_CONFIG.orbitRadiusX,
            STAGE_CONFIG.frontPosition[1] * (1 - transitionProgress),
            STAGE_CONFIG.orbitCenter[2] + Math.sin(angle) * STAGE_CONFIG.orbitRadiusZ,
          ];
        rotation = [0, reducedMotion ? 0 : transitionProgress * Math.PI / 2, 0];
        opacity = 1 - transitionProgress;
        targetScale = scale * (reducedMotion ? 1 : 1 - transitionProgress * STAGE_CONFIG.outgoingScaleLoss);
      } else if (incoming) {
        if (!transitionInitializedRef.current) {
          group.position.set(
            reducedMotion ? STAGE_CONFIG.frontPosition[0] : STAGE_CONFIG.orbitCenter[0] + STAGE_CONFIG.orbitRadiusX,
            STAGE_CONFIG.frontPosition[1],
            reducedMotion ? STAGE_CONFIG.frontPosition[2] : STAGE_CONFIG.orbitCenter[2],
          );
          group.rotation.set(0, reducedMotion ? 0 : Math.PI, 0);
          group.scale.setScalar(scale * (reducedMotion ? 1 : STAGE_CONFIG.incomingStartScale));
          group.userData.opacity = 0;
          setGroupOpacity(group, 0);
          transitionInitializedRef.current = true;
        }
        const angle = transitionProgress * (Math.PI / 2);
        position = [
          reducedMotion
            ? STAGE_CONFIG.frontPosition[0]
            : STAGE_CONFIG.orbitCenter[0] + Math.cos(angle) * STAGE_CONFIG.orbitRadiusX,
          STAGE_CONFIG.frontPosition[1] * transitionProgress,
          reducedMotion
            ? STAGE_CONFIG.frontPosition[2]
            : STAGE_CONFIG.orbitCenter[2] + Math.sin(angle) * STAGE_CONFIG.orbitRadiusZ,
        ];
        rotation = [0, reducedMotion ? 0 : (1 - transitionProgress) * Math.PI, 0];
        opacity = transitionProgress;
        targetScale = scale * (
          reducedMotion
            ? 1
            : STAGE_CONFIG.incomingStartScale + transitionProgress * (1 - STAGE_CONFIG.incomingStartScale)
        );
      } else if (current) {
        if (!reducedMotion) {
          position[1] += Math.sin(elapsed * STAGE_CONFIG.floatPeriodSeconds) * STAGE_CONFIG.floatAmplitude;
          rotation[1] += Math.sin(elapsed * STAGE_CONFIG.rotationPeriodSeconds) * STAGE_CONFIG.rotationAmplitude;
        }
      }

      easing.damp3(group.position, position, STAGE_CONFIG.damping, frameDelta);
      easing.dampE(group.rotation, rotation, STAGE_CONFIG.damping, frameDelta);
      easing.damp3(group.scale, [targetScale, targetScale, targetScale], STAGE_CONFIG.damping, frameDelta);
      if (!Number.isFinite(group.userData.opacity)) group.userData.opacity = 0;
      const currentOpacity = group.userData.opacity ?? 0;
      easing.damp(group.userData, 'opacity', opacity, STAGE_CONFIG.opacityDampingSeconds, frameDelta);
      if (Math.abs(currentOpacity - opacity) > 0.005) setGroupOpacity(group, group.userData.opacity);
    });

    const pulseTime = elapsed - STAGE_CONFIG.introSeconds;
    if (pulseRef.current && pulseMaterialRef.current) {
      const pulseActive = !reducedMotion
        && firstIntroRef.current
        && pulseTime >= 0
        && pulseTime < STAGE_CONFIG.landingPulseSeconds;
      pulseRef.current.visible = pulseActive;
      if (pulseActive) {
        const progress = pulseTime / STAGE_CONFIG.landingPulseSeconds;
        const scale = 0.75 + progress * (STAGE_CONFIG.landingPulseMaxScale - 0.75);
        pulseRef.current.scale.setScalar(scale);
        pulseMaterialRef.current.opacity = (1 - progress) * STAGE_CONFIG.landingPulseOpacity;
      }
    }

    if (elapsed >= STAGE_CONFIG.cycleSeconds && !cycleEndedRef.current) {
      cycleEndedRef.current = true;
      firstIntroRef.current = false;
      onFeaturesChange(false);
      onCycleComplete();
    }
  });

  return (
    <>
      <ambientLight intensity={0.72} />
      <directionalLight position={[3, 5, 6]} intensity={2.2} />
      <directionalLight position={[-4, 2, -2]} intensity={1.1} color={palette.primary} />
      <Suspense fallback={null}>
        <Environment resolution={64} frames={1} background={false}>
          <Lightformer form="rect" color={palette.onDark} intensity={3} position={[0, 4, 2]} scale={[8, 4, 1]} />
          <Lightformer form="rect" color={palette.onDark} intensity={2.5} position={[-4, 1, 1]} scale={[3, 5, 1]} />
          <Lightformer form="rect" color={palette.onDark} intensity={2} position={[4, 1, -2]} scale={[3, 4, 1]} />
        </Environment>
      </Suspense>

      <lineLoop geometry={orbitGeometry}>
        <lineBasicMaterial color={palette.primary} transparent opacity={0.16} />
      </lineLoop>

      {STAGE_CONFIG.devices.map((device, index) => (
        <DeviceBody key={device} device={device} groupRef={deviceRefs[index]} />
      ))}

      <mesh
        ref={pulseRef}
        position={[STAGE_CONFIG.frontPosition[0], STAGE_CONFIG.frontPosition[1], 0.12]}
        visible={false}
      >
        <torusGeometry args={[0.82, 0.012, 8, 64]} />
        <meshBasicMaterial
          ref={pulseMaterialRef}
          color={palette.primary}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>

      <ContactShadows
        position={[0.2, STAGE_CONFIG.shadowY, 0]}
        opacity={0.34}
        scale={4.6}
        blur={2.6}
        far={2.5}
        resolution={256}
        frames={1}
        color={palette.ink}
      />
    </>
  );
}

function FeatureOverlay({ activeIndex, visible, reducedMotion }) {
  const features = DEVICE_DETAILS[activeIndex].features;
  const entrance = reducedMotion
    ? { hidden: { opacity: 0 }, shown: { opacity: 1 } }
    : { hidden: { opacity: 0, scale: 0.86, y: 12 }, shown: { opacity: 1, scale: 1, y: 0 } };
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="device-stage__features"
          key={activeIndex}
          initial="hidden"
          animate="shown"
          exit="hidden"
          variants={{
            hidden: { opacity: 0 },
            shown: {
              opacity: 1,
              transition: { staggerChildren: reducedMotion ? 0 : STAGE_CONFIG.featureStaggerSeconds },
            },
          }}
        >
          <svg className="device-stage__connectors" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <motion.path
              d="M54 38 C44 31 34 24 24 20"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              exit={{ pathLength: 0 }}
              transition={{ duration: reducedMotion ? 0.01 : STAGE_CONFIG.connectorDrawSeconds }}
            />
            <motion.path
              d="M54 50 C44 50 35 50 24 50"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              exit={{ pathLength: 0 }}
              transition={{
                duration: reducedMotion ? 0.01 : STAGE_CONFIG.connectorDrawSeconds,
                delay: reducedMotion ? 0 : STAGE_CONFIG.connectorDrawSeconds * 0.22,
              }}
            />
            <motion.path
              d="M54 62 C44 69 34 77 24 82"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              exit={{ pathLength: 0 }}
              transition={{
                duration: reducedMotion ? 0.01 : STAGE_CONFIG.connectorDrawSeconds,
                delay: reducedMotion ? 0 : STAGE_CONFIG.connectorDrawSeconds * 0.44,
              }}
            />
          </svg>
          {features.map(({ icon: Icon, title, copy }, index) => (
            <motion.article
              className={`device-stage__feature device-stage__feature--${index + 1}`}
              key={title}
              variants={entrance}
              transition={{
                duration: reducedMotion ? 0.01 : STAGE_CONFIG.featureEntranceSeconds,
                ease: [0.2, 0.8, 0.2, 1],
              }}
            >
              <Icon size={17} aria-hidden="true" />
              <span><strong>{title}</strong><small>{copy}</small></span>
            </motion.article>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function DeviceStage3D() {
  const stageRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(true);
  const [tabVisible, setTabVisible] = useState(() => !document.hidden);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const shouldRender = isIntersecting && tabVisible;

  useEffect(() => {
    if (!stageRef.current || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, { threshold: 0.01 });
    observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener?.('change', updatePreference);
    return () => preference.removeEventListener?.('change', updatePreference);
  }, []);

  const advanceDevice = useCallback(() => {
    setActiveIndex((index) => (index + 1) % STAGE_CONFIG.devices.length);
  }, []);

  const selectDevice = (index) => {
    setActiveIndex(index);
    setCycleKey((key) => key + 1);
    setFeaturesVisible(false);
  };

  return (
    <div
      className={`device-stage${reducedMotion ? ' device-stage--reduced' : ''}`}
      ref={stageRef}
      onPointerEnter={() => setIsPaused(true)}
      onPointerLeave={() => setIsPaused(false)}
      aria-label="Interactive 3D health devices"
      role="region"
      style={{ '--cycle-duration': `${STAGE_CONFIG.cycleSeconds}s` }}
    >
      <div className="device-stage__visual">
        <Canvas
          dpr={[1, 1.5]}
          camera={{ fov: 35, position: [0, 0, 7] }}
          frameloop={shouldRender ? 'always' : 'never'}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          onCreated={({ gl }) => gl.setClearAlpha(0)}
        >
          <StageScene
            activeIndex={activeIndex}
            cycleKey={cycleKey}
            reducedMotion={reducedMotion}
            paused={isPaused || !shouldRender}
            onFeaturesChange={setFeaturesVisible}
            onCycleComplete={advanceDevice}
          />
        </Canvas>
      </div>
      <FeatureOverlay activeIndex={activeIndex} visible={featuresVisible} reducedMotion={reducedMotion} />
      <div className="device-stage__controls" role="group" aria-label="Choose a device preview">
        {DEVICE_DETAILS.map((device, index) => (
          <button
            aria-label={`Show ${device.label}`}
            aria-pressed={activeIndex === index}
            className={activeIndex === index ? 'is-active' : ''}
            key={device.label}
            onClick={() => selectDevice(index)}
            type="button"
          >
            <span className="device-stage__dot"><i
              key={`${activeIndex}-${cycleKey}-${index}`}
              style={{ animationPlayState: isPaused || !shouldRender || activeIndex !== index ? 'paused' : 'running' }}
            /></span>
            <span>{device.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

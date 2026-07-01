import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useWorldStore } from '../store/useWorldStore';

// 1. MIDDLE-GROUND CAMERA RIG: Perfect responsive viewport spacing
function CameraRig() {
  const { camera } = useThree();
  const tourTimeline = useWorldStore((state) => state.tourTimeline);
  const activeObject = useWorldStore((state) => state.activeObject);

  const targetPosVec = useRef(new THREE.Vector3(0, 4.5, 11.0)); 
  const targetLookVec = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  const bedroomObjects = [
    { id: 'laptop', pos: [-0.5, 1.2, 5.0] },
    { id: 'books', pos: [0.5, 1.0, 5.0] },
    { id: 'basketball', pos: [0.6, -0.2, 5.5] },
    { id: 'mirror', pos: [-1.0, 1.2, 4.5] },
    { id: 'telescope', pos: [0.0, 1.5, 4.0] }
  ];

  useFrame(() => {
    if (tourTimeline === 'BEDROOM_PAN') {
      const currentItem = bedroomObjects.find(o => o.id === activeObject);
      if (currentItem) {
        targetPosVec.current.set(currentItem.pos[0], currentItem.pos[1], currentItem.pos[2]);
      }
    } else {
      targetPosVec.current.set(0, 4.0, 10.5);
    }

    camera.position.lerp(targetPosVec.current, 0.04);
    currentLookAt.current.lerp(targetLookVec.current, 0.04);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

// 2. STABLE 3D GLB BUTTERFLY CONTROLLER (Safe from missing animation crashes)
function Real3DButterfly() {
  const modelRef = useRef();
  const tourTimeline = useWorldStore((state) => state.tourTimeline);

  // Load the butterfly file from your public directory
  const { scene } = useGLTF('/assets/models/butterfly.glb');

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!modelRef.current) return;

    // Organic wing flap: Since the model doesn't have bones, 
    // we scale the model's width using a rapid cosine loop to create a beautiful wing-beat illusion!
    const baseFlap = Math.cos(t * 28);
    modelRef.current.scale.x = (0.7 + baseFlap * 0.3) * 6.0; // Scaled up by 6.0 so it isn't microscopic!

    // Flight paths around your wireframe island sphere boundary
    if (tourTimeline === 'BUTTERFLY_WAKE' || tourTimeline === 'TV_INTRO') {
      const radius = 3.8; 
      modelRef.current.position.set(
        Math.sin(t * 1.8) * radius, 
        Math.sin(t * 2.5) * 0.4 + 0.2, 
        Math.cos(t * 1.8) * radius
      );
      // Face towards direction of flight path
      modelRef.current.rotation.y = -(t * 1.8) + Math.PI;
    } else {
      // Idle room hovering properties
      modelRef.current.position.set(0, Math.sin(t * 2) * 0.1 + 1.0, 0);
      modelRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <primitive 
      ref={modelRef} 
      object={scene} 
      scale={[6.0, 6.0, 6.0]} // Enlarge the tiny mesh structure to be visible
    />
  );
}

// Preload to ensure smooth site initialization transitions
useGLTF.preload('/assets/models/butterfly.glb');

// 3. CORE MAP GRID PIPELINE
function CoreWorldMap() {
  const worldRef = useRef();
  const tourTimeline = useWorldStore((state) => state.tourTimeline);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (worldRef.current && (tourTimeline === 'TV_INTRO' || tourTimeline === 'BUTTERFLY_WAKE')) {
      worldRef.current.rotation.y = t * 0.04;
    }
  });

  return (
    <group ref={worldRef}>
      <Real3DButterfly />

      {/* Your core central wireframe grid mapping boundary */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[3.2, 16, 16]} />
        <meshStandardMaterial color="#0b0726" wireframe stroke="#00f0ff" />
      </mesh>
    </group>
  );
}

// 4. MAIN EXPORTER CANVAS
export default function WorldCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#030008] z-0 select-none">
      <Canvas camera={{ position: [0, 4, 11], fov: 45 }} dpr={[1, 1.5]}>
        <color attach="background" args={['#030008']} />
        
        <ambientLight intensity={0.7} color="#3c2673" />
        <directionalLight position={[5, 10, 5]} intensity={1.5} />

        <CoreWorldMap />
        <CameraRig />
      </Canvas>
    </div>
  );
}

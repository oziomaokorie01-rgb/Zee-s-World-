import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useWorldStore } from '../store/useWorldStore';

// 1. Optimized Camera Rig tailored for responsive mobile screens
function CameraRig() {
  const { camera } = useThree();
  const tourTimeline = useWorldStore((state) => state.tourTimeline);
  const activeObject = useWorldStore((state) => state.activeObject);

  const targetPosVec = useRef(new THREE.Vector3(0, 3, 9)); // Increased Z-depth to stop clipping on narrow screens
  const targetLookVec = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  const bedroomObjects = [
    { id: 'laptop', pos: [-0.3, 0.4, 2.5], lookAt: [0, 0, 0] },
    { id: 'books', pos: [0.4, 0.3, 2.5], lookAt: [0, 0, 0] },
    { id: 'basketball', pos: [0.5, -0.4, 2.8], lookAt: [0, 0, 0] },
    { id: 'mirror', pos: [-0.8, 0.5, 2.0], lookAt: [0, 0, 0] },
    { id: 'telescope', pos: [0.0, 0.6, 1.8], lookAt: [0, 0, 0] }
  ];

  useFrame(() => {
    // If scanning items in the observatory room, update camera positioning smoothly
    if (tourTimeline === 'BEDROOM_PAN') {
      const currentItem = bedroomObjects.find(o => o.id === activeObject);
      if (currentItem) {
        targetPosVec.current.set(currentItem.pos[0], currentItem.pos[1], currentItem.pos[2]);
      }
    } else {
      // Default strategic view tracking the centered wireframe island
      targetPosVec.current.set(0, 3.2, 8.5);
    }

    camera.position.lerp(targetPosVec.current, 0.05);
    currentLookAt.current.lerp(targetLookVec.current, 0.05);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

// 2. Cyber-Geometric Butterfly Drone (Matching your wireframe aesthetic)
function ButterflyDrone() {
  const bodyRef = useRef();
  const leftWingRef = useRef();
  const rightWingRef = useRef();
  const tourTimeline = useWorldStore((state) => state.tourTimeline);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!bodyRef.current) return;

    // Fast organic wing flap calculations
    if (leftWingRef.current && rightWingRef.current) {
      leftWingRef.current.rotation.y = Math.cos(t * 24) * 0.6;
      rightWingRef.current.rotation.y = -Math.cos(t * 24) * 0.6;
    }

    // Circular flight paths orbiting safely around the central wireframe structures
    if (tourTimeline === 'BUTTERFLY_WAKE') {
      const radius = 3.2;
      bodyRef.current.position.set(Math.sin(t * 2) * radius, Math.sin(t * 1.5) * 0.3 + 0.5, Math.cos(t * 2) * radius);
    } else {
      // Gentle atmospheric hover coordinates
      bodyRef.current.position.set(0, Math.sin(t * 1.8) * 0.15 + 1.2, 0);
    }
  });

  return (
    <group ref={bodyRef}>
      {/* Central Drone Spine Core */}
      <mesh>
        <cylinderGeometry args={[0.015, 0.015, 0.2, 5]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={1.5} wireframe />
      </mesh>
      {/* Left Wing Geometric Diamond */}
      <mesh ref={leftWingRef} position={[-0.1, 0, 0]}>
        <coneGeometry args={[0.1, 0.2, 4]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2.0} wireframe />
      </mesh>
      {/* Right Wing Geometric Diamond */}
      <mesh ref={rightWingRef} position={[0.1, 0, 0]}>
        <coneGeometry args={[0.1, 0.2, 4]} rotation={[0, 0, -Math.PI / 2]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2.0} wireframe />
      </mesh>
    </group>
  );
}

// 3. Central Abstract Storyboard Map
function FloatingIsland() {
  const islandRef = useRef(null);
  const tourTimeline = useWorldStore((state) => state.tourTimeline);
  const setActiveDistrict = useWorldStore((state) => state.setActiveDistrict);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (islandRef.current) {
      // Peaceful floating drift
      islandRef.current.position.y = Math.sin(t * 1.2) * 0.08;
      
      // Rotate maps during selection mode
      if (tourTimeline === 'TV_INTRO' || tourTimeline === 'BUTTERFLY_WAKE' || tourTimeline === 'TELESCOPE_CHOOSE') {
        islandRef.current.rotation.y = t * 0.04;
      }
    }
  });

  return (
    <group ref={islandRef}>
      <ButterflyDrone />

      {/* Main Base Landmass Platform Block */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[2.5, 2.0, 0.8, 7]} />
        <meshStandardMaterial color="#070414" roughness={0.9} flatShading />
      </mesh>

      {/* Central Bedroom Observatory Hub (The Dodecahedron) */}
      <mesh position={[0, 0.2, 0]}>
        <dodecahedronGeometry args={[0.65]} />
        <meshStandardMaterial color="#0e0a2b" roughness={0.3} flatShading />
      </mesh>

      {/* District 1: Workshop Node */}
      <mesh position={[-1.5, 0.1, 1.0]} onClick={(e) => { e.stopPropagation(); setActiveDistrict('workshop'); }}>
        <boxGeometry args={[0.4, 0.6, 0.4]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.2} flatShading />
      </mesh>

      {/* District 2: Greenhouse Node */}
      <mesh position={[1.5, 0, -1.0]} onClick={(e) => { e.stopPropagation(); setActiveDistrict('greenhouse'); }}>
        <sphereGeometry args={[0.3, 8, 8]} />
        <MeshDistortMaterial color="#c084fc" speed={1.5} distort={0.25} radius={0.3} />
      </mesh>

      {/* District 3: Experimental Lab Node */}
      <mesh position={[-1.6, 0.1, -1.4]} onClick={(e) => { e.stopPropagation(); setActiveDistrict('lab'); }}>
        <cylinderGeometry args={[0.25, 0.25, 0.5, 6]} />
        <meshStandardMaterial color="#4c1d95" flatShading />
      </mesh>

      {/* District 4: Basketball Quarter Node */}
      <mesh position={[1.6, 0.1, 1.4]} onClick={(e) => { e.stopPropagation(); setActiveDistrict('court'); }}>
        <boxGeometry args={[0.5, 0.15, 0.4]} />
        <meshStandardMaterial color="#ea580c" flatShading />
      </mesh>
    </group>
  );
}

// 4. Main Canvas Layer
export default function WorldCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#030008] z-0 select-none">
      <Canvas camera={{ position: [0, 3, 9], fov: 45 }} dpr={[1, 1.5]}>
        <color attach="background" args={['#030008']} />
        
        <ambientLight intensity={0.2} color="#1d113b" />
        <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-4, -2, -4]} intensity={0.6} color="#00f0ff" />

        <FloatingIsland />
        <CameraRig />
      </Canvas>
    </div>
  );
}

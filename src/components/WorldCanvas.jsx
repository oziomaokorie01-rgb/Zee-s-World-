import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useWorldStore } from '../store/useWorldStore';

// 1. Cinematic Camera Rig & Cutscene System Director
function CameraRig() {
  const { camera } = useThree();
  const tourTimeline = useWorldStore((state) => state.tourTimeline);
  const activeObject = useWorldStore((state) => state.activeObject);
  const activeDistrict = useWorldStore((state) => state.activeDistrict);
  const setTourTimeline = useWorldStore((state) => state.setTourTimeline);
  const setActiveObject = useWorldStore((state) => state.setActiveObject);

  // Single persistent vectors to optimize garbage collection execution speeds
  const targetPosVec = useRef(new THREE.Vector3(0, 4, 7));
  const targetLookVec = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  
  // Internal timer track for automatic cutscene pans
  const timer = useRef(0);
  const internalState = useRef('init');

  // Exact coordinate map arrays matching your story storyboard
  const bedroomObjects = [
    { id: 'laptop', pos: [-0.6, 0.4, 0.8], lookAt: [-0.6, 0.2, 0.3] },
    { id: 'books', pos: [0.7, 0.3, 0.9], lookAt: [0.7, 0.1, 0.2] },
    { id: 'basketball', pos: [0.8, -0.6, 1.2], lookAt: [0.8, -0.7, 0.6] },
    { id: 'mirror', pos: [-1.2, 0.5, 0.2], lookAt: [-1.8, 0.5, 0.2] },
    { id: 'telescope', pos: [0.0, 0.6, -0.5], lookAt: [0.0, 0.7, -1.5] }
  ];

  const districtTargets = {
    workshop: { pos: [-2.8, 1.5, 3.2], lookAt: [-1.8, 0, 1.2] },
    greenhouse: { pos: [2.8, 1.5, -0.2], lookAt: [1.8, -0.1, -1.2] },
    lab: { pos: [-3.2, 1.8, -2.5], lookAt: [-2.0, 0, -1.8] },
    court: { pos: [3.2, 1.8, 2.5], lookAt: [2.0, 0, 1.8] }
  };

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();

    // PHASE A: INITIAL WAKE AND EXT-ORBIT ROTATION
    if (tourTimeline === 'TV_INTRO' || tourTimeline === 'BUTTERFLY_WAKE') {
      targetPosVec.current.set(Math.sin(elapsed * 0.3) * 8, 4, Math.cos(elapsed * 0.3) * 8);
      targetLookVec.current.set(0, 0, 0);

      // Simple auto advancement out of Wake sequence after 4.5 seconds
      if (tourTimeline === 'BUTTERFLY_WAKE') {
        timer.current += delta;
        if (timer.current > 4.5) {
          timer.current = 0;
          setTourTimeline('BEDROOM_PAN');
          setActiveObject('laptop');
        }
      }
    }

    // PHASE B: SEQUENTIAL AUTOMATIC BEDROOM INSPECTION PAN LOOP
    else if (tourTimeline === 'BEDROOM_PAN') {
      const currentItem = bedroomObjects.find(o => o.id === activeObject) || bedroomObjects[0];
      // Offset position deep inside the central observatory coordinates
      targetPosVec.current.set(currentItem.pos[0], currentItem.pos[1] + 0.2, currentItem.pos[2]);
      targetLookVec.current.set(...currentItem.lookAt);

      timer.current += delta;
      // Spend exactly 4.5 seconds displaying each overlay note before hopping to the next
      if (timer.current > 4.5) {
        timer.current = 0;
        const index = bedroomObjects.findIndex(o => o.id === activeObject);
        if (index < bedroomObjects.length - 1) {
          setActiveObject(bedroomObjects[index + 1].id);
        } else {
          // Finished bedroom pan list -> trigger telescope interactive mode
          setTourTimeline('TELESCOPE_CHOOSE');
          setActiveObject(null);
        }
      }
    }

    // PHASE C: TELESCOPE SATELLITE SYSTEM RENDER STATE
    else if (tourTimeline === 'TELESCOPE_CHOOSE') {
      if (!activeDistrict) {
        // High top-down satellite mapping lens alignment view
        targetPosVec.current.set(0, 5.5, 0.1);
        targetLookVec.current.set(0, 0, 0);
      } else {
        // User swiped or tapped a target district -> trigger street travel sequence cutscene
        setTourTimeline('STREET_TRANSIT');
        timer.current = 0;
      }
    }

    // PHASE D: AUTOMATIC STREET SYSTEM TRANSIT RUN
    else if (tourTimeline === 'STREET_TRANSIT') {
      timer.current += delta;
      
      // Mimic sweeping along skyscrapers by interpolating lens heights dynamically
      if (timer.current < 1.5) {
        targetPosVec.current.set(0, 6.0, 5.0); // Ascend up into cloud matrix
        targetLookVec.current.set(0, -1, 0);
      } else if (timer.current < 3.5) {
        // Dip down low into city intersection street paths
        targetPosVec.current.set(2.0, 0.8, -3.0);
        targetLookVec.current.set(-2.0, 0.8, 2.0);
      } else {
        // Cutscene transit block ends -> snap directly into district desk view
        timer.current = 0;
        setTourTimeline('ROOM_EXPLORE');
      }
    }

    // PHASE E: ROOM DETAIL NODE FOCUS EXPLORATION
    else if (tourTimeline === 'ROOM_EXPLORE' && activeDistrict) {
      const targetRoom = districtTargets[activeDistrict] || { pos: [0, 4, 7], lookAt: [0, 0, 0] };
      targetPosVec.current.set(...targetRoom.pos);
      targetLookVec.current.set(...targetRoom.lookAt);
    }

    // PHASE F: VACUUM INDUCED SYSTEM FALL SEQUENCE
    else if (tourTimeline === 'THE_VOID_FALL') {
      // Create a dizzying, accelerating camera spin down into black space
      targetPosVec.current.set(Math.sin(elapsed * 4) * 2, camera.position.y - 0.08, Math.cos(elapsed * 4) * 2);
      targetLookVec.current.set(0, camera.position.y - 4, 0);
    }

    // Core interpolation execution loop
    camera.position.lerp(targetPosVec.current, 0.045);
    currentLookAt.current.lerp(targetLookVec.current, 0.045);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

// 2. Animated Cyber Butterfly / Drone Guide Mesh Asset
function ButterflyDrone() {
  const meshRef = useRef();
  const tourTimeline = useWorldStore((state) => state.tourTimeline);
  const activeObject = useWorldStore((state) => state.activeObject);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!meshRef.current) return;

    // Fast organic wing flapping frequency
    meshRef.current.rotation.z = Math.sin(t * 22) * 0.4;

    // Butterfly paths positioning mechanics based on active timeline state
    if (tourTimeline === 'BUTTERFLY_WAKE') {
      // Swoop around the core structure twice
      meshRef.current.position.set(Math.sin(t * 3.5) * 4.0, Math.cos(t * 1.5) * 0.5 + 1.0, Math.cos(t * 3.5) * 4.0);
    } else if (tourTimeline === 'BEDROOM_PAN') {
      // Hover dynamically close right directly above the active item focal target
      meshRef.current.position.set(state.camera.position.x + Math.sin(t * 2) * 0.15, state.camera.position.y - 0.1, state.camera.position.z - 0.4);
    } else {
      // Default to hovering over the centerpiece core observatory engine
      meshRef.current.position.set(0, Math.sin(t * 2) * 0.1 + 0.9, 0);
    }
  });

  return (
    <mesh ref={meshRef}>
      <coneGeometry args={[0.06, 0.18, 4]} />
      <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2.5} wireframe />
    </mesh>
  );
}

// 3. Main Floating World Map Blueprint Component
function FloatingIsland() {
  const islandRef = useRef(null);
  const tourTimeline = useWorldStore((state) => state.tourTimeline);
  const setActiveDistrict = useWorldStore((state) => state.setActiveDistrict);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (islandRef.current) {
      // Maintain continuous base structural floating rhythm
      islandRef.current.position.y = Math.sin(t * 1.2) * 0.12;
      
      // Stop rotation during explicit closeup room scans to preserve coordinate tracking orientation
      if (tourTimeline === 'TV_INTRO' || tourTimeline === 'BUTTERFLY_WAKE' || tourTimeline === 'TELESCOPE_CHOOSE') {
        islandRef.current.rotation.y = t * 0.02;
      } else if (tourTimeline === 'THE_VOID_FALL') {
        islandRef.current.position.y += 0.05; // Make structural island move upward fast as visitor drops down
      }
    }
  });

  return (
    <group ref={islandRef}>
      <ButterflyDrone />

      {/* Main Base Landmass Platform Block */}
      <mesh position={[0, -1, 0]} receiveShadow>
        <cylinderGeometry args={[3, 2.2, 1.2, 7]} />
        <meshStandardMaterial color="#0a0a23" flatShading roughness={0.8} />
      </mesh>

      {/* The Central Bedroom Observatory Hub */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <dodecahedronGeometry args={[0.75]} />
        <meshStandardMaterial color="#1e1b4b" flatShading roughness={0.4} roughness={0.1} />
      </mesh>

      {/* Micro-Room Core 1: Developer Workshop Node */}
      <mesh position={[-1.8, 0.1, 1.2]} onClick={(e) => {
        if (tourTimeline !== 'TELESCOPE_CHOOSE') return;
        e.stopPropagation();
        setActiveDistrict('workshop');
      }}>
        <boxGeometry args={[0.5, 0.8, 0.5]} />
        <meshStandardMaterial color="#00f0ff" flatShading emissive="#00f0ff" emissiveIntensity={0.1} />
      </mesh>

      {/* Micro-Room Core 2: Design Greenhouse Node */}
      <mesh position={[1.8, 0, -1.2]} onClick={(e) => {
        if (tourTimeline !== 'TELESCOPE_CHOOSE') return;
        e.stopPropagation();
        setActiveDistrict('greenhouse');
      }}>
        <sphereGeometry args={[0.4, 8, 8]} />
        <MeshDistortMaterial color="#c084fc" speed={2} distort={0.3} radius={0.4} />
      </mesh>

      {/* Micro-Room Core 3: Experimental Lab Node */}
      <mesh position={[-2.0, 0.1, -1.8]} onClick={(e) => {
        if (tourTimeline !== 'TELESCOPE_CHOOSE') return;
        e.stopPropagation();
        setActiveDistrict('lab');
      }}>
        <cylinderGeometry args={[0.3, 0.3, 0.7, 6]} />
        <meshStandardMaterial color="#4c1d95" flatShading />
      </mesh>

      {/* Micro-Room Core 4: Physical Sprint Training Court Node */}
      <mesh position={[2.0, 0.1, 1.8]} onClick={(e) => {
        if (tourTimeline !== 'TELESCOPE_CHOOSE') return;
        e.stopPropagation();
        setActiveDistrict('court');
      }}>
        <boxGeometry args={[0.6, 0.2, 0.5]} />
        <meshStandardMaterial color="#ea580c" flatShading />
      </mesh>
    </group>
  );
}

// 4. Integrated Canvas Exporter
export default function WorldCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#030008] z-0 select-none">
      <Canvas camera={{ position: [0, 4, 7], fov: 50 }} dpr={[1, 1.5]}>
        <color attach="background" args={['#030008']} />
        
        <ambientLight intensity={0.15} color="#1e1b4b" />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-4, -2, -4]} intensity={0.8} color="#00f0ff" />

        <FloatingIsland />
        <CameraRig />
      </Canvas>
    </div>
  );
}

import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useWorldStore } from '../store/useWorldStore';

// 1. MIDDLE-GROUND CAMERA RIG: Clean responsive view tracking
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

// 2. CORE ENVIRONMENTAL CELESTIAL STRUCTURE
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
      {/* Central Abstract Wireframe Globe Platform */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[3.2, 16, 16]} />
        <meshStandardMaterial color="#0b0726" wireframe stroke="#00f0ff" />
      </mesh>
    </group>
  );
}

// 3. MAIN CLEAN CANVAS EXPORTER
export default function WorldCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#030008] z-0 select-none">
      <Canvas camera={{ position: [0, 4, 11], fov: 45 }} dpr={[1, 1.5]}>
        <color attach="background" args={['#030008']} />
        
        <ambientLight intensity={0.4} color="#21153b" />
        <directionalLight position={[5, 10, 5]} intensity={1.5} />

        <CoreWorldMap />
        <CameraRig />
      </Canvas>
    </div>
  );
}

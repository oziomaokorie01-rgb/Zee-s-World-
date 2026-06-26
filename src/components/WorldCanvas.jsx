import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useWorldStore } from '../store/useWorldStore';

// 1. Camera Rig Component (Manages the smooth zooming transitions)
function CameraRig() {
  const { camera } = useThree();
  const activeDistrict = useWorldStore((state) => state.activeDistrict);

  // Precise coordinate mapping for camera positions and viewing focal points
  const cameraTargets = {
    default: { pos: [0, 4, 7], lookAt: [0, 0, 0] },
    workshop: { pos: [-2.8, 1.5, 3.2], lookAt: [-1.8, 0, 1.2] },
    greenhouse: { pos: [2.8, 1.5, -0.2], lookAt: [1.8, -0.1, -1.2] },
    lab: { pos: [-3.2, 1.8, -2.5], lookAt: [-2.0, 0, -1.8] },
    court: { pos: [3.2, 1.8, 2.5], lookAt: [2.0, 0, 1.8] },
    void: { pos: [0, 3.5, 0.5], lookAt: [0, -4, 0] }
  };

  // Dedicated single instance memory reference for lookAt math
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    const targetKey = activeDistrict && cameraTargets[targetKey] !== undefined ? activeDistrict : 'default';
    const target = cameraTargets[targetKey] || cameraTargets.default;
    
    const targetPos = new THREE.Vector3(...target.pos);
    const targetLook = new THREE.Vector3(...target.lookAt);

    // Smoothly interpolate position and lens direction
    camera.position.lerp(targetPos, 0.05);
    currentLookAt.current.lerp(targetLook, 0.05);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

// 2. The Integrated Floating Island Component (With all 5 district nodes)
function FloatingIsland() {
  const islandRef = useRef(null);
  const activeDistrict = useWorldStore((state) => state.activeDistrict);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (islandRef.current) {
      // Gentle floating bob rhythm
      islandRef.current.position.y = Math.sin(t * 1.2) * 0.15;
      
      // Auto-rotates only if viewing from the default overview perspective
      if (!activeDistrict) {
        islandRef.current.rotation.y += 0.003;
      }
    }
  });

  return (
    <group ref={islandRef}>
      {/* Main Base Landmass */}
      <mesh rotation={[0, 0, 0]} position={[0, -1, 0]}>
        <cylinderGeometry args={[3, 2.2, 1.2, 7]} />
        <meshStandardMaterial color="#130924" flatShading roughness={0.8} />
      </mesh>

      {/* The Observatory Centerpiece */}
      <mesh position={[0, 0, 0]}>
        <dodecahedronGeometry args={[0.7]} />
        <meshStandardMaterial color="#6b21a8" flatShading roughness={0.4} />
      </mesh>

      {/* District Node 1: Workshop (Development Hub) */}
      <mesh position={[-1.8, 0, 1.2]} onClick={(e) => {
        e.stopPropagation();
        useWorldStore.getState().setActiveDistrict('workshop');
      }}>
        <boxGeometry args={[0.5, 0.8, 0.5]} />
        <meshStandardMaterial color="#00f0ff" flatShading roughness={0.5} />
      </mesh>

      {/* District Node 2: Greenhouse (Design & Art Space) */}
      <mesh position={[1.8, -0.1, -1.2]} onClick={(e) => {
        e.stopPropagation();
        useWorldStore.getState().setActiveDistrict('greenhouse');
      }}>
        <sphereGeometry args={[0.4, 8, 8]} />
        <MeshDistortMaterial color="#a855f7" speed={2} distort={0.4} radius={0.4} />
      </mesh>

      {/* District Node 3: The Lab (Tech & Research) */}
      <mesh position={[-2.0, 0, -1.8]} onClick={(e) => {
        e.stopPropagation();
        useWorldStore.getState().setActiveDistrict('lab');
      }}>
        <cylinderGeometry args={[0.3, 0.3, 0.7, 6]} />
        <meshStandardMaterial color="#312e81" flatShading roughness={0.3} />
      </mesh>

      {/* District Node 4: The Court (Gaming & Sports Core) */}
      <mesh position={[2.0, 0, 1.8]} onClick={(e) => {
        e.stopPropagation();
        useWorldStore.getState().setActiveDistrict('court');
      }}>
        <boxGeometry args={[0.7, 0.2, 0.5]} />
        <meshStandardMaterial color="#f97316" roughness={0.6} />
      </mesh>

      {/* District Node 5: The Void (Web3 Gateway Underbelly) */}
      <mesh position={[0, -0.4, 0]} onClick={(e) => {
        e.stopPropagation();
        useWorldStore.getState().setActiveDistrict('void');
      }}>
        <torusGeometry args={[0.9, 0.1, 8, 24]} />
        <meshStandardMaterial color="#ffffff" wireframe />
      </mesh>
    </group>
  );
}

// 3. Master Canvas Component Export
export default function WorldCanvas() {
  const activeDistrict = useWorldStore((state) => state.activeDistrict);

  return (
    <div className="absolute inset-0 w-full h-full bg-[#05020a] z-0">
      <Canvas
        camera={{ position: [0, 4, 7], fov: 50 }}
        gl={{ antialias: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.6} color="#b085ff" />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#a855f7" />

        <FloatingIsland />
        <CameraRig />

        <OrbitControls 
          enabled={!activeDistrict} 
          enableZoom={false}
          enablePan={false} 
          minPolarAngle={Math.PI / 4}   
          maxPolarAngle={Math.PI / 2.2} 
          makeDefault 
        />
      </Canvas>
    </div>
  );
}

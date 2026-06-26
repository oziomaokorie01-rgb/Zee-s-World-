import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useWorldStore } from '../store/useWorldStore';
import CameraController from './src/components/CameraController'; 


// 1. New Camera Rig Component (Controls the view target smoothly)
function CameraRig() {
  const { camera } = useThree();
  const activeDistrict = useWorldStore((state) => state.activeDistrict);

  // Define custom camera vectors for each sub-district position
  const cameraTargets: Record<string, { pos: [number, number, number]; lookAt: [number, number, number] }> = {
    default: { pos: [0, 4, 7], lookAt: [0, 0, 0] },
    workshop: { pos: [-3, 2, 4], lookAt: [-1.8, 0, 1.2] },   // Zooms close to Workshop node
    greenhouse: { pos: [3, 2, -2], lookAt: [1.8, -0.1, -1.2] }, // Focuses on the Greenhouse seed
    // Add paths for 'lab', 'court', or 'void' positions here
  };

  const currentLookAt = new THREE.Vector3(0, 0, 0);

  useFrame(() => {
    const targetKey = activeDistrict && cameraTargets[activeDistrict] ? activeDistrict : 'default';
    const targetPos = new THREE.Vector3(...cameraTargets[targetKey].pos);
    const targetLook = new THREE.Vector3(...cameraTargets[targetKey].lookAt);

    // Smoothly glide camera position and angle using interpolation (lerp)
    camera.position.lerp(targetPos, 0.05);
    currentLookAt.lerp(targetLook, 0.05);
    camera.lookAt(currentLookAt);
  });

  return null;
}

// 2. Your Existing Floating Island Inner Component
function FloatingIsland() {
  const islandRef = useRef<THREE.Group>(null);
  const activeDistrict = useWorldStore((state) => state.activeDistrict);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (islandRef.current) {
      islandRef.current.position.y = Math.sin(t * 1.2) * 0.15;
      
            // Auto-rotates ONLY when exploring the general hub layout overview
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

      {/* District Node Alpha: Workshop */}
      <mesh position={[-1.8, 0, 1.2]} onClick={(e) => {
        e.stopPropagation(); // Prevents clicks leaking into background elements
        useWorldStore.getState().setActiveDistrict('workshop');
      }}>
        <boxGeometry args={[0.5, 0.8, 0.5]} />
        <meshStandardMaterial color="#00f0ff" flatShading roughness={0.5} />
      </mesh>

      {/* District Node Beta: Greenhouse */}
      <mesh position={[1.8, -0.1, -1.2]} onClick={(e) => {
        e.stopPropagation();
        useWorldStore.getState().setActiveDistrict('greenhouse');
      }}>
        <sphereGeometry args={[0.4, 8, 8]} />
        <MeshDistortMaterial color="#a855f7" speed={2} distort={0.4} radius={0.4} />
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
        
        {/* Dynamic transition handling rig */}
        <CameraRig />

        {/* Enable dragging only when resting at the main base level overview */}
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

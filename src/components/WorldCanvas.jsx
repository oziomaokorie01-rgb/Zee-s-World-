import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial } from '@react-three/drei';
import { useWorldStore } from '../store/useWorldStore';

// The Floating Island Inner Component
function FloatingIsland() {
  const islandRef = useRef();
  const activeDistrict = useWorldStore((state) => state.activeDistrict);

  // Subtle ambient floating/bobbing animation physics
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    islandRef.current.position.y = Math.sin(t * 1.2) * 0.15;
    
    // Smoothly auto-rotate the island when no district is explicitly selected
    if (!activeDistrict) {
      islandRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={islandRef}>
      {/* 1. Main Core Landmass (Low-Poly Floating Island Base) */}
      <mesh rotation={[0, 0, 0]} position={[0, -1, 0]}>
        <cylinderGeometry args={[3, 2.2, 1.2, 7]} />
        <meshStandardMaterial 
          color="#130924" 
          flatShading 
          roughness={0.8}
          wireframe={false}
        />
      </mesh>

      {/* 2. The Observatory / Room Centerpiece Landmark */}
      <mesh position={[0, 0, 0]}>
        <dodecahedronGeometry args={[0.7]} />
        <meshStandardMaterial color="#6b21a8" flatShading roughness={0.4} emmissive="#3b0764" />
      </mesh>

      {/* 3. District Node Alpha: The Workshop (Glow Sphere Landmark) */}
      <mesh position={[-1.8, 0, 1.2]} onClick={() => useWorldStore.getState().setActiveDistrict('workshop')}>
        <boxGeometry args={[0.5, 0.8, 0.5]} />
        <meshStandardMaterial color="#00f0ff" flatShading roughness={0.5} />
      </mesh>

      {/* 4. District Node Beta: The Greenhouse (Organic Distorted Seed) */}
      <mesh position={[1.8, -0.1, -1.2]} onClick={() => useWorldStore.getState().setActiveDistrict('greenhouse')}>
        <sphereGeometry args={[0.4, 8, 8]} />
        <MeshDistortMaterial color="#a855f7" speed={2} distort={0.4} radius={0.4} />
      </mesh>
      
      {/* Additional district meshes (lab, court, void) are anchored symmetrically around this base layout */}
    </group>
  );
}

// Master Canvas Component Export
export default function WorldCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#05020a] z-0">
      <Canvas
        camera={{ position: [0, 4, 7], fov: 50 }}
        dpr={[1, 1.5]} // Performance optimized scale threshold for mobile phone screens
      >
        {/* Ambient Cosmic Lighting Setup */}
        <ambientLight intensity={0.6} color="#b085ff" />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#a855f7" />

        {/* The Live Interactive Core 3D Mesh */}
        <FloatingIsland />

        {/* Mobile Touch Navigation Controls */}
        <OrbitControls 
          enableZoom={false} // Prevents breaking the layout sizing when pinching on a phone screen
          enablePan={false}  // Locks camera to center so visitors can't drag the island off-screen
          minPolarAngle={Math.PI / 4}   // Prevents looking directly under the island base
          maxPolarAngle={Math.PI / 2.2} // Prevents looking past horizontal ground level
          makeDefault 
        />
      </Canvas>
    </div>
  );
}

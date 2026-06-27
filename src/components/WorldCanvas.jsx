import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useWorldStore } from '../store/useWorldStore';

// 1. Camera Rig Component (Smoothed Transitions & Performance Fixed)
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

  // Persistent vector instances to completely avoid garbage collection lag spikes
  const targetPosVec = useRef(new THREE.Vector3());
  const targetLookVec = useRef(new THREE.Vector3());
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    // FIX: Safely evaluate target identity keys to prevent runtime crash
    const targetKey = activeDistrict && cameraTargets[activeDistrict] ? activeDistrict : 'default';
    const target = cameraTargets[targetKey];
    
    // Smoothly interpolate position and lens direction vectors inline
    targetPosVec.current.set(...target.pos);
    targetLookVec.current.set(...target.lookAt);

    camera.position.lerp(targetPosVec.current, 0.05);
    currentLookAt.current.lerp(targetLookVec.current, 0.05);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

// 2. The Integrated Floating Island Component
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

  // Small helper to switch cursor styles on mesh hover
  const setCursor = (hovered) => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  };

  return (
    <group ref={islandRef}>
      {/* Main Base Landmass */}
      <mesh rotation={[0, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <cylinderGeometry args={[3, 2.2, 1.2, 7]} />
        <meshStandardMaterial color="#0f0720" flatShading roughness={0.7} />
      </mesh>

      {/* The Observatory Centerpiece */}
      <mesh position={[0, 0, 0]} castShadow>
        <dodecahedronGeometry args={[0.7]} />
        <meshStandardMaterial color="#581c87" flatShading roughness={0.3} metalness={0.2} />
      </mesh>

      {/* District Node 1: Workshop (Development Hub) */}
      <mesh 
        position={[-1.8, 0, 1.2]} 
        castShadow
        onPointerOver={() => setCursor(true)}
        onPointerOut={() => setCursor(false)}
        onClick={(e) => {
          e.stopPropagation();
          useWorldStore.getState().setActiveDistrict('workshop');
        }}
      >
        <boxGeometry args={[0.5, 0.8, 0.5]} />
        <meshStandardMaterial color="#00f0ff" flatShading roughness={0.4} emissive="#00f0ff" emissiveIntensity={0.15} />
      </mesh>

      {/* District Node 2: Greenhouse (Design & Art Space) */}
      <mesh 
        position={[1.8, -0.1, -1.2]} 
        castShadow
        onPointerOver={() => setCursor(true)}
        onPointerOut={() => setCursor(false)}
        onClick={(e) => {
          e.stopPropagation();
          useWorldStore.getState().setActiveDistrict('greenhouse');
        }}
      >
        <sphereGeometry args={[0.4, 8, 8]} />
        <MeshDistortMaterial color="#c084fc" speed={2} distort={0.35} radius={0.4} roughness={0.2} />
      </mesh>

      {/* District Node 3: The Lab (Tech & Research) */}
      <mesh 
        position={[-2.0, 0, -1.8]} 
        castShadow
        onPointerOver={() => setCursor(true)}
        onPointerOut={() => setCursor(false)}
        onClick={(e) => {
          e.stopPropagation();
          useWorldStore.getState().setActiveDistrict('lab');
        }}
      >
        <cylinderGeometry args={[0.3, 0.3, 0.7, 6]} />
        <meshStandardMaterial color="#312e81" flatShading roughness={0.3} />
      </mesh>

      {/* District Node 4: The Court (Gaming & Sports Core) */}
      <mesh 
        position={[2.0, 0, 1.8]} 
        castShadow
        onPointerOver={() => setCursor(true)}
        onPointerOut={() => setCursor(false)}
        onClick={(e) => {
          e.stopPropagation();
          useWorldStore.getState().setActiveDistrict('court');
        }}
      >
        <boxGeometry args={[0.7, 0.2, 0.5]} />
        <meshStandardMaterial color="#ea580c" roughness={0.5} />
      </mesh>

      {/* District Node 5: The Void (Web3 Gateway Underbelly) */}
      <mesh 
        position={[0, -0.4, 0]} 
        onPointerOver={() => setCursor(true)}
        onPointerOut={() => setCursor(false)}
        onClick={(e) => {
          e.stopPropagation();
          useWorldStore.getState().setActiveDistrict('void');
        }}
      >
        <torusGeometry args={[0.9, 0.08, 8, 24]} />
        <meshStandardMaterial color="#ffffff" wireframe />
      </mesh>
    </group>
  );
}

// 3. Master Canvas Component Export
export default function WorldCanvas() {
  const activeDistrict = useWorldStore((state) => state.activeDistrict);

  // Clean cursor side-effects if component unmounts mid-hover
  useEffect(() => {
    return () => { document.body.style.cursor = 'auto'; };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full bg-[#05020a] z-0 select-none">
      <Canvas
        camera={{ position: [0, 4, 7], fov: 48 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 1.5]}
        shadows
      >
        {/* Stark, dramatic late-night lighting shadows configuration */}
        <color attach="background" args={['#05020a']} />
        
        {/* Subtle dark purple ambient base light */}
        <ambientLight intensity={0.2} color="#2e1065" />
        
        {/* Stark terminal white monitor glow casting high-contrast highlights */}
        <directionalLight 
          position={[5, 6, 4]} 
          intensity={1.6} 
          color="#ffffff" 
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        
        {/* Dark cybernetic cyan bounce flash from below */}
        <pointLight position={[-6, -3, -2]} intensity={0.9} color="#00f0ff" />

        <FloatingIsland />
        <CameraRig />

        <OrbitControls 
          enabled={!activeDistrict} 
          enableZoom={true} // Enabled zoom so laptop trackpads feel incredibly smooth
          enablePan={false} 
          minDistance={4}
          maxDistance={12}
          minPolarAngle={Math.PI / 4}   
          maxPolarAngle={Math.PI / 2.1} 
          makeDefault 
        />
      </Canvas>
    </div>
  );
}

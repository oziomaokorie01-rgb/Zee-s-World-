import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useWorldStore } from '../store/useWorldStore';

// 1. MIDDLE-GROUND CAMERA RIG
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

// 2. 3D MODEL BUTTERFLY INTEGRATION
function Real3DButterfly() {
  const modelRef = useRef();
  const tourTimeline = useWorldStore((state) => state.tourTimeline);

  // Load the 3D asset file from your public folder
  // Replace this path string if you name your file differently
  const { scene, animations } = useGLTF('/assets/models/butterfly.glb');
  const mixer = useRef();

  // Handle embedded model wing animations if the file has them built-in
  useEffect(() => {
    if (animations && animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(scene);
      const action = mixer.current.clipAction(animations[0]); // Triggers wing-flap clip
      action.play();
    }
  }, [scene, animations]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (!modelRef.current) return;

    // Advance embedded model skeleton animations if available
    if (mixer.current) {
      // Scale flapping animation speed based on state
      const speedMultiplier = (tourTimeline === 'BUTTERFLY_WAKE' || tourTimeline === 'TV_INTRO') ? 1.8 : 0.6;
      mixer.current.update(delta * speedMultiplier);
    } else {
      // Procedural fallback flap: Rocks the entire model structure if it has no built-in bones
      modelRef.current.rotation.z = Math.sin(t * 26) * 0.2;
    }

    // Flight paths: Maintain perfect orbital path bounds around your central wireframe
    if (tourTimeline === 'BUTTERFLY_WAKE' || tourTimeline === 'TV_INTRO') {
      const radius = 3.8; 
      modelRef.current.position.set(
        Math.sin(t * 1.8) * radius, 
        Math.sin(t * 2.5) * 0.4 + 0.2, 
        Math.cos(t * 1.8) * radius
      );
      modelRef.current.rotation.y = -(t * 1.8) + Math.PI;
    } else {
      // Idle room focus hover parameters
      modelRef.current.position.set(0, Math.sin(t * 2) * 0.1 + 1.0, 0);
      modelRef.current.rotation.y = t * 0.3;
    }
  });

  // Render the real 3D asset mesh via primitive object injector
  return (
    <primitive 
      ref={modelRef} 
      object={scene} 
      scale={0.4} // Adjust this scale factor up or down depending on your file size
    />
  );
}

// Preload asset pipeline to avoid frame stuttering on runtime initialization
useGLTF.preload('/assets/models/butterfly.glb');

// 3. CORE WIREFRAME CELESTIAL ENVIRONMENT
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

// 4. MAIN EXPORT CANVAS LAYER
export default function WorldCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#030008] z-0 select-none">
      <Canvas camera={{ position: [0, 4, 11], fov: 45 }} dpr={[1, 1.5]}>
        <color attach="background" args={['#030008']} />
        
        <ambientLight intensity={0.5} color="#2b1a4a" />
        <directionalLight position={[5, 10, 5]} intensity={1.5} />

        <CoreWorldMap />
        <CameraRig />
      </Canvas>
    </div>
  );
}

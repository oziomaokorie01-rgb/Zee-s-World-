import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useWorldStore } from '../store/useWorldStore';

export function RealButterflyGuide() {
  const butterflyGroup = useRef();
  const leftWingRef = useRef();
  const rightWingRef = useRef();
  const particlesRef = useRef();

  const tourTimeline = useWorldStore((state) => state.tourTimeline);
  const activeDistrict = useWorldStore((state) => state.activeDistrict);

  // 1. Load the exact asset texture (Derived from your reference file layout)
  const textureLoader = new THREE.TextureLoader();
  const wingTexture = textureLoader.load('/assets/textures/butterfly_wing.png'); // Apply your extracted image asset here
  wingTexture.colorSpace = THREE.SRGBColorSpace;

  // Generate coordinate offsets for the ambient trail particles
  const particleCount = 45;
  const particlePositions = new Float32Array(particleCount * 3);
  const particleLifes = new Float32Array(particleCount);
  
  for(let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = 0;
    particlePositions[i * 3 + 1] = 0;
    particlePositions[i * 3 + 2] = 0;
    particleLifes[i] = Math.random();
  }

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (!butterflyGroup.current) return;

    // --- BIOLOGICAL ANIMATION ENGINE ---
    let flapSpeed = 18;
    let flapAmp = 0.8;

    if (tourTimeline === 'STREET_TRANSIT' || tourTimeline === 'SATELLITE_ZOOM') {
      flapSpeed = 34; 
      flapAmp = 1.1;
    } else if (tourTimeline === 'ROOM_EXPLORE') {
      flapSpeed = 6;  
      flapAmp = 0.35;
    }

    // Flapping angles replicate the vertical folding rhythm from butterfly gif.jpg
    const leftAngle = (Math.sin(t * flapSpeed) * flapAmp) - 0.2;
    if (leftWingRef.current) leftWingRef.current.rotation.z = leftAngle;
    if (rightWingRef.current) rightWingRef.current.rotation.z = -leftAngle;

    // --- EMBER PARTICLE ENGINE TRAIL ---
    if (particlesRef.current) {
      const geo = particlesRef.current.geometry;
      const posAttr = geo.attributes.position;
      
      for (let i = 0; i < particleCount; i++) {
        particleLifes[i] -= delta * 0.4;
        
        // Reset expired embers back to the core body anchor hub
        if (particleLifes[i] <= 0) {
          particleLifes[i] = 1.0;
          posAttr.setXYZ(
            i, 
            butterflyGroup.current.position.x + (Math.random() - 0.5) * 0.1,
            butterflyGroup.current.position.y,
            butterflyGroup.current.position.z + (Math.random() - 0.5) * 0.1
          );
        } else {
          // Drifting down and breaking away like the reference visual aura
          posAttr.setY(i, posAttr.getY(i) - delta * 0.3);
          posAttr.setX(i, posAttr.getX(i) + Math.sin(t + i) * 0.005);
        }
      }
      posAttr.needsUpdate = true;
    }

    // --- GLOBAL FLIGHT COORDINATE MATRIX ---
    if (tourTimeline === 'BUTTERFLY_WAKE') {
      const radius = 8.5; 
      const speed = t * 1.1;
      butterflyGroup.current.position.set(Math.sin(speed) * radius, 2.2 + Math.sin(t) * 0.3, Math.cos(speed) * radius);
      butterflyGroup.current.rotation.y = -speed;
    } 
    else if (tourTimeline === 'BEDROOM_PAN') {
      butterflyGroup.current.position.set(state.camera.position.x + 0.25, state.camera.position.y - 0.12, state.camera.position.z - 0.55);
      butterflyGroup.current.rotation.set(0, 0, 0);
    }
    else if (tourTimeline === 'ROOM_EXPLORE' && activeDistrict) {
      if (activeDistrict === 'workshop') butterflyGroup.current.position.set(-3.2, 0.9, 0.2);
      if (activeDistrict === 'greenhouse') butterflyGroup.current.position.set(3.2, 0.9, -0.2);
    }
    else {
      butterflyGroup.current.position.set(0, Math.sin(t * 1.6) * 0.1 + 1.9, 0);
      butterflyGroup.current.rotation.y = t * 0.3;
    }
  });

  return (
    <group>
      {/* 1. THE MAIN BIOLOGICAL CHARACTER GROUP */}
      <group ref={butterflyGroup} scale={[1.2, 1.2, 1.2]}>
        
        {/* Core Organic Center Torso Segment */}
        <mesh castShadow>
          <cylinderGeometry args={[0.006, 0.004, 0.16, 6]} />
          <meshStandardMaterial color="#0b0307" roughness={0.95} />
        </mesh>

        {/* Left Biological Wing Attachment */}
        <group ref={leftWingRef} position={[-0.01, 0, 0]}>
          <mesh position={[-0.14, 0, 0.02]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.28, 0.26]} />
            <meshStandardMaterial 
              map={wingTexture}
              transparent={true}
              alphaTest={0.15}
              side={THREE.DoubleSide}
              emissive="#ff0044"
              emissiveIntensity={2.5}
              roughness={0.1}
            />
          </mesh>
        </group>

        {/* Right Biological Wing Attachment */}
        <group ref={rightWingRef} position={[0.01, 0, 0]}>
          <mesh position={[0.14, 0, 0.02]} rotation={[-Math.PI / 2, 0, Math.PI]}>
            <planeGeometry args={[0.28, 0.26]} />
            <meshStandardMaterial 
              map={wingTexture}
              transparent={true}
              alphaTest={0.15}
              side={THREE.DoubleSide}
              emissive="#ff0044"
              emissiveIntensity={2.5}
              roughness={0.1}
            />
          </mesh>
        </group>

      </group>

      {/* 2. THE FLOATING EMBER PARTICLE EMITTER ARRAY */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute 
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial 
          color="#ff003c" 
          size={0.035} 
          transparent={true}
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

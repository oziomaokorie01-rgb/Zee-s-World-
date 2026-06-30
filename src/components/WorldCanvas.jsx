// src/components/WorldCanvas.jsx
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useWorldStore } from '../store/useWorldStore';

// ==========================================
// 1. CINEMATIC CAMERA RIG (TIMELINE DIRECTOR)
// ==========================================
function CameraRig() {
  const { camera } = useThree();
  const tourTimeline = useWorldStore((state) => state.tourTimeline);
  const activeObject = useWorldStore((state) => state.activeObject);
  const activeDistrict = useWorldStore((state) => state.activeDistrict);
  const setTourTimeline = useWorldStore((state) => state.setTourTimeline);
  const setActiveObject = useWorldStore((state) => state.setActiveObject);

  const targetPosVec = useRef(new THREE.Vector3(0, 0, 15));
  const targetLookVec = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  
  const timer = useRef(0);

  // Scene 0: Cozy Observatory Bedroom Coords
  const bedroomObjects = [
    { id: 'laptop', pos: [-0.6, 0.6, 1.0], lookAt: [-0.6, 0.4, 0.3] },
    { id: 'books', pos: [0.7, 0.5, 1.1], lookAt: [0.7, 0.3, 0.2] },
    { id: 'basketball', pos: [0.8, -0.4, 1.4], lookAt: [0.8, -0.5, 0.6] },
    { id: 'mirror', pos: [-1.2, 0.7, 0.4], lookAt: [-1.8, 0.7, 0.2] },
    { id: 'telescope', pos: [0.0, 0.8, -0.3], lookAt: [0.0, 0.9, -1.5] }
  ];

  // Specific 3D District Node Framing Positions
  const districtTargets = {
    workshop: { pos: [-3.5, 1.2, 3.5], lookAt: [-3.5, 0.5, 0] },
    greenhouse: { pos: [3.5, 1.2, -3.5], lookAt: [3.5, 0.5, 0] },
    court: { pos: [4.5, 1.5, 4.5], lookAt: [4.5, 0.5, 0] },
    research: { pos: [-4.5, 1.5, -4.5], lookAt: [-4.5, 0.5, 0] },
    void: { pos: [0, 2.0, -8.0], lookAt: [0, 0, -12.0] }
  };

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();

    // PHASE A: FAR-OFF WORLD GLOBE VIEW ORBIT
    if (tourTimeline === 'TV_INTRO' || tourTimeline === 'BUTTERFLY_WAKE') {
      targetPosVec.current.set(Math.sin(elapsed * 0.2) * 13, 4, Math.cos(elapsed * 0.2) * 13);
      targetLookVec.current.set(0, 0, 0);

      if (tourTimeline === 'BUTTERFLY_WAKE') {
        timer.current += delta;
        if (timer.current > 7.0) {
          timer.current = 0;
          setTourTimeline('SATELLITE_ZOOM');
        }
      }
    }

    // PHASE B: HIGH-SPEED SATELLITE INTERACTION ZOOM INTRUSION
    else if (tourTimeline === 'SATELLITE_ZOOM') {
      targetPosVec.current.set(0, 1.5, 2.5); // Drops camera straight down through the ceiling ring
      targetLookVec.current.set(0, 0.4, 0);
      
      timer.current += delta;
      if (timer.current > 3.0) {
        timer.current = 0;
        setTourTimeline('BEDROOM_PAN');
        setActiveObject('laptop');
      }
    }

    // PHASE C: SEQUENTIAL BEDROOM ITEM LOOKUP
    else if (tourTimeline === 'BEDROOM_PAN') {
      const currentItem = bedroomObjects.find(o => o.id === activeObject) || bedroomObjects[0];
      targetPosVec.current.set(currentItem.pos[0], currentItem.pos[1], currentItem.pos[2]);
      targetLookVec.current.set(...currentItem.lookAt);

      timer.current += delta;
      if (timer.current > 5.0) {
        timer.current = 0;
        const index = bedroomObjects.findIndex(o => o.id === activeObject);
        if (index < bedroomObjects.length - 1) {
          setActiveObject(bedroomObjects[index + 1].id);
        } else {
          setTourTimeline('TELESCOPE_CHOOSE');
          setActiveObject(null);
        }
      }
    }

    // PHASE D: SAT MAP CROSSROADS SELECTION OVERVIEW
    else if (tourTimeline === 'TELESCOPE_CHOOSE') {
      if (!activeDistrict) {
        targetPosVec.current.set(0, 9.0, 0.1);
        targetLookVec.current.set(0, 0, 0);
      } else {
        setTourTimeline('STREET_TRANSIT');
        timer.current = 0;
      }
    }

    // PHASE E: AUTOMATIC NEON STREET SYSTEM CUTSCENE TRANSIT RUN
    else if (tourTimeline === 'STREET_TRANSIT') {
      timer.current += delta;
      if (timer.current < 2.0) {
        targetPosVec.current.set(0, 7.0, 6.0);
        targetLookVec.current.set(0, -1, -1);
      } else if (timer.current < 4.0) {
        targetPosVec.current.set(3.0, 1.0, -2.0);
        targetLookVec.current.set(-3.0, 1.0, 2.0);
      } else {
        timer.current = 0;
        setTourTimeline('ROOM_EXPLORE');
      }
    }

    // PHASE F: ACTIVE SYSTEM DISTRICT ROOM EXPLORATION
    else if (tourTimeline === 'ROOM_EXPLORE' && activeDistrict) {
      const targetRoom = districtTargets[activeDistrict] || { pos: [0, 4, 7], lookAt: [0, 0, 0] };
      targetPosVec.current.set(...targetRoom.pos);
      targetLookVec.current.set(...targetRoom.lookAt);
    }

    // PHASE G: THE FRACTURED VOID EDGE ISLAND OVERFALL VACUUM
    else if (tourTimeline === 'THE_VOID_FALL') {
      targetPosVec.current.set(Math.sin(elapsed * 5) * 3, camera.position.y - 0.15, Math.cos(elapsed * 5) * 3);
      targetLookVec.current.set(0, camera.position.y - 5, 0);
    }

    // Smooth camera interpolation execution
    camera.position.lerp(targetPosVec.current, 0.035);
    currentLookAt.current.lerp(targetLookVec.current, 0.035);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

// ==========================================
// 2. BIOLOGICAL BUTTERFLY GUIDE MESH SYSTEM
// ==========================================
function RealButterflyGuide() {
  const butterflyGroup = useRef();
  const leftWing = useRef();
  const rightWing = useRef();

  const tourTimeline = useWorldStore((state) => state.tourTimeline);
  const activeDistrict = useWorldStore((state) => state.activeDistrict);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!butterflyGroup.current) return;

    let flapSpeed = 16;
    let flapAmp = 0.7;

    if (tourTimeline === 'STREET_TRANSIT' || tourTimeline === 'SATELLITE_ZOOM') {
      flapSpeed = 32; // Flapping speeds accelerate on long-range street runs
      flapAmp = 0.9;
    } else if (tourTimeline === 'ROOM_EXPLORE') {
      flapSpeed = 5;  // Soft, peaceful rest cadence when perching next to characters
      flapAmp = 0.3;
    }

    if (leftWing.current && rightWing.current) {
      leftWing.current.rotation.y = Math.cos(t * flapSpeed) * flapAmp;
      rightWing.current.rotation.y = -Math.cos(t * flapSpeed) * flapAmp;
    }

    // FLIGHT ORBIT COORDINATES
    if (tourTimeline === 'BUTTERFLY_WAKE') {
      const radius = 8.0; // Expanded orbit path radius prevents her from clipping behind camera frame edge
      const speed = t * 1.1;
      butterflyGroup.current.position.set(Math.sin(speed) * radius, 2.0 + Math.sin(t) * 0.4, Math.cos(speed) * radius);
      butterflyGroup.current.rotation.y = speed + Math.PI / 2;
    } 
    else if (tourTimeline === 'BEDROOM_PAN') {
      butterflyGroup.current.position.set(state.camera.position.x + Math.sin(t * 2) * 0.2, state.camera.position.y - 0.15, state.camera.position.z - 0.5);
    }
    else if (tourTimeline === 'ROOM_EXPLORE' && activeDistrict) {
      if (activeDistrict === 'workshop') butterflyGroup.current.position.set(-3.1, 0.8, 0.3);
      if (activeDistrict === 'greenhouse') butterflyGroup.current.position.set(3.1, 0.8, -0.3);
    }
    else {
      butterflyGroup.current.position.set(0, Math.sin(t * 1.8) * 0.15 + 1.8, 0);
    }
  });

  return (
    <group ref={butterflyGroup}>
      {/* Central Micro Body Spine */}
      <mesh castShadow>
        <cylinderGeometry args={[0.008, 0.008, 0.14, 6]} />
        <meshStandardMaterial color="#111111" roughness={0.9} />
      </mesh>
      
      {/* Left Wing Plane */}
      <mesh ref={leftWing} position={[-0.07, 0, 0]}>
        <boxGeometry args={[0.14, 0.11, 0.002]} />
        <meshStandardMaterial color="#ff7300" emissive="#aa3300" emissiveIntensity={1.5} roughness={0.2} />
      </mesh>

      {/* Right Wing Plane */}
      <mesh ref={rightWing} position={[0.07, 0, 0]}>
        <boxGeometry args={[0.14, 0.11, 0.002]} />
        <meshStandardMaterial color="#ff7300" emissive="#aa3300" emissiveIntensity={1.5} roughness={0.2} />
      </mesh>
    </group>
  );
}

// ==========================================
// 3. THE ZEE CHARACTER SPRITE GENERATOR
// ==========================================
function ZeeDistrictBillboard({ outfitType }) {
  const textureLoader = new THREE.TextureLoader();

  const assetMap = {
    workshop: '/assets/sprites/zee_workshop.png',     
    greenhouse: '/assets/sprites/zee_greenhouse.png', 
    court: '/assets/sprites/zee_basketball.png',       
    research: '/assets/sprites/zee_research.png',      
    void: '/assets/sprites/zee_void_phantom.png'       
  };

  const selectedTexture = assetMap[outfitType];
  if (!selectedTexture) return null;

  return (
    <group position={[0, 0.6, 0]}>
      <sprite scale={[1.4, 1.4, 1.4]}>
        <spriteMaterial 
          map={textureLoader.load(selectedTexture)} 
          transparent={true} 
          alphaTest={0.4} 
        />
      </sprite>
    </group>
  );
}

// ==========================================
// 4. MAIN LANDMASS WORLD GRID ARCHITECTURE
// ==========================================
function WorldGridMap() {
  const worldRef = useRef();
  const tourTimeline = useWorldStore((state) => state.tourTimeline);
  const activeDistrict = useWorldStore((state) => state.activeDistrict);
  const setActiveDistrict = useWorldStore((state) => state.setActiveDistrict);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!worldRef.current) return;

    if (tourTimeline === 'TV_INTRO' || tourTimeline === 'BUTTERFLY_WAKE') {
      worldRef.current.rotation.y = t * 0.05; 
      worldRef.current.position.y = 0;
    } else if (tourTimeline === 'THE_VOID_FALL') {
      worldRef.current.position.y += 0.06; 
    } else {
      worldRef.current.rotation.y = 0; 
    }
  });

  return (
    <group ref={worldRef}>
      <RealButterflyGuide />

      {/* BACKGROUND/BASE MODE: SPACE MAP ORBIT GLOBE */}
      {(tourTimeline === 'TV_INTRO' || tourTimeline === 'BUTTERFLY_WAKE') ? (
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[4.5, 24, 24]} />
          <meshStandardMaterial color="#04020d" wireframe stroke="#4c1d95" emissive="#1e1b4b" emissiveIntensity={0.5} />
        </mesh>
      ) : (
        /* THE PHYSICAL OBSERVATORY ARCHITECTURAL ROOM ASSEMBLY (Replaces old primitive box) */
        <group position={[0, 0, 0]}>
          {/* Room Base Floor Interior Mat */}
          <mesh position={[0, -0.05, 0]} receiveShadow>
            <cylinderGeometry args={[1.5, 1.5, 0.1, 8]} />
            <meshStandardMaterial color="#0b0821" roughness={0.7} />
          </mesh>

          {/* 8 Structural Peripheral Pillars framing a late-night workspace shell */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const angle = (i / 8) * Math.PI * 2;
            return (
              <mesh key={i} position={[Math.sin(angle) * 1.4, 0.6, Math.cos(angle) * 1.4]}>
                <boxGeometry args={[0.06, 1.2, 0.06]} />
                <meshStandardMaterial color="#1a103c" roughness={0.5} />
              </mesh>
            );
          })}

          {/* Glowing Skylight Frame Gasket for the Satellite Entry Sequence to lock into */}
          <mesh position={[0, 1.2, 0]}>
            <torusGeometry args={[1.4, 0.03, 8, 24]} />
            <meshStandardMaterial color="#1d113b" emissive="#00f0ff" emissiveIntensity={0.3} />
          </mesh>
        </group>
      )}

      {/* ENVIRONMENT ROOM MODULE INJECTIONS */}
      {tourTimeline !== 'TV_INTRO' && tourTimeline !== 'BUTTERFLY_WAKE' && (
        <>
          {/* DISTRICT 1: THE INVENTOR WORKSHOP NODE */}
          <group position={[-3.5, 0, 0]} onClick={(e) => { if (tourTimeline === 'TELESCOPE_CHOOSE') { e.stopPropagation(); setActiveDistrict('workshop'); }}}>
            <mesh castShadow><boxGeometry args={[1, 0.8, 1]} /><meshStandardMaterial color="#1f2937" roughness={0.9} /></mesh>
            {activeDistrict === 'workshop' && <ZeeDistrictBillboard outfitType="workshop" />}
          </group>

          {/* DISTRICT 2: THE IDEA GREENHOUSE NODE */}
          <group position={[3.5, 0, 0]} onClick={(e) => { if (tourTimeline === 'TELESCOPE_CHOOSE') { e.stopPropagation(); setActiveDistrict('greenhouse'); }}}>
            <mesh><sphereGeometry args={[0.6, 12, 12]} /><MeshDistortMaterial color="#166534" speed={1.5} distort={0.2} radius={0.6} /></mesh>
            {activeDistrict === 'greenhouse' && <ZeeDistrictBillboard outfitType="greenhouse" />}
          </group>

          {/* DISTRICT 3: THE NEIGHBORHOOD BASKETBALL QUARTER */}
          <group position={[0, 0, 4.5]} onClick={(e) => { if (tourTimeline === 'TELESCOPE_CHOOSE') { e.stopPropagation(); setActiveDistrict('court'); }}}>
            <mesh><boxGeometry args={[1.6, 0.1, 1.2]} /><meshStandardMaterial color="#ea580c" roughness={0.5} /></mesh>
            {activeDistrict === 'court' && <ZeeDistrictBillboard outfitType="court" />}
          </group>

          {/* DISTRICT 4: THE RESEARCH FACILITY */}
          <group position={[0, 0, -4.5]} onClick={(e) => { if (tourTimeline === 'TELESCOPE_CHOOSE') { e.stopPropagation(); setActiveDistrict('research'); }}}>
            <mesh><cylinderGeometry args={[0.7, 0.7, 0.9, 8]} /><meshStandardMaterial color="#1e3a8a" flatShading /></mesh>
            {activeDistrict === 'research' && <ZeeDistrictBillboard outfitType="research" />}
          </group>

          {/* DISTRICT 5: THE UNDERBELLY NETWORK VOID */}
          <group position={[0, -0.4, -9.0]} onClick={(e) => { if (tourTimeline === 'TELESCOPE_CHOOSE') { e.stopPropagation(); setActiveDistrict('void'); }}}>
            <mesh><torusGeometry args={[0.8, 0.15, 8, 24]} /><meshStandardMaterial color="#000000" wireframe /></mesh>
            {activeDistrict === 'void' && <ZeeDistrictBillboard outfitType="void" />}
          </group>
        </>
      )}
    </group>
  );
}

// ==========================================
// 5. MASTER CANVAS CANVAS CONTEXT CONTAINER
// ==========================================
export default function WorldCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#030008] z-0 select-none">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }} dpr={[1, 1.5]}>
        <color attach="background" args={['#030008']} />
        
        <ambientLight intensity={0.25} color="#1d113b" />
        <directionalLight position={[6, 12, 6]} intensity={1.6} color="#ffffff" castShadow />
        <pointLight position={[-6, -4, -6]} intensity={0.9} color="#00f0ff" />

        <WorldGridMap />
        <CameraRig />
      </Canvas>
    </div>
  );
}

import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useWorldStore } from '../store/useWorldStore';

// ==========================================
// 1. REALISTIC BUTTERFLY (Dual Wing System)
// ==========================================
function RealButterfly() {
  const groupRef = useRef();
  const leftWingRef = useRef();
  const rightWingRef = useRef();
  
  const tourTimeline = useWorldStore((state) => state.tourTimeline);
  const activeObject = useWorldStore((state) => state.activeObject);
  const activeDistrict = useWorldStore((state) => state.activeDistrict);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!groupRef.current) return;

    // Organic wing flapping mechanics from your video reference:
    // It glides gently when perching, but moves fast and flaps intensely during transit
    let flapSpeed = 16;
    let flapAmplitude = 0.7;

    if (tourTimeline === 'STREET_TRANSIT' || tourTimeline === 'SATELLITE_ZOOM') {
      flapSpeed = 30; // Speed dash flying
      flapAmplitude = 0.9;
    } else if (tourTimeline === 'ROOM_EXPLORE' || tourTimeline === 'BEDROOM_PAN') {
      flapSpeed = 5;  // Cozy perching cycle
      flapAmplitude = 0.25;
    }

    // Flap left and right wings around their central hinges
    if (leftWingRef.current && rightWingRef.current) {
      leftWingRef.current.rotation.y = Math.cos(t * flapSpeed) * flapAmplitude;
      rightWingRef.current.rotation.y = -Math.cos(t * flapSpeed) * flapAmplitude;
    }

    // Butterfly structural pathway routing
    if (tourTimeline === 'TV_INTRO' || tourTimeline === 'BUTTERFLY_WAKE') {
      // Circle the entire world globe twice at a measured, dramatic pace
      const radius = 5.5;
      const angle = t * 1.2;
      groupRef.current.position.set(Math.sin(angle) * radius, 1.0 + Math.sin(t) * 0.3, Math.cos(angle) * radius);
      groupRef.current.rotation.y = angle + Math.PI / 2;
    } 
    else if (tourTimeline === 'BEDROOM_PAN') {
      // Hover gracefully over the active focus items in the bedroom observatory
      groupRef.current.position.set(
        state.camera.position.x + Math.sin(t * 2) * 0.15,
        state.camera.position.y - 0.05,
        state.camera.position.z - 0.35
      );
    } 
    else if (tourTimeline === 'ROOM_EXPLORE' && activeDistrict) {
      // Perch comfortably right beside Zee's shoulder marker positions
      if (activeDistrict === 'workshop') groupRef.current.position.set(-2.5, 0.6, 1.2);
      if (activeDistrict === 'greenhouse') groupRef.current.position.set(2.5, 0.6, -1.2);
      if (activeDistrict === 'lab') groupRef.current.position.set(-2.7, 0.6, -2.2);
      if (activeDistrict === 'court') groupRef.current.position.set(2.5, 0.6, 2.2);
    } 
    else {
      // Default rest position hovering over the center observatory
      groupRef.current.position.set(0, Math.sin(t * 2) * 0.08 + 1.1, 0);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central slender butterfly body axis */}
      <mesh castShadow>
        <cylinderGeometry args={[0.008, 0.008, 0.12, 6]} />
        <meshStandardMaterial color="#111111" roughness={0.9} />
      </mesh>
      
      {/* Left Wing Plane */}
      <mesh ref={leftWingRef} position={[-0.065, 0, 0]}>
        <boxGeometry args={[0.13, 0.1, 0.002]} />
        <meshStandardMaterial color="#ef4444" emissive="#b91c1c" emissiveIntensity={1.5} roughness={0.2} />
      </mesh>

      {/* Right Wing Plane */}
      <mesh ref={rightWingRef} position={[0.065, 0, 0]}>
        <boxGeometry args={[0.13, 0.1, 0.002]} />
        <meshStandardMaterial color="#ef4444" emissive="#b91c1c" emissiveIntensity={1.5} roughness={0.2} />
      </mesh>
    </group>
  );
}

// ========================================================
// 2. DYNAMIC ZEE CHARACTER (Billboard Sprite Controller)
// ========================================================
function ZeeCharacter({ districtType }) {
  const textureLoader = new THREE.TextureLoader();
  
  // Mapping paths to Zee's explicit outfit styles per district room
  const outfits = {
    workshop: '/assets/sprites/zee_workshop.png',   // Distressed denim shorts + tool belt + cropped graphic tee + forehead goggles
    greenhouse: '/assets/sprites/zee_greenhouse.png', // Olive utility romper dress + white tank + dropped strap + doc martens
    court: '/assets/sprites/zee_basketball.png',     // Oversized throwback jersey dress + high-tops + crew socks
    lab: '/assets/sprites/zee_research.png',         // White lab coat + mini pencil skirt + plunging crop top
    void: '/assets/sprites/zee_void_phantom.png'     // Digital outline body suit phantom
  };

  const currentTexture = outfits[districtType];
  if (!currentTexture) return null;

  return (
    <group position={[0, 0.5, 0]}>
      <sprite scale={[1.1, 1.1, 1.1]}>
        <spriteMaterial 
          map={textureLoader.load(currentTexture)} 
          transparent={true}
          alphaTest={0.4}
        />
      </sprite>
    </group>
  );
}

// ===================================================
// 3. CINEMATIC CAMERA RIG & SATELLITE ZOOM SYSTEM
// ===================================================
function CameraRig() {
  const { camera } = useThree();
  const tourTimeline = useWorldStore((state) => state.tourTimeline);
  const activeObject = useWorldStore((state) => state.activeObject);
  const activeDistrict = useWorldStore((state) => state.activeDistrict);
  const setTourTimeline = useWorldStore((state) => state.setTourTimeline);
  const setActiveObject = useWorldStore((state) => state.setActiveObject);

  const targetPosVec = useRef(new THREE.Vector3(0, 3, 13));
  const targetLookVec = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  
  const timer = useRef(0);

  // Bedroom cozy observatory parameters
  const bedroomObjects = [
    { id: 'laptop', pos: [-0.5, 0.4, 0.7], lookAt: [-0.5, 0.2, 0.2] },
    { id: 'books', pos: [0.6, 0.3, 0.8], lookAt: [0.6, 0.1, 0.1] },
    { id: 'basketball', pos: [0.7, -0.5, 1.0], lookAt: [0.7, -0.6, 0.5] },
    { id: 'mirror', pos: [-1.1, 0.4, 0.2], lookAt: [-1.6, 0.4, 0.2] },
    { id: 'telescope', pos: [0.0, 0.5, -0.4], lookAt: [0.0, 0.6, -1.3] }
  ];

  // Specific 3D vectors focused onto Zee's station platforms inside the rooms
  const districtTargets = {
    workshop: { pos: [-2.9, 1.3, 2.9], lookAt: [-1.9, 0.2, 1.2] },
    greenhouse: { pos: [2.9, 1.3, -2.9], lookAt: [1.9, 0.2, -1.2] },
    lab: { pos: [-3.3, 1.3, -2.9], lookAt: [-2.0, 0.2, -1.8] },
    court: { pos: [2.9, 1.3, 2.9], lookAt: [1.9, 0.2, 1.8] }
  };

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();

    // PHASE A: GLOBAL WORLD VIEW ORBIT
    if (tourTimeline === 'TV_INTRO' || tourTimeline === 'BUTTERFLY_WAKE') {
      targetPosVec.current.set(Math.sin(elapsed * 0.2) * 12, 4, Math.cos(elapsed * 0.2) * 12);
      targetLookVec.current.set(0, 0, 0);

      if (tourTimeline === 'BUTTERFLY_WAKE') {
        timer.current += delta;
        // Let the butterfly complete 2 revolutions around the globe before locking coordinates
        if (timer.current > 6.0) {
          timer.current = 0;
          setTourTimeline('SATELLITE_ZOOM');
        }
      }
    }

    // NEW PHASE: HIGH-SPEED SATELLITE MAP ZOOM-IN
    else if (tourTimeline === 'SATELLITE_ZOOM') {
      // Rapidly swoop down from orbit, plunging right down into the Observatory room interface window
      targetPosVec.current.set(0, 1.6, 2.0);
      targetLookVec.current.set(0, 0.4, 0);
      
      timer.current += delta;
      if (timer.current > 2.5) {
        timer.current = 0;
        setTourTimeline('BEDROOM_PAN');
        setActiveObject('laptop');
      }
    }

    // PHASE B: COZY OBSERVATORY BEDROOM PAN LIST
    else if (tourTimeline === 'BEDROOM_PAN') {
      const currentItem = bedroomObjects.find(o => o.id === activeObject) || bedroomObjects[0];
      targetPosVec.current.set(currentItem.pos[0], currentItem.pos[1] + 0.15, currentItem.pos[2]);
      targetLookVec.current.set(...currentItem.lookAt);

      timer.current += delta;
      if (timer.current > 5.0) { // Slower, paced atmosphere transition to let descriptions breathe
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

    // PHASE C: TOP-DOWN RECONNAISSANCE SATELLITE MAP MATRIX
    else if (tourTimeline === 'TELESCOPE_CHOOSE') {
      if (!activeDistrict) {
        targetPosVec.current.set(0, 6.5, 0.1);
        targetLookVec.current.set(0, 0, 0);
      } else {
        setTourTimeline('STREET_TRANSIT');
        timer.current = 0;
      }
    }

    // PHASE D: AUTOMATIC NEON STREET MATRIX TRANSIT
    else if (tourTimeline === 'STREET_TRANSIT') {
      timer.current += delta;
      if (timer.current < 1.5) {
        targetPosVec.current.set(0, 5.0, 4.0); // Curve over skyscraper lines
        targetLookVec.current.set(0, -0.5, -1);
      } else if (timer.current < 3.5) {
        targetPosVec.current.set(1.5, 0.7, -2.0); // Plunge low into neon street levels
        targetLookVec.current.set(-1.5, 0.7, 1.5);
      } else {
        timer.current = 0;
        setTourTimeline('ROOM_EXPLORE');
      }
    }

    // PHASE E: ROOM FOCUS EXPLORATION (Zee meeting hubs)
    else if (tourTimeline === 'ROOM_EXPLORE' && activeDistrict) {
      const targetRoom = districtTargets[activeDistrict] || { pos: [0, 3, 6], lookAt: [0, 0, 0] };
      targetPosVec.current.set(...targetRoom.pos);
      targetLookVec.current.set(...targetRoom.lookAt);
    }

    // PHASE F: DIZZYING VACUUM INDUCED DROP THROUGH THE VOID
    else if (tourTimeline === 'THE_VOID_FALL') {
      targetPosVec.current.set(Math.sin(elapsed * 5) * 1.5, camera.position.y - 0.12, Math.cos(elapsed * 5) * 1.5);
      targetLookVec.current.set(0, camera.position.y - 5, 0);
    }

    // Balanced cinematic interpolation interpolation speeds
    camera.position.lerp(targetPosVec.current, 0.038);
    currentLookAt.current.lerp(targetLookVec.current, 0.038);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

// ==========================================================
// 4. FLOATING SYSTEM COMPLEX (The 6 Unique Narrative Rooms)
// ==========================================================
function FloatingIsland() {
  const worldGroupRef = useRef(null);
  const tourTimeline = useWorldStore((state) => state.tourTimeline);
  const activeDistrict = useWorldStore((state) => state.activeDistrict);
  const setActiveDistrict = useWorldStore((state) => state.setActiveDistrict);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (worldGroupRef.current) {
      // Smooth foundational planetary rhythm rotation
      worldGroupRef.current.position.y = Math.sin(t * 1.0) * 0.08;
      
      if (tourTimeline === 'TV_INTRO' || tourTimeline === 'BUTTERFLY_WAKE' || tourTimeline === 'TELESCOPE_CHOOSE') {
        worldGroupRef.current.rotation.y = t * 0.03;
      } else if (tourTimeline === 'THE_VOID_FALL') {
        worldGroupRef.current.position.y += 0.08; // Landmass rockets up away as user falls
      }
    }
  });

  return (
    <group ref={worldGroupRef}>
      <RealButterfly />

      {/* ===================================================
          0. CORE RENDER: GLOBAL WORLD GLOBE & WINDOW ENTRY
         =================================================== */}
      {(tourTimeline === 'TV_INTRO' || tourTimeline === 'BUTTERFLY_WAKE' || tourTimeline === 'SATELLITE_ZOOM') && (
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[3.2, 24, 24]} />
          <meshStandardMaterial color="#05020c" wireframe stroke="#581c87" opacity={0.4} transparent />
        </mesh>
      )}

      {/* Main Structural Node Platform */}
      <mesh position={[0, -1.2, 0]} receiveShadow>
        <cylinderGeometry args={[4.5, 3.5, 1.0, 8]} />
        <meshStandardMaterial color="#050312" flatShading roughness={0.9} />
      </mesh>

      {/* THE OBSERVATORY COZY HUB (Rendezvous Point - No Zee Sprite) */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <dodecahedronGeometry args={[0.7]} />
        <meshStandardMaterial color="#1e1b4b" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* ===================================================
          1. DISTRICT ROOM: THE DEV WORKSHOP (Conveyor Mechanics)
         =================================================== */}
      <group position={[-1.9, 0.1, 1.2]} onClick={(e) => {
        if (tourTimeline !== 'TELESCOPE_CHOOSE') return;
        e.stopPropagation();
        setActiveDistrict('workshop');
      }}>
        <mesh castShadow>
          <boxGeometry args={[0.6, 0.8, 0.6]} />
          <meshStandardMaterial color="#00f0ff" roughness={0.7} flatShading />
        </mesh>
        {/* Conveyor Belt Blueprint Frame Indicator */}
        <mesh position={[0, -0.38, 0]}>
          <boxGeometry args={[1.2, 0.05, 0.3]} />
          <meshStandardMaterial color="#083344" wireframe />
        </mesh>
        {activeDistrict === 'workshop' && <ZeeCharacter districtType="workshop" />}
      </group>

      {/* ===================================================
          2. DISTRICT ROOM: THE IDEA GREENHOUSE (Plant Formations)
         =================================================== */}
      <group position={[1.9, 0.1, -1.2]} onClick={(e) => {
        if (tourTimeline !== 'TELESCOPE_CHOOSE') return;
        e.stopPropagation();
        setActiveDistrict('greenhouse');
      }}>
        <mesh castShadow>
          <sphereGeometry args={[0.45, 8, 8]} />
          <MeshDistortMaterial color="#c084fc" speed={1.5} distort={0.25} radius={0.45} />
        </mesh>
        {activeDistrict === 'greenhouse' && <ZeeCharacter districtType="greenhouse" />}
      </group>

      {/* ===================================================
          3. DISTRICT ROOM: THE RESEARCH FACILITY (Multi-Wings)
         =================================================== */}
      <group position={[-2.2, 0.1, -1.9]} onClick={(e) => {
        if (tourTimeline !== 'TELESCOPE_CHOOSE') return;
        e.stopPropagation();
        setActiveDistrict('lab');
      }}>
        {/* Central Hub Core */}
        <mesh castShadow>
          <cylinderGeometry args={[0.35, 0.35, 0.7, 6]} />
          <meshStandardMaterial color="#4c1d95" roughness={0.5} />
        </mesh>
        {/* Branching Room Wings (AI room, Robotics wing, Algorithm node, Writing studio) */}
        <mesh position={[0.4, 0, 0.2]} rotation={[0, 0.5, 0]}>
          <boxGeometry args={[0.3, 0.2, 0.5]} />
          <meshStandardMaterial color="#5b21b6" wireframe />
        </mesh>
        <mesh position={[-0.4, 0, -0.2]}>
          <boxGeometry args={[0.3, 0.2, 0.5]} />
          <meshStandardMaterial color="#5b21b6" wireframe />
        </mesh>
        {activeDistrict === 'lab' && <ZeeCharacter districtType="research" />}
      </group>

      {/* ===================================================
          4. DISTRICT ROOM: THE BASKETBALL QUARTER (Outdoor Court)
         =================================================== */}
      <group position={[2.1, 0.05, 2.1]} onClick={(e) => {
        if (tourTimeline !== 'TELESCOPE_CHOOSE') return;
        e.stopPropagation();
        setActiveDistrict('court');
      }}>
        <mesh castShadow>
          <boxGeometry args={[0.8, 0.1, 0.6]} />
          <meshStandardMaterial color="#ea580c" roughness={0.9} />
        </mesh>
        {/* Small Backboard Goal Overlay Mesh Rim */}
        <mesh position={[0, 0.4, -0.25]}>
          <boxGeometry args={[0.3, 0.2, 0.02]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {activeDistrict === 'court' && <ZeeCharacter districtType="court" />}
      </group>

      {/* ===================================================
          5. DISTRICT ROOM: THE VOID OUTPOST (The Fractured Edge)
         =================================================== */}
      <group position={[0, -0.3, -4.0]} onClick={(e) => {
        if (tourTimeline !== 'TELESCOPE_CHOOSE') return;
        e.stopPropagation();
        setActiveDistrict('void');
      }}>
        {/* Distorted Fragmented Spatial Portal Frame */}
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[0.4, 0.03, 4, 4]} />
          <meshStandardMaterial color="#3b0764" wireframe emissive="#2e1065" />
        </mesh>
        {activeDistrict === 'void' && <ZeeCharacter districtType="void" />}
      </group>

    </group>
  );
}

// ==========================================
// 5. MASTER INTEGRATED CANVAS MATRIX WINDOW
// ==========================================
export default function WorldCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#020006] z-0 select-none">
      <Canvas camera={{ position: [0, 3, 13], fov: 45 }} dpr={[1, 1.5]}>
        <color attach="background" args={['#020006']} />
        
        <ambientLight intensity={0.22} color="#1e1538" />
        <directionalLight position={[6, 12, 6]} intensity={1.4} color="#ffffff" castShadow />
        <pointLight position={[-6, -3, -6]} intensity={0.9} color="#00f0ff" />
        <pointLight position={[4, 5, -4]} intensity={0.7} color="#d8b4fe" />

        <FloatingIsland />
        <CameraRig />
      </Canvas>
    </div>
  );
}

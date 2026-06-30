// src/components/WorldCanvas.jsx
import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useWorldStore } from '../store/useWorldStore';

// =========================================================================
// 1. CINEMATIC CAMERA RIG (DYNAMICALLY TRAILS THE BUTTERFLY ON ORBIT)
// =========================================================================
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

  const bedroomObjects = [
    { id: 'laptop', pos: [-0.6, 0.6, 1.0], lookAt: [-0.6, 0.4, 0.3] },
    { id: 'books', pos: [0.7, 0.5, 1.1], lookAt: [0.7, 0.3, 0.2] },
    { id: 'basketball', pos: [0.8, -0.4, 1.4], lookAt: [0.8, -0.5, 0.6] },
    { id: 'mirror', pos: [-1.2, 0.7, 0.4], lookAt: [-1.8, 0.7, 0.2] },
    { id: 'telescope', pos: [0.0, 0.8, -0.3], lookAt: [0.0, 0.9, -1.5] }
  ];

  const districtTargets = {
    workshop: { pos: [-3.5, 1.2, 3.5], lookAt: [-3.5, 0.5, 0] },
    greenhouse: { pos: [3.5, 1.2, -3.5], lookAt: [3.5, 0.5, 0] },
    court: { pos: [4.5, 1.5, 4.5], lookAt: [4.5, 0.5, 0] },
    research: { pos: [-4.5, 1.5, -4.5], lookAt: [-4.5, 0.5, 0] },
    void: { pos: [0, 2.0, -8.0], lookAt: [0, 0, -12.0] }
  };

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();

    // DYNAMIC TRACKING INTRO ORBIT
    if (tourTimeline === 'TV_INTRO' || tourTimeline === 'BUTTERFLY_WAKE') {
      // 1. Track the exact position angle of the butterfly's trajectory
      const speedModifier = 0.5; 
      const currentButterflyAngle = elapsed * speedModifier;

      // 2. Position the camera to follow *behind* the butterfly's orbit path from a safe distance
      const cameraFollowAngle = currentButterflyAngle - 0.6; 
      const cameraRadius = 11.5; 
      
      targetPosVec.current.set(
        Math.sin(cameraFollowAngle) * cameraRadius,
        4.0 + Math.sin(elapsed * 0.5) * 1.0, // Soft atmospheric vertical breathing
        Math.cos(cameraFollowAngle) * cameraRadius
      );

      // 3. Keep the camera lens directly centered on the moving butterfly path vectors
      targetLookVec.current.set(
        Math.sin(currentButterflyAngle) * 4.5,
        1.8,
        Math.cos(currentButterflyAngle) * 4.5
      );

      // TIMELINE ENFORCEMENT: Exactly 2 complete rotations around the map (4 * PI)
      if (tourTimeline === 'BUTTERFLY_WAKE') {
        const totalRequiredTime = (Math.PI * 2 * 2) / speedModifier; // ~25 seconds for smooth cinematic tracking
        timer.current += delta;
        if (timer.current >= totalRequiredTime) {
          timer.current = 0;
          setTourTimeline('SATELLITE_ZOOM');
        }
      }
    }

    else if (tourTimeline === 'SATELLITE_ZOOM') {
      timer.current += delta;
      const zoomProgress = Math.min(timer.current / 3.5, 1.0); 
      const currentHeight = THREE.MathUtils.lerp(12.0, 1.8, zoomProgress);
      const currentZOffset = THREE.MathUtils.lerp(0.1, 1.6, zoomProgress);

      targetPosVec.current.set(0, currentHeight, currentZOffset);
      targetLookVec.current.set(0, 0.3, 0);
      
      if (timer.current > 3.5) {
        timer.current = 0;
        setTourTimeline('BEDROOM_PAN');
        setActiveObject('laptop');
      }
    }

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

    else if (tourTimeline === 'TELESCOPE_CHOOSE') {
      if (!activeDistrict) {
        targetPosVec.current.set(0, 9.0, 0.1);
        targetLookVec.current.set(0, 0, 0);
      } else {
        setTourTimeline('STREET_TRANSIT');
        timer.current = 0;
      }
    }

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

    else if (tourTimeline === 'ROOM_EXPLORE' && activeDistrict) {
      const targetRoom = districtTargets[activeDistrict] || { pos: [0, 4, 7], lookAt: [0, 0, 0] };
      targetPosVec.current.set(...targetRoom.pos);
      targetLookVec.current.set(...targetRoom.lookAt);
    }

    else if (tourTimeline === 'THE_VOID_FALL') {
      targetPosVec.current.set(Math.sin(elapsed * 5) * 3, camera.position.y - 0.15, Math.cos(elapsed * 5) * 3);
      targetLookVec.current.set(0, camera.position.y - 5, 0);
    }

    camera.position.lerp(targetPosVec.current, 0.04);
    currentLookAt.current.lerp(targetLookVec.current, 0.04);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

// =========================================================================
// 2. HIGH-FIDELITY ORGANIC BUTTERFLY STRUCTURE (USES REAL TEXTURE MASKS)
// =========================================================================
function RealButterflyGuide() {
  const butterflyGroup = useRef();
  const leftWingRef = useRef();
  const rightWingRef = useRef();

  const tourTimeline = useWorldStore((state) => state.tourTimeline);
  const activeDistrict = useWorldStore((state) => state.activeDistrict);

  // TEXTURE IMPLEMENTATION RULE:
  // Place your extracted transparent png file of the butterfly inside your local public folder at:
  // public/assets/textures/butterfly_wing.png
  const textureLoader = new THREE.TextureLoader();
  const wingTexture = textureLoader.load('/assets/textures/butterfly_wing.png');
  wingTexture.colorSpace = THREE.SRGBColorSpace;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!butterflyGroup.current) return;

    let flapSpeed = 14; 
    let flapAmp = 0.8;

    if (tourTimeline === 'SATELLITE_ZOOM') {
      flapSpeed = 28; 
      flapAmp = 1.0;
    } else if (tourTimeline === 'ROOM_EXPLORE') {
      flapSpeed = 5;  
      flapAmp = 0.3;
    }

    // Biological rotation flapping math mimicking your file layout
    if (leftWingRef.current && rightWingRef.current) {
      const leftAngle = (Math.sin(t * flapSpeed) * flapAmp) - 0.15;
      leftWingRef.current.rotation.z = leftAngle;
      rightWingRef.current.rotation.z = -leftAngle;
    }

    // TRACKING PACING MATCH MATRIX
    if (tourTimeline === 'BUTTERFLY_WAKE') {
      const radius = 4.5; 
      const speedModifier = 0.5; // Must sync perfectly with CameraRig tracking parameters
      const orbitalSpeed = t * speedModifier; 
      
      butterflyGroup.current.position.set(
        Math.sin(orbitalSpeed) * radius, 
        1.8 + Math.sin(t * 1.2) * 0.15, 
        Math.cos(orbitalSpeed) * radius
      );
      
      butterflyGroup.current.rotation.set(0, -orbitalSpeed + Math.PI, 0);
    } 
    else if (tourTimeline === 'SATELLITE_ZOOM') {
      const currentY = butterflyGroup.current.position.y;
      butterflyGroup.current.position.x = THREE.MathUtils.lerp(butterflyGroup.current.position.x, 0, 0.03);
      butterflyGroup.current.position.z = THREE.MathUtils.lerp(butterflyGroup.current.position.z, 0, 0.03);
      butterflyGroup.current.position.y = THREE.MathUtils.lerp(currentY, 0.6, 0.025);
      butterflyGroup.current.rotation.set(Math.PI / 2.5, 0, 0);
    }
    else if (tourTimeline === 'BEDROOM_PAN') {
      butterflyGroup.current.position.set(
        state.camera.position.x + 0.2, 
        state.camera.position.y - 0.1, 
        state.camera.position.z - 0.5
      );
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
    <group ref={butterflyGroup} scale={[1.3, 1.3, 1.3]}>
      {/* Central Segment torso */}
      <mesh><cylinderGeometry args={[0.005, 0.003, 0.15, 6]} /><meshStandardMaterial color="#060103" /></mesh>
      
      {/* LEFT ORGANIC WING BLADE MAP */}
      <group ref={leftWingRef} position={[-0.005, 0, 0]}>
        <mesh position={[-0.13, 0, 0.01]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.26, 0.24]} />
          <meshStandardMaterial 
            map={wingTexture}
            transparent={true} 
            alphaTest={0.15}
            side={THREE.DoubleSide}
            emissive="#ff003c" 
            emissiveIntensity={2.2} 
            opacity={0.98} 
          />
        </mesh>
      </group>
      
      {/* RIGHT ORGANIC WING BLADE MAP */}
      <group ref={rightWingRef} position={[0.005, 0, 0]}>
        <mesh position={[0.13, 0, 0.01]} rotation={[-Math.PI / 2, 0, Math.PI]}>
          <planeGeometry args={[0.26, 0.24]} />
          <meshStandardMaterial 
            map={wingTexture}
            transparent={true} 
            alphaTest={0.15}
            side={THREE.DoubleSide}
            emissive="#ff003c" 
            emissiveIntensity={2.2} 
            opacity={0.98} 
          />
        </mesh>
      </group>
    </group>
  );
}

// =========================================================================
// 3. THE ZEE CHARACTER SPRITE GENERATOR
// =========================================================================
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

// =========================================================================
// 4. MAIN LANDMASS WORLD GRID ARCHITECTURE
// =========================================================================
function WorldGridMap() {
  const worldRef = useRef();
  const tourTimeline = useWorldStore((state) => state.tourTimeline);
  const activeDistrict = useWorldStore((state) => state.activeDistrict);
  const setActiveDistrict = useWorldStore((state) => state.setActiveDistrict);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!worldRef.current) return;

    if (tourTimeline === 'TV_INTRO' || tourTimeline === 'BUTTERFLY_WAKE') {
      worldRef.current.rotation.y = t * 0.02; 
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

      {(tourTimeline === 'TV_INTRO' || tourTimeline === 'BUTTERFLY_WAKE') ? (
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[4.5, 24, 24]} />
          <meshStandardMaterial color="#04020d" wireframe stroke="#4c1d95" emissive="#1e1b4b" emissiveIntensity={0.5} />
        </mesh>
      ) : (
        <group position={[0, 0, 0]}>
          <mesh position={[0, -0.05, 0]} receiveShadow>
            <cylinderGeometry args={[1.5, 1.5, 0.1, 8]} />
            <meshStandardMaterial color="#0b0821" roughness={0.7} />
          </mesh>

          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const angle = (i / 8) * Math.PI * 2;
            return (
              <mesh key={i} position={[Math.sin(angle) * 1.4, 0.6, Math.cos(angle) * 1.4]}>
                <boxGeometry args={[0.06, 1.2, 0.06]} />
                <meshStandardMaterial color="#1a103c" roughness={0.5} />
              </mesh>
            );
          })}

          <mesh position={[0, 1.2, 0]}>
            <torusGeometry args={[1.4, 0.03, 8, 24]} />
            <meshStandardMaterial color="#1d113b" emissive="#00f0ff" emissiveIntensity={0.3} />
          </mesh>
        </group>
      )}

      {tourTimeline !== 'TV_INTRO' && tourTimeline !== 'BUTTERFLY_WAKE' && (
        <>
          <group position={[-3.5, 0, 0]} onClick={(e) => { if (tourTimeline === 'TELESCOPE_CHOOSE') { e.stopPropagation(); setActiveDistrict('workshop'); }}}>
            <mesh castShadow><boxGeometry args={[1, 0.8, 1]} /><meshStandardMaterial color="#1f2937" roughness={0.9} /></mesh>
            {activeDistrict === 'workshop' && <ZeeDistrictBillboard outfitType="workshop" />}
          </group>

          <group position={[3.5, 0, 0]} onClick={(e) => { if (tourTimeline === 'TELESCOPE_CHOOSE') { e.stopPropagation(); setActiveDistrict('greenhouse'); }}}>
            <mesh><sphereGeometry args={[0.6, 12, 12]} /><MeshDistortMaterial color="#166534" speed={1.5} distort={0.2} radius={0.6} /></mesh>
            {activeDistrict === 'greenhouse' && <ZeeDistrictBillboard outfitType="greenhouse" />}
          </group>

          <group position={[0, 0, 4.5]} onClick={(e) => { if (tourTimeline === 'TELESCOPE_CHOOSE') { e.stopPropagation(); setActiveDistrict('court'); }}}>
            <mesh><boxGeometry args={[1.6, 0.1, 1.2]} /><meshStandardMaterial color="#ea580c" roughness={0.5} /></mesh>
            {activeDistrict === 'court' && <ZeeDistrictBillboard outfitType="court" />}
          </group>

          <group position={[0, 0, -4.5]} onClick={(e) => { if (tourTimeline === 'TELESCOPE_CHOOSE') { e.stopPropagation(); setActiveDistrict('research'); }}}>
            <mesh><cylinderGeometry args={[0.7, 0.7, 0.9, 8]} /><meshStandardMaterial color="#1e3a8a" flatShading /></mesh>
            {activeDistrict === 'research' && <ZeeDistrictBillboard outfitType="research" />}
          </group>

          <group position={[0, -0.4, -9.0]} onClick={(e) => { if (tourTimeline === 'TELESCOPE_CHOOSE') { e.stopPropagation(); setActiveDistrict('void'); }}}>
            <mesh><torusGeometry args={[0.8, 0.15, 8, 24]} /><meshStandardMaterial color="#000000" wireframe /></mesh>
            {activeDistrict === 'void' && <ZeeDistrictBillboard outfitType="void" />}
          </group>
        </>
      )}
    </group>
  );
}

// =========================================================================
// 5. MASTER CANVAS CONTAINER
// =========================================================================
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

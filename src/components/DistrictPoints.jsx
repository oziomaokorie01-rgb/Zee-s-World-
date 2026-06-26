import React from 'react';
import { useWorldStore } from '../store/useWorldStore';

export default function DistrictPoints() {
  const setActiveDistrict = useWorldStore((state) => state.setActiveDistrict);

  return (
    <group>
      {/* Central Core / Hub */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color="#3b0764" wireframe />
      </mesh>

      {/* Development Hub (Left Workspace) */}
      <mesh 
        position={[-10, 0, 0]} 
        onClick={(e) => {
          e.stopPropagation();
          setActiveDistrict('development');
        }}
      >
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color="#a855f7" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Design Node (Center-Elevated) */}
      <mesh 
        position={[0, 2, -8]} 
        onClick={(e) => {
          e.stopPropagation();
          setActiveDistrict('design');
        }}
      >
        <coneGeometry args={[2, 4, 4]} />
        <meshStandardMaterial color="#fafafa" emissive="#7c3aed" emissiveIntensity={0.2} />
      </mesh>

      {/* Research Sector (Right Workspace) */}
      <mesh 
        position={[10, 0, 0]} 
        onClick={(e) => {
          e.stopPropagation();
          setActiveDistrict('research');
        }}
      >
        <octahedronGeometry args={[2]} />
        <meshStandardMaterial color="#6366f1" wireframe />
      </mesh>
    </group>
  );
}

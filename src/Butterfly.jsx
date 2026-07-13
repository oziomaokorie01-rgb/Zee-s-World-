// src/Butterfly.jsx
import React from 'react';

export function ButterflyModel() {
  // This automatically fetches from your /public/butterfly.glb path
  const { scene } = useGLTF('/butterfly.glb'); 
  
  // Renders the 3D object inside the Three.js scene graph
  return <primitive object={scene} scale={0.5} />;
}

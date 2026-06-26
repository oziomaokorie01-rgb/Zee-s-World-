import React from 'react';
import { useWorldStore } from './store/useWorldStore';
import { useIntroStore } from './store/useIntroStore';
import CinematicIntro from './components/CinematicIntro';
import WorldCanvas from './components/WorldCanvas';
import UIOverlay from './components/UIOverlay';
import ProjectDrawer from './components/ProjectDrawer';

export default function App() {
  const introComplete = useIntroStore((state) => state.introComplete);
  const viewMode = useWorldStore((state) => state.viewMode);

  return (
    <div className="relative w-full h-screen bg-[#05020a] overflow-hidden select-none">
      {!introComplete && <CinematicIntro />}
      
      {/* Background Layer: 3D Scene OR static background matrix */}
      {viewMode === '3d' ? (
        <WorldCanvas />
      ) : (
        <div className="absolute inset-0 bg-radial-gradient from-[#0f0720] to-[#05020a] z-0" />
      )}
      
      {/* Core Interfaces */}
      <UIOverlay />
      <ProjectDrawer />
    </div>
  );
}

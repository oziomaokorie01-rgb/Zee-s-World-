import React from 'react';
import { useWorldStore } from './store/useWorldStore';
import { useIntroStore } from './store/useIntroStore';
import CinematicIntro from './components/CinematicIntro';
import NarrativeHUD from './components/NarrativeHUD';
import WorldCanvas from './components/WorldCanvas';
import SimpleButterfly from './components/SimpleButterfly'; // Using the stable one
import UIOverlay from './components/UIOverlay';
import ProjectDrawer from './components/ProjectDrawer';
import TourGuideOverlay from './components/TourGuideOverlay';
import ASCIIRain from './components/ASCIIRain';                                        

export default function App() {
  const introComplete = useIntroStore((state) => state.introComplete);
  const viewMode = useWorldStore((state) => state.viewMode);

  return (
    <div className="relative w-full h-screen bg-[#05020a] overflow-hidden select-none">
      {/* 1. Cinematic Intro */}
      {!introComplete && <CinematicIntro />}
      
      {/* 2. Primary Content Layer */}
      {viewMode === '3d' ? (
        <div className="absolute inset-0 z-10">
          <NarrativeHUD />
          <WorldCanvas />
          {/* Only render one butterfly component */}
          <SimpleButterfly />
        </div>
      ) : (
        <div className="absolute inset-0 bg-radial-gradient from-[#0f0720] to-[#05020a] z-0" />
      )}
      
      {/* 3. Global Layers (Always visible) */}
      <ASCIIRain />
      <TourGuideOverlay />
      <UIOverlay />
      <ProjectDrawer />
    </div>
  );
}

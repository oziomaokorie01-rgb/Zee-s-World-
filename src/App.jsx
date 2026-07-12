import React from 'react';
import { useWorldStore } from './store/useWorldStore';
import { useIntroStore } from './store/useIntroStore';
import CinematicIntro from './components/CinematicIntro';
import NarrativeHUD from './components/NarrativeHUD';
import WorldCanvas from './components/WorldCanvas';
import SimpleButterfly from './components/SimpleButterfly'; 
import UIOverlay from './components/UIOverlay';
import ProjectDrawer from './components/ProjectDrawer';
import TourGuideOverlay from './components/TourGuideOverlay';
import ASCIIRain from './components/ASCIIRain';                                        

export default function App() {
  const introComplete = useIntroStore((state) => state.introComplete);
  const viewMode = useWorldStore((state) => state.viewMode);

  return (
    <div className="relative w-full h-screen bg-[#05020a] overflow-hidden select-none">
      
      {!introComplete && <CinematicIntro />}
      
      {viewMode === '3d' ? (
        <div className="absolute inset-0 z-10">
          <NarrativeHUD />
          <WorldCanvas />
          {/* This is the 2D component. It controls its own visibility based on introComplete */}
          <SimpleButterfly />
        </div>
      ) : (
        <div className="absolute inset-0 bg-radial-gradient from-[#0f0720] to-[#05020a] z-0" />
      )}
      
      <ASCIIRain />
      <TourGuideOverlay />
      <UIOverlay />
      <ProjectDrawer />
    </div>
  );
}

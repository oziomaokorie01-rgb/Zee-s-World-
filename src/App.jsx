import React from 'react';
import { useWorldStore } from './store/useWorldStore';
import { useIntroStore } from './store/useIntroStore';
import CinematicIntro from './components/CinematicIntro';
import NarrativeHUD from './components/NarrativeHUD';
import WorldCanvas from './components/WorldCanvas';
import SimpleButterfly from './components/SimpleButterfly';
import CSS3DButterfly from './components/CSS3DButterfly';
import UIOverlay from './components/UIOverlay';
import ProjectDrawer from './components/ProjectDrawer';
import TourGuideOverlay from './components/TourGuideOverlay';
import ASCIIRain from './components/ASCIIRain';

export default function App() {
  const introComplete = useIntroStore((state) => state.introComplete);
  const viewMode = useWorldStore((state) => state.viewMode);

  return (
    <div className="relative w-full h-screen bg-[#05020a] overflow-hidden select-none">
      {/* 1. Cinematic Intro Overlay Layer */}
      {!introComplete && <CinematicIntro />}
      
      {/* 2. Background Core Layer: Interactive 3D Scene OR static background matrix */}
      {viewMode === '3d' ? (
      <>
      <NarrativeHUD />
        <WorldCanvas />
        <SimpleButterfly />
      </>
      ) : (
        <div className="absolute inset-0 bg-radial-gradient from-[#0f0720] to-[#05020a] z-0" />
      )}
      <ASCIIRain />
      
      {/* 3. Butterfly Animation Layer */}
      <CSS3DButterfly />
      
      {/* 4. Mid-Layer Character Graphics */}
      <TourGuideOverlay />
            {/* 5. Core User Interface Panels & Project Showcases */}
      <UIOverlay />
      <ProjectDrawer />
    </div>
  );
}

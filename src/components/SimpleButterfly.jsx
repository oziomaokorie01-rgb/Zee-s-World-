import React from 'react';
import { useIntroStore } from '../store/useIntroStore';
import butterflyImg from '../assets/butterfly.png';

export default function SimpleButterfly() {
  const introComplete = useIntroStore((state) => state.introComplete);

  // Do not render the butterfly at all until the intro is finished
  if (!introComplete) return null;

  return (
    <div className="absolute inset-0 z-[100] pointer-events-none flex items-center justify-center">
      {/* Container for the circular flight path */}
      <div className="animate-orbit-flight">
        {/* The 2D Image - No 3D models involved */}
        <img 
          src="/butterfly.png" 
          alt="" 
          className="w-24 h-24 animate-flap"
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>
  );
}

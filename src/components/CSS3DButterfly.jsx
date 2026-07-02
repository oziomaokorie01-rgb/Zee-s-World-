import React from 'react';

export default function CSS3DButterfly() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
      {/* 1. Orbit & Hover Controller: Animates the whole insect circling the center */}
      <div className="relative animate-orbit-flight" style={{ transformStyle: 'preserve-3d' }}>
        
        {/* 2. 3D Space Rotator: Tilts the butterfly forward so it looks like it's flying naturally */}
        <div className="relative w-24 h-24" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(55deg) rotateY(0deg) rotateZ(90deg)' }}>
          
          {/* LEFT WING - Crops and displays only the left half of your image */}
          <div 
            className="absolute right-1/2 top-0 w-12 h-24 bg-no-repeat origin-right animate-flap-left"
            style={{
              backgroundImage: `url('/assets/butterfly-wings.jpg')`,
              backgroundSize: '24px 24px',
              backgroundPosition: 'left center',
              transformStyle: 'preserve-3d'
            }}
          />

          {/* RIGHT WING - Crops and displays only the right half of your image */}
          <div 
            className="absolute left-1/2 top-0 w-12 h-24 bg-no-repeat origin-left animate-flap-right"
            style={{
              backgroundImage: `url('/assets/butterfly-wings.jpg')`,
              backgroundSize: '24px 24px',
              backgroundPosition: 'right center',
              transformStyle: 'preserve-3d'
            }}
          />

          {/* CENTRAL BODY AXIS */}
          <div 
            className="absolute left-1/2 top-1/4 -translate-x-1/2 w-[3px] h-12 bg-[#0d071f] rounded-full border border-[#00f0ff]/30 shadow-[0_0_10px_#00f0ff]"
            style={{ transform: 'translateZ(2px)' }}
          />
        </div>

      </div>
    </div>
  );
}

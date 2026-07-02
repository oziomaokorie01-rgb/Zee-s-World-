import React from 'react';

export default function CSS3DButterfly() {
  return (
    <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center">
      {/* Flight Path Animation Wrapper */}
      <div className="animate-orbit-flight" style={{ transformStyle: 'preserve-3d' }}>
        
        {/* 3D Visuals Wrapper */}
        <div className="relative w-24 h-24" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(55deg) rotateZ(90deg)' }}>
          
          {/* Left Wing */}
          <div className="absolute right-1/2 top-0 w-12 h-24 bg-no-repeat origin-right animate-flap-left"
            style={{
              backgroundImage: `url('/assets/butterfly-wings.jpg')`,
              backgroundSize: '24px 24px',
              backgroundPosition: 'left center'
            }}
          />

          {/* Right Wing */}
          <div className="absolute left-1/2 top-0 w-12 h-24 bg-no-repeat origin-left animate-flap-right"
            style={{
              backgroundImage: `url('/assets/butterfly-wings.jpg')`,
              backgroundSize: '24px 24px',
              backgroundPosition: 'right center'
            }}
          />

          {/* Body */}
          <div className="absolute left-1/2 top-1/4 -translate-x-1/2 w-[3px] h-12 bg-black rounded-full" />
        </div>
      </div>
    </div>
  );
}

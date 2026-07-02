import React from 'react';

export default function CSS3DButterfly() {
  const butterflyShape = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <!-- Left Upper Wing -->
      <ellipse cx="35" cy="30" rx="15" ry="20" fill="#a855f7" opacity="0.8"/>
      <!-- Left Lower Wing -->
      <ellipse cx="30" cy="55" rx="12" ry="18" fill="#d946ef" opacity="0.8"/>
      <!-- Right Upper Wing -->
      <ellipse cx="65" cy="30" rx="15" ry="20" fill="#a855f7" opacity="0.8"/>
      <!-- Right Lower Wing -->
      <ellipse cx="70" cy="55" rx="12" ry="18" fill="#d946ef" opacity="0.8"/>
      <!-- Body -->
      <ellipse cx="50" cy="50" rx="5" ry="12" fill="#00f0ff"/>
      <!-- Head -->
      <circle cx="50" cy="35" r="4" fill="#00f0ff"/>
    </svg>
  `;

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
      {/* Orbit & Hover Controller */}
      <div className="relative animate-orbit-flight" style={{ transformStyle: 'preserve-3d' }}>
        
        {/* 3D Space Rotator */}
        <div 
          className="relative w-12 h-12 animate-flap-left"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(55deg) rotateY(0deg) rotateZ(90deg)',
            backgroundImage: `url('data:image/svg+xml;utf8,${encodeURIComponent(butterflyShape)}')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            filter: 'drop-shadow(0 0 8px rgba(0, 240, 255, 0.6))'
          }}
        />
      </div>
    </div>
  );
}

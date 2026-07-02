import React from 'react';

export default function CSS3DButterfly() {
  return (
    <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center">
      {/* Flight Path Container */}
      <div className="animate-orbit-flight">
        {/* Simple Image Overlay - No cropping, no math, just display */}
        <img 
          src="/assets/butterfly-wings.jpg" 
          alt="Butterfly" 
          className="w-32 h-32 animate-flap"
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>
  );
}

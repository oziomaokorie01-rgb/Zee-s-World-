import React from 'react';

export default function CSS3DButterfly() {
  return (
    <div className="absolute inset-0 z-[100] pointer-events-none flex items-center justify-center">
      {/* This container moves the butterfly in an orbit */}
      <div className="animate-orbit-flight w-16 h-16">
        {/* This container performs the flapping */}
        <div 
          className="w-full h-full animate-flap"
          style={{
            backgroundImage: `url('/assets/butterfly-wings.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      </div>
    </div>
  );
}

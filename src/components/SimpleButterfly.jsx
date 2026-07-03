import React from 'react';

export default function SimpleButterfly() {
  return (
    <div className="absolute inset-0 z-[100] pointer-events-none flex items-center justify-center">
      {/* 1. Orbit Container: Moves the whole thing in a circle */}
      <div className="animate-orbit-flight relative">
        
        {/* 2. Flap Container: Handles the flapping animation */}
        <img 
          src="/assets/butterfly-wings.jpg" 
          alt="Butterfly" 
          className="w-24 h-24 animate-flap"
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>
  );
}

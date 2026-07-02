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
        
        {/* 3D Space Rotator - rotate to correct orientation and animate wings up/down */}
        <div 
          className="relative w-12 h-12"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
            animation: 'wingFlap 0.6s infinite ease-in-out'
          }}
        >
          {/* Left Wing */}
          <div
            className="absolute right-1/2 top-1/2 -translate-y-1/2 w-6 h-8"
            style={{
              transformStyle: 'preserve-3d',
              backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 40"><ellipse cx="15" cy="20" rx="8" ry="12" fill="%23a855f7" opacity="0.8"/></svg>')`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              transformOrigin: 'right center',
              animation: 'wingFlapLeft 0.6s infinite ease-in-out'
            }}
          />

          {/* Right Wing */}
          <div
            className="absolute left-1/2 top-1/2 -translate-y-1/2 w-6 h-8"
            style={{
              transformStyle: 'preserve-3d',
              backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 40"><ellipse cx="15" cy="20" rx="8" ry="12" fill="%23a855f7" opacity="0.8"/></svg>')`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              transformOrigin: 'left center',
              animation: 'wingFlapRight 0.6s infinite ease-in-out'
            }}
          />

          {/* Body & Head */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-6"
            style={{
              backgroundColor: '#00f0ff',
              borderRadius: '50%',
              boxShadow: '0 0 10px rgba(0, 240, 255, 0.8)',
              transformStyle: 'preserve-3d'
            }}
          />
        </div>

        <style>{`
          @keyframes wingFlapLeft {
            0%, 100% { transform: rotateX(0deg); }
            50% { transform: rotateX(45deg); }
          }
          @keyframes wingFlapRight {
            0%, 100% { transform: rotateX(0deg); }
            50% { transform: rotateX(-45deg); }
          }
          @keyframes wingFlap {
            0%, 100% { transform: scaleY(1); }
            50% { transform: scaleY(0.8); }
          }
        `}</style>
      </div>
    </div>
  );
}

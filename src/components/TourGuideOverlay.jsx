import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWorldStore } from '../store/useWorldStore';
import { districtsData } from '../data/projectsData';

export default function TourGuideOverlay() {
  const activeDistrict = useWorldStore((state) => state.activeDistrict);
  const data = districtsData[activeDistrict];

  return (
    <AnimatePresence>
      {activeDistrict && data && (
        <motion.div
          initial={{ opacity: 0, x: -50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -30, scale: 0.95 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-6 bottom-24 sm:bottom-6 z-20 pointer-events-none flex flex-col items-start max-w-xs sm:max-w-sm"
        >
          {/* Main Character Illustration Window */}
          <div className="relative pointer-events-auto rounded-2xl overflow-hidden border border-purple-500/20 bg-neutral-950/40 backdrop-blur-md p-2 shadow-2xl shadow-black/80 group">
            
            {/* Ambient Room Colored Underglow */}
            <div 
              className={`absolute inset-0 bg-gradient-to-b ${data.themeColor} opacity-40 mix-blend-color-dodge`} 
            />

            {/* Floating Character Sprite/Illustration Frame */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-48 h-64 sm:w-56 sm:h-72 rounded-xl overflow-hidden border border-white/5 bg-neutral-900"
            >
              <img 
                src={data.characterImage} 
                alt={data.characterName}
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              
              {/* Scanline Overlay Effect for 90s CRT Monitor Feel */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none opacity-40" />
            </motion.div>

            {/* Holographic Tactical Tag Label */}
            <div className="mt-3 px-2 py-1 flex justify-between items-center font-mono text-[9px] text-neutral-400 border-t border-neutral-900/60">
              <span className="tracking-widest uppercase">SEC_GUIDE // {activeDistrict?.toUpperCase()}</span>
              <span className="animate-pulse" style={{ color: data.accentGlow }}>● ONLINE</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

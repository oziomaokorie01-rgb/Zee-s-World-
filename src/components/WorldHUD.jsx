import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWorldStore } from '../store/useWorldStore';

export default function WorldHUD() {
  const activeDistrict = useWorldStore((state) => state.activeDistrict);
  const setActiveDistrict = useWorldStore((state) => state.setActiveDistrict);

  // Capitalize the first letter of the district name for clean display text
  const formatDistrictName = (name) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-50 flex flex-col justify-between p-6">
      {/* TOP BAR: Context-aware Back Navigation */}
      <div className="w-full flex justify-between items-start">
        <AnimatePresence>
          {activeDistrict && (
            <motion.button
              initial={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              onClick={() => setActiveDistrict(null)}
              className="pointer-events-auto flex items-center gap-2.5 px-4 py-2 rounded-xl bg-purple-950/30 backdrop-blur-md border border-purple-500/20 text-purple-200 text-sm font-medium tracking-wide shadow-lg shadow-purple-950/40 hover:bg-purple-900/40 hover:border-purple-400/40 hover:text-white active:scale-95 transition-all"
            >
              {/* Retro Chevron Minimalist Arrow */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2.5} 
                stroke="currentColor" 
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              <span>Return to Hub</span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Dynamic Location Coordinates Indicator */}
        <div className="pointer-events-auto flex flex-col items-end px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-neutral-800/40 text-right select-none">
          <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">System Location</span>
          <span className="text-sm font-mono font-medium text-white tracking-wide">
            {activeDistrict ? `ZEE_WORLD // ${formatDistrictName(activeDistrict)}` : 'ZEE_WORLD // Sector_Hub'}
          </span>
        </div>
      </div>

      {/* BOTTOM AREA: Subtle Instructions Overlay */}
      <div className="w-full flex justify-center pb-2">
        <AnimatePresence>
          {!activeDistrict && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-center text-xs tracking-wider text-purple-300/60 font-medium select-none bg-purple-950/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-purple-500/5"
            >
              Swipe to rotate world • Tap a district node to inspect workspace
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

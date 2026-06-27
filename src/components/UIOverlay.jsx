import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useWorldStore } from '../store/useWorldStore';
import { districtsData } from '../data/projectsData';

export default function UIOverlay() {
  const { activeDistrict, setActiveDistrict } = useWorldStore();
  const districtInfo = districtsData[activeDistrict];
  const viewMode = useWorldStore((state) => state.viewMode);
  const setViewMode = useWorldStore((state) => state.setViewMode);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6">
      {/* Ambient Monarch Butterfly Overlay Container */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="organic-butterfly b-blue" />
        <div className="organic-butterfly b-purple" />
      </div>

      {/* Top Banner: Deep Purple Typographic Context Header */}
      <div className="w-full pointer-events-auto bg-neutral-950/80 border border-purple-900/30 backdrop-blur-md p-4 rounded-lg shadow-xl shadow-purple-950/10">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-normal italic tracking-tight text-purple-400">
              {districtInfo ? districtInfo.name : "Zee's World"}
            </h1>
            <p className="text-xs font-mono text-purple-300/60 uppercase tracking-widest mt-1">
              {districtInfo ? districtInfo.subtitle : "An Inventor's Work Under Construction"}
            </p>
          </div>
          
          {/* Controls Cluster: View Mode Trigger + Reset Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode(viewMode === '3d' ? '2d' : '3d')}
              className="text-xs font-mono border border-neutral-800 bg-neutral-900/60 px-2.5 py-1 rounded text-neutral-400 hover:text-white hover:border-purple-500/30 transition-all"
            >
              MODE // {viewMode.toUpperCase()}
            </button>

            {activeDistrict && (
              <button 
                onClick={() => setActiveDistrict(null)}
                className="text-xs border border-purple-500/40 px-2 py-1 rounded text-purple-400 hover:bg-purple-950 transition-colors"
              >
                Return to Orbit
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Center Layout: Instant Grid Selector for Express Visitors */}
      <div className="w-full my-auto flex flex-col items-center justify-center pointer-events-auto z-20">
        <AnimatePresence mode="wait">
          {!activeDistrict && (
            /* The Express Dashboard Option Matrix */
            <motion.div 
              key="express-directory"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full max-w-sm grid grid-cols-1 gap-2.5"
            >
              <div className="p-2 border-b border-purple-900/40 text-center">
                <span className="text-xs italic tracking-wider text-purple-300/70">
                  Select an immediate workspace directory:
                </span>
              </div>
              
              {districtsData && Object.entries(districtsData).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => setActiveDistrict(key)}
                  className="w-full text-left p-3 rounded bg-neutral-900/90 border border-purple-950 hover:border-purple-500/60 transition-all group flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-normal text-purple-200 group-hover:text-purple-400 transition-colors">
                      {value.name}
                    </h3>
                    <p className="text-[11px] italic text-neutral-400 font-serif mt-0.5">
                      {value.subtitle}
                    </p>
                  </div>
                  <span className="text-purple-500 text-sm group-hover:translate-x-1 transition-transform">
                    ➔
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

import React, { useEffect } from 'react';
import { useWorldStore } from '../store/useWorldStore';
import { worldContent } from '../data/worldContent';
import { motion, AnimatePresence } from 'framer-motion';

export default function NarrativeHUD() {
  const { tourTimeline, setTourTimeline, activeObject, activeDistrict, setActiveDistrict, guestAvatar, generateGuestProfile, advanceToNextTourStop } = useWorldStore();

  useEffect(() => {
    generateGuestProfile();
  }, []);

  const currentDistrictData = worldContent.districts[activeDistrict];

  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between p-6 select-none font-mono">
      <AnimatePresence mode="wait">
        
        {/* PHASE 1: THE CR&T TV SCREEN INTRO BOOTUP */}
        {tourTimeline === 'TV_INTRO' && (
          <motion.div 
            key="tv"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black pointer-events-auto flex flex-col items-center justify-center text-center p-4"
          >
            <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none" />
            <motion.div 
              animate={{ opacity: [0.4, 1, 0.4] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-purple-500 text-sm tracking-widest max-w-md"
            >
              <p className="mb-4 text-white font-bold text-lg">🜂 SYSTEM INTRUSION DETECTED 🜂</p>
              <p className="text-xs text-purple-400/80 mb-6">A terminal gateway into Zee's World database architecture is assembling...</p>
              <button 
                onClick={() => setTourTimeline('BUTTERFLY_WAKE')}
                className="px-6 py-2 border border-purple-500 bg-purple-950/40 text-white rounded hover:bg-purple-500 hover:text-black transition-all text-xs cursor-pointer"
              >
                BOOT CONSOLE INTERFACE
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* PHASE 2: BEDROOM OBJECT POPUPS (Perching Overlays) */}
        {tourTimeline === 'BEDROOM_PAN' && activeObject && (
          <motion.div 
            key="bedroom-overlay"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-24 left-6 bg-neutral-950/90 border border-purple-500/30 p-4 rounded-lg max-w-xs pointer-events-auto backdrop-blur-md shadow-2xl"
          >
            <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest block mb-1">► INSPECTING DATA_RETAINER</span>
            <h3 className="text-base font-bold text-white mb-1">{worldContent.observatory.objects[activeObject]?.name}</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">{worldContent.observatory.objects[activeObject]?.miniInfo}</p>
          </motion.div>
        )}

        {/* SPECIAL INTERACTIVE OVERLAY: THE MIRROR IDENTITY */}
        {tourTimeline === 'BEDROOM_PAN' && activeObject === 'mirror' && (
          <motion.div
            key="mirror-id"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/90 border-2 border-purple-500 p-6 rounded-xl text-center max-w-xs pointer-events-auto shadow-2xl"
          >
            <div className="w-16 h-16 bg-neutral-900 border border-purple-500/40 rounded-full mx-auto mb-3 flex items-center justify-center text-xl text-purple-400 font-sans">👤</div>
            <p className="text-[10px] uppercase text-purple-400 tracking-wider">Reflection Logged</p>
            <h4 className="text-sm font-bold text-white tracking-widest mt-0.5">{guestAvatar}</h4>
          </motion.div>
        )}

        {/* PHASE 3: DISTRICT INTERACTIVE ROOM EXPLORATION DRAWER */}
        {tourTimeline === 'ROOM_EXPLORE' && currentDistrictData && (
          <motion.div 
            key="district-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className="absolute top-0 right-0 h-full w-full max-w-sm bg-neutral-950/95 border-l border-purple-900/40 p-6 flex flex-col justify-between pointer-events-auto backdrop-blur-lg z-40 overflow-y-auto"
          >
            <div className="flex flex-col gap-6">
              {/* Tour Guide Persona Card Header */}
              <div className="p-4 bg-gradient-to-b from-purple-950/30 to-black/40 border border-purple-500/20 rounded-xl relative">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-black rounded-lg border border-purple-500/30 flex items-center justify-center text-2xl animate-bounce">
                    {currentDistrictData.avatar}
                  </div>
                  <div>
                    <span className="text-[9px] text-purple-400 bg-purple-950/60 border border-purple-900/40 px-1.5 py-0.5 rounded tracking-widest font-bold uppercase">District Host</span>
                    <h2 className="text-lg font-bold text-white mt-1">{currentDistrictData.guideName}</h2>
                  </div>
                </div>
                <p className="mt-3 text-xs text-purple-200 bg-black/60 p-2.5 rounded border border-neutral-900 leading-relaxed italic">
                  "{currentDistrictData.dialogue}"
                </p>
              </div>

              {/* Dynamic Project Build Injections */}
              <div className="flex flex-col gap-3">
                <h3 className="text-xs uppercase text-neutral-500 tracking-widest font-bold">Active Records //</h3>
                {currentDistrictData.projects.map((proj) => (
                  <a 
                    key={proj.id} 
                    href={proj.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-3 bg-neutral-900/60 border border-neutral-800/80 rounded-xl hover:border-purple-500/40 hover:bg-purple-950/10 transition-all group block"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors">{proj.title}</h4>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-purple-400 font-bold">{proj.tag}</span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed font-serif italic">{proj.description}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* Advance Tour Route Interactive Action */}
            <button
              onClick={() => advanceToNextTourStop(activeDistrict)}
              className="w-full py-3 bg-purple-900/40 border border-purple-500/40 text-white rounded-xl font-bold hover:bg-purple-500 hover:text-black transition-all text-xs tracking-wider uppercase mt-6 cursor-pointer"
            >
              {currentDistrictData.nextDistrict ? `Follow Guide to ${currentDistrictData.nextDistrict} ➔` : "Step to the Edge ➔"}
            </button>
          </motion.div>
        )}

        {/* PHASE 4: FALLING THROUGH THE VOID VACUUM COMPILATION */}
        {tourTimeline === 'THE_VOID_FALL' && (
          <motion.div 
            key="void-fall"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black pointer-events-auto flex flex-col items-center justify-center text-center p-6"
          >
            <div className="absolute inset-0 bg-radial-gradient from-purple-950/20 to-black pointer-events-none" />
            <div className="max-w-md z-10">
              <h2 className="text-2xl font-bold text-white tracking-widest uppercase mb-2 animate-pulse">WARNING: SYSTEM VACUUM FALL</h2>
              <p className="text-xs text-purple-400 font-serif italic mb-6">You've fallen off the structural grid. Answer the core terminal security registry checklist to finalize synchronization.</p>
              
              <div className="p-4 bg-neutral-900/90 border border-purple-500/30 rounded-lg text-left mb-6">
                <p className="text-xs text-white font-bold mb-2">Q1: Do smart contracts require a centralized hosting server infrastructure?</p>
                <div className="flex gap-4 mt-2">
                  <button 
                    onClick={() => setTourTimeline('COMPLETE')}
                    className="px-4 py-1.5 bg-neutral-950 border border-purple-500/40 text-xs text-purple-300 rounded hover:bg-purple-500 hover:text-black cursor-pointer"
                  >
                    No (Correct Entry)
                  </button>
                  <button className="px-4 py-1.5 bg-neutral-950 border border-neutral-800 text-xs text-neutral-500 rounded cursor-not-allowed">Yes</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* PHASE 5: COMPLETE & EXHAUSTED LOG SHARING OVERLAY */}
        {tourTimeline === 'COMPLETE' && (
          <motion.div 
            key="complete"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-neutral-950 pointer-events-auto flex flex-col items-center justify-center text-center p-4 z-50"
          >
            <div className="max-w-sm border-2 border-purple-500 bg-black p-6 rounded-2xl shadow-2xl shadow-purple-950/40 relative">
              <span className="text-3xl filter drop-shadow-[0_0_10px_#a855f7]">🏆</span>
              <h2 className="text-xl font-bold text-white tracking-wide mt-3">Zee's World Synchronized</h2>
              <p className="text-xs text-purple-300 font-mono mt-1 mb-6 uppercase tracking-widest">{guestAvatar} Verified</p>
              <p className="text-xs text-neutral-400 leading-relaxed font-serif mb-6">"I navigated the late-night bedroom terminal layers, tracked the street paths, and survived the underbelly vacuum drop."</p>
              
              <a 
                href={`https://x.com/intent/tweet?text=I just finished the Zee's World experience portfolio as ${guestAvatar}! Check out the 90s cyber terminal networks built by %40Senseii_ciel 🜂`}
                target="_blank" 
                rel="noreferrer"
                className="w-full block py-3 bg-white text-black font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-purple-400 hover:text-black transition-all cursor-pointer"
              >
                Share Certificate on X
              </a>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

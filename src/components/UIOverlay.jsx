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

      {/* 2. Dynamic Header Block */}
      <div className="w-full pointer-events-auto bg-neutral-950/80 border border-purple-900/30 backdrop-blur-md p-4 rounded-lg shadow-xl shadow-purple-950/10 z-20">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-normal italic tracking-tight text-purple-400">
              {activeDistrict && districtInfo ? districtInfo.name : "Zee's World"}
            </h1>
            <p className="text-xs font-mono text-purple-300/60 uppercase tracking-widest mt-1">
              {activeDistrict && districtInfo ? districtInfo.subtitle : "An Inventor's Work Under Construction"}
            </p>
          </div>
          
          {/* View Mode Switcher Control */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                // If switching back to 3D, clear any locked district to reset camera tracking
                if (viewMode === '2d') {
                  setActiveDistrict(null);
                }
                setViewMode(viewMode === '3d' ? '2d' : '3d');
              }}
              className="text-xs font-mono border border-neutral-800 px-2.5 py-1 rounded bg-neutral-900/60 text-neutral-400 hover:text-white hover:border-purple-500/30 transition-all cursor-pointer"
            >
              MODE // {viewMode?.toUpperCase()}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Center Navigation: STRICTLY EXCLUSIVE TO 2D SIMPLIFIED MODE */}
      <div className="w-full my-auto flex flex-col items-center justify-center pointer-events-auto z-20">
        <AnimatePresence mode="wait">
          {/* CRITICAL FIX: Only display this list if the visitor explicitly requests the simplified 2D view layout */}
          {viewMode === '2d' && !activeDistrict && (
            <motion.div 
              key="express-directory"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full max-w-sm grid grid-cols-1 gap-2.5"
            >
              <div className="p-2 border-b border-purple-900/40 text-center">
                <span className="text-xs italic tracking-wider text-purple-300/70">
                  Simplified Workspace Directory:
                </span>
              </div>
              
              {Object.entries(districtsData).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveDistrict(key);
                  }}
                  className="w-full text-left p-3 rounded bg-neutral-900/90 border border-purple-950 hover:border-purple-500/60 transition-all group flex justify-between items-center cursor-pointer"
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

      {/* 4. Global Structural Footer */}
      <footer className="w-full pointer-events-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] font-mono text-neutral-500 select-none border-t border-neutral-900/40 pt-4 z-20">
        <div className="flex items-center gap-1.5">
          <span>Built by Senseii_ciel</span>
          <span className="text-purple-500/80 text-xs font-normal">🜂</span>
        </div>

        <div className="flex items-center gap-4">
          <a href="https://x.com/Senseii_ciel" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-purple-400 transition-all">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="https://discord.com/users/1305099867126759516" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-purple-400 transition-all">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.075.075 0 0 1-.006.127 12.298 12.298 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" /></svg>
          </a>
          <a href="https://github.com/ozzy-sensei" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-purple-400 transition-all">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.0.069-.608.009 1.007.54 1.534 1.534 1.534.892 1.524 2.341 1.084 2.91.828.092-.652.35-1.084.636-1.334-2.22-.251-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
          </a>
        </div>

        <span>STATUS: ONLINE</span>
      </footer>

    </div>
  );
}

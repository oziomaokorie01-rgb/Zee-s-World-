import React, { useState } from 'react';
import { useIntroStore } from '../store/useIntroStore';

export default function CinematicIntro() {
  const { startSequence, completeIntro, isZooming } = useIntroStore();
    const [hasTapped, setHasTapped] = useState(false);

      const handleTrigger = () => {
          setHasTapped(true);
              startSequence();
                  
                      // Hold frame for telescope lens track zoom animation before removing intro from tree
                          setTimeout(() => {
                                completeIntro();
                                    }, 2800);
                                      };

                                        return (
                                            <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030107] transition-all duration-1000 ${hasTapped ? 'bg-black' : ''}`}>
                                                  
                                                        {/* Retro TV Static Grain Overlay on Execution */}
                                                              {hasTapped && (
                                                                      <div className="absolute inset-0 pointer-events-none opacity-[0.08] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjZmZmIi8+Cjwvc3ZnPg==')] bg-repeat animate-pulse" />
                                                                            )}

                                                                                  {/* Main Focus Port */}
                                                                                        <div className={`relative flex flex-col items-center justify-center transition-transform duration-[2000ms] ease-in-out ${isZooming ? 'scale-[15] opacity-0 blur-sm' : 'scale-100'}`}>
                                                                                                
                                                                                                        {/* Telescope Lens Circular Ring Visual Anchor */}
                                                                                                                <div className="absolute w-72 h-72 rounded-full border border-purple-500/10 pointer-events-none flex items-center justify-center">
                                                                                                                          <div className="w-64 h-64 rounded-full border border-dashed border-cyan-500/20 animate-spin" style={{ animationDuration: '60s' }} />
                                                                                                                                  </div>

                                                                                                                                          {/* The Core Link Element (Sleeping Butterfly on a Closed Book Graphic Trigger) */}
                                                                                                                                                  <button 
                                                                                                                                                            onClick={handleTrigger}
                                                                                                                                                                      disabled={hasTapped}
                                                                                                                                                                                className="relative z-10 w-44 h-44 flex flex-col items-center justify-center group focus:outline-none"
                                                                                                                                                                                        >
                                                                                                                                                                                                  {/* Static Glowing Centerpiece Pixel Butterfly */}
                                                                                                                                                                                                            <div className="w-6 h-4 bg-[#00f0ff] opacity-80 shadow-[0_0_15px_#00f0ff] mb-4 animate-bounce" />
                                                                                                                                                                                                                      
                                                                                                                                                                                                                                <span className="text-[10px] font-mono tracking-[0.3em] text-cyan-400/60 uppercase group-hover:text-cyan-300 transition-colors">
                                                                                                                                                                                                                                            {hasTapped ? "INITIALIZING..." : "[ OPEN_LOGBOOK ]"}
                                                                                                                                                                                                                                                      </span>
                                                                                                                                                                                                                                                              </button>

                                                                                                                                                                                                                                                                      {/* Bottom Coordinates Display */}
                                                                                                                                                                                                                                                                              <div className="absolute -bottom-16 text-center">
                                                                                                                                                                                                                                                                                        <p className="text-[9px] font-mono text-purple-500/40 tracking-widest uppercase">
                                                                                                                                                                                                                                                                                                    SYS.LOC // LAT_0.024 . LON_1.009
                                                                                                                                                                                                                                                                                                              </p>
                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                                  );
                                                                                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                                                                                  
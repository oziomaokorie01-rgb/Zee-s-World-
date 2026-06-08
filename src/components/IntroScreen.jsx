import React from 'react';
import { useWorldStore } from '../store/useWorldStore';

export default function IntroScreen() {
  const { setPhase } = useWorldStore();
    
      return (
          <div className="flex flex-col items-center justify-center w-full h-full bg-neutral-950 font-mono p-6 text-center">
                <div className="animate-pulse text-purple-500 text-sm tracking-widest mb-4">⚙️ INITIALIZING SYSTEM OVERLAY...</div>
                      <p className="text-xs text-neutral-500 max-w-xs mb-6">Booting Zee's World experimental mobile server workspace environment...</p>
                            <button 
                                    onClick={() => setPhase(2)}
                                            className="pointer-events-auto py-2.5 px-6 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-bold text-neutral-200 active:bg-neutral-800"
                                                  >
                                                          Skip Cinematic Intro Sequence
                                                                </button>
                                                                    </div>
                                                                      );
                                                                      }
                                                                      
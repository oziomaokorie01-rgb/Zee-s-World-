import React from 'react';
import { useWorldStore } from '../store/useWorldStore';
import { districtsData } from '../data/projectsData';

export default function WorldCanvas() {
  const { activeDistrict, setActiveDistrict } = useWorldStore();

    return (
        <div className="absolute inset-0 w-full h-full bg-neutral-950 flex flex-col items-center justify-center p-6 border border-neutral-900">
              {/* 3D Simulation Frame Backdrop text */}
                    <div className="text-center select-none opacity-20 pointer-events-none mb-8">
                            <div className="text-8xl font-black text-neutral-800 tracking-tighter">3D VIEW</div>
                                    <p className="text-xs font-mono text-neutral-600">WEBGL CANVAS SIMULATION BOUNDS</p>
                                          </div>

                                                {/* Manual Simulation Controllers for testing layout logic without 3D inputs */}
                                                      <div className="z-20 w-full max-w-xs bg-neutral-900/80 border border-neutral-800 p-4 rounded-2xl flex flex-col space-y-2">
                                                              <p className="text-[10px] font-mono text-purple-400 uppercase tracking-widest text-center mb-1">
                                                                        Simulate Tapping 3D Landmarks
                                                                                </p>
                                                                                        {Object.keys(districtsData).map((districtKey) => (
                                                                                                  <button
                                                                                                              key={districtKey}
                                                                                                                          onClick={() => setActiveDistrict(districtKey)}
                                                                                                                                      className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all text-left flex justify-between items-center ${
                                                                                                                                                    activeDistrict === districtKey 
                                                                                                                                                                    ? 'bg-purple-600 text-white shadow-md' 
                                                                                                                                                                                    : 'bg-neutral-950 text-neutral-400 border border-neutral-800'
                                                                                                                                                                                                }`}
                                                                                                                                                                                                          >
                                                                                                                                                                                                                      <span className="capitalize">{districtKey} Node</span>
                                                                                                                                                                                                                                  {activeDistrict === districtKey && <span className="text-[10px] bg-purple-700 px-1.5 py-0.5 rounded uppercase font-mono">In View</span>}
                                                                                                                                                                                                                                            </button>
                                                                                                                                                                                                                                                    ))}
                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                
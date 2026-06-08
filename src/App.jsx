import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useWorldStore } from './store/useWorldStore';
import IntroScreen from './components/IntroScreen';
import ExpressMenu from './components/ExpressMenu';
import ProjectDrawer from './components/ProjectDrawer';
import UIOverlay from './components/UIOverlay';
import WorldCanvas from './components/WorldCanvas';

export default function App() {
  const { currentPhase, setPhase } = useWorldStore();

    // Temporary developer setup: advances past boot phase automatically
      useEffect(() => {
          if (currentPhase === 0) {
                const bootTimer = setTimeout(() => setPhase(1), 2000);
                      return () => clearTimeout(bootTimer);
                          }
                            }, [currentPhase, setPhase]);

                              return (
                                  <div className="relative w-screen h-screen overflow-hidden bg-neutral-950 text-neutral-100 font-sans select-none antialiased">
                                        <AnimatePresence mode="wait">
                                                
                                                        {/* Intro Phase (TV Static, Notebook, Butterfly wake) */}
                                                                {currentPhase <= 1 && (
                                                                          <motion.div
                                                                                      key="intro-phase"
                                                                                                  initial={{ opacity: 1 }}
                                                                                                              exit={{ opacity: 0, scale: 1.1, filter: "blur(8px)" }}
                                                                                                                          transition={{ duration: 1.2, ease: "easeInOut" }}
                                                                                                                                      className="absolute inset-0 z-50 w-full h-full"
                                                                                                                                                >
                                                                                                                                                            <IntroScreen />
                                                                                                                                                                      </motion.div>
                                                                                                                                                                              )}

                                                                                                                                                                                      {/* Core Exploration Phase */}
                                                                                                                                                                                              {currentPhase === 2 && (
                                                                                                                                                                                                        <motion.div
                                                                                                                                                                                                                    key="world-phase"
                                                                                                                                                                                                                                initial={{ opacity: 0 }}
                                                                                                                                                                                                                                            animate={{ opacity: 1 }}
                                                                                                                                                                                                                                                        className="relative w-full h-full"
                                                                                                                                                                                                                                                                  >
                                                                                                                                                                                                                                                                              {/* Background 3D Viewport Layer */}
                                                                                                                                                                                                                                                                                          <WorldCanvas />

                                                                                                                                                                                                                                                                                                      {/* Foreground Interactive UI Layout */}
                                                                                                                                                                                                                                                                                                                  <UIOverlay />
                                                                                                                                                                                                                                                                                                                              <ExpressMenu />
                                                                                                                                                                                                                                                                                                                                          <ProjectDrawer />
                                                                                                                                                                                                                                                                                                                                                    </motion.div>
                                                                                                                                                                                                                                                                                                                                                            )}
                                                                                                                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                                                                                          </AnimatePresence>
                                                                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                
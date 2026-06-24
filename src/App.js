import React from 'react';
import UIOverlay from './components/UIOverlay';
import ProjectDrawer from './components/ProjectDrawer';

export default function App() {
  return (
      <div className="relative w-full h-screen bg-[#05020a] overflow-hidden select-none">
            {/* The 3D Canvas component will go right here behind everything later */}
                  <div className="absolute inset-0 z-0 bg-transparent" />
                        
                              {/* Front-Facing Interactive Interfaces */}
                                    <UIOverlay />
                                          <ProjectDrawer />
                                              </div>
                                                );
                                                }
                                                
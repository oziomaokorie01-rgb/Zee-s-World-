import React from 'react';
import { useIntroStore } from './store/useIntroStore';
import CinematicIntro from './components/CinematicIntro';
import UIOverlay from './components/UIOverlay';
import ProjectDrawer from './components/ProjectDrawer';

export default function App() {
  const introComplete = useIntroStore((state) => state.introComplete);

    return (
        <div className="relative w-full h-screen bg-[#05020a] overflow-hidden select-none">
              {!introComplete && <CinematicIntro />}
                    
                          {/* Front-Facing Dynamic Dashboard Interfaces */}
                                <UIOverlay />
                                      <ProjectDrawer />
                                          </div>
                                            );
                                            }
                                            
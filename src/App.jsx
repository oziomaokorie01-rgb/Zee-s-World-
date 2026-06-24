import React from 'react';
import UIOverlay from './components/UIOverlay';
import ProjectDrawer from './components/ProjectDrawer';

export default function App() {
  return (
      
          <div className="relative w-full h-screen bg-[#05020a] overflow-hidden">
                  {/* Your 3D Canvas component container */}
                          <div className="absolute inset-0 z-0 bg-transparent" />
                                  
                                          {/* Front-Facing Interactive Interfaces wrapped cleanly */}
                                                  <>
                                                              <UIOverlay />
                                                                          <ProjectDrawer />
                                                                                  </>
                                                                                      </div>
  );
}

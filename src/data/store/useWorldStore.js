import { create } from 'zustand';

export const useWorldStore = create((set) => ({
  // Navigation & Phases
    currentPhase: 0,       // 0: Boot, 1: Cinematic Intro, 2: Explorable World
      activeDistrict: null,  // 'workshop', 'greenhouse', 'lab', 'court', 'void'
        isMenuOpen: false,     // Toggles Express navigation tray
          activeProjectId: null, // Tracks currently opened project modal/drawer

            // State Triggers
              setPhase: (phase) => set({ currentPhase: phase }),
                
                  setActiveDistrict: (districtId) => set({ 
                      activeDistrict: districtId,
                          isMenuOpen: false // Auto-close menu on jump
                            }),
                              
                                toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
                                  
                                    openProject: (projectId) => set({ activeProjectId: projectId }),
                                      closeProject: () => set({ activeProjectId: null }),
                                        
                                          resetWorld: () => set({ currentPhase: 0, activeDistrict: null, isMenuOpen: false, activeProjectId: null })
                                          }));
                                          
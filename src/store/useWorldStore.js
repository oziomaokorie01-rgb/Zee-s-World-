import { create } from 'zustand';

export const useWorldStore = create((set, get) => ({
  // Cinematic Narrative States
  tourTimeline: 'TV_INTRO', // 'TV_INTRO' | 'BUTTERFLY_WAKE' | 'BEDROOM_PAN' | 'TELESCOPE_CHOOSE' | 'STREET_TRANSIT' | 'ROOM_EXPLORE' | 'THE_VOID_FALL' | 'COMPLETE'
  
  activeDistrict: null,    // 'workshop' | 'greenhouse' | 'lab' | 'court' | 'void'
  activeObject: null,      // Tracks bedroom objects currently perched on ('laptop', 'books', etc.)
  viewMode: '3d',          // '3d' core experience or '2d' simplified list fallback
  guestAvatar: null,       // Generated user profile details seen in the mirror
  
  // Initialize unique random profile tag for the mirror reflection
  generateGuestProfile: () => {
    const systems = ['Hacker', 'Operator', 'Ronin', 'Netrunner', 'Scout'];
    const randomClass = systems[Math.floor(Math.random() * systems.length)];
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    set({ guestAvatar: `GUEST_${randomClass.toUpperCase()}_#${randomNum}` });
  },

  setTourTimeline: (stage) => set({ tourTimeline: stage }),
  setActiveDistrict: (district) => set({ activeDistrict: district }),
  setActiveObject: (obj) => set({ activeObject: obj }),
  setViewMode: (mode) => set({ viewMode: mode }),

  // Transition mechanism: Advance to the next room or drop off the island edge
  advanceToNextTourStop: (currentId) => {
    if (currentId === 'void') {
      set({ tourTimeline: 'THE_VOID_FALL', activeDistrict: null });
    } else {
      set({ 
        tourTimeline: 'STREET_TRANSIT',
        activeDistrict: null // Pull camera back out onto the street grid for transit cutscene
      });
    }
  }
}));

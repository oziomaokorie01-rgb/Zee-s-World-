import { create } from 'zustand';

export const useWorldStore = create((set) => ({
  activeDistrict: null,
  activeProjectId: null,
  viewMode: '3d', // Options: '3d' or 'directory'
  
  setActiveDistrict: (district) => set({ activeDistrict: district }),
  openProject: (id) => set({ activeProjectId: id }),
  closeProject: () => set({ activeProjectId: null }),
  
  // Toggle action between the views
  setViewMode: (mode) => set({ viewMode: mode }),
}));

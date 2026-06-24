import { create } from 'zustand';

export const useIntroStore = create((set) => ({
  introComplete: false,
    isZooming: false,
      startSequence: () => set({ isZooming: true }),
        completeIntro: () => set({ introComplete: true, isZooming: false }),
        }));
        
import { create } from 'zustand';

const useStore = create((set) => ({
  aslab: null, 
  setAslab: (aslab) => set({ aslab }), 
  resetAslab: () => set({ aslab: null }), 
}));

export default useStore;
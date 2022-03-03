import create from 'zustand';

export const useApp = create((set) => ({
  apps: [],
  setApps: (apps) => set(() => ({ apps })),
}));

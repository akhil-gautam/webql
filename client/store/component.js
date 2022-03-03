import create from 'zustand';
import { axios } from '../axios';

export const useComponent = create((set) => ({
  components: [],
  currentComponent: null,
  setComponents: (components) => set(() => ({ components })),
  fetch: async (page_id) => {
    const response = await axios.get(`pages/${page_id}/components`);
    set({ components: response });
  },
  fetchById: async (id) => {
    const response = await axios.get(`components/${id}`);
    set({ currentComponent: response });
  },
  setCurrentComponent: (component) => set({ currentComponent: component }),
}));

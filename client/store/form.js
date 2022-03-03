import create from 'zustand';
import { axios } from '../axios';

export const useFormStore = create((set) => ({
  forms: [],
  setForms: (forms) => set(() => ({ forms })),
  fetchForms: async (app_id) => {
    const response = await axios.get(`apps/${app_id}/forms`);
    set({ forms: response });
  },
}));

import create from 'zustand';
import { axios } from '../axios';

export const useFormElement = create((set) => ({
  form_elements: [],
  setFormElements: (form_elements) => set(() => ({ form_elements })),
  fetchFormElements: async (form_id) => {
    const response = await axios.get(`forms/${form_id}/form_elements`);
    set({ form_elements: response });
  },
}));

import create from 'zustand';
import { axios } from '../axios';

export const useDatasource = create((set) => ({
  data_sources: [],
  setDatasources: (data_sources) => set(() => ({ data_sources })),
  fetch: async () => {
    const response = await axios.get('data_sources');
    set({ data_sources: response });
  },
}));

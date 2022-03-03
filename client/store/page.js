import create from 'zustand';
import { axios } from '../axios';

export const usePage = create((set) => ({
  pages: [],
  currentPage: null,
  setPages: (pages) => set(() => ({ pages })),
  fetch: async (app_id) => {
    const response = await axios.get(`apps/${app_id}/pages`);
    set({ pages: response });
  },
  fetchById: async (page_id) => {
    const response = await axios.get(`pages/${page_id}`);
    set({ currentPage: response });
  },
  setCurrentPage: (page) => set({ currentPage: page }),
}));

import { create } from 'zustand';

export const useNewsStore = create((set) => ({
  articles: [],
  category: 'Space',
  isLoading: true,
  error: null,
  searchQuery: '',
  
  setArticles: (articles) => set({ articles, isLoading: false, error: null }),
  setCategory: (category) => set({ category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setError: (error) => set({ error, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading })
}));

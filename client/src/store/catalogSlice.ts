import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Catalog from '../pages/Catalog/Catalog';

export interface CatalogItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  composition: string;
  kcal: number;
  protein: number;
  fats: number;
  carbs: number;
}

export interface ICatalog {
  catalog: CatalogItem[];
  loading: boolean;
  error: string | null;
  fetchCatalog: () => Promise<void>;
  addItem: (item: CatalogItem) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  getItemsId: () => string[];
  getItemById: (id: string) => CatalogItem;
}

export const useCatalogStore = create<ICatalog>((set, get) => ({
  catalog: [],
  loading: false,
  error: null,

  fetchCatalog: async () => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/catalog/', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error(`Ошибка: ${response.status}`);

      const data = await response.json();
      set({ catalog: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  addItem: async newItem => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/catalog/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) throw new Error('Не удалось добавить товар');

      const createdItem = await response.json();
      set(state => ({ catalog: [...state.catalog, createdItem] }));
    } catch (err: any) {
      set({ error: err.message });
    }
  },
  removeItem: async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/catalog/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Не удалось удалить товар');

      set(state => ({
        catalog: state.catalog.filter(item => item.id !== id),
      }));
    } catch (err: any) {
      set({ error: err.message });
    }
  },
  getItemsId: () => {
    return get().catalog.map(item => item.id);
  },
  getItemById: (id: string) => {
    return get().catalog.find(item => item.id === id);
  },
}));

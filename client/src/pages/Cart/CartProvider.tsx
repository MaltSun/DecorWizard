// пример — CatalogProvider.tsx
import { createContext, useContext, useState, useEffect } from 'react';

const CatalogContext = createContext({ catalog: [], loading: true });

export function CatalogProvider({ children }) {
  const [catalog, setCatalog] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Пытаемся взять из кэша сразу
    const cached = sessionStorage.getItem('catalog');
    if (cached) {
      setCatalog(JSON.parse(cached));
      setLoading(false);
      return;
    }

    // Если нет — грузим с сервера
    const fetchCatalog = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/catalog/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        setCatalog(data);
        localStorage.setItem('catalog', JSON.stringify(data));
      } catch (err) {
        console.error('Catalog load failed', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, []);

  return (
    <CatalogContext.Provider value={{ catalog, loading }}>
      {children}
    </CatalogContext.Provider>
  );
}

export const useCatalog = () => useContext(CatalogContext);
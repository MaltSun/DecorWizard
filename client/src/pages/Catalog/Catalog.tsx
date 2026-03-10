import React, { useMemo, useState } from 'react';
import Header from '../../components/Header/Header';
import { useEffect } from 'react';
import CatalogItem from '../../components/CatalogItem/CatalogItem';
import { useTranslation } from 'react-i18next';
import { Box, TextField, Pagination, Stack } from '@mui/material';
import { Container, CatalogBlock } from './style';
import { useCart } from '../Cart/useCart';
import CartButton from '../../components/CartButton/CartButton';
import { useStore } from '../../store/store';

const Catalog = () => {
  const [catalog, setCatalog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const addToCart = useStore(state => state.add);
  const updateQuantity = useStore(state => state.update);
  const removeFromCart = useStore(state => state.remove);
  const getItemQuantity = useStore(state => state.getItemQuantity);

  const handleAddToCart = (itemId: string) => addToCart(itemId);
  const handleUpdateQuantity = (itemId: string, q: number) => updateQuantity(itemId, q);
  const handleRemoveFromCart = (itemId: string) => removeFromCart(itemId);

  // const [t] = useTranslation(['common', 'catalog']);

  useEffect(() => {
    const fetchCatalog = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:5000/api/catalog/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCatalog(data);
        localStorage.setItem('catalog', JSON.stringify(data));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, []);

  const filteredCatalog = useMemo(
    () => catalog.filter(item => item.name.toLowerCase().includes(search.toLowerCase())),
    [catalog, search]
  );

  const pageCount = Math.ceil(filteredCatalog.length / itemsPerPage);

  const paginatedCatalog = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCatalog.slice(startIndex, endIndex);
  }, [filteredCatalog, page, itemsPerPage]);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setPage(1);
  }, [search]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <Header active="catalog" />

      <TextField
        type="text"
        placeholder="Search"
        value={search}
        onChange={e => setSearch(e.target.value)}
        sx={{ mb: 3, maxWidth: '500px', marginTop: '20px' }}
      />

      <CatalogBlock>
        {paginatedCatalog.map(item => (
          <Box
            key={item.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <CatalogItem name={item.name} price={item.price} image={item.image} id={item.id} />

            <CartButton
              itemId={item.id}
              quantity={getItemQuantity(item.id)}
              onAdd={handleAddToCart}
              onUpdate={handleUpdateQuantity}
              onRemove={handleRemoveFromCart}
            />
          </Box>
        ))}
      </CatalogBlock>

      {/* Пагинация */}
      {pageCount > 1 && (
        <Stack spacing={2} sx={{ mt: 4, alignItems: 'center' }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Stack>
      )}

      {filteredCatalog.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <p>Товары не найдены</p>
        </Box>
      )}
    </Container>
  );
};

export default Catalog;

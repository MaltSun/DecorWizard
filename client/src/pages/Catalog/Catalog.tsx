import React, { useMemo, useState } from 'react';
import Header from '../../components/Header/Header';
import { useEffect } from 'react';
import CatalogItem from '../../components/CatalogItem/CatalogItem';
import { useTranslation } from 'react-i18next';
import { Box, TextField, Pagination, Stack, CircularProgress } from '@mui/material';
import { Container, CatalogBlock } from './style';
import { useCart } from '../Cart/useCart';
import CartButton from '../../components/CartButton/CartButton';
import { useStore } from '../../store/cartSlice';
import { useCatalogStore } from '../../store/catalogSlice';
import { toast } from 'react-toastify';
import CatalogPopup from '../../components/CatalogPopup/CatalogPopup';
import { set } from 'zod';

const Catalog = () => {
  const { t } = useTranslation();

  const { catalog, loading, error, fetchCatalog } = useCatalogStore();

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const [isOpen, setOpen] = useState(false);
  const [item, setItem] = useState();

  const cartItems = useStore(state => state.cart);

  const addToCart = useStore(state => state.add);
  const updateQuantity = useStore(state => state.update);
  const removeFromCart = useStore(state => state.remove);
  const getItemQuantity = useStore(state => state.getItemQuantity);

  const handleAddToCart = (itemId: string) => addToCart(itemId);
  const handleUpdateQuantity = (itemId: string, q: number) => updateQuantity(itemId, q);
  const handleRemoveFromCart = (itemId: string) => removeFromCart(itemId);

  useEffect(() => {
    fetchCatalog();
  }, [fetchCatalog]);

  const filteredCatalog = useMemo(() => {
    const safeItems = catalog || [];
    return safeItems.filter(item => item.name?.toLowerCase().includes(search.toLowerCase()));
  }, [catalog, search]);

  const pageCount = Math.ceil(filteredCatalog.length / itemsPerPage);

  const paginatedCatalog = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCatalog.slice(startIndex, endIndex);
  }, [filteredCatalog, page, itemsPerPage]);

  const handlePageChange = (_: any, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setPage(1);
  }, [search]);

  const handleItemClick = (item: any) => {
    setItem(item);
    setOpen(true);
  };

  const handleClearItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setItem(undefined);
    setOpen(false);
  };

  if (loading) return <CircularProgress />;
  if (error)
    return toast.error(error, { theme: 'colored', position: 'top-center', autoClose: 5000 });

  return (
    <Container>
      <Header active="catalog" />

      {isOpen && (
        <CatalogPopup
          onClose={handleClearItem}
          id={item?.id || ''}
          name={item?.name || ''}
          price={item?.price || 0}
          description={item?.description || ''}
          image={item?.image || ''}
          kkal={item?.kcal || 0}
          carbs={item?.carbs || 0}
          proteins={item?.proteins || 0}
          fats={item?.fats}
          composition={item?.composition || ''}
        />
      )}

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
            onDoubleClick={() => handleItemClick(item)}
          >
            <CatalogItem
              name={item.name}
              price={item.price}
              image={item.image}
              id={item.id}
              
            />

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
          <p>{t('catalog.noResults')}</p>
        </Box>
      )}
    </Container>
  );
};

export default Catalog;

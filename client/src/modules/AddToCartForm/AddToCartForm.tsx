import React, { useEffect, useState } from 'react';
import { FormPaper, FormStack, FormButton, FormBox, FormImage } from './style';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, CircularProgress, List, MenuItem, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OrderFormData, OrderUserSchema } from './type';
import { useCatalogStore } from '../../store/catalogSlice';
import { CartItem, cartStore } from '../../store/cartSlice';
import { toast } from 'react-toastify';

export const AddToCartForm = ({ img, onClose }: { img: string; onClose: () => void }) => {
  const { cart, update, remove, clear, getTotalItems } = cartStore();
  const [generalLoading, setLoading] = useState(false);

  const { catalog, loading, error, fetchCatalog } = useCatalogStore();
  const addToCart = cartStore(state => state.addFromWizard);
  const handleAddToCart = (item: CartItem) => addToCart(item);

  useEffect(() => {
    if (!loading && catalog.length === 0) {
      fetchCatalog();
    }
  }, [fetchCatalog, loading, catalog.length]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<OrderFormData>({
    resolver: zodResolver(OrderUserSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const { t } = useTranslation('common');
  const navigate = useNavigate();

  const onSubmit = (data: OrderFormData) => {
    setLoading(true);
    try {
      const selectedCatalogItem = catalog.find(c => c.id === data.flaworId);

      if (!selectedCatalogItem) {
        throw new Error('Товар не найден');
      }

      const itemToAdd = {
        id: data.flaworId,
        weight: data.weight || 1.5,
        quantity: data.quantity || 1,
        image: img,
      };

      handleAddToCart(itemToAdd);

      toast.success('Товар добавлен в корзину', {
        theme: 'colored',
        position: 'top-center',
        autoClose: 3000,
      });

      reset();
      onClose();
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Ошибка при добавлении товара', {
        theme: 'colored',
        position: 'top-center',
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(watch() as OrderFormData);
  };

  if (loading) {
    return (
      <FormBox>
        <FormPaper elevation={0}>
          <CircularProgress />
        </FormPaper>
      </FormBox>
    );
  }

  return (
    <FormBox>
      <FormPaper elevation={0}>
        <form  onSubmit={handleFormSubmit}>
          <FormStack>
            <FormImage src={img} alt="Product" />

            {!catalog || catalog.length === 0 ? (
              <CircularProgress />
            ) : (
              <TextField
                {...register('flaworId')}
                select
                label={t('flawor')}
                fullWidth
                error={!!errors.flaworId}
                helperText={errors.flaworId?.message}
                required
              >
                {catalog.map(c => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name} - {Number(c.price)} ₽
                  </MenuItem>
                ))}
              </TextField>
            )}

            <TextField
              {...register('weight', { valueAsNumber: true })}
              label={t('weight')}
              type="number"
              variant="outlined"
              fullWidth
              error={!!errors.weight}
              helperText={errors.weight?.message}
              InputProps={{ inputProps: { min: 0.1, step: 0.1 } }}
              required
            />

            <TextField
              {...register('quantity', { valueAsNumber: true })}
              label={t('quantity')}
              type="number"
              variant="outlined"
              fullWidth
              error={!!errors.quantity}
              helperText={errors.quantity?.message}
              InputProps={{ inputProps: { min: 1 } }}
              defaultValue={1}
              required
            />

            <FormButton
              variant="contained"
              fullWidth
              type="submit"
              disabled={generalLoading || !catalog.length}
            >
              {generalLoading ? <CircularProgress size={24} /> : t('addToCart')}
            </FormButton>

            <FormButton
              variant="outlined"
              size="large"
              disabled={generalLoading}
              fullWidth
              onClick={onClose}
            >
              {t('cancel')}
            </FormButton>
          </FormStack>
        </form>
      </FormPaper>
    </FormBox>
  );
};

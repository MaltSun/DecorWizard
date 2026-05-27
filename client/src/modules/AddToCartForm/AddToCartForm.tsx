import React, { useEffect, useState } from 'react';
import { FormPaper, FormButton, FormBox, FormImage, ModalStyle } from './style';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Box, Button, CircularProgress, List, MenuItem, Modal, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OrderFormData, OrderUserSchema } from './type';
import { useCatalogStore } from '../../store/catalogSlice';
import { CartItem, cartStore } from '../../store/cartSlice';
import { toast } from 'react-toastify';

export const AddToCartForm = ({ img, onClose }: { img: string; onClose: () => void }) => {
  const { cart, update, remove, clear, getTotalItems } = cartStore();
  const [generalLoading, setLoading] = useState(false);

  const [t] = useTranslation(['cart', 'common']);

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

  const navigate = useNavigate();

  const onSubmit = (data: OrderFormData) => {
    setLoading(true);
    try {
      const selectedCatalogItem = catalog.find(c => c.id === data.flaworId);

      if (!selectedCatalogItem) {
        throw new Error(t('cart:flawor_not_found'));
      }

      const itemToAdd = {
        id: data.flaworId,
        weight: data.weight,
        quantity: data.quantity,
        image: img,
      };

      handleAddToCart(itemToAdd);

      toast.success(t('success_added_to_cart'), {
        position: 'top-right',
        autoClose: 2000,
      });
      reset();
      onClose();
    } catch (error) {
      toast.error(t('cart:error_adding_to_cart'));
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
  console.log('error', errors);
  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={ModalStyle}>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input type="hidden" value={img} {...register('img')} />
          <FormImage src={img} alt="Product" />

          {!catalog || catalog.length === 0 ? (
            <CircularProgress />
          ) : (
            <TextField
              {...register('flaworId')}
              select
              label={t('common:flavor')}
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
            label={t('common:weight')}
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
            label={t('common:quantity')}
            type="number"
            variant="outlined"
            fullWidth
            error={!!errors.quantity}
            helperText={errors.quantity?.message}
            InputProps={{ inputProps: { min: 1 } }}
            required
          />

          <FormButton
            variant="contained"
            fullWidth
            type="submit"
            disabled={generalLoading || !catalog.length}
          >
            {generalLoading ? <CircularProgress size={24} /> : t('cart:add_to_cart')}
          </FormButton>

          <FormButton
            variant="contained"
            fullWidth
            type="button"
            disabled={generalLoading || !catalog.length}
            onClick={handleSubmit(onSubmit)}   >
            {generalLoading ? <CircularProgress size={24} /> : t('cart:add_to_cart')}
          </FormButton>
        </form>
      </Box>
    </Modal>
  );
};

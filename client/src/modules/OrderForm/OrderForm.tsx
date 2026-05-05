import React, { useState } from 'react';
import { FormPaper, FormStack, FormBox } from './style';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCatalogStore } from '../../store/catalogSlice';
import { cartStore } from '../../store/cartSlice';
import { toast } from 'react-toastify';
import { AppRoutes } from '../../router/router';
import { OrderFormData, OrderFormSchema } from './type';

export const OrderForm = () => {
  const { cart, clear } = cartStore();
  const { catalog } = useCatalogStore();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation('cart');

  const cartItems = cart
    .map(cartItem => {
      const product = catalog.find(p => p.id === cartItem.id);
      if (!product) return null;
      return {
        ...product,
        quantity: cartItem.quantity,
        weight: cartItem.weight ?? 0,
        subtotal: Number(product.price) * cartItem.quantity,
      };
    })
    .filter((item): item is NonNullable<typeof item> => !!item);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<OrderFormData>({
    resolver: zodResolver(OrderFormSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      items: {},
      design: '',
      comment: '',
    },
  });

  React.useEffect(() => {
    const initialItems: Record<string, { weight: number }> = {};
    cartItems.forEach(item => {
      initialItems[item.id] = { weight: item.weight ?? 1.5 };
    });
    setValue('items', initialItems);
  }, [cartItems, setValue]);

  const onSubmit = async (formData: OrderFormData) => {
    setLoading(true);
    try {
      if (cart.length === 0) {
        toast.warn('Корзина пуста');
        return;
      }
      const token = sessionStorage.getItem('token');
      if (!token) {
        toast.error('Необходима авторизация. Пожалуйста, войдите в аккаунт.');
        navigate(AppRoutes.Login);
        return;
      }
      const response = await fetch('http://localhost:5000/api/orders/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, items: cart }),
      });

      const { orderId, clientSecret } = await response.json();

      navigate(AppRoutes.Order.Children.Checkout, {
        state: { orderId, clientSecret, totalPrice },
      });
    } catch (err) {
      toast.error('Ошибка создания заказа');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <FormBox>
        <Typography variant="body1" color="text.secondary">
          {t('no_orders')}
        </Typography>
      </FormBox>
    );
  }

  return (
    <FormPaper elevation={0}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormStack spacing={2}>
          <Typography variant="h5" component="h1">
            {t('order_form')}
          </Typography>

          <List disablePadding>
            {cartItems.map(item => (
              <ListItem
                key={item.id}
                divider
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                <ListItemAvatar>
                  <Avatar
                    src={item.image}
                    alt={item.name}
                    variant="rounded"
                    sx={{ width: 50, height: 50 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={`${t('quantity')}: ${item.quantity}`}
                />
                <TextField
                  {...register(`items.${item.id}.weight`, { valueAsNumber: true })}
                  label={`${t('weight')} (кг)`}
                  type="number"
                  fullWidth
                  defaultValue={1.5}
                  sx={{ maxWidth: 180 }}
                  error={!!errors.items?.[item.id]?.weight}
                  helperText={errors.items?.[item.id]?.weight?.message}
                />
              </ListItem>
            ))}
          </List>

          <TextField
            {...register('date')}
            label={`${t('desired_readiness_date')}`}
            type="date"
            fullWidth
            error={!!errors.date}
            helperText={errors.date?.message}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: new Date().toISOString().split('T')[0] }}
          />

          <TextField
            {...register('comment')}
            label={t('special_requirements_comments')}
            multiline
            rows={3}
            fullWidth
            placeholder={`${t('special_requirements_comments')}`}
            error={!!errors.comment}
            helperText={errors.comment?.message}
          />

          <Box sx={{ mt: 1 }}>
            <Typography variant="h6" color="primary">
              Итого: {totalPrice.toLocaleString()} ₽
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            size="large"
            type="submit"
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Перейти к оплате'}
          </Button>

          <Button
            variant="outlined"
            fullWidth
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            {t('cancel')}
          </Button>
        </FormStack>
      </form>
    </FormPaper>
  );
};

export default OrderForm;

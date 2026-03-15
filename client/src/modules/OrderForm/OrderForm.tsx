import React, { useState } from 'react';
import { BoxForm, FormPaper, FormStack, FormButton, FormBox } from './style';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
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
import { z } from 'zod';
import { useCatalogStore } from '../../store/catalogSlice';
import { useStore } from '../../store/cartSlice';
import { toast } from 'react-toastify';

// ─── Схема валидации ───
const OrderFormSchema = z.object({
  date: z
    .string()
    .min(1, 'Укажите дату готовности')
    .refine(
      val => {
        const selected = new Date(val);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selected >= today;
      },
      { message: 'Дата не может быть в прошлом' }
    ),
  // design: z.string().optional(),     // если хотите дать возможность ввести описание
});

type OrderFormData = z.infer<typeof OrderFormSchema>;

export const OrderForm = () => {
  const { cart, clear } = useStore();
  const { catalog } = useCatalogStore();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation('common');

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

  const totalWeight = cartItems.reduce((sum, item) => sum + (item.weight ?? 0), 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(OrderFormSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
    },
  });

  //   const onSubmit = async (formData: OrderFormData) => {
  //     if (cart.length === 0) {
  //       toast.warn('Корзина пуста');
  //       return;
  //     }

  //     setLoading(true);

  //     try {
  //       const catalogIds = cart.map(item => item.id);

  //       const payload = {
  //         // design: formData.design?.trim() || undefined,
  //         status: 'new',
  //         catalogIds,
  //         // Если хотите передавать общий вес заказа:
  //         weight: totalWeight > 0 ? totalWeight : undefined,
  //         // date на фронте обычно не передают — бэкенд сам ставит createdAt
  //         // но если вам важно именно "желаемая дата готовности" — тогда можно:
  //         // desiredDate: formData.date,
  //       };

  //       const res = await fetch('/api/orders', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           // Если у вас есть токен авторизации:
  //           // Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify(payload),
  //       });

  //       if (!res.ok) {
  //         let errorMessage = 'Ошибка сервера';
  //         try {
  //           const errData = await res.json();
  //           errorMessage = errData.message || errorMessage;
  //         } catch {}
  //         throw new Error(errorMessage);
  //       }

  //       const createdOrder = await res.json();

  //       toast.success(`Заказ оформлен!`);
  //       clear(); // очищаем корзину
  //       navigate('/orders'); // или '/profile/orders', '/thank-you' и т.д.
  //     } catch (err: any) {
  //       console.error('Ошибка оформления заказа:', err);
  //       toast.error(err.message || 'Не удалось оформить заказ');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const onSubmit = async (formData: OrderFormData) => {
    if (cart.length === 0) {
      toast.warn('Корзина пуста');
      return;
    }

    setLoading(true);

    try {
      const token = sessionStorage.getItem('token');

      if (!token) {
        toast.error('Необходима авторизация. Пожалуйста, войдите в аккаунт.');
        setLoading(false);
        navigate('/login'); 
        return;
      }

      const catalogIds = cart.map(item => item.id);

      const payload = {
        status: 'new',
        items: cart.map(item => ({
          catalogId: item.id,
          quantity: item.quantity,
        })),
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let errorMessage = 'Ошибка сервера';
        try {
          const errData = await res.json();
          errorMessage = errData.message || errorMessage;
        } catch {}
        throw new Error(errorMessage);
      }

      const createdOrder = await res.json();

      toast.success('Заказ успешно оформлен!');
      clear();
      navigate('/orders');
    } catch (err: any) {
      console.error('Ошибка при создании заказа:', err);
      toast.error(err.message || 'Не удалось оформить заказ');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <FormBox>
        <Typography variant="body1" color="text.secondary">
          Корзина пуста. Добавьте товары перед оформлением заказа.
        </Typography>
      </FormBox>
    );
  }

  return (
    <FormBox>
      <FormPaper elevation={0}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormStack spacing={3}>
            <Typography variant="h5" component="h1">
              Оформление заказа
            </Typography>

            <List disablePadding>
              {cartItems.map(item => (
                <ListItem key={item.id} divider>
                  <ListItemAvatar>
                    <Avatar
                      src={item.image}
                      alt={item.name}
                      variant="rounded"
                      sx={{ width: 56, height: 56 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
                    secondary={
                      <>
                        Кол-во: {item.quantity} × {item.price} ₽
                        {item.weight > 0 && ` • ${item.weight} кг`}
                      </>
                    }
                    secondaryTypographyProps={{ component: 'span' }}
                  />
                </ListItem>
              ))}
            </List>

            <Box sx={{ mt: 1 }}>
              <Typography variant="h6" color="primary">
                Итого: {totalPrice.toLocaleString()} ₽
              </Typography>
            </Box>

            <TextField
              {...register('date')}
              label="Желаемая дата готовности"
              type="date"
              fullWidth
              error={!!errors.date}
              helperText={errors.date?.message}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                min: new Date().toISOString().split('T')[0],
              }}
            />

            {/* Раскомментируйте, если хотите поле для описания / пожеланий */}
            {/* <TextField
              {...register('design')}
              label="Пожелания / описание дизайна"
              multiline
              rows={3}
              fullWidth
              placeholder="Особые требования, комментарии..."
            /> */}

            <FormButton
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              disabled={loading}
              size="large"
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Оформить заказ'}
            </FormButton>

            <FormButton
              variant="outlined"
              fullWidth
              onClick={() => navigate(-1)}
              disabled={loading}
            >
              Отмена
            </FormButton>
          </FormStack>
        </form>
      </FormPaper>
    </FormBox>
  );
};

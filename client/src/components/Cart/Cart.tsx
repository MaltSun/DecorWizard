// Cart.tsx
import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Divider,
  Stack,
  Badge,
} from '@mui/material';
import {
  Close as CloseIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCartCheckout as CheckoutIcon,
} from '@mui/icons-material';

import { useCart } from '../../pages/Cart/useCart';          // твой хук корзины
import { useCatalog } from '../../pages/Cart/CartProvider'; // или откуда берёшь каталог

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cart, updateQuantity, removeFromCart, clearCart, getTotalItems } = useCart();
  const { catalog } = useCatalog();

  const cartItems = Object.entries(cart)
    .map(([id, quantity]) => {
      const product = catalog.find(p => p.id === id);
      if (!product) return null;
      return {
        ...product,
        quantity,
        subtotal: Number(product.price),
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);


  const totalPrice = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  const isEmpty = cartItems.length === 0;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 420 },
          bgcolor: 'background.paper',
        },
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            p: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Badge color="primary">
              <CheckoutIcon fontSize="large" />
            </Badge>
            <Typography variant="h5" component="div">
              Корзина
            </Typography>
          </Stack>

          <IconButton onClick={onClose} size="large">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Содержимое */}
        <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
          {isEmpty ? (
            <EmptyCart onClose={onClose} />
          ) : (
            <List disablePadding>
              {cartItems.map(item => (
                <React.Fragment key={item.id}>
                  <ListItem
                    alignItems="flex-start"
                    sx={{
                      py: 2,
                      px: 1,
                      borderRadius: 2,
                      transition: 'all 0.2s',
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        src={item.image}
                        alt={item.name}
                        sx={{ width: 80, height: 80, borderRadius: 2 }}
                      />
                    </ListItemAvatar>

                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight={600}>
                          {item.name}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" color="text.secondary">
                            {Number(item.price).toLocaleString('ru-RU')} ₽
                          </Typography>
                          <Typography variant="body2" color="text.primary" fontWeight={500} mt={0.5}>
                            Итого: {item.subtotal.toLocaleString('ru-RU')} ₽
                          </Typography>
                        </>
                      }
                      sx={{ ml: 2, flex: 1 }}
                    />

                    <Stack direction="row" spacing={1} alignItems="center" sx={{ ml: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>

                      <Typography
                        variant="body1"
                        sx={{
                          minWidth: 32,
                          textAlign: 'center',
                          fontWeight: 600,
                        }}
                      >
                        {item.quantity}
                      </Typography>

                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>

                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => removeFromCart(item.id)}
                        sx={{ ml: 1 }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </ListItem>
                  <Divider variant="middle" />
                </React.Fragment>
              ))}
            </List>
          )}
        </Box>

        {/* Футер с итогом и кнопкой оформления */}
        {!isEmpty && (
          <Box
            sx={{
              p: 3,
              borderTop: 1,
              borderColor: 'divider',
              bgcolor: 'background.default',
            }}
          >
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6">Итого:</Typography>
                <Typography variant="h6" fontWeight={700}>
                  {totalPrice.toLocaleString('ru-RU')} ₽
                </Typography>
              </Stack>

              <Button
                variant="contained"
                size="large"
                fullWidth
                startIcon={<CheckoutIcon />}
                onClick={() => {
                  alert('Переход к оформлению заказа...');
                  // здесь будет логика оформления
                  // onClose();
                }}
              >
                Оформить заказ
              </Button>

              <Button
                variant="outlined"
                color="inherit"
                size="small"
                onClick={clearCart}
                sx={{ alignSelf: 'center', mt: 1 }}
              >
                Очистить корзину
              </Button>
            </Stack>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}

// Вспомогательный компонент для пустой корзины
function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        p: 4,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Ваша корзина пуста
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 320 }}>
        Добавьте товары из каталога — здесь появится список выбранных позиций
      </Typography>
      <Button variant="contained" onClick={onClose}>
        Продолжить покупки
      </Button>
    </Box>
  );
}
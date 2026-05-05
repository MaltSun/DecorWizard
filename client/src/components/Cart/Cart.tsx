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

import { cartStore } from '../../store/cartSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../router/router';
import { useCatalogStore } from '../../store/catalogSlice';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cart, update, remove, clear, getTotalItems } = cartStore();

  const { t } = useTranslation('cart');
  const navigate = useNavigate();

  const catalog = useCatalogStore.getState().catalog;

  const cartItems = cart
    .map(cartItem => {
      const product = catalog.find(p => p.id === cartItem.id);
      if (!product) return null;

      return {
        ...product,
        quantity: cartItem.quantity,
        subtotal: Number(product.price) * cartItem.quantity,
      };
    })
    .filter(Boolean);

  const totalPrice = cartItems.reduce((sum, item) => sum + (item?.subtotal || 0), 0);
  const isEmpty = cart.length === 0;


  const handleNavigateToOrder = () => {
    if (sessionStorage.getItem('user')) {
      onClose();
      navigate(AppRoutes.Order.Path);
    } else {
      toast.info(t('need_to_login'), { autoClose: 2000 });
      navigate(AppRoutes.Login);
    }

  };

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
              {t('cart')}
            </Typography>
          </Stack>

          <IconButton onClick={onClose} size="large">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
          {isEmpty ? (
            <EmptyCart onClose={() => navigate(AppRoutes.Catalog)} />
          ) : (
            <List disablePadding>
              {cartItems.map(item => (
                <React.Fragment key={item?.id}>
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
                        src={item?.image}
                        alt={item?.name}
                        sx={{ width: 80, height: 80, borderRadius: 2 }}
                      />
                    </ListItemAvatar>

                    <ListItemText
                      primary={
                        <Typography variant="body1" fontWeight={600}>
                          {item?.name}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="h3" color="text.secondary">
                            {Number(item?.price).toLocaleString('ru-RU')} ₽
                          </Typography>
                        </>
                      }
                      sx={{ ml: 2, flex: 1 }}
                    />

                    <Stack direction="row" spacing={1} alignItems="center" sx={{ ml: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => update(item?.id, item?.quantity - 1)}
                        disabled={item?.quantity <= 1}
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
                        {item?.quantity}
                      </Typography>

                      <IconButton size="small" onClick={() => update(item?.id, item?.quantity + 1)}>
                        <AddIcon fontSize="small" />
                      </IconButton>

                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => remove(item?.id)}
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
                <Typography variant="h6">{t('total_items')}</Typography>
                <Typography variant="h6" fontWeight={700}>
                  {totalPrice.toLocaleString('ru-RU')} Б
                </Typography>
              </Stack>

              <Button
                variant="contained"
                size="large"
                fullWidth
                startIcon={<CheckoutIcon />}
                onClick={handleNavigateToOrder}
              >
                {t('go_to_checkout')}
              </Button>

              <Button
                variant="outlined"
                color="inherit"
                size="small"
                onClick={clear}
                sx={{ alignSelf: 'center', mt: 1 }}
              >
                {t('clear_cart')}
              </Button>
            </Stack>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}

function EmptyCart({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation('cart');

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
        {t('empty_cart')}
      </Typography>

      <Button variant="contained" onClick={onClose}>
        {t('go_to_catalog')}
      </Button>
    </Box>
  );
}

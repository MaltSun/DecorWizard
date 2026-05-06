import React, { use } from 'react';
import { CardContainer, Container, OrderImage } from './style';
import { OrderItem } from './type';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const OrderCard: React.FC<OrderItem> = ({ img, name, price, quantity }) => {
  const { t } = useTranslation('cart');
  return (
    <CardContainer>
      <OrderImage src={img} />
      <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2, mb: 0.5 }}>
        {name}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', opacity: 0.8 }}>
        <Typography variant="body2">{t('price')}: {price}₽</Typography>
        <Typography variant="body2">x{quantity}</Typography>
      </Box>
    </CardContainer>
  );
};

export default OrderCard;

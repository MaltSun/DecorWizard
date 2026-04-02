import React from 'react';
import { Container, OrderImage } from './style';
import { OrderItem } from './type';
import { Typography } from '@mui/material';

export const OrderCard: React.FC<OrderItem> = ({ img, name, price, quantity }) => {
  return (
    <Container>
      <OrderImage src={img} />
      <Typography variant="h3">{name}</Typography>
      <Typography variant="body1">{price}</Typography>
      <Typography variant="body1">{quantity}</Typography>
    </Container>
  );
};

export default OrderCard;

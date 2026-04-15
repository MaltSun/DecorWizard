import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import { useLocation } from 'react-router-dom';
import CheckoutForm from '../../modules/CheckoutForm/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import convertToSubcurrency from '../../modules/CheckoutForm/convertToSubcurrency';
import {  Typography } from '@mui/material';
import { Container, MainPart } from './style';
import { useTranslation } from 'react-i18next';

export const CheckoutPage = () => {
  const location = useLocation();
  const data = location.state ?? {};
  const { t } = useTranslation();

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

  return (
    <Container>
      <Typography variant="h1">{t('payment')}</Typography>

      <Elements
        stripe={stripePromise}
        options={{
          mode: 'payment',
          amount: convertToSubcurrency(data.totalPrice, 100),
          currency: 'byn',
        }}
      >
        <CheckoutForm amount={data.totalPrice} orderData={data.orderData} />
      </Elements>

    </Container>
   
  );
};

export default CheckoutPage;

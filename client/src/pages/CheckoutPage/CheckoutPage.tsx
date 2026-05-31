import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import { useLocation } from 'react-router-dom';
import CheckoutForm from '../../modules/CheckoutForm/CheckoutForm';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import convertToSubcurrency from '../../modules/CheckoutForm/convertToSubcurrency';
import { CircularProgress, Typography } from '@mui/material';
import { Container } from './style';
import { useTranslation } from 'react-i18next';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);
 
export const CheckoutPage = () => {
  const location = useLocation();
  const data = location.state as {
    clientSecret: string;
    totalPrice: number;
    orderId: string;
    orderData: any;
  } | null;
  const { t } = useTranslation('cart');

 
  if (!data || !data.clientSecret) {
    return (
      <Container>
        <Typography>{t('loading_payment_data')}</Typography>
        <CircularProgress />
      </Container>
    );
  }

 const options: StripeElementsOptions = {
  clientSecret: data.clientSecret,
};

  return (
    <Container>
      <Typography variant="h1">{t('payment')}</Typography>

      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm
          amount={data.totalPrice}
          orderData={data.orderData}
          clientSecret={data.clientSecret}
        />
      </Elements>
    </Container>
  );
};

export default CheckoutPage;

import { CircularProgress, Button } from '@mui/material';
import convertToSubcurrency from './convertToSubcurrency';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { OrderFormData } from '../OrderForm/type';
import { CheckoutContent } from './style';
import { useTranslation } from 'react-i18next';
import theme from '../../../theme/theme';
import { AppRoutes } from '../../router/router';
import { toast } from 'react-toastify';

interface CheckoutPageProps {
  amount: number;
  clientSecret: string;
  onSuccess?: () => Promise<void>;
  orderData: OrderFormData;
}

const CheckoutForm = ({ amount, onSuccess, orderData, clientSecret }: CheckoutPageProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const { t } = useTranslation('cart');

  const [errorMessage, setErrorMessage] = useState<string>();
  // const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   fetch('http://localhost:5000/api/stripe/', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  //     },
  //     body: JSON.stringify({ amount: convertToSubcurrency(amount, 100) }),
  //   })
  //     .then(res => res.json())
  //     .then(data => setClientSecret(data.clientSecret))
  //     .finally(() => setLoading(false));
  // }, [amount]);

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   setLoading(true);

  //   if (!stripe || !elements) {
  //     return;
  //   }

  //   const { error: submitError } = await elements.submit();

  //   if (submitError) {
  //     setErrorMessage(submitError.message);
  //     setLoading(false);
  //     return;
  //   }

  //   // const baseUrl = window.location.origin;
  //   // const path = AppRoutes.Profile.Children.Order;

  //   // const finalUrl = `${baseUrl}${path}?orderId=${orderId}`;

  //   // console.log('Stripe перенаправит на:', finalUrl);

  //   const { error } = await stripe.confirmPayment({
  //     elements,
  //     clientSecret,
  //     confirmParams: {
  //       return_url: `${window.location.origin}${AppRoutes.Profile.Children.Order}`,
  //     },
  //   });

  //   if (error) {
  //     toast.error(error.message);
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret, // Use the prop provided
      confirmParams: {
        return_url: `${window.location.origin}${AppRoutes.Profile.Children.Order}`,
      },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <CheckoutContent onSubmit={handleSubmit}>
      {clientSecret && <PaymentElement />}

      {errorMessage && <div>{errorMessage}</div>}

      <Button
        variant="contained"
        disabled={loading || !stripe}
        sx={{ width: '100%', marginTop: theme.spacing(2) }}
        type="submit"
      >
        {!loading ? t('pay') : <CircularProgress />}
      </Button>
    </CheckoutContent>
  );
};

export default CheckoutForm;

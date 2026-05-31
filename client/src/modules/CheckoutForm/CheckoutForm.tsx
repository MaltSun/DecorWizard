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
   const [loading, setLoading] = useState(false);



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

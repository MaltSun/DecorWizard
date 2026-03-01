import { useTranslation } from 'react-i18next';
import { AppRoutes } from '../../router/router';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import { Bounce, toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import theme from '../../../theme/theme';
import { BoxForm, FormButton, FormPaper, FormStack } from './style';
import { ForgotPasswordSchema, type ForgotPasswordData } from './type';
import { useState } from 'react';

const ForgotForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const { t } = useTranslation(['auth', 'common']);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleNavigate = () => {
    navigate(AppRoutes.Login);
  };

  const onSubmit = async (data: ForgotPasswordData) => {
    setLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Не удалось отправить письмо');
      }

      toast.success(t('auth:emailSent') || 'Письмо отправлено!', {
        position: 'top-center',
        autoClose: 5000,
        theme: 'dark',
        transition: Bounce,
      });

      navigate(AppRoutes.Login);
    } catch (error: any) {
      toast.error(error.message || 'Произошла ошибка', {
        position: 'top-center',
        autoClose: 5000,
        theme: 'dark',
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <BoxForm>
      <FormPaper elevation={0}>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <FormStack spacing={theme.spacing(5)}>
            <TextField
              {...register('email')}
              label={t('email')}
              variant="outlined"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={loading}
            />

            <FormButton
              variant="contained"
              size="large"
              type="submit"
              disabled={loading}
              fullWidth
              // loading={loading}   ← если у твоей кнопки есть проп loading
            >
              {loading ? t('loading') || 'Отправка...' : t('auth:resetPassword')}
            </FormButton>

            <FormButton variant="outlined" fullWidth disabled={loading} onClick={handleNavigate}>
              {t('auth:cancel')}
            </FormButton>
          </FormStack>
        </form>
      </FormPaper>
    </BoxForm>
  );
};

export default ForgotForm;

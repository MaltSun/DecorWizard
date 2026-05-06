import { useTranslation } from 'react-i18next';
import { AppRoutes } from '../../router/router';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';

import { zodResolver } from '@hookform/resolvers/zod';
import { Bounce, toast } from 'react-toastify';
import { SignupUserSchema, type SignupFormData } from './type';
import { saveAuthData } from '../../utils/authUtils';
import { BoxForm, FormPaper, FormStack } from '../AuthForm/style';

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({ resolver: zodResolver(SignupUserSchema) });

  const { t } = useTranslation(['auth', 'common']);
  const navigate = useNavigate();

  const onSubmit = async (data: SignupFormData) => {
    try {
      const { confirmPassword, ...signupData } = data;
      const dataToSend = {
        ...signupData,
        role: signupData.role || 'CUSTOMER',
      };

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || t('common:error') || 'Ошибка регистрации', {
          position: 'top-center',
          autoClose: 5000,
          theme: 'light',
          transition: Bounce,
        });
        return;
      }

      saveAuthData({
        token: result.token,
        user: result.user,
      });

      toast.success(t('auth:registrationSuccess') || 'Регистрация успешна!', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'colored',
        transition: Bounce,
      });

      navigate(AppRoutes.Login);
    } catch (error: any) {
      toast.error(error.message || t('common:error') || 'Произошла ошибка', {
        position: 'top-center',
        autoClose: 5000,
        theme: 'light',
        transition: Bounce,
      });
    }
  };

  const handleNavigate = () => {
    navigate(AppRoutes.Login);
  };

  return (
    <BoxForm>
      <FormPaper elevation={0}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormStack >
            <TextField
              {...register('email')}
              label={t('email')}
              variant="outlined"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
            // disabled={loading}
            />

            <TextField
              {...register('name')}
              label={t('name')}
              variant="outlined"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
            // disabled={loading}
            />

            <TextField
              {...register('phone')}
              label={t('phone')}
              variant="outlined"
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone?.message}
            // disabled={loading}
            />

            <TextField
              {...register('password')}
              label={t('password')}
              type="password"
              variant="outlined"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
            // disabled={loading}
            />

            <TextField
              {...register('confirmPassword')}
              label={t('repetPassword')}
              type="password"
              variant="outlined"
              fullWidth
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            // disabled={loading}
            />

            <Button
              variant="contained"
              size="large"
              type="submit"
              // disabled={loading}
              fullWidth
            // loading={loading}
            >
              {t('auth:createAccount')}
            </Button>

            <Button
              variant="text"
              fullWidth
              // disabled={loading}
              onClick={handleNavigate}
            >
              {t('auth:haveAccount')}
            </Button>
          </FormStack>
        </form>
      </FormPaper>
    </BoxForm>
  );
};

export default SignupForm;

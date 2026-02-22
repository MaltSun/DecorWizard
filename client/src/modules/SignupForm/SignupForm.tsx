import { useTranslation } from 'react-i18next';
import { AppRoutes } from '../../router/router';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';

import { zodResolver } from '@hookform/resolvers/zod';
import { Bounce, toast } from 'react-toastify';
import { BoxForm, FormButton, FormPaper, FormStack } from '../AuthForm/style';
import { SignupUserSchema, type SignupFormData } from './type';

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
      const response = await fetch('/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        toast.error(`${response.status}`, {
          position: 'top-center',
          autoClose: 5000,
          theme: 'light',
          transition: Bounce,
        });
      } else {
        const result = await response.json();
        toast.success(`${result.message}`, {
          position: 'top-center',
          autoClose: 3000,
          theme: 'colored',
        });
        navigate(AppRoutes.Login);
      }
    } catch (error) {
      toast.error(`${error}`, {
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
          <FormStack spacing={5}>
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

            <FormButton
              variant="contained"
              size="large"
              type="submit"
              // disabled={loading}
              fullWidth
              // loading={loading}
            >
              {t('auth:createAccount')}
            </FormButton>

            <FormButton
              variant="text"
              fullWidth
              // disabled={loading}
              onClick={handleNavigate}
            >
              {t('auth:haveAccount')}
            </FormButton>
          </FormStack>
        </form>
      </FormPaper>
    </BoxForm>
  );
};

export default SignupForm;

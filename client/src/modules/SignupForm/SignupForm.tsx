import { useTranslation } from 'react-i18next';
import { AppRoutes } from '../../router/router';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';

import { zodResolver } from '@hookform/resolvers/zod';
import { Bounce, toast } from 'react-toastify';
import { BoxForm, FormButton, FormPaper, FormStack } from '../AuthForm/style';
import { SignupUserSchema, type SignupFormData } from './type';
import { saveAuthData } from '../../utils/authUtils';

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
      // Удаляем confirmPassword перед отправкой на сервер
      // Устанавливаем роль по умолчанию, если не указана
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

      // Сохраняем токен и данные пользователя
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

      // Перенаправляем на главную страницу после успешной регистрации
      navigate(AppRoutes.Main);
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

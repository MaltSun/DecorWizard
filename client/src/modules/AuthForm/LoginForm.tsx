import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bounce, toast } from 'react-toastify';
import { AppRoutes } from '../../router/router';
import { useNavigate } from 'react-router-dom';
import { BoxForm, FormButton, FormPaper, FormStack } from './style';
import { LoginUserSchema, type LoginFormData } from './type';
import theme from '../../../theme/theme';
import { saveAuthData } from '../../utils/authUtils';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginUserSchema),
  });

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(AppRoutes.ForgotPassword);
  };

  const { t } = useTranslation(['auth', 'common']);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || t('auth:loginError') || 'Неверный email или пароль', {
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

      toast.success(t('auth:loginSuccess') || 'Вход выполнен успешно!', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'colored',
        transition: Bounce,
      });

      navigate(AppRoutes.Main);
    } catch (error: any) {
      toast.error(error.message || t('common:error') || 'Произошла ошибка', {
        position: 'top-center',
        autoClose: 5000,
        theme: 'dark',
        transition: Bounce,
      });
    }
  };

  return (
    <BoxForm>
      <FormPaper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormStack>
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
              {...register('password')}
              label={t('password')}
              type="password"
              variant="outlined"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
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
              {t('auth:login')}
            </FormButton>

            <FormButton
              variant="text"
              fullWidth
              // disabled={loading}
              onClick={handleNavigate}
            >
              {t('auth:forgotPassword')}
            </FormButton>
          </FormStack>
        </form>
      </FormPaper>
    </BoxForm>
  );
};

export default LoginForm;

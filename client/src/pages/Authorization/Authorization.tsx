import React from 'react';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import { MainPart, Container } from '../ForgotPassword/style';
import LoginForm from '../../modules/AuthForm/LoginForm';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

const Authorization = () => {
  const { t } = useTranslation('auth');

  return (
    <Container>
      <AuthHeader active="login"></AuthHeader>
      <MainPart>
        <Typography variant="h1">{t('auth:loginAcc')}</Typography>
        <Typography variant="body1">{t('auth:welcomeSignup')}</Typography>

        <LoginForm />
      </MainPart>
    </Container>
  );
};

export default Authorization;

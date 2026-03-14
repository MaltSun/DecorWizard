import React from 'react';
import Header from '../../components/Header/Header';
import { MainPart, Container } from '../ForgotPassword/style';
import LoginForm from '../../modules/AuthForm/LoginForm';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { OrderForm } from '../../modules/OrderForm/OrderForm';

export default function Order() {
  // const { t } = useTranslation('auth');

  return (
    <Container>
      <Header active="catalog"></Header>
      <MainPart>
        <OrderForm/>
      </MainPart>
    </Container>
  );
};

import React from 'react';
import Header from '../../components/Header/Header';
import { OrderForm } from '../../modules/OrderForm/OrderForm';
import { Container, MainPart } from './style';

export default function Order() {
  return (
    <Container>
      <Header active=""></Header>
      <MainPart>
        <OrderForm/>
      </MainPart>
    </Container>
  );
};

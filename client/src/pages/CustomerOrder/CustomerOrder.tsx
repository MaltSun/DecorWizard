import React, { lazy, Suspense, useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import { useTranslation } from 'react-i18next';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import UserInfo from '../../components/UserInfo/UserInfo';
import { MainPart, Container } from './style';
import { ProfileData } from './type';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { OrderItem } from '../../modules/OrderCard/type';
import { OrderCard } from '../../modules/OrderCard/OrderCard';
const ProfileAvatar = lazy(() => import('../../modules/ProfileAvatar/ProfileAvatar'));

export const CustomerOrder = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          toast.error('Авторизуйтесь');
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:5000/api/orders/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Ошибка загрузки');

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        toast.error('Не удалось загрузить заказы');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [navigate]);

  if (loading) return <CircularProgress />;

  return (
    <Container>
      <Header active="profile" />
      <MainPart>
        <SideBar active="order" />

        <Container style={{ flex: 1 }}>
          {orders.length > 0 ? (
            orders.map(order =>
              order.orderCatalog.map((entry: any) => (
                <OrderCard
                  key={entry.id}
                  img={entry.catalog.img}
                  name={entry.catalog.name}
                  price={entry.catalog.price}
                  quantity={entry.quantity}
                />
              ))
            )
          ) : (
            <>
              <img
                style={{ width: '300px', height: '300px', borderRadius: '50%', opacity: 0.6 }}
                src="/favicon.png"
                alt=""
              />
              <Typography variant="h2">У вас пока нет заказов</Typography>
              <Button variant="contained" onClick={() => navigate('/catalog')}>
                Перейти в каталог
              </Button>
            </>
          )}
        </Container>
      </MainPart>
    </Container>
  );
};

export default CustomerOrder;

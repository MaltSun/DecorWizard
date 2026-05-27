import React, { use, useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import { CircularProgress, Typography, Button, Box } from '@mui/material';
import { MainPart, Container } from '../Customer/style';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { OrderCard } from '../../components/OrderCard/OrderCard';
import { useTranslation } from 'react-i18next';
import { InnerContainer, OrderBlock, OrderFooter, OrderHeader, OrderSection, TotalPrice } from './style';

export const CustomerOrder = () => {
  const [orders, setOrders] = useState({ active: [] });
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  const [isHistoryOpen, setHistoryOpen] = useState(false);

  const { t } = useTranslation('cart');

  const fetchOrders = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:5000/api/orders/user', {
        headers: { Authorization: `Bearer ${token}` },
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

  useEffect(() => {
    fetchOrders();
  }, []);

  const renderOrderList = (orderList: any[]) =>
    orderList.map((order: any) => {
      const totalOrderSum = order.orderCatalog.reduce(
        (acc: number, entry: any) => acc + entry.catalog.price * entry.quantity,
        0
      );

      return (
        <OrderSection key={order.id}>
          <OrderHeader>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                {t('order_date')}
              </Typography>
              <Typography variant="h6" sx={{ fontFamily: '"Kurale", serif' }}>
                {new Date(order.createdAt).toLocaleDateString()}
              </Typography>
            </Box>

            <Box sx={{
              backgroundColor: order.status === 'completed' ? '#e8f5e9' : '#fff3e0',
              color: order.status === 'completed' ? '#2e7d32' : '#ef6c00',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.875rem',
              fontWeight: 600
            }}>
              {order.status.toUpperCase()}
            </Box>
          </OrderHeader>

          <OrderBlock>
            {order.orderCatalog.map((entry: any) => (
              <OrderCard
                key={entry.id}
                img={!order.design ? entry.catalog.image : order.design}
                name={entry.catalog.name}
                price={entry.catalog.price}
                quantity={entry.quantity}
              />
            ))}
          </OrderBlock>

          <OrderFooter>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {t('total_amount') || 'Итого'}:
            </Typography>
            <TotalPrice>
              {totalOrderSum.toLocaleString()} ₽
            </TotalPrice>
          </OrderFooter>
        </OrderSection>
      );
    });

  if (loading) return <CircularProgress />;

  return (
    <Container>
      <Header active="profile" />
      <MainPart>
        <SideBar active="order" />
        <InnerContainer >
          {orders.active.length > 0 ? (
            renderOrderList(orders.active)
          ) : (
            <Typography>{t('no_active_orders')}</Typography>
          )}

        </InnerContainer>

      </MainPart>
    </Container>
  );
};

export default CustomerOrder;

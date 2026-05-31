import React, { useEffect, useState } from 'react';
import { CircularProgress, Typography, Button, Box } from '@mui/material';
import { InnerContainer, MainPart, Container } from '../Customer/style';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReviewModal from '../../modules/ReviewModal/ReviewModal';
import SideBar from '../../components/SideBar/SideBar';
import Header from '../../components/Header/Header';
import { OrderHeader, OrderSection } from '../CustomerOrder/style';

export const CustomerReview = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const { t } = useTranslation('reviews');

  const fetchOrders = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/orders/user', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }

      const data = await response.json();
      const history = data?.history || [];

      setOrders(history);
    } catch (err) {
      console.error("Review fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Container>
      <Header active="profile" />
      <MainPart>
        <SideBar active="review" />
        <InnerContainer>
          {orders.length > 0 ? (
            orders.map((order) => {
              const isCompleted = order.status === 'completed';
              const hasReview = order.reviews && order.reviews.length > 0;

              return (
                <OrderSection key={order.id} sx={{ mb: 2, p: 3, width: '90%' }}>
                  <OrderHeader>
                    <Typography variant="h6" sx={{ fontFamily: '"Kurale", serif' }}>
                      {t('orderDate')} {new Date(order.createdAt).toLocaleDateString()}
                    </Typography>

                    {isCompleted && !hasReview && (
                      <Button
                        variant="contained"
                        onClick={() => setSelectedOrderId(order.id)}
                        sx={{ textTransform: 'none', fontFamily: '"Kurale", serif' }}
                      >
                        {t('leaveReview')}
                      </Button>
                    )}
                  </OrderHeader>

                  <Typography variant="body2" color="text.secondary">
                    {t('orderContents')}{' '}
                    {order.orderCatalog?.map((e: any) => e.catalog.name).join(', ') || '-'}
                  </Typography>

                  {isCompleted && hasReview && (
                    <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                      ✓ {t('reviewLeft') || 'Отзыв оставлен'}
                    </Typography>
                  )}
                </OrderSection>
              );
            })
          ) : (
            <Box sx={{ textAlign: 'center', mt: 5 }}>
              <img src="/favicon.png" style={{ width: 150, opacity: 0.5 }} alt="" />
              <Typography variant="h5" sx={{ mt: 2 }}>
                {t('noOrders') || 'У вас пока нет заказов'}
              </Typography>
            </Box>
          )}
        </InnerContainer>
      </MainPart>

      <ReviewModal
        open={!!selectedOrderId}
        onClose={() => setSelectedOrderId(null)}
        orderId={selectedOrderId || ''}
        onSuccess={fetchOrders} />
    </Container>
  );
};

export default CustomerReview;
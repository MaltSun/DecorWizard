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
  const navigate = useNavigate();
  const { t } = useTranslation('reviews');

 const fetchPendingReviews = async () => {
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
    const pending = history.filter((o: any) => o.status === 'completed' && !o.review);
    setOrders(pending);
  } catch (err) {
    console.error("Review fetch error:", err instanceof Error ? err.message : String(err));
  } finally {
    setLoading(false);
  }
};

  useEffect(() => { fetchPendingReviews(); }, []);

  if (loading) return <CircularProgress />;

  return (
    <Container>
      <Header active="profile" />
      <MainPart>
        <SideBar active="review" />
        <InnerContainer style={{ flex: 1 }}>
          <Typography variant="h4" sx={{ fontFamily: '"Kurale", serif', mb: 3 }}>
            {t('pendingReviews')}
          </Typography>

          {orders.length > 0 ? (
            orders.map(order => (
              <OrderSection key={order.id} sx={{ mb: 2, p: 3 }}>
                <OrderHeader>
                  <Typography variant="h6" sx={{ fontFamily: '"Kurale", serif' }}>
                    Заказ от {new Date(order.createdAt).toLocaleDateString()}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => setSelectedOrderId(order.id)}
                    sx={{ textTransform: 'none', fontFamily: '"Kurale", serif' }}
                  >
                    {t('leaveReview')}
                  </Button>
                </OrderHeader>
                <Typography variant="body2" color="text.secondary">
                  Состав: {order.orderCatalog.map((e: any) => e.catalog.name).join(', ')}
                </Typography>
              </OrderSection>
            ))
          ) : (
            <Box sx={{ textAlign: 'center', mt: 5 }}>
              <img src="/favicon.png" style={{ width: 150, opacity: 0.5 }} alt="" />
              <Typography variant="h5" sx={{ mt: 2 }}> {t('allReviewed')}</Typography>
            </Box>
          )}
        </InnerContainer>
      </MainPart>

      <ReviewModal
        open={!!selectedOrderId}
        onClose={() => setSelectedOrderId(null)}
        orderId={selectedOrderId || ''}
        onSuccess={fetchPendingReviews}
      />
    </Container>
  );
};

export default CustomerReview;
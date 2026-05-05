import { useEffect, useState } from 'react';
import { ReviewSection, OwnerAnswer } from './style'; // Ваши новые стили
import { Box, CircularProgress, Rating, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Container, MainPart } from '../Customer/style';
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import { InnerContainer } from '../CustomerOrder/style';
import { useTranslation } from 'react-i18next';

export const CustomerAnswer = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation('reviews');

  useEffect(() => {
    const fetchReviewedOrders = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/orders/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        const reviewed = (data.history || []).filter((o: any) => o.review);
        setOrders(reviewed);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviewedOrders();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Container>
      <Header active="profile" />
      <MainPart>
        <SideBar active="answer" />
        <InnerContainer style={{ flex: 1 }}>
          <Typography variant="h4" sx={{ fontFamily: '"Kurale", serif', mb: 3 }}>
            {t('reviews:yourReviews')}
          </Typography>

          {orders.length > 0 ? (
            orders.map(order => (
              <ReviewSection key={order.id}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Rating value={order.review.mark} readOnly />
                  <Typography variant="caption" color="text.secondary">
                    Заказ от {new Date(order.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>

                <Typography variant="body1" sx={{ fontStyle: 'italic', my: 2 }}>
                  "{order.review.text}"
                </Typography>

                {order.review.answer ? (
                  <OwnerAnswer>
                    <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 800 }}>
                      Кондитер ответил:
                    </Typography>
                    <Typography variant="body2">
                      {order.review.answer.text}
                    </Typography>
                  </OwnerAnswer>
                ) : (
                  <Typography variant="caption" sx={{ opacity: 0.6 }}>
                    Ожидаем ответ от владельца...
                  </Typography>
                )}
              </ReviewSection>
            ))
          ) : (
            <Typography sx={{ textAlign: 'center', mt: 10 }}>Вы еще не оставляли отзывов.</Typography>
          )}
        </InnerContainer>
      </MainPart>
    </Container>
  );
};

export default CustomerAnswer;
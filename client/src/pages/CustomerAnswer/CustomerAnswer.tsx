import { useEffect, useState } from 'react';
import { ReviewSection, OwnerAnswer } from './style'; 
import { Box, CircularProgress, Rating, Typography } from '@mui/material';
import { Container, MainPart, InnerContainer } from '../Customer/style';
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import { useTranslation } from 'react-i18next';

export const CustomerAnswer = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation(['reviews', 'common']);

  useEffect(() => {
    const fetchReviewedOrders = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/orders/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        
        // Объединяем активные и историю, затем фильтруем те, где ЕСТЬ отзывы
        const allOrders = [...(data.active || []), ...(data.history || [])];
        const reviewed = allOrders.filter((o: any) => o.reviews && o.reviews.length > 0);
        
        setOrders(reviewed);
      } catch (err) {
        console.error("Fetch reviewed orders error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviewedOrders();
  }, []);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

  return (
    <Container>
      <Header active="profile" />
      <MainPart>
        <SideBar active="answer" />
        <InnerContainer>
          <Typography variant="h4" sx={{ fontFamily: '"Kurale", serif', mb: 3 }}>
            {t('reviews:yourReviews')}
          </Typography>

          {orders.length > 0 ? (
            orders.map(order => {
              const review = order.reviews[0]; // Берем первый отзыв
              const ownerAnswer = review.answers && review.answers[0]; // Берем первый ответ кондитера

              return (
                <ReviewSection key={order.id} sx={{ mb: 3, p: 2, border: '1px solid #eee', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Rating value={review.mark} readOnly />
                    <Typography variant="caption" color="text.secondary">
                      Заказ от {new Date(order.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>

                  <Typography variant="body1" sx={{ fontStyle: 'italic', my: 2, color: '#555' }}>
                    "{review.text}"
                  </Typography>

                  {ownerAnswer ? (
                    <OwnerAnswer sx={{ mt: 2, p: 2, bgcolor: '#f0f7ff', borderRadius: 1, borderLeft: '4px solid #1976d2' }}>
                      <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 800, mb: 0.5 }}>
                        Кондитер ответил:
                      </Typography>
                      <Typography variant="body2">
                        {ownerAnswer.text}
                      </Typography>
                    </OwnerAnswer>
                  ) : (
                    <Typography variant="caption" sx={{ opacity: 0.6, display: 'block', mt: 1 }}>
                      Ожидаем ответ от кондитера...
                    </Typography>
                  )}
                </ReviewSection>
              );
            })
          ) : (
            <Typography sx={{ textAlign: 'center', mt: 10, opacity: 0.5 }}>
              Вы еще не оставляли отзывов.
            </Typography>
          )}
        </InnerContainer>
      </MainPart>
    </Container>
  );
};

export default CustomerAnswer;
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, ContentContainer, NoHistoryContainer } from './style';
import Header from '../../components/Header/Header';
import { HistoryCardProps } from '../../components/HistoryCard/type';
import HistoryCard from '../../components/HistoryCard/HistoryCard';
import { Typography } from '@mui/material';
import { AddToCartForm } from '../../modules/AddToCartForm/AddToCartForm';
import Footer from '../../components/Footer/Footer';

const History = () => {
  const { t } = useTranslation(['common']);
  const [isOpen, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<HistoryCardProps | null>(null);

  const data: HistoryCardProps[] = sessionStorage.getItem('history')
    ? JSON.parse(sessionStorage.getItem('history') || '[]')
    : [];

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Container>
      <Header active={'history'} />
      {data.length > 0 ? (
        <>
          <ContentContainer>
            {data.map((card, index) => (
              <HistoryCard
                key={index}
                {...card}
                onClick={() => handleOpen()}
              />
            ))}
          </ContentContainer>

          {isOpen && (
            <AddToCartForm
              img={selectedCard?.imageSrc}
              onClose={handleClose}
            />
          )}
        </>
      ) : (
        <NoHistoryContainer>
          <img src="/logo.png" alt="no history" style={{ width: '300px', marginBottom: '20px' }} />
          <Typography variant="h2">{t('noHistory')}</Typography>
        </NoHistoryContainer>
      )}
    </Container>
  );
};

export default History;

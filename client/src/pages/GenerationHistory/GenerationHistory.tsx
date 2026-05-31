import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, ContentContainer, NoHistoryContainer } from './style';
import Header from '../../components/Header/Header';
import { HistoryCardProps } from '../../components/HistoryCard/type';
import HistoryCard from '../../components/HistoryCard/HistoryCard';
import { Typography } from '@mui/material';
import { AddToCartForm } from '../../modules/AddToCartForm/AddToCartForm';

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
  const handleDelete = (title: string) => {
    const updatedHistory = data.filter(card => card.title !== title);
    sessionStorage.setItem('history', JSON.stringify(updatedHistory));
  }

  const handleOpen = (card: HistoryCardProps) => {
    setSelectedCard(card);
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
                onClick={() => handleOpen(card)}
                onDelete={() => handleDelete(card.title)}
              />
            ))}
          </ContentContainer>

          {isOpen && selectedCard && (
            <AddToCartForm
              img={selectedCard.imageSrc}
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

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, ContentContainer } from './style';
import Header from '../../components/Header/Header';
import { HistoryCardProps } from '../../components/HistoryCard/type';
import HistoryCard from '../../components/HistoryCard/HistoryCard';
import { Typography } from '@mui/material';
import { AddToCartForm } from '../../modules/AddToCartForm/AddToCartForm';

const History = () => {
  const { t } = useTranslation(['common']);
  const [isOpen, setOpen] = useState(false);
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
      <ContentContainer>
        {data.length > 0 ? (
          data.map((card, index) => (
            <>
              <HistoryCard key={index} {...card} onClick={handleOpen} />
              {isOpen && <AddToCartForm img={card.imageSrc} onClose={handleClose} />}
            </>
          ))
        ) : (
          <Typography variant="body1">{t('noHistory')}</Typography>
        )}
      </ContentContainer>
    </Container>
  );
};

export default History;

import React, { useState } from 'react';
import { CardContainer, InfoContainer, Image } from './style';
import { HistoryCardProps } from './type';
import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const HistoryCard: React.FC<HistoryCardProps> = ({ imageSrc, title, prompt, onClick, onDelete }) => {
  const { t } = useTranslation('common');

  return (
    <CardContainer>
      <Image src={imageSrc} alt={title} />
      <InfoContainer>
        <Typography variant="h2">{title}</Typography>

        <Typography variant="body1">{prompt}</Typography>

        <Box sx={{ display: 'flex', gap: '10px', mt: 2 }}>
          <Button variant="contained" onClick={onClick}>
            {t('chooseDecor')}
          </Button>
          <Button variant="contained" onClick={onDelete}>
            {t('delete')}
          </Button>
        </Box>

      </InfoContainer>
    </CardContainer>
  );
};

export default HistoryCard;

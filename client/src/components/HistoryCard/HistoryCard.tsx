import React, { useState } from 'react';
import { CardContainer, InfoContainer, Image } from './style';
import { HistoryCardProps } from './type';
import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../store/cartSlice';
import { AddToCartForm } from '../../modules/AddToCartForm/AddToCartForm';

const HistoryCard: React.FC<HistoryCardProps> = ({ imageSrc, title, prompt, onClick }) => {
  const { t } = useTranslation('common');
  const cart = useStore();
  // const [isOpen, setOpen] = useState(false);

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <CardContainer>
      <Image src={imageSrc} alt={title} />
      <InfoContainer>
        <Typography variant="h2">{title}</Typography>

        <Typography variant="body1">{prompt}</Typography>

        <Button variant="contained" onClick={onClick}>
          {t('ChooseDecor')}
        </Button>
        {/* {isOpen ?? <AddToCartForm img={imageSrc} onClick={handleClose} />} */}

        <Button variant="contained" onClick={() => {}}>
          {t('delete')}
        </Button>
      </InfoContainer>
    </CardContainer>
  );
};

export default HistoryCard;

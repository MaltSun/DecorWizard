import { Typography } from '@mui/material';
import React from 'react';
import { ItemCard } from './style';
import { StepProps } from './type';
import theme from '../../../theme/theme';

const StepCard: React.FC<StepProps> = ({ title, description }) => {
  return (
    <ItemCard>
      <Typography variant="h3">{title}</Typography>
      <Typography variant="body2" sx={{ fontSize: '20px' }}>
        {description}
      </Typography>
    </ItemCard>
  );
};

export default StepCard;

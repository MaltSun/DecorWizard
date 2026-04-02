import { Image } from '@mui/icons-material';
import { Box, styled } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '25%',
  maxWidth: '250px',
  minHeight: '300px',
}));

export const MainPart = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(5),
  //   padding: theme.spacing(5),
  width: '100%',
  //   height: '60vh',
}));

export const OrderImage = styled(Image)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '25%',
  maxWidth: '250px',
  minHeight: '300px',
}));

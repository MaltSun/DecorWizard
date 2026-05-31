import { Image } from '@mui/icons-material';
import { Box, styled } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  background: theme.palette.background.default,
  maxWidth: '250px',
  minHeight: '300px',
}));

export const MainPart = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(5),
  width: '100%',
}));

export const OrderImage = styled('img')({
  width: '100%',
  height: '200px',
  objectFit: 'cover', // Чтобы фото не сплющивалось
  borderRadius: '12px',
  marginBottom: '12px',
});

export const CardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '12px',
  overflow: 'hidden',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));
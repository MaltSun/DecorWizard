import { Box, Paper, styled } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%'
}));
export const InnerContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(5)
}));

export const MainPart = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'start',
  justifyContent: 'center',
  gap: theme.spacing(5),
  width: '100%',
  top: 100,
}));


import { Box, styled } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  minHeight: '100vh',
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

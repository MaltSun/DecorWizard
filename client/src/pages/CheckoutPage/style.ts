import { Box, styled } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch', 
  gap: theme.spacing(4),
  
  width: '100%',
  maxWidth: '1152px',
  
  marginLeft: 'auto',
  marginRight: 'auto',
  
  padding: theme.spacing(4),
}));


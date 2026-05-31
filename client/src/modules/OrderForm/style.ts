import { Box, Button, Paper, Stack, styled } from '@mui/material';

export const FormPaper = styled(Paper)(({ theme }) => ({
  width: '60%',
  maxWidth: '700px',
  elevation: 0,
  // borderRadius: '15px',
  height: 'auto',
  opacity: 1,
}));

export const FormStack = styled(Stack)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(10),
  background: 'transparent',
  spacing: theme.spacing(5),
}));

export const FormBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 2,
  flexDirection: 'column',
  opacity: 0.8,
  position: 'absolute',
  top: 10,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 10,
}));

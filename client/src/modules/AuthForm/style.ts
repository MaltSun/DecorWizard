import { Box, Button, Paper, Stack, styled } from '@mui/material';

export const BoxForm = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 2,

}));

export const FormPaper = styled(Paper)(() => ({
  width: '100%',
  elevation: 0,
}));

export const FormStack = styled(Stack)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(5),
  minWidth: '600px',
  gap: theme.spacing(3),
  background: 'transparent',
}));


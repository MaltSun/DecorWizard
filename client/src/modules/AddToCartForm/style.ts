import { alpha, Box, Button, Paper, Stack, styled } from '@mui/material';

export const FormPaper = styled(Paper)(({ theme }) => ({
  width: '60%',
  maxWidth: '700px',

  elevation: 0,
  borderRadius: '15px',
  backgroundColor: theme.palette.background.default,
}));

export const FormStack = styled(Stack)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(10),
  gap: theme.spacing(5),
  background: 'transparent',
  spacing: theme.spacing(5),
}));

export const FormButton = styled(Button)(() => ({
  height: 45,
  width: '80%',
  minWidth: 210,
}));

export const FormBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 2,
  flexDirection: 'column',
   backgroundColor: alpha(theme.palette.background.paper, 0.75),
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 10,
}));

export const FormImage = styled('img')(() => ({
  width: '70%',
  height: 'auto',
  borderRadius: '12px'
}));
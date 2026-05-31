import { Box, Button, Stack, styled } from '@mui/material';

export const FormContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: 800,
  padding: '20px',
}));

export const FormStack = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(5),
}));

export const FormFieldsStack = styled(FormStack)(({ theme }) => ({
  paddingBottom: theme.spacing(3),
  gap: theme.spacing(2),
  paddingTop: theme.spacing(3),
  width: '100%',
}));

export const ButtonStack = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
}));

export const SubmitButton = styled(Button)(() => ({
  type: 'submit',
  color: 'primary',
  width: '80%',
}));

import { Stack, Typography, styled } from '@mui/material';

export const InfoContainer = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

export const UserName = styled(Typography)(({ theme }) => ({
 fontSize: '3rem',
  color: theme.palette.text.secondary,
}));

export const UserEmail = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  textTransform: 'lowercase',
  variant: 'body1',
  fontSize: '1.5rem',
}));

export const MemberSince = styled(Typography)(() => ({
  variant: 'body1',
}));

import { Avatar, Box, styled } from '@mui/material';

export const AvatarContainer = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  gap: theme.spacing(10),
  // padding: theme.spacing(),
}));

export const UploadBlock = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

export const HiddenInput = styled('input')({
  display: 'none',
});

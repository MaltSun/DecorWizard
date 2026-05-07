import { Avatar, List, Stack, styled, Box, ListItemText } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import MovingIcon from '@mui/icons-material/Moving';
import PortraitIcon from '@mui/icons-material/Portrait';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export const StyledList = styled(List)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  backgroundColor: theme.palette.background.default,
  zIndex: 999,
  position: 'sticky',
  left: 0,
  top: 100,
  width: '30%',
  boxSizing: 'border-box',
  height: 'calc(100vh - 100px)',
}));

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  gap: theme.spacing(3),
  marginBottom: '0',
}));

export const UserStack = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(5),
}));

export const UserAvatar = styled(Avatar)(({ theme }) => ({
  bgcolor: theme.palette.text.primary,
  width: '40px',
  height: '40px',
}));

export const BackIcon = styled(ArrowBackIosNewIcon)(({ theme }) => ({
  cursor: 'pointer',
  height: theme.spacing(5),
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

export const StyledGroupIcon = styled(GroupIcon, {
  shouldForwardProp: prop => prop !== 'isActive',
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  color: isActive ? 'red' : theme.palette.text.disabled,
}));

export const StyledMovingIcon = styled(MovingIcon, {
  shouldForwardProp: prop => prop !== 'isActive',
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  color: isActive ? theme.palette.text.primary : theme.palette.text.disabled,
}));

export const StyledGTranslateIcon = styled(GTranslateIcon, {
  shouldForwardProp: prop => prop !== 'isActive',
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  color: isActive ? theme.palette.text.primary : theme.palette.text.disabled,
}));

export const StyledPortraitIcon = styled(PortraitIcon, {
  shouldForwardProp: prop => prop !== 'isActive',
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  color: isActive ? theme.palette.text.primary : theme.palette.text.disabled,
}));


export const StyledListItemText = styled(ListItemText, {
  shouldForwardProp: prop => prop !== 'isActive',
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  '& .MuiTypography-root': {
    color: isActive ? '#ffffff' : theme.palette.text.primary,
    fontWeight: isActive ? 600 : 400,
    transition: theme.transitions.create(['color', 'font-weight'], {
      duration: theme.transitions.duration.short,
    }),
  },
  width: '100%'
}));

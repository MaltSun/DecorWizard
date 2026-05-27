import { Avatar, List, Stack, styled, Box, ListItemText } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import PortraitIcon from '@mui/icons-material/Portrait';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';

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

export const StyledGroupIcon = styled(GroupIcon, {
  shouldForwardProp: prop => prop !== 'isActive',
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  color: isActive ? 'red' : theme.palette.text.disabled,
}));

export const StyledMarksIcon = styled(StarOutlineOutlinedIcon, {
  shouldForwardProp: prop => prop !== 'isActive',
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  color: isActive ? theme.palette.text.primary : theme.palette.text.disabled,
}));

export const StyledCakeIcon = styled(CakeOutlinedIcon, {
  shouldForwardProp: prop => prop !== 'isActive',
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  color: isActive ? theme.palette.text.primary : theme.palette.text.disabled,
}));

export const StyledRateIcon = styled(RateReviewOutlinedIcon, {
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

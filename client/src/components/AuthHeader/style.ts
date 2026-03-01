import { Button, ButtonGroup, styled } from '@mui/material';

export const AuthHeaderButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  width: '100%',
  justifyContent: 'center',
  gap: theme.spacing(3),          // 24px по умолчанию spacing=8
  border: 'none',

  '& .MuiButton-root': {
    minWidth: 180,
    maxWidth: 220,
    fontSize: '1.1rem',           // ≈17.6px — комфортно
    fontWeight: 500,
    textTransform: 'uppercase',
    padding: theme.spacing(1.5, 4), // 12px vertical, 32px horizontal
    color: theme.palette.text.disabled,
    border: 'none',
    borderRadius: 0,
    background: 'transparent',

    '&:hover': {
      background: theme.palette.action.hover,
      color: theme.palette.text.secondary,
    },

    '&.active': {
      color: theme.palette.text.secondary,
      borderBottom: `3px solid ${theme.palette.text.secondary}`,
      background: 'transparent',
      fontWeight: 600,
    },

    '&:active': {
      background: theme.palette.action.selected,
    },
  },
}));


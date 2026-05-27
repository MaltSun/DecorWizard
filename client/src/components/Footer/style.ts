import { Box, Divider, Link, styled } from "@mui/material";

export const FooterContainer = styled(Box)(({ theme }) => (
    {
        width: '100%',
        backgroundColor: '#f7e7ce',
        color: '#5C2A2A',
        gap: theme.spacing(4),
    }
))

export const FooterDivider = styled(Divider)(() => ({
    my: 4, borderColor: 'rgba(92, 42, 42, 0.15)'
}));

export const FooterLink = styled(Link)(() => ({
    color: '#5C2A2A',
    fontSize: '1.05rem',
    '&:hover': { color: '#80011F' },
}))  

export const FooterContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column', // Стек для мобильных
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(4),
  textAlign: 'center',
  padding: theme.spacing(5, 2),

  [theme.breakpoints.up('md')]: {
    flexDirection: 'row', // Ряд для десктопов
    justifyContent: 'space-between',
    textAlign: 'left',
  }
}));

export const FooterBottom = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(92, 42, 42, 0.15)',

  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
}));

import { Box, Paper, styled, Typography } from "@mui/material";

export const OrderFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end', // Прижимаем сумму к правому краю
  alignItems: 'center',
  marginTop: theme.spacing(3),
  paddingTop: theme.spacing(2),
  borderTop: '1px solid #f0f0f0',
  gap: theme.spacing(1),
}));

export const TotalPrice = styled(Typography)(({ theme }) => ({
  fontFamily: '"Kurale", serif',
  fontSize: '1.4rem',
  color: theme.palette.primary.main,
  fontWeight: 700,
}));


export const OrderBlock = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', // Автоматическая сетка
  gap: theme.spacing(3),
  width: '100%',
}));

export const OrderSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '16px',
  backgroundColor: '#fff',
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)', // Мягкая тень
  border: '1px solid rgba(0,0,0,0.03)',
}));

export const OrderHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  paddingBottom: theme.spacing(2),
  borderBottom: '1px dashed #e0e0e0',
}));

export const InnerContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  padding: theme.spacing(3),
  width: '100%',
}));

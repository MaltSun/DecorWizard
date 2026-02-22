import { Box, styled } from "@mui/material";

export const ItemCard = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    background: theme.palette.background.default,
    padding: theme.spacing(4),
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    gap: theme.spacing(2),
    color: theme.palette.text.secondary
}))
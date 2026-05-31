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
    boxShadow: theme.shadows[1],
    gap: theme.spacing(2),
    color: theme.palette.text.secondary
}))
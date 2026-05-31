import { Box, styled } from "@mui/material";

export const CardContainer = styled(Box)(({ theme }) => ({
    width: '80%',
    minWidth: '250px',
    minHeight: '190px',
    background: theme.palette.background.paper,
    boxShadow: `0px 4px 10px ${theme.palette.grey[400]}`,
    borderRadius: '10px',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(4),
}));

export const InfoContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: theme.spacing(2),
    padding: theme.spacing(2),
    overflow: 'hidden',
}));

export const Image = styled('img')(({ theme }) => ({
    height: '187px',
    borderRadius: '20px',
    objectFit: 'contain',
}));
import { Box, styled } from "@mui/material";

export const Container = styled(Box)(({ theme }) => (
    {
        display: 'flex',
        flexDirection: 'column',
        width: '200px',
        alignItems: 'center',
        background: theme.palette.background.default,
        borderRadius: theme.spacing(5),
        padding: theme.spacing(7),
        gap: theme.spacing(5),
        height: '300px'
    }
))
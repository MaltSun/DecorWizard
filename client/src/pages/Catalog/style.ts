import { styled, Box, Button } from "@mui/material";

export const Container = styled(Box)(({ theme }) => (
    {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        minHeight: '100vh',
        background: theme.palette.background.default,
    }
))

export const CatalogBlock = styled(Box)(({ theme }) => (
    {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        flexWrap: 'wrap',
        justifyContent: 'start',

        padding: theme.spacing(5),
        gap: theme.spacing(10),
    }
))